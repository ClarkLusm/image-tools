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
