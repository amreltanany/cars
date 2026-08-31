/**
 * Generates a depth map (grayscale displacement map) from an image using
 * luminance-based heuristics. This is a client-side approximation — for
 * production you'd use AI depth estimation tools — but it produces a
 * believable 2.5D parallax effect for any photo.
 */
export function generateDepthMap(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = 512;
      const h = Math.round((img.height / img.width) * w);
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      // Build a luminance-based depth map with center-bias and blur
      const lum = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) {
        const r = data[i * 4] / 255;
        const g = data[i * 4 + 1] / 255;
        const b = data[i * 4 + 2] / 255;
        lum[i] = 0.299 * r + 0.587 * g + 0.114 * b;
      }

      // Simple box blur to smooth the depth map
      const blurred = new Float32Array(w * h);
      const radius = 3;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let sum = 0;
          let count = 0;
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                sum += lum[ny * w + nx];
                count++;
              }
            }
          }
          blurred[y * w + x] = sum / count;
        }
      }

      // Combine luminance + center bias (closer to center = closer to viewer)
      for (let i = 0; i < w * h; i++) {
        const x = i % w;
        const y = Math.floor(i / w);
        const cx = (x / w - 0.5);
        const cy = (y / h - 0.5);
        const distFromCenter = Math.sqrt(cx * cx + cy * cy);
        const centerBias = Math.max(0, 0.5 - distFromCenter) * 0.6;
        const depth = Math.min(1, blurred[i] * 0.5 + centerBias + 0.2);
        const val = Math.round(depth * 255);
        data[i * 4] = val;
        data[i * 4 + 1] = val;
        data[i * 4 + 2] = val;
        data[i * 4 + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}
