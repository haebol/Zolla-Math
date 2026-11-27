import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';

const MIN_CAPTURE_SCALE = 3;

const TEXT_TAG_NAMES = new Set([
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'SPAN',
  'A',
  'STRONG',
  'EM',
  'B',
  'I',
  'SMALL',
  'LABEL',
  'LI',
]);

async function ensureFontsLoadedForText(text: string): Promise<void> {
  await document.fonts.ready;
  const sample = Array.from(new Set(text)).join('') || '졸라수학맨0123456789';
  await Promise.all([
    document.fonts.load('400 16px "Jua"', sample).catch(() => []),
    document.fonts.load('400 16px "Gowun Dodum"', sample).catch(() => []),
    document.fonts.load('500 16px "JetBrains Mono"', sample).catch(() => []),
    document.fonts.load('700 16px "JetBrains Mono"', sample).catch(() => []),
  ]);
  await document.fonts.ready;
}

function hasDirectTextContent(el: Element): boolean {
  for (let i = 0; i < el.childNodes.length; i++) {
    const child = el.childNodes[i];
    if (
      child.nodeType === Node.TEXT_NODE &&
      (child.textContent ?? '').trim().length > 0
    ) {
      return true;
    }
  }
  return false;
}

function lockComputedStylesRecursively(origNode: Element, cloneNode: Element): void {
  const cs = window.getComputedStyle(origNode);

  if (origNode instanceof HTMLElement && cloneNode instanceof HTMLElement) {
    const style = cloneNode.style;

    // 2. Freeze exact computed pixel layout dimensions and typography
    if (cs.width && cs.width !== 'auto') {
      style.width = cs.width;
    }
    if (cs.height && cs.height !== 'auto') {
      style.height = cs.height;
    }
    style.boxSizing = cs.boxSizing;
    style.fontFamily = cs.fontFamily;
    style.fontSize = cs.fontSize;
    style.fontWeight = cs.fontWeight;
    style.fontStyle = cs.fontStyle;
    style.lineHeight = cs.lineHeight;
    style.letterSpacing = cs.letterSpacing;

    // 3. Preserve white-space & word-break: keep-all, and prevent glyph clipping
    style.whiteSpace = cs.whiteSpace;
    style.wordBreak = cs.wordBreak === 'break-all' ? 'break-all' : 'keep-all';

    if (TEXT_TAG_NAMES.has(origNode.tagName) || hasDirectTextContent(origNode)) {
      style.overflow = 'visible';
      style.textOverflow = 'clip';
    }

    // 4. Strip CSS opacity & filters that cause washed-out or blurred text
    style.opacity = '1';
    style.filter = 'none';
    style.backdropFilter = 'none';
    (
      style as CSSStyleDeclaration & { webkitBackdropFilter?: string }
    ).webkitBackdropFilter = 'none';
  } else if (origNode instanceof SVGElement && cloneNode instanceof SVGElement) {
    const tag = origNode.tagName.toLowerCase();
    const style = cloneNode.style;

    if (tag === 'svg') {
      if (cs.width && cs.width !== 'auto') {
        style.width = cs.width;
      }
      if (cs.height && cs.height !== 'auto') {
        style.height = cs.height;
      }
      style.fontFamily = cs.fontFamily;
      style.opacity = '1';
      style.filter = 'none';
    } else if (tag === 'text' || tag === 'tspan') {
      style.fontFamily = cs.fontFamily;
      style.fontSize = cs.fontSize;
      style.fontWeight = cs.fontWeight;
      style.letterSpacing = cs.letterSpacing;
      style.opacity = '1';
      style.filter = 'none';
    }
  }

  const origChildren = origNode.children;
  const cloneChildren = cloneNode.children;
  const count = Math.min(origChildren.length, cloneChildren.length);
  for (let i = 0; i < count; i++) {
    lockComputedStylesRecursively(origChildren[i], cloneChildren[i]);
  }
}

/**
 * Renders cloned <svg> elements using a two-pass hybrid pipeline:
 * 1) Vector shapes (with <text> removed) are rasterized cleanly at high resolution.
 * 2) All <text>/<tspan> glyphs are drawn directly onto the same high-res <canvas>
 *    via Canvas2D fillText() using the live browser document.fonts (Jua, Gowun Dodum,
 *    JetBrains Mono) and exact live SVG DOM glyph positions (getStartPositionOfChar + getScreenCTM).
 * This completely bypasses Chrome's data:image/svg+xml external/webfont isolation.
 */
async function rasterizeClonedSvgs(
  origRoot: HTMLElement,
  cloneRoot: HTMLElement,
  resolvedScale: number
): Promise<void> {
  const origSvgs = Array.from(origRoot.querySelectorAll('svg')).filter(
    (svg) => !svg.parentElement?.closest('svg')
  );
  const cloneSvgs = Array.from(cloneRoot.querySelectorAll('svg')).filter(
    (svg) => !svg.parentElement?.closest('svg')
  );

  const count = Math.min(origSvgs.length, cloneSvgs.length);
  const svgRasterScale = Math.max(resolvedScale * 2, 6);

  for (let i = 0; i < count; i++) {
    const origSvg = origSvgs[i];
    const cloneSvg = cloneSvgs[i];
    const cs = window.getComputedStyle(origSvg);
    const cssW = parseFloat(cs.width);
    const cssH = parseFloat(cs.height);
    if (!cssW || !cssH || cssW <= 0 || cssH <= 0) continue;

    const rasterW = Math.max(1, Math.ceil(cssW * svgRasterScale));
    const rasterH = Math.max(1, Math.ceil(cssH * svgRasterScale));

    const vb = origSvg.viewBox?.baseVal;
    const vbX = vb && vb.width > 0 ? vb.x : 0;
    const vbY = vb && vb.height > 0 ? vb.y : 0;
    const vbW = vb && vb.width > 0 ? vb.width : cssW;
    const vbH = vb && vb.height > 0 ? vb.height : cssH;

    const svgNoText = cloneSvg.cloneNode(true) as SVGSVGElement;
    svgNoText.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    if (!svgNoText.getAttribute('viewBox')) {
      svgNoText.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);
    }
    svgNoText.setAttribute('width', String(rasterW));
    svgNoText.setAttribute('height', String(rasterH));
    svgNoText.style.width = `${rasterW}px`;
    svgNoText.style.height = `${rasterH}px`;
    svgNoText.querySelectorAll('text').forEach((t) => t.remove());

    try {
      const serialized = new XMLSerializer().serializeToString(svgNoText);
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialized)}`;

      const shapesImg = new Image();
      shapesImg.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        shapesImg.onload = () => resolve();
        shapesImg.onerror = () => reject(new Error('SVG shape image load failed'));
        shapesImg.src = svgDataUrl;
      });
      if (typeof shapesImg.decode === 'function') {
        await shapesImg.decode().catch(() => {});
      }

      const canvas = document.createElement('canvas');
      canvas.width = rasterW;
      canvas.height = rasterH;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      ctx.drawImage(shapesImg, 0, 0, rasterW, rasterH);

      // Pass 2: Draw every SVG <text> using live browser document.fonts & exact SVG glyph coordinates
      const origTexts = Array.from(origSvg.querySelectorAll('text'));
      const svgScreenCtm = origSvg.getScreenCTM();

      if (origTexts.length > 0 && svgScreenCtm) {
        const par = (origSvg.getAttribute('preserveAspectRatio') ?? 'xMidYMid meet').trim();
        let vbScaleX: number;
        let vbScaleY: number;
        let vbOffsetX = 0;
        let vbOffsetY = 0;

        if (par === 'none') {
          vbScaleX = rasterW / vbW;
          vbScaleY = rasterH / vbH;
          vbOffsetX = -vbX * vbScaleX;
          vbOffsetY = -vbY * vbScaleY;
        } else {
          const uniform = Math.min(rasterW / vbW, rasterH / vbH);
          vbScaleX = uniform;
          vbScaleY = uniform;
          vbOffsetX = (rasterW - vbW * uniform) / 2 - vbX * uniform;
          vbOffsetY = (rasterH - vbH * uniform) / 2 - vbY * uniform;
        }

        const svgScreenInv = svgScreenCtm.inverse();

        for (const origText of origTexts) {
          const textCs = window.getComputedStyle(origText);
          if (textCs.display === 'none' || textCs.visibility === 'hidden') continue;

          const totalChars = origText.getNumberOfChars();
          if (totalChars <= 0) continue;

          const textScreenCtm = origText.getScreenCTM();
          if (!textScreenCtm) continue;

          const relMatrix = svgScreenInv.multiply(textScreenCtm);

          // Map each UTF-16 code unit in origText.textContent to its parent <text>/<tspan> computed style
          const charStyles: CSSStyleDeclaration[] = [];
          const walker = document.createTreeWalker(origText, NodeFilter.SHOW_TEXT);
          let current: Node | null;
          while ((current = walker.nextNode()) !== null) {
            const tn = current as Text;
            const el = tn.parentElement ?? origText;
            const elCs = window.getComputedStyle(el);
            for (let k = 0; k < tn.data.length; k++) {
              charStyles.push(elCs);
            }
          }

          const fullText = origText.textContent ?? '';

          ctx.save();
          ctx.setTransform(vbScaleX, 0, 0, vbScaleY, vbOffsetX, vbOffsetY);
          ctx.transform(
            relMatrix.a,
            relMatrix.b,
            relMatrix.c,
            relMatrix.d,
            relMatrix.e,
            relMatrix.f
          );
          ctx.textAlign = 'left';
          ctx.textBaseline = 'alphabetic';
          ctx.globalAlpha = 1;

          let idx = 0;
          while (idx < totalChars && idx < fullText.length) {
            const code = fullText.charCodeAt(idx);
            const step =
              code >= 0xd800 && code <= 0xdbff && idx + 1 < fullText.length
                ? 2
                : 1;
            const ch = fullText.slice(idx, idx + step);

            if (ch.trim().length > 0) {
              try {
                const pos = origText.getStartPositionOfChar(idx);
                const chCs = charStyles[idx] ?? textCs;

                ctx.font = `${chCs.fontStyle} ${chCs.fontWeight} ${chCs.fontSize} ${chCs.fontFamily}`;

                const hasStroke =
                  Boolean(chCs.stroke) &&
                  chCs.stroke !== 'none' &&
                  parseFloat(chCs.strokeWidth) > 0;
                const hasFill = Boolean(chCs.fill) && chCs.fill !== 'none';
                const strokeFirst =
                  typeof chCs.paintOrder === 'string' &&
                  chCs.paintOrder.trim().startsWith('stroke');

                if (hasStroke && strokeFirst) {
                  ctx.strokeStyle = chCs.stroke;
                  ctx.lineWidth = parseFloat(chCs.strokeWidth);
                  ctx.lineJoin = 'round';
                  ctx.strokeText(ch, pos.x, pos.y);
                }

                if (hasFill) {
                  ctx.fillStyle = chCs.fill;
                  ctx.fillText(ch, pos.x, pos.y);
                }

                if (hasStroke && !strokeFirst) {
                  ctx.strokeStyle = chCs.stroke;
                  ctx.lineWidth = parseFloat(chCs.strokeWidth);
                  ctx.lineJoin = 'round';
                  ctx.strokeText(ch, pos.x, pos.y);
                }
              } catch {
                // Skip non-rendered/collapsed whitespace glyphs
              }
            }

            idx += step;
          }

          ctx.restore();
        }
      }

      const pngDataUrl = canvas.toDataURL('image/png');
      const replacementImg = document.createElement('img');
      replacementImg.src = pngDataUrl;
      replacementImg.alt = '';
      replacementImg.style.width = cs.width;
      replacementImg.style.height = cs.height;
      replacementImg.style.display = cs.display === 'inline' ? 'inline-block' : cs.display;
      replacementImg.style.flexShrink = cs.flexShrink;
      replacementImg.style.opacity = '1';
      replacementImg.style.filter = 'none';
      replacementImg.style.pointerEvents = 'none';

      cloneSvg.replaceWith(replacementImg);
    } catch {
      // Fallback to original cloneSvg if canvas rasterization fails
    }
  }
}

async function waitForClonedImages(root: HTMLElement): Promise<void> {
  const images = Array.from(root.querySelectorAll('img'));
  if (images.length === 0) return;

  await Promise.all(
    images.map(async (img) => {
      if (!img.complete) {
        await new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        });
      }
      if (typeof img.decode === 'function') {
        await img.decode().catch(() => {});
      }
    })
  );
}

export async function captureElementToPngDataUrl(
  element: HTMLElement,
  pixelRatio = MIN_CAPTURE_SCALE
): Promise<string> {
  // 1. Ensure all webfonts & subsets used in this element are completely loaded
  await ensureFontsLoadedForText(element.textContent ?? '');

  const resolvedScale = Math.max(MIN_CAPTURE_SCALE, pixelRatio);

  // 2. Mount an isolated off-screen clone with frozen pixel styles
  const offscreenHost = document.createElement('div');
  offscreenHost.style.position = 'fixed';
  offscreenHost.style.left = '-9999px';
  offscreenHost.style.top = '0';
  offscreenHost.style.pointerEvents = 'none';
  offscreenHost.style.zIndex = '-1';
  offscreenHost.style.backgroundColor = '#ffffff';
  offscreenHost.style.margin = '0';
  offscreenHost.style.padding = '0';

  const clone = element.cloneNode(true) as HTMLElement;
  lockComputedStylesRecursively(element, clone);
  await rasterizeClonedSvgs(element, clone, resolvedScale);

  offscreenHost.appendChild(clone);
  document.body.appendChild(offscreenHost);

  try {
    await waitForClonedImages(clone);
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const rect = clone.getBoundingClientRect();
    const captureWidth = rect.width > 0 ? Math.ceil(rect.width) : undefined;
    const captureHeight = rect.height > 0 ? Math.ceil(rect.height) : undefined;

    // 4. High-res capture with CORS + solid white background
    const canvas = await html2canvas(clone, {
      scale: resolvedScale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      width: captureWidth,
      height: captureHeight,
    });

    return canvas.toDataURL('image/png', 1.0);
  } finally {
    // 5. Immediately clean up off-screen clone right after capture
    offscreenHost.remove();
  }
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

function triggerDownload(urlOrBlob: string | Blob, filename: string): void {
  const url = typeof urlOrBlob === 'string' ? urlOrBlob : URL.createObjectURL(urlOrBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (typeof urlOrBlob !== 'string') {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

export async function exportElementAsPng(
  element: HTMLElement,
  filename: string,
  pixelRatio = MIN_CAPTURE_SCALE
): Promise<void> {
  const dataUrl = await captureElementToPngDataUrl(element, pixelRatio);
  triggerDownload(dataUrlToBlob(dataUrl), filename);
}

export async function exportPagesAsPdf(
  getElementAt: (index: number) => Promise<HTMLElement | null>,
  totalPages: number,
  orientation: 'portrait' | 'landscape',
  filename: string,
  onProgress?: (current: number, total: number) => void,
  pixelRatio = MIN_CAPTURE_SCALE
): Promise<void> {
  await document.fonts.ready;

  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: 'a4',
    compress: true,
  });
  const pageWidth = orientation === 'landscape' ? 297 : 210;
  const pageHeight = orientation === 'landscape' ? 210 : 297;

  const pageIndices = Array.from({ length: totalPages }, (_, idx) => idx);
  let insertedPages = 0;

  // 5. Sequential one-by-one clone -> pixel-freeze -> capture -> remove -> 1:1 PDF insert
  for (const idx of pageIndices) {
    onProgress?.(idx + 1, totalPages);
    const el = await getElementAt(idx);
    if (!el) continue;

    const dataUrl = await captureElementToPngDataUrl(el, pixelRatio);
    if (insertedPages > 0) {
      pdf.addPage('a4', orientation);
    }
    pdf.addImage(dataUrl, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    insertedPages += 1;
  }

  pdf.save(filename);
}

export async function exportPagesAsZip(
  getElementAt: (index: number) => Promise<HTMLElement | null>,
  getFilenameAt: (index: number) => string,
  totalPages: number,
  zipFilename: string,
  pixelRatio = MIN_CAPTURE_SCALE,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  await document.fonts.ready;

  const zip = new JSZip();
  const pageIndices = Array.from({ length: totalPages }, (_, idx) => idx);

  // 5. Sequential one-by-one clone -> pixel-freeze -> capture -> remove -> JSZip pack
  for (const idx of pageIndices) {
    onProgress?.(idx + 1, totalPages);
    const el = await getElementAt(idx);
    if (!el) continue;

    const dataUrl = await captureElementToPngDataUrl(el, pixelRatio);
    const blob = dataUrlToBlob(dataUrl);
    zip.file(getFilenameAt(idx), blob);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  triggerDownload(zipBlob, zipFilename);
}
