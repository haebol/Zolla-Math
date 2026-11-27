import { FractionVideoScript } from '../data/fractionVideoScripts';

export type VideoAspectFormat = '9:16' | '16:9';

interface RenderFrameOptions {
  script: FractionVideoScript;
  cardArtwork: HTMLCanvasElement | null;
  timeSec: number;
  format: VideoAspectFormat;
  showKoreanSub: boolean;
}

const INK = '#141B29';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/**
 * Font-safe 2-pass rasterizer that converts the REAL JollamanComicScene <svg>
 * into a crisp offscreen bitmap canvas using live document.fonts (Jua, Gowun Dodum, JetBrains Mono).
 */
export async function rasterizeCardSvgToCanvas(
  origSvg: SVGSVGElement,
  outW = 720,
  outH = 690,
  stripKoreanSentences = true
): Promise<HTMLCanvasElement> {
  await document.fonts.ready;

  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const vb = origSvg.viewBox.baseVal;
  const vbW = vb && vb.width > 0 ? vb.width : 240;
  const vbH = vb && vb.height > 0 ? vb.height : 230;
  const origRect = origSvg.getBoundingClientRect();
  const origCtm = origSvg.getScreenCTM();

  // Pass 1: Clone SVG with <text> stripped -> draw crisp vector shapes
  const svgClone = origSvg.cloneNode(true) as SVGSVGElement;
  svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgClone.setAttribute('width', String(outW));
  svgClone.setAttribute('height', String(outH));
  if (!svgClone.getAttribute('viewBox')) {
    svgClone.setAttribute('viewBox', `0 0 ${vbW} ${vbH}`);
  }
  svgClone.querySelectorAll('text').forEach((t) => t.remove());

  const svgStr = new XMLSerializer().serializeToString(svgClone);
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;

  await new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, outW, outH);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = dataUrl;
  });

  // Pass 2: Paint surviving SVG <text> & <tspan> (keep numbers/operators; strip Korean sentences in Global mode)
  const scaleX = origRect.width > 0 ? outW / origRect.width : outW / vbW;
  const scaleY = origRect.height > 0 ? outH / origRect.height : outH / vbH;

  const origTexts = Array.from(origSvg.querySelectorAll('text'));
  for (const origText of origTexts) {
    const textStyle = getComputedStyle(origText);
    if (textStyle.display === 'none' || textStyle.visibility === 'hidden') continue;

    const fullParentText = (origText.textContent || '').trim();
    if (
      stripKoreanSentences &&
      (/[가-힣]/.test(fullParentText) || !/[0-9A-Za-z+\-×÷=<>/?]/.test(fullParentText))
    ) {
      continue;
    }

    const tspans = Array.from(origText.querySelectorAll('tspan'));
    const items: Element[] = tspans.length > 0 ? tspans : [origText];

    for (const item of items) {
      const content = (item.textContent || '').replace(/\s+/g, ' ');
      if (!content.trim()) continue;

      const style = getComputedStyle(item);
      const fontSizePx = parseFloat(style.fontSize) || 14;
      const fontFamily = style.fontFamily || '"Jua", sans-serif';
      const fontWeight = style.fontWeight || '400';
      const fill =
        style.fill && style.fill !== 'none'
          ? style.fill
          : item.getAttribute('fill') || '#141B29';
      const stroke = style.stroke && style.stroke !== 'none' ? style.stroke : '';
      const strokeWidth = parseFloat(style.strokeWidth) || 0;
      const anchor =
        item.getAttribute('text-anchor') ||
        origText.getAttribute('text-anchor') ||
        'start';

      let svgX = 0;
      let svgY = 0;
      try {
        const textNode = item as SVGTextContentElement;
        if (textNode.getNumberOfChars && textNode.getNumberOfChars() > 0) {
          const startPt = textNode.getStartPositionOfChar(0);
          svgX = startPt.x;
          svgY = startPt.y;
          const totalLen = textNode.getComputedTextLength();
          if (anchor === 'middle') svgX += totalLen / 2;
          else if (anchor === 'end') svgX += totalLen;
        } else {
          const r = item.getBoundingClientRect();
          svgX = r.left - origRect.left;
          svgY = r.bottom - origRect.top;
        }
      } catch {
        const r = item.getBoundingClientRect();
        svgX = r.left - origRect.left;
        svgY = r.bottom - origRect.top;
      }

      let px = 0;
      let py = 0;
      if (origCtm && (item as SVGGraphicsElement).getScreenCTM) {
        const elCtm = (item as SVGGraphicsElement).getScreenCTM();
        if (elCtm) {
          const screenX = elCtm.a * svgX + elCtm.c * svgY + elCtm.e;
          const screenY = elCtm.b * svgX + elCtm.d * svgY + elCtm.f;
          px = (screenX - origRect.left) * scaleX;
          py = (screenY - origRect.top) * scaleY;
        }
      } else {
        px = (svgX / vbW) * outW;
        py = (svgY / vbH) * outH;
      }

      const ctmScale =
        origRect.width > 0 ? outW / origRect.width : outW / vbW;
      const drawnFontSize = fontSizePx * ctmScale;

      ctx.save();
      ctx.font = `${fontWeight} ${drawnFontSize}px ${fontFamily}`;
      ctx.textAlign =
        anchor === 'middle' ? 'center' : anchor === 'end' ? 'right' : 'left';
      ctx.textBaseline = 'alphabetic';

      if (stroke && strokeWidth > 0) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth * ctmScale;
        ctx.lineJoin = 'round';
        ctx.strokeText(content, px, py);
      }
      ctx.fillStyle = fill;
      ctx.fillText(content, px, py);
      ctx.restore();
    }
  }

  return canvas;
}

function drawSparkleStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  alpha = 1
) {
  if (size <= 1 || alpha <= 0.02) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? size : size * 0.36;
    const a = (i * Math.PI) / 4;
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.restore();
}

function drawComicBurst(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  label: string,
  fill: string,
  scale = 1,
  rotRad = -0.08
) {
  if (scale <= 0.02) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotRad);
  ctx.scale(scale, scale);

  const spikes = 12;
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const rad = i % 2 === 0 ? r : r * 0.64;
    const ang = (i * Math.PI) / spikes;
    const px = Math.cos(ang) * rad * 1.25;
    const py = Math.sin(ang) * rad * 0.82;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = INK;
  ctx.stroke();

  ctx.font = 'bold 21px "Jua", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 0, 1);
  ctx.restore();
}

function drawBodyTypewriterCallout(
  ctx: CanvasRenderingContext2D,
  boxW: number,
  boxH: number,
  t: number,
  callout: {
    x: number;
    y: number;
    text: string;
    startSec: number;
    typeDurationSec?: number;
    align?: 'left' | 'center';
    color?: string;
    bg?: string;
    fontSize?: number;
  }
) {
  if (t < callout.startSec || !callout.text) return;

  const typeDur = callout.typeDurationSec ?? Math.min(1.05, Math.max(0.35, callout.text.length * 0.052));
  const p = clamp01((t - callout.startSec) / typeDur);
  const chars = Array.from(callout.text);
  const count = Math.min(chars.length, Math.ceil(chars.length * p));
  if (count <= 0) return;

  const partial = chars.slice(0, count).join('');
  const scaleX = boxW / 240;
  const scaleY = boxH / 230;
  const px = callout.x * scaleX;
  const py = callout.y * scaleY;
  const fontPx = Math.round((callout.fontSize ?? 11) * scaleX);

  ctx.save();
  ctx.font = `bold ${fontPx}px "Jua", "Gowun Dodum", sans-serif`;
  ctx.textBaseline = 'middle';

  const partialW = ctx.measureText(partial).width;
  const padX = Math.max(6, Math.round(4 * scaleX));
  const padY = Math.max(3, Math.round(2.5 * scaleY));
  const pillW = partialW + padX * 2;
  const pillH = fontPx + padY * 2;

  const isCenter = callout.align !== 'left';
  const fullW = ctx.measureText(callout.text).width;
  const textStartX = isCenter ? px - fullW / 2 : px;
  const bgX = textStartX - padX;
  const bgY = py - pillH / 2;

  // Soft crisp backing pill so body typewriter text is super clean over artwork
  ctx.fillStyle = callout.bg ?? 'rgba(255, 253, 245, 0.94)';
  drawRoundRect(ctx, bgX, bgY, pillW, pillH, 5);
  ctx.fill();

  ctx.textAlign = 'left';
  ctx.fillStyle = callout.color ?? INK;
  ctx.fillText(partial, textStartX, py + 1);

  if (count < chars.length) {
    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(textStartX + partialW + 2, py - fontPx * 0.48, 2.5, fontPx * 0.96);
  }
  ctx.restore();
}

export function renderFractionVideoFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  opts: RenderFrameOptions
) {
  const { script, cardArtwork, timeSec, format, showKoreanSub } = opts;
  const t = Math.max(0, Math.min(script.durationSec, timeSec));
  const isShorts = format === '9:16';

  // 1. Clean warm comic backdrop
  ctx.fillStyle = '#FFFDF5';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(20, 27, 41, 0.04)';
  ctx.lineWidth = 1;
  for (let gx = 0; gx < width; gx += 36) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, height);
    ctx.stroke();
  }
  for (let gy = 0; gy < height; gy += 36) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(width, gy);
    ctx.stroke();
  }

  // Smooth steady camera pan/zoom (ZERO screen shake / wobble / tilt!)
  let camZoom = 1.0;
  let camFocusX = 120;
  let camFocusY = 115;

  if (t >= 2.3 && t < 6.4) {
    const p = easeInOutCubic(clamp01((t - 2.3) / 0.75));
    camZoom = lerp(1.0, 1.12, p);
    camFocusX = lerp(120, script.beat2Focus.x, p);
    camFocusY = lerp(115, script.beat2Focus.y, p);
  } else if (t >= 6.4 && t < 10.0) {
    const p = easeInOutCubic(clamp01((t - 6.4) / 0.75));
    camZoom = lerp(1.12, 1.15, p);
    camFocusX = lerp(script.beat2Focus.x, script.beat3Focus.x, p);
    camFocusY = lerp(script.beat2Focus.y, script.beat3Focus.y, p);
  } else if (t >= 10.0) {
    const p = easeInOutCubic(clamp01((t - 10.0) / 0.75));
    camZoom = lerp(1.15, 1.0, p);
    camFocusX = lerp(script.beat3Focus.x, 120, p);
    camFocusY = lerp(script.beat3Focus.y, 115, p);
  }

  const introBounce = t < 0.45 ? easeOutBack(clamp01(t / 0.45)) : 1;

  // Draw the REAL handcrafted JollamanComicScene card (rock-solid steady frame,
  // only the currently focused element pulses gently & sparkles!)
  const drawRealCardPanel = (
    boxX: number,
    boxY: number,
    boxW: number,
    boxH: number
  ) => {
    ctx.save();
    // Hard comic shadow
    ctx.fillStyle = INK;
    drawRoundRect(ctx, boxX + 6, boxY + 6, boxW, boxH, 8);
    ctx.fill();

    // Panel background & border
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4.5;
    drawRoundRect(ctx, boxX, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();

    // Clip inside card panel
    ctx.beginPath();
    ctx.roundRect(boxX + 3, boxY + 3, boxW - 6, boxH - 6, 6);
    ctx.clip();

    const normFx = camFocusX / 240;
    const normFy = camFocusY / 230;
    const targetCenterX = boxX + boxW * 0.5;
    const targetCenterY = boxY + boxH * 0.5;

    ctx.save();
    ctx.translate(targetCenterX, targetCenterY);
    ctx.scale(camZoom * introBounce, camZoom * introBounce);
    ctx.translate(-boxW * normFx, -boxH * normFy);

    // Base card artwork stays 100% steady (zero shake)
    if (cardArtwork) {
      ctx.drawImage(cardArtwork, 0, 0, boxW, boxH);
    }

    // Isolated focus-element subtle lift + pulse + twinkling sparkles ONLY on the active spot
    const activeFocus =
      t >= 2.5 && t < 6.4
        ? script.beat2Focus
        : t >= 6.4 && t < 10.2
        ? script.beat3Focus
        : null;

    if (activeFocus && cardArtwork) {
      const fx = (activeFocus.x / 240) * boxW;
      const fy = (activeFocus.y / 230) * boxH;
      const fr = (activeFocus.r / 240) * boxW;

      // Subtle soft dim outside focus so the active element stands out
      ctx.save();
      ctx.fillStyle = 'rgba(255, 253, 245, 0.28)';
      ctx.beginPath();
      ctx.rect(0, 0, boxW, boxH);
      ctx.arc(fx, fy, fr, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.restore();

      // Re-draw ONLY the focused circular patch with gentle pulse & 2px float!
      const elemScale = 1.035 + Math.sin(t * 5.2) * 0.025;
      const elemBobY = Math.sin(t * 5.2) * 2.5;
      ctx.save();
      ctx.beginPath();
      ctx.arc(fx, fy + elemBobY, fr * elemScale, 0, Math.PI * 2);
      ctx.clip();
      ctx.translate(fx, fy + elemBobY);
      ctx.scale(elemScale, elemScale);
      ctx.translate(-fx, -fy);
      ctx.drawImage(cardArtwork, 0, 0, boxW, boxH);
      ctx.restore();

      // Crisp focus ring & sparkles around the moving element
      const ringPulse = 1 + Math.sin(t * 6) * 0.03;
      ctx.save();
      ctx.strokeStyle = t >= 6.4 ? '#F59E0B' : '#7C3AED';
      ctx.lineWidth = 3;
      ctx.setLineDash([9, 6]);
      ctx.lineDashOffset = -t * 24;
      ctx.beginPath();
      ctx.arc(fx, fy, fr * ringPulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const starCol = t >= 6.4 ? '#FACC15' : '#A78BFA';
      const s1 = 9 + Math.sin(t * 8) * 3;
      const s2 = 7.5 + Math.cos(t * 9 + 1) * 2.8;
      drawSparkleStar(ctx, fx - fr * 0.78, fy - fr * 0.72, s1, starCol, 0.95);
      drawSparkleStar(ctx, fx + fr * 0.82, fy - fr * 0.65, s2, '#FB923C', 0.9);
      drawSparkleStar(ctx, fx + fr * 0.75, fy + fr * 0.75, s1 * 0.85, starCol, 0.85);
    } else if (t >= 10.0) {
      drawSparkleStar(ctx, boxW * 0.16, boxH * 0.18, 12 + Math.sin(t * 8) * 3, '#FACC15', 0.95);
      drawSparkleStar(ctx, boxW * 0.84, boxH * 0.2, 10 + Math.cos(t * 7) * 3, '#F472B6', 0.9);
      drawSparkleStar(ctx, boxW * 0.82, boxH * 0.8, 11 + Math.sin(t * 9) * 3, '#38BDF8', 0.9);
    }

    // Typewriter callouts ONLY inside the card body (본문 전용 타자기 출력!)
    script.bodyCallouts.forEach((callout) => {
      drawBodyTypewriterCallout(ctx, boxW, boxH, t, callout);
    });

    ctx.restore();

    // Small comic reaction pop in upper corner during Beat 2
    if (t >= 2.7 && t < 6.2) {
      const pop = easeOutBack(clamp01((t - 2.7) / 0.35));
      drawComicBurst(ctx, boxX + boxW - 56, boxY + 40, 32, script.comicReactionEn, '#EF4444', pop);
    }

    ctx.restore();
  };

  if (isShorts) {
    // =========================================================================
    // 9:16 SHORTS SYMMETRIC SAFE-ZONE LAYOUT (720 x 1280)
    // - 100% Horizontally Centered (x = 360) — zero awkward leftward tilt!
    // - Upper Hook (y = 26..122) uses comfortable width (above Shorts icons).
    // - Card & Key Checkpoint use centered 512px column (104px margin each side),
    //   staying clear of the lower-right Like/Comment/Share buttons & bottom 1/3!
    // =========================================================================
    const centerX = width / 2; // 360
    const hookW = 640; // 40px left & right margins
    const colW = 512;  // 104px (~14.4%) symmetrical left & right margins

    // A. Hook Header (Static/Pop — Centered, wide)
    const headerH = 96;
    const hookScale = easeOutBack(clamp01(t / 0.35));
    ctx.save();
    ctx.translate(centerX, 26 + headerH / 2);
    ctx.scale(hookScale, hookScale);

    ctx.fillStyle = INK;
    drawRoundRect(ctx, -hookW / 2 + 5, -headerH / 2 + 5, hookW, headerH, 8);
    ctx.fill();
    ctx.fillStyle = '#FACC15';
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4.5;
    drawRoundRect(ctx, -hookW / 2, -headerH / 2, hookW, headerH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillStyle = '#78350F';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${script.cardCode} · FRACTIONS`, 0, -27);

    ctx.font = 'bold 34px "Jua", sans-serif';
    ctx.fillStyle = INK;
    ctx.fillText(script.hookEn, 0, showKoreanSub ? 3 : 10, hookW - 28);

    if (showKoreanSub) {
      ctx.font = 'bold 15px "Gowun Dodum", sans-serif';
      ctx.fillStyle = '#451A03';
      ctx.fillText(script.hookKo, 0, 32, hookW - 28);
    }
    ctx.restore();

    // B. Real Handcrafted Card Artwork Stage (Centered 512x491 — clear of lower-right icons!)
    const cardW = colW;
    const cardH = Math.round((cardW * 230) / 240); // 491
    const cardX = Math.round(centerX - cardW / 2); // 104 .. 616
    const cardY = 138;
    drawRealCardPanel(cardX, cardY, cardW, cardH);

    // C. Key Checkpoint Banner (Centered 512px column aligned with card, y=645..789 < 853!)
    const capY = 645;
    const capH = 144;
    const conceptActive = t >= 6.4;
    const capScale = conceptActive ? easeOutBack(clamp01((t - 6.4) / 0.35)) : 1;

    ctx.save();
    ctx.translate(centerX, capY + capH / 2);
    ctx.scale(capScale, capScale);

    ctx.fillStyle = INK;
    drawRoundRect(ctx, -colW / 2 + 5, -capH / 2 + 5, colW, capH, 8);
    ctx.fill();
    ctx.fillStyle = conceptActive ? '#1E293B' : '#F1F5F9';
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4.5;
    drawRoundRect(ctx, -colW / 2, -capH / 2, colW, capH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (!conceptActive) {
      ctx.font = 'bold 24px "Jua", sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText('WATCH THE CARD!', 0, showKoreanSub ? -12 : 0, colW - 28);
      if (showKoreanSub) {
        ctx.font = 'bold 14.5px "Gowun Dodum", sans-serif';
        ctx.fillStyle = '#64748B';
        ctx.fillText('그림 속 숫자와 핵심 한글 단어를 주목!', 0, 18, colW - 28);
      }
    } else {
      ctx.font = 'bold 17px "Jua", sans-serif';
      ctx.fillStyle = '#FACC15';
      ctx.fillText(script.conceptHeadlineEn, 0, -40, colW - 28);

      ctx.font = 'bold 25px "Jua", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(script.conceptDefEn, 0, showKoreanSub ? -2 : 8, colW - 28);

      if (showKoreanSub) {
        ctx.font = 'bold 14.5px "Gowun Dodum", sans-serif';
        ctx.fillStyle = '#CBD5E1';
        ctx.fillText(script.conceptDefKo, 0, 38, colW - 28);
      }
    }
    ctx.restore();

    // Subtle credit tucked cleanly under centered column (y = 812 < 853)
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.textAlign = 'right';
    ctx.fillText('졸라수학맨 | haebol.com', cardX + colW, 812);
  } else {
    // =========================================================================
    // 16:9 WIDE LAYOUT (1280 x 720) — Real Card Left, Hook + Checkpoint Right
    // =========================================================================
    const pad = 34;
    const cardW = 600;
    const cardH = Math.round((cardW * 230) / 240); // 575
    const cardX = pad;
    const cardY = Math.round((height - cardH) / 2);
    drawRealCardPanel(cardX, cardY, cardW, cardH);

    const rightX = cardX + cardW + 32;
    const rightW = width - rightX - pad;

    // Hook Box (Static/Pop — NO typewriter!)
    const hookH = 160;
    const hookY = cardY + 24;
    ctx.save();
    ctx.fillStyle = INK;
    drawRoundRect(ctx, rightX + 5, hookY + 5, rightW, hookH, 10);
    ctx.fill();
    ctx.fillStyle = '#FACC15';
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4.5;
    drawRoundRect(ctx, rightX, hookY, rightW, hookH, 10);
    ctx.fill();
    ctx.stroke();

    const rcx = rightX + rightW / 2;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillStyle = '#78350F';
    ctx.fillText(`${script.cardCode} · FRACTIONS`, rcx, hookY + 34);

    ctx.font = 'bold 38px "Jua", sans-serif';
    ctx.fillStyle = INK;
    ctx.fillText(script.hookEn, rcx, hookY + (showKoreanSub ? 82 : 95), rightW - 24);

    if (showKoreanSub) {
      ctx.font = 'bold 18px "Gowun Dodum", sans-serif';
      ctx.fillStyle = '#451A03';
      ctx.fillText(script.hookKo, rcx, hookY + 126, rightW - 24);
    }
    ctx.restore();

    // Key Concept Box (Static/Pop — NO typewriter!)
    const capY = hookY + hookH + 34;
    const capH = cardY + cardH - capY - 24;
    const conceptActive = t >= 6.4;
    const capScale = conceptActive ? easeOutBack(clamp01((t - 6.4) / 0.35)) : 1;

    ctx.save();
    ctx.translate(rcx, capY + capH / 2);
    ctx.scale(capScale, capScale);

    ctx.fillStyle = INK;
    drawRoundRect(ctx, -rightW / 2 + 5, -capH / 2 + 5, rightW, capH, 10);
    ctx.fill();
    ctx.fillStyle = conceptActive ? '#1E293B' : '#F1F5F9';
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4.5;
    drawRoundRect(ctx, -rightW / 2, -capH / 2, rightW, capH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (!conceptActive) {
      ctx.font = 'bold 28px "Jua", sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText('WATCH THE CARD!', 0, showKoreanSub ? -16 : 0, rightW - 28);
      if (showKoreanSub) {
        ctx.font = 'bold 17px "Gowun Dodum", sans-serif';
        ctx.fillStyle = '#64748B';
        ctx.fillText('그림 속 숫자와 핵심 한글 단어를 주목!', 0, 22, rightW - 28);
      }
    } else {
      ctx.font = 'bold 22px "Jua", sans-serif';
      ctx.fillStyle = '#FACC15';
      ctx.fillText(script.conceptHeadlineEn, 0, -66, rightW - 28);

      ctx.font = 'bold 30px "Jua", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(script.conceptDefEn, 0, showKoreanSub ? -8 : 8, rightW - 28);

      if (showKoreanSub) {
        ctx.font = 'bold 19px "Gowun Dodum", sans-serif';
        ctx.fillStyle = '#CBD5E1';
        ctx.fillText(script.conceptDefKo, 0, 48, rightW - 28);
      }
    }
    ctx.restore();

    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.textAlign = 'right';
    ctx.fillText('졸라수학맨 | haebol.com', width - pad, height - 18);
  }
}
