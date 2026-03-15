import { NextResponse } from "next/server";
import { compressQueue } from "@/queues/compress-queue";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const job = await compressQueue.getJob(id);

  if (!job) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }

  const status = await job.getState();
  const progress = typeof job.progress === "number" ? job.progress : 0;

  const payload: Record<string, unknown> = {
    id,
    status,
    progress,
  };

  if (status === "failed") {
    payload.error = job.failedReason ?? "Job failed.";
  }

  if (status === "completed") {
    payload.downloadUrl = `/api/jobs/${id}/download`;
    if (job.returnvalue && typeof job.returnvalue === "object") {
      const { outputFilename, outputSize, mimeType } = job.returnvalue as {
        outputFilename?: string;
        outputSize?: number;
        mimeType?: string;
      };
      payload.result = { outputFilename, outputSize, mimeType };
    }
  }

  return NextResponse.json(payload);
}
