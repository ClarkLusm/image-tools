/**
 * React hook for off-thread image processing via the image Web Worker.
 *
 * Usage:
 *   const { processImage, isProcessing, error } = useImageWorker();
 *   const blob = await processImage("png-to-jpg", file, { quality: 0.92 });
 */

import { useState, useCallback } from "react";
import { imageWorkerClient } from "@/lib/image-worker-client";
import type { WorkerTaskType, WorkerRequest } from "@/workers/image.worker";

export interface UseImageWorkerReturn {
  processImage: (
    type: WorkerTaskType,
    file: File,
    options?: WorkerRequest["options"]
  ) => Promise<Blob | null>;
  isProcessing: boolean;
  error: string | null;
  clearError: () => void;
}

export function useImageWorker(): UseImageWorkerReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const processImage = useCallback(
    async (
      type: WorkerTaskType,
      file: File,
      options: WorkerRequest["options"] = {}
    ): Promise<Blob | null> => {
      setIsProcessing(true);
      setError(null);

      try {
        const blob = await imageWorkerClient.process(type, file, options);
        return blob;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Processing failed";
        setError(message);
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  return { processImage, isProcessing, error, clearError };
}
