interface ProcessOptions {
  threshold: number; // 110 - 235
  contrast: number;  // 1.0 - 2.8
  inkColor: 'original' | 'black' | 'blue' | 'red';
}

export async function processMarkerPhoto(
  sourceDataUrl: string,
  options: ProcessOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const maxDim = 960;
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      let minX = w;
      let minY = h;
      let maxX = 0;
      let maxY = 0;
      let foundInk = false;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          if (lum >= options.threshold) {
            data[i + 3] = 0;
          } else {
            foundInk = true;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;

            const factor = options.contrast;
            const nr = Math.max(0, Math.min(255, Math.round((r - 128) * factor + 128)));
            const ng = Math.max(0, Math.min(255, Math.round((g - 128) * factor + 128)));
            const nb = Math.max(0, Math.min(255, Math.round((b - 128) * factor + 128)));

            if (options.inkColor === 'black') {
              data[i] = 15;
              data[i + 1] = 23;
              data[i + 2] = 42;
            } else if (options.inkColor === 'blue') {
              data[i] = 29;
              data[i + 1] = 78;
              data[i + 2] = 216;
            } else if (options.inkColor === 'red') {
              data[i] = 220;
              data[i + 1] = 38;
              data[i + 2] = 38;
            } else {
              data[i] = nr;
              data[i + 1] = ng;
              data[i + 2] = nb;
            }

            const alphaStrength = Math.min(255, Math.round(((options.threshold - lum) / 40) * 255));
            data[i + 3] = Math.max(180, alphaStrength);
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      if (!foundInk) {
        resolve(canvas.toDataURL('image/png'));
        return;
      }

      const pad = 10;
      const cx = Math.max(0, minX - pad);
      const cy = Math.max(0, minY - pad);
      const cw = Math.min(w - cx, maxX - minX + 1 + pad * 2);
      const ch = Math.min(h - cy, maxY - minY + 1 + pad * 2);

      const cropped = document.createElement('canvas');
      cropped.width = Math.max(1, cw);
      cropped.height = Math.max(1, ch);
      const cCtx = cropped.getContext('2d');
      if (!cCtx) {
        resolve(canvas.toDataURL('image/png'));
        return;
      }
      cCtx.drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);
      resolve(cropped.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error('이미지 로드에 실패했습니다.'));
    img.src = sourceDataUrl;
  });
}

export function createSampleMarkerPhoto(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 560;
  canvas.height = 240;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Simulate slightly warm/grayish A4 paper photo lighting
  const grad = ctx.createLinearGradient(0, 0, 560, 240);
  grad.addColorStop(0, '#ECEAE2');
  grad.addColorStop(1, '#DFDCD3');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 560, 240);

  // Hand-drawn style marker lines & text
  ctx.strokeStyle = '#DC2626';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.ellipse(155, 84, 92, 42, -0.05, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#1E293B';
  ctx.font = 'bold 42px sans-serif';
  ctx.fillText('묶음 수 = 분모!', 68, 98);

  ctx.strokeStyle = '#1D4ED8';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(74, 152);
  ctx.quadraticCurveTo(210, 140, 390, 156);
  ctx.stroke();

  ctx.fillStyle = '#1D4ED8';
  ctx.font = 'bold 34px sans-serif';
  ctx.fillText('← 개수가 아니라 덩어리!', 80, 198);

  return canvas.toDataURL('image/jpeg', 0.9);
}
