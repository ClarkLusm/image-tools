import os from "os";
import path from "path";
import { mkdir } from "fs/promises";

const DEFAULT_ROOT = path.join(os.tmpdir(), "image-tools-jobs");

export const STORAGE_ROOT = process.env.IMAGE_JOBS_DIR ?? DEFAULT_ROOT;

export const ensureJobDir = async (jobId: string) => {
  const dir = getJobDir(jobId);
  await mkdir(dir, { recursive: true });
  return dir;
};

export const getJobDir = (jobId: string) => {
  return path.join(STORAGE_ROOT, jobId);
};

export const sanitizeBaseName = (filename: string) => {
  const base = path.parse(filename).name || "image";
  return base.replace(/[^a-zA-Z0-9-_]+/g, "_");
};

export const getInputPath = (jobId: string, originalName: string) => {
  const ext = path.extname(originalName) || ".jpg";
  return path.join(getJobDir(jobId), `input${ext}`);
};

export const getOutputInfo = (jobId: string, originalName: string, extOverride?: string) => {
  const base = sanitizeBaseName(originalName);
  const ext = extOverride ?? path.extname(originalName) ?? ".jpg";
  const filename = `${base}_compressed${ext}`;
  const outputPath = path.join(getJobDir(jobId), filename);
  return { outputPath, outputFilename: filename };
};
