import { Worker } from "bullmq";
import sharp from "sharp";
import path from "path";
import { stat, writeFile } from "fs/promises";
import { ensureJobDir, getOutputInfo, STORAGE_ROOT } from "../lib/storage";
import { getRedisConnectionOptions } from "../lib/redis";
import { debugLog } from "../lib/debug";

type CompressJobData = {
  id: string;
  inputPath: string;
  originalName: string;
  mimeType: string;
  quality: number;
  targetSizeKB?: number;
};

const connection = getRedisConnectionOptions();

const mapPngCompression = (quality: number) => {
  const ratio = Math.max(0, Math.min(1, (100 - quality) / 100));
  return Math.round(ratio * 9);
};

const getOutputFormat = (format?: string, mimeType?: string) => {
  if (format) return format;
  if (!mimeType) return "jpeg";
  if (mimeType.includes("png")) return "png";
  if (mimeType.includes("webp")) return "webp";
  if (mimeType.includes("avif")) return "avif";
  return "jpeg";
};

const formatToExtension = (format: string) => {
  switch (format) {
    case "jpeg":
      return ".jpg";
    case "png":
      return ".png";
    case "webp":
      return ".webp";
    case "avif":
      return ".avif";
    default:
      return ".jpg";
  }
};

const formatToMime = (format: string) => {
  switch (format) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "avif":
      return "image/avif";
    default:
      return "image/jpeg";
  }
};

const worker = new Worker<CompressJobData>(
  "compress-image",
  async (job) => {
    const startedAt = Date.now();
    debugLog("worker:compress", "Job received", {
      id: job.id,
      name: job.name,
      quality: job.data.quality,
      targetSizeKB: job.data.targetSizeKB ?? null,
    });
    const { id, inputPath, originalName, mimeType, quality, targetSizeKB } =
      job.data;

    await ensureJobDir(id);
    await job.updateProgress(10);

    const image = sharp(inputPath, { failOnError: false });
    const metadata = await image.metadata();
    const outputFormat = getOutputFormat(metadata.format, mimeType);
    const outputExt = formatToExtension(outputFormat);
    const { outputPath, outputFilename } = getOutputInfo(
      id,
      originalName,
      outputExt
    );

    await job.updateProgress(35);

    const buildPipeline = (q: number) => {
      const base = sharp(inputPath, { failOnError: false });
      switch (outputFormat) {
        case "png":
          return base.png({
            compressionLevel: mapPngCompression(q),
            quality: q,
            effort: 7,
          });
        case "webp":
          return base.webp({ quality: q });
        case "avif":
          return base.avif({ quality: q });
        default:
          return base.jpeg({ quality: q, mozjpeg: true });
      }
    };

    await job.updateProgress(70);

    let outputSize = 0;
    if (targetSizeKB) {
      const targetBytes = targetSizeKB * 1024;
      let low = 30;
      let high = 95;
      let bestBuffer: Buffer | null = null;
      let bestDiff = Number.POSITIVE_INFINITY;

      for (let i = 0; i < 7; i += 1) {
        const mid = Math.round((low + high) / 2);
        const buffer = await buildPipeline(mid).toBuffer();
        const diff = buffer.length - targetBytes;
        const absDiff = Math.abs(diff);

        if (absDiff < bestDiff) {
          bestDiff = absDiff;
          bestBuffer = buffer;
        }

        if (diff > 0) {
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }

      if (!bestBuffer) {
        bestBuffer = await buildPipeline(quality).toBuffer();
      }

      await writeFile(outputPath, bestBuffer);
      outputSize = bestBuffer.length;
    } else {
      await buildPipeline(quality).toFile(outputPath);
      const fileStat = await stat(outputPath);
      outputSize = fileStat.size;
    }

    await job.updateProgress(90);

    await job.updateProgress(100);
    debugLog("worker:compress", "Job done", {
      id: job.id,
      outputSize,
      outputFilename,
      tookMs: Date.now() - startedAt,
    });

    return {
      outputPath,
      outputFilename,
      outputSize,
      mimeType: formatToMime(outputFormat),
      storageRoot: STORAGE_ROOT,
    };
  },
  { connection }
);

worker.on("failed", (job, err) => {
  // eslint-disable-next-line no-console
  console.error("Compress job failed", job?.id, err);
  debugLog("worker:compress", "Job failed", {
    id: job?.id,
    message: err?.message ?? String(err),
  });
});

worker.on("ready", () => {
  // eslint-disable-next-line no-console
  console.log("Compress worker ready");
  debugLog("worker:compress", "Worker ready", { storageRoot: STORAGE_ROOT });
});
