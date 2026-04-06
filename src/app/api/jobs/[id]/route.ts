import { NextResponse } from "next/server";
import { getCompressQueue } from "@/queues/compress-queue";
import { debugLog } from "@/lib/debug";
import { isRedisConnectionError } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const compressQueue = getCompressQueue();
    const job = await compressQueue.getJob(id);

    if (!job) {
      debugLog("api:jobs", "Job not found", { id });
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
      debugLog("api:jobs", "Job failed", { id, reason: payload.error });
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
      debugLog("api:jobs", "Job completed", { id, result: payload.result });
    }

    return NextResponse.json(payload);
  } catch (error) {
    if (isRedisConnectionError(error)) {
      return NextResponse.json(
        {
          error:
            "Compression status is temporarily unavailable. Redis is not reachable.",
        },
        { status: 503 }
      );
    }

    throw error;
  }
}
