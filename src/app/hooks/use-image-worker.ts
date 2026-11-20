/** React hook for concurrent, cancellable image worker requests. */
import { useState, useCallback, useEffect, useRef } from "react";
import { imageWorkerClient } from "@/lib/image-worker-client";
import type { WorkerTaskType, WorkerRequest } from "@/workers/image.worker";

export interface UseImageWorkerReturn {
  processImage: (
    type: WorkerTaskType,
    file: File,
    options?: WorkerRequest["options"],
    signal?: AbortSignal,
  ) => Promise<Blob | null>;
  isProcessing: boolean;
  error: string | null;
  clearError: () => void;
  cancelAll: () => void;
}

export function useImageWorker(): UseImageWorkerReturn {
  const [activeCount, setActiveCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);
  const controllers = useRef(new Set<AbortController>());
  const latestRequest = useRef(0);

  useEffect(() => {
    mounted.current = true;
    const currentControllers = controllers.current;
    return () => {
      mounted.current = false;
      latestRequest.current++;
      for (const controller of currentControllers) controller.abort();
      currentControllers.clear();
    };
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const cancelAll = useCallback(() => {
    latestRequest.current++;
    for (const controller of controllers.current) controller.abort();
    controllers.current.clear();
    if (mounted.current) {
      setActiveCount(0);
      setError(null);
    }
  }, []);

  const processImage = useCallback(async (
    type: WorkerTaskType,
    file: File,
    options: WorkerRequest["options"] = {},
    signal?: AbortSignal,
  ): Promise<Blob | null> => {
    if (signal?.aborted) return null;
    const controller = new AbortController();
    const requestId = ++latestRequest.current;
    const forwardAbort = () => controller.abort();
    signal?.addEventListener("abort", forwardAbort, { once: true });
    if (signal?.aborted) controller.abort();
    controllers.current.add(controller);
    if (mounted.current) {
      setActiveCount((count) => count + 1);
      setError(null);
    }
    try {
      const blob = await imageWorkerClient.process(type, file, options, controller.signal);
      return controller.signal.aborted || !mounted.current ? null : blob;
    } catch (err) {
      if (!controller.signal.aborted && mounted.current && requestId === latestRequest.current) {
        setError(err instanceof Error ? err.message : "Processing failed");
      }
      return null;
    } finally {
      signal?.removeEventListener("abort", forwardAbort);
      controllers.current.delete(controller);
      if (mounted.current) setActiveCount((count) => Math.max(0, count - 1));
    }
  }, []);

  return { processImage, isProcessing: activeCount > 0, error, clearError, cancelAll };
}
