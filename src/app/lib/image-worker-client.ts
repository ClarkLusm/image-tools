/**
 * Request-ID routed image worker client.
 * Decode, dispatch and completion are guarded against cancellation and worker restarts.
 */
import type { WorkerRequest, WorkerResponse, WorkerTaskType } from "@/workers/image.worker";
import { debugLog } from "@/lib/debug";

type PendingTask = {
  resolve: (blob: Blob) => void;
  reject: (error: Error) => void;
  cleanup: () => void;
};

const TASK_TIMEOUT_MS = 120_000;
const abortError = () => new DOMException("Image processing cancelled", "AbortError");

class ImageWorkerClient {
  private worker: Worker | null = null;
  private pending = new Map<string, PendingTask>();
  private idCounter = 0;
  private generation = 0;

  private rejectAll(error: Error) {
    for (const [id, task] of this.pending) {
      this.pending.delete(id);
      task.cleanup();
      task.reject(error);
    }
  }

  private getWorker(): Worker {
    if (this.worker) return this.worker;
    const worker = new Worker(new URL("../workers/image.worker.ts", import.meta.url), { type: "module" });
    this.worker = worker;
    const generation = ++this.generation;
    debugLog("client-worker", "Worker started", { generation });

    worker.addEventListener("message", (event: MessageEvent<WorkerResponse>) => {
      if (this.worker !== worker) return;
      const { id, blob, error } = event.data;
      const task = this.pending.get(id);
      if (!task) return;
      this.pending.delete(id);
      task.cleanup();
      if (error) task.reject(new Error(error));
      else if (blob) task.resolve(blob);
      else task.reject(new Error("Worker returned no result"));
    });

    const crash = (reason: string) => {
      if (this.worker !== worker) return;
      debugLog("client-worker", "Worker failed", { reason });
      worker.terminate();
      this.worker = null;
      this.generation++;
      this.rejectAll(new Error(reason));
    };
    worker.addEventListener("error", (event) => crash(event.message || "Image worker crashed"));
    worker.addEventListener("messageerror", () => crash("Image worker message could not be decoded"));
    return worker;
  }

  async process(
    type: WorkerTaskType,
    file: File,
    options: WorkerRequest["options"] = {},
    signal?: AbortSignal,
  ): Promise<Blob> {
    if (signal?.aborted) throw abortError();
    const worker = this.getWorker();
    const generation = this.generation;
    const id = `${type}-${++this.idCounter}`;
    let bitmap: ImageBitmap | null = null;
    try {
      bitmap = await createImageBitmap(file);
      if (signal?.aborted) throw abortError();
      if (this.worker !== worker || this.generation !== generation) {
        throw new Error("Image worker restarted before dispatch");
      }
      return await new Promise<Blob>((resolve, reject) => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        const onAbort = () => {
          const task = this.pending.get(id);
          if (!task) return;
          this.pending.delete(id);
          task.cleanup();
          task.reject(abortError());
        };
        const cleanup = () => {
          if (timer !== undefined) clearTimeout(timer);
          signal?.removeEventListener("abort", onAbort);
        };
        this.pending.set(id, { resolve, reject, cleanup });
        signal?.addEventListener("abort", onAbort, { once: true });
        timer = setTimeout(() => {
          const task = this.pending.get(id);
          if (!task) return;
          this.pending.delete(id);
          task.cleanup();
          task.reject(new Error("Image processing timed out"));
          // The worker may be blocked; restart to unblock future tasks.
          if (this.worker === worker) this.terminate();
        }, TASK_TIMEOUT_MS);
        if (signal?.aborted) {
          onAbort();
          return;
        }
        try {
          const request: WorkerRequest = { id, type, bitmap: bitmap!, options };
          worker.postMessage(request, [bitmap!]);
          bitmap = null; // Ownership transferred to worker.
        } catch (error) {
          const task = this.pending.get(id);
          if (task) {
            this.pending.delete(id);
            task.cleanup();
            task.reject(error instanceof Error ? error : new Error(String(error)));
          }
        }
      });
    } finally {
      bitmap?.close();
    }
  }

  terminate() {
    this.generation++;
    this.worker?.terminate();
    this.worker = null;
    this.rejectAll(new Error("Image worker terminated"));
  }
}

export const imageWorkerClient = new ImageWorkerClient();
