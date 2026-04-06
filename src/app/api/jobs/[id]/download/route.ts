import { NextResponse } from "next/server";
import { getCompressQueue } from "@/queues/compress-queue";
import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { Readable } from "stream";
import { debugLog } from "@/lib/debug";
import { isRedisConnectionError } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const compressQueue = getCompressQueue();
    const job = await compressQueue.getJob(id);

    if (!job) {
      debugLog("api:jobs:download", "Job not found", { id });
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    const status = await job.getState();
    if (status !== "completed") {
      debugLog("api:jobs:download", "Job not completed", { id, status });
      return NextResponse.json(
        { error: "Job is not completed yet." },
        { status: 409 }
      );
    }

    const result = job.returnvalue as
      | { outputPath?: string; outputFilename?: string; mimeType?: string }
      | undefined;

    if (!result?.outputPath) {
      debugLog("api:jobs:download", "Missing output path", { id });
      return NextResponse.json(
        { error: "Result file unavailable." },
        { status: 500 }
      );
    }

    const fileStat = await stat(result.outputPath);
    const stream = createReadStream(result.outputPath);
    const filename = result.outputFilename ?? "compressed-image";
    const mimeType = result.mimeType ?? "application/octet-stream";
    debugLog("api:jobs:download", "Streaming file", {
      id,
      filename,
      mimeType,
      size: fileStat.size,
    });

    return new NextResponse(
      Readable.toWeb(stream) as unknown as ReadableStream,
      {
        headers: {
          "Content-Type": mimeType,
          "Content-Length": fileStat.size.toString(),
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      }
    );
  } catch (error) {
    if (isRedisConnectionError(error)) {
      return NextResponse.json(
        {
          error:
            "Compression download is temporarily unavailable. Redis is not reachable.",
        },
        { status: 503 }
      );
    }

    throw error;
  }
}
