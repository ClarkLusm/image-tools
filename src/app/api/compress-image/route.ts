import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { compressQueue } from "@/queues/compress-queue";
import { ensureJobDir, getInputPath } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clampQuality = (value: number) => {
  if (Number.isNaN(value)) return 80;
  return Math.max(1, Math.min(100, Math.round(value)));
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");
  const qualityRaw = formData.get("quality");
  const targetSizeRaw = formData.get("targetSizeKB");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file upload." }, { status: 400 });
  }

  const quality = clampQuality(Number(qualityRaw));
  const targetSizeKB = Number(targetSizeRaw);
  const targetSize =
    Number.isFinite(targetSizeKB) && targetSizeKB > 0
      ? Math.round(targetSizeKB)
      : undefined;
  const jobId = randomUUID();

  await ensureJobDir(jobId);
  const inputPath = getInputPath(jobId, file.name);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(inputPath, buffer);

  const job = await compressQueue.add(
    "compress",
      {
        id: jobId,
        inputPath,
        originalName: file.name,
        mimeType: file.type || "image/jpeg",
        quality,
        targetSizeKB: targetSize,
      },
    {
      jobId,
      removeOnComplete: false,
      removeOnFail: false,
    }
  );

  return NextResponse.json({ jobId: job.id });
}
