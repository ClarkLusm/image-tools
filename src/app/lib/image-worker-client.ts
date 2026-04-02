/**
 * Singleton client for the image processing Web Worker.
 *
 * Creates the worker once, routes requests by ID, and returns Promises —
 * so callers can await results just like a normal async function.
 */

import type { WorkerRequest, WorkerResponse, WorkerTaskType } from "@/workers/image.worker";
import { debugLog } from "@/lib/debug";

type PendingResolver = {
  resolve: (blob: Blob) => void;
  reject: (err: Error) => void;
};

class ImageWorkerClient {
  private worker: Worker | null = null;
  private pending = new Map<string, PendingResolver>();
  private idCounter = 0;

  private getWorker(): Worker {
    if (!this.worker) {
      debugLog("client-worker", "Initializing image.worker.ts");
      this.worker = new Worker(
        new URL("../workers/image.worker.ts", import.meta.url),
        { type: "module" }
      );

      this.worker.addEventListener("message", (event: MessageEvent<WorkerResponse>) => {
        const { id, blob, error } = event.data;
        const handlers = this.pending.get(id);
        if (!handlers) return;

        this.pending.delete(id);

        if (error) {
          debugLog("client-worker", "Task failed", { id, error });
          handlers.reject(new Error(error));
        } else if (blob) {
          debugLog("client-worker", "Task completed", {
            id,
            size: blob.size,
            type: blob.type,
          });
          handlers.resolve(blob);
        } else {
          handlers.reject(new Error("Worker returned no blob and no error"));
        }
      });

      this.worker.addEventListener("error", (event) => {
        const msg = event.message ?? "Unknown worker error";
        debugLog("client-worker", "Worker crashed", { message: msg });
        this.pending.forEach(({ reject }) => reject(new Error(msg)));
        this.pending.clear();
        this.worker = null;
      });
    }

    return this.worker;
  }

  async process(
    type: WorkerTaskType,
    file: File,
    options: WorkerRequest["options"] = {}
  ): Promise<Blob> {
    const worker = this.getWorker();
    const id = `${type}-${++this.idCounter}-${Date.now()}`;
    debugLog("client-worker", "Queue task", {
      id,
      type,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    const bitmap = await createImageBitmap(file);

    return new Promise<Blob>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });

      const request: WorkerRequest = { id, type, bitmap, options };

      worker.postMessage(request, [bitmap]);
    });
  }

  terminate() {
    this.worker?.terminate();
    this.worker = null;
    this.pending.forEach(({ reject }) => reject(new Error("Worker terminated")));
    this.pending.clear();
  }
}

export const imageWorkerClient = new ImageWorkerClient();
