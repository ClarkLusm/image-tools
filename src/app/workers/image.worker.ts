/**
 * Image processing Web Worker
 *
 * Uses OffscreenCanvas + ImageBitmap for all canvas operations — these APIs
 * are available off the main thread so image processing never blocks the UI.
 *
 * Message flow:
 *   Main → Worker: WorkerRequest  (ImageBitmap is transferred, zero-copy)
 *   Worker → Main: WorkerResponse (result Blob or error string)
 */

export type WorkerTaskType =
  | "png-to-jpg"
  | "resize"
  | "remove-metadata"
  | "remove-background"
  | "convert-to-webp"
  | "convert-to-jpg"
  | "convert-to-png"
  | "crop";

export interface WorkerRequest {
  id: string;
  type: WorkerTaskType;
  bitmap: ImageBitmap;
  options?: {
    quality?: number;
    width?: number;
    height?: number;
    mimeType?: string;
    fillWhite?: boolean;
    crop?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    background?: {
      threshold?: number;
      softness?: number;
    };
  };
}

export interface WorkerResponse {
  id: string;
  blob?: Blob;
  error?: string;
}

function drawBitmapToCanvas(
  bitmap: ImageBitmap,
  width: number,
  height: number,
  fillWhite = false
): OffscreenCanvas {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get OffscreenCanvas 2D context");

  if (fillWhite) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, width, height);

  return canvas;
}

async function handlePngToJpg(
  bitmap: ImageBitmap,
  quality: number
): Promise<Blob> {
  const canvas = drawBitmapToCanvas(bitmap, bitmap.width, bitmap.height, true);
  const blob = await canvas.convertToBlob({ type: "image/jpeg", quality });
  bitmap.close();
  return blob;
}

async function handleResize(
  bitmap: ImageBitmap,
  targetWidth: number,
  targetHeight: number,
  mimeType: string
): Promise<Blob> {
  const canvas = drawBitmapToCanvas(bitmap, targetWidth, targetHeight);
  const blob = await canvas.convertToBlob({
    type: mimeType,
    quality: 0.95,
  });
  bitmap.close();
  return blob;
}

async function handleRemoveMetadata(
  bitmap: ImageBitmap,
  mimeType: string
): Promise<Blob> {
  // Drawing through OffscreenCanvas strips all EXIF/metadata because
  // convertToBlob only encodes raw pixel data, not the original file headers.
  const canvas = drawBitmapToCanvas(bitmap, bitmap.width, bitmap.height);
  const blob = await canvas.convertToBlob({ type: mimeType, quality: 1.0 });
  bitmap.close();
  return blob;
}

function estimateBackgroundColor(
  data: Uint8ClampedArray,
  width: number,
  height: number
) {
  const step = Math.max(1, Math.floor(Math.min(width, height) / 180));
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  const sample = (x: number, y: number) => {
    const idx = (y * width + x) * 4;
    r += data[idx];
    g += data[idx + 1];
    b += data[idx + 2];
    count += 1;
  };

  for (let x = 0; x < width; x += step) {
    sample(x, 0);
    sample(x, height - 1);
  }

  for (let y = 0; y < height; y += step) {
    sample(0, y);
    sample(width - 1, y);
  }

  if (count === 0) {
    return { r: 255, g: 255, b: 255 };
  }

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
}

async function handleRemoveBackground(
  bitmap: ImageBitmap,
  threshold: number,
  softness: number
): Promise<Blob> {
  const width = bitmap.width;
  const height = bitmap.height;
  const canvas = drawBitmapToCanvas(bitmap, width, height, false);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get OffscreenCanvas 2D context");

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const pixelCount = width * height;
  const bg = estimateBackgroundColor(data, width, height);

  const dist = new Float32Array(pixelCount);
  const maxRgbDistance = 441.6729559300637;

  for (let i = 0; i < pixelCount; i += 1) {
    const idx = i * 4;
    const dr = data[idx] - bg.r;
    const dg = data[idx + 1] - bg.g;
    const db = data[idx + 2] - bg.b;
    dist[i] = (Math.sqrt(dr * dr + dg * dg + db * db) / maxRgbDistance) * 255;
  }

  const clampedThreshold = Math.max(5, Math.min(140, threshold));
  const clampedSoftness = Math.max(0, Math.min(80, softness));
  const hardThreshold = Math.max(0, clampedThreshold - clampedSoftness);
  const expandThreshold = Math.min(255, clampedThreshold + clampedSoftness);

  const mask = new Uint8Array(pixelCount);
  const seen = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let head = 0;
  let tail = 0;

  const trySeed = (pixelIndex: number) => {
    if (seen[pixelIndex]) return;
    if (dist[pixelIndex] > expandThreshold) return;
    seen[pixelIndex] = 1;
    queue[tail] = pixelIndex;
    tail += 1;
  };

  for (let x = 0; x < width; x += 1) {
    trySeed(x);
    trySeed((height - 1) * width + x);
  }

  for (let y = 1; y < height - 1; y += 1) {
    trySeed(y * width);
    trySeed(y * width + (width - 1));
  }

  while (head < tail) {
    const current = queue[head];
    head += 1;
    mask[current] = 1;

    const x = current % width;
    const y = (current - x) / width;

    if (x > 0) {
      const next = current - 1;
      if (!seen[next] && dist[next] <= expandThreshold) {
        seen[next] = 1;
        queue[tail] = next;
        tail += 1;
      }
    }
    if (x < width - 1) {
      const next = current + 1;
      if (!seen[next] && dist[next] <= expandThreshold) {
        seen[next] = 1;
        queue[tail] = next;
        tail += 1;
      }
    }
    if (y > 0) {
      const next = current - width;
      if (!seen[next] && dist[next] <= expandThreshold) {
        seen[next] = 1;
        queue[tail] = next;
        tail += 1;
      }
    }
    if (y < height - 1) {
      const next = current + width;
      if (!seen[next] && dist[next] <= expandThreshold) {
        seen[next] = 1;
        queue[tail] = next;
        tail += 1;
      }
    }
  }

  const featherRange = Math.max(1, expandThreshold - hardThreshold);

  for (let i = 0; i < pixelCount; i += 1) {
    if (!mask[i]) continue;

    const idx = i * 4;
    const originalAlpha = data[idx + 3];
    const d = dist[i];

    if (d <= hardThreshold) {
      data[idx + 3] = 0;
      continue;
    }

    const edgeAlpha = Math.min(1, Math.max(0, (d - hardThreshold) / featherRange));
    data[idx + 3] = Math.round(originalAlpha * edgeAlpha);
  }

  ctx.putImageData(imageData, 0, 0);
  const blob = await canvas.convertToBlob({ type: "image/png" });
  bitmap.close();
  return blob;
}

async function handleConvert(
  bitmap: ImageBitmap,
  mimeType: string,
  quality: number,
  fillWhite: boolean
): Promise<Blob> {
  const canvas = drawBitmapToCanvas(bitmap, bitmap.width, bitmap.height, fillWhite);
  const blob = await canvas.convertToBlob({ type: mimeType, quality });
  bitmap.close();
  return blob;
}

async function handleCrop(
  bitmap: ImageBitmap,
  crop: { x: number; y: number; width: number; height: number },
  mimeType: string,
  quality: number,
  fillWhite: boolean
): Promise<Blob> {
  const x = Math.max(0, Math.floor(crop.x));
  const y = Math.max(0, Math.floor(crop.y));
  const maxWidth = Math.max(1, bitmap.width - x);
  const maxHeight = Math.max(1, bitmap.height - y);
  const width = Math.max(1, Math.min(Math.floor(crop.width), maxWidth));
  const height = Math.max(1, Math.min(Math.floor(crop.height), maxHeight));
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get OffscreenCanvas 2D context");

  if (fillWhite) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    bitmap,
    x,
    y,
    width,
    height,
    0,
    0,
    width,
    height
  );

  const blob = await canvas.convertToBlob({ type: mimeType, quality });
  bitmap.close();
  return blob;
}

self.addEventListener("message", async (event: MessageEvent<WorkerRequest>) => {
  const { id, type, bitmap, options = {} } = event.data;

  try {
    let blob: Blob;

    switch (type) {
      case "png-to-jpg":
        blob = await handlePngToJpg(bitmap, options.quality ?? 0.92);
        break;

      case "convert-to-jpg":
        blob = await handleConvert(
          bitmap,
          "image/jpeg",
          options.quality ?? 0.92,
          options.fillWhite ?? true
        );
        break;

      case "convert-to-webp":
        blob = await handleConvert(
          bitmap,
          "image/webp",
          options.quality ?? 0.9,
          false
        );
        break;

      case "convert-to-png":
        blob = await handleConvert(bitmap, "image/png", 1, false);
        break;

      case "resize": {
        const { width = bitmap.width, height = bitmap.height, mimeType = "image/jpeg" } = options;
        blob = await handleResize(bitmap, width, height, mimeType);
        break;
      }

      case "remove-metadata":
        blob = await handleRemoveMetadata(bitmap, options.mimeType ?? "image/jpeg");
        break;

      case "remove-background": {
        const threshold = options.background?.threshold ?? 44;
        const softness = options.background?.softness ?? 18;
        blob = await handleRemoveBackground(bitmap, threshold, softness);
        break;
      }

      case "crop": {
        const crop = options.crop;
        if (!crop) {
          throw new Error("Missing crop rectangle.");
        }
        const mimeType = options.mimeType ?? "image/png";
        const quality = options.quality ?? 0.95;
        const fillWhite = options.fillWhite ?? mimeType === "image/jpeg";
        blob = await handleCrop(bitmap, crop, mimeType, quality, fillWhite);
        break;
      }

      default:
        throw new Error(`Unknown task type: ${type}`);
    }

    const response: WorkerResponse = { id, blob };
    self.postMessage(response);
  } catch (err) {
    const response: WorkerResponse = {
      id,
      error: err instanceof Error ? err.message : String(err),
    };
    self.postMessage(response);
  }
});
