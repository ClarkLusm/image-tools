import { NextResponse } from "next/server";
import { compressQueue } from "@/queues/compress-queue";
import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { Readable } from "stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const job = await compressQueue.getJob(id);

  if (!job) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }

  const status = await job.getState();
  if (status !== "completed") {
    return NextResponse.json(
      { error: "Job is not completed yet." },
      { status: 409 }
    );
  }

  const result = job.returnvalue as
    | { outputPath?: string; outputFilename?: string; mimeType?: string }
    | undefined;

  if (!result?.outputPath) {
    return NextResponse.json(
      { error: "Result file unavailable." },
      { status: 500 }
    );
  }

  const fileStat = await stat(result.outputPath);
  const stream = createReadStream(result.outputPath);
  const filename = result.outputFilename ?? "compressed-image";
  const mimeType = result.mimeType ?? "application/octet-stream";

  return new NextResponse(Readable.toWeb(stream) as unknown as ReadableStream, {
    headers: {
      "Content-Type": mimeType,
      "Content-Length": fileStat.size.toString(),
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
