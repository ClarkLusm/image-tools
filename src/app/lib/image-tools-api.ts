type ImageToolsJobArtifact = {
  fileName?: string;
  downloadUrl?: string;
};

export type DeepCompressionOutputItem = {
  index?: number;
  originalName?: string;
  status?: "completed" | "failed";
  compressedUrl?: string | null;
  actualSizeKb?: number | null;
  estimatedSavingsPercent?: number | null;
  error?: string | null;
};

export type ResolvedDeepCompressionItem = {
  index: number;
  originalName?: string;
  status: "completed" | "failed";
  downloadUrl?: string;
  actualSizeKb?: number | null;
  estimatedSavingsPercent?: number | null;
  error?: string | null;
};

export type ImageToolsJob = {
  id: string;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  progress: number;
  error?: string | null;
  output?: {
    items?: DeepCompressionOutputItem[];
    temporaryArtifacts?: ImageToolsJobArtifact[];
    enhancedUrl?: string;
    cutoutUrl?: string;
    resizedUrl?: string;
    convertedUrl?: string;
    protectedUrl?: string;
    sanitizedUrl?: string;
    panoramaUrl?: string;
    animationUrl?: string;
    compressedUrl?: string;
    resultUrl?: string;
  };
};

type WaitForJobOptions = {
  signal?: AbortSignal;
  onUpdate?: (job: ImageToolsJob) => void;
};

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function getApiBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_IMAGE_TOOLS_API_URL?.trim();

  if (!configuredUrl) {
    throw new Error(
      "NEXT_PUBLIC_IMAGE_TOOLS_API_URL is not configured. Set it before building the app (see .env.example).",
    );
  }

  return trimTrailingSlash(configuredUrl);
}

function getCurrentLocale() {
  if (typeof document === "undefined") {
    return "en";
  }

  const locale = document.documentElement.lang.trim().toLowerCase();
  return locale === "vi" || locale === "de" ? locale : "en";
}

function buildApiHeaders(headers?: HeadersInit) {
  return {
    "x-locale": getCurrentLocale(),
    ...headers,
  };
}

function buildApiUrl(path: string) {
  const baseUrl = getApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pathWithoutVersionPrefix =
    baseUrl.endsWith("/v1") && normalizedPath.startsWith("/v1/")
      ? normalizedPath.slice(3)
      : normalizedPath;

  return `${baseUrl}${pathWithoutVersionPrefix}`;
}

/**
 * The API issues a secret `accessToken` per job. It is required to read,
 * stream or download that job, so keep it in memory for the page lifetime.
 */
const jobAccessTokens = new Map<string, string>();
const JOB_PATH_PATTERN = /\/image-tools\/jobs\/([^/?#]+)/;

function getJobAccessToken(jobId: string) {
  return jobAccessTokens.get(jobId);
}

function appendJobToken(url: string) {
  const jobId = url.match(JOB_PATH_PATTERN)?.[1];
  const token = jobId ? getJobAccessToken(decodeURIComponent(jobId)) : undefined;

  if (!token || /[?&]token=/.test(url)) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}token=${encodeURIComponent(token)}`;
}

export function resolveImageToolsAssetUrl(pathOrUrl: string) {
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : buildApiUrl(pathOrUrl);
  return appendJobToken(url);
}

async function submitImageToolsJob(
  path: string,
  formData: FormData,
  fallbackError: string,
) {
  const response = await fetch(buildApiUrl(path), {
    method: "POST",
    body: formData,
    headers: buildApiHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, fallbackError));
  }

  const data = (await response.json()) as {
    id?: string;
    accessToken?: string;
  };

  if (!data.id) {
    throw new Error("Missing job id from image-tools-api.");
  }

  if (data.accessToken) {
    jobAccessTokens.set(data.id, data.accessToken);
  }

  return data.id;
}

async function parseErrorMessage(response: Response, fallback: string) {
  const data = (await response.json().catch(() => null)) as {
    message?: string;
    error?: string;
  } | null;

  return data?.message ?? data?.error ?? fallback;
}

function createAbortError() {
  return new DOMException("Image tools job subscription aborted.", "AbortError");
}

function parseJobEventData(data: string) {
  const parsed = JSON.parse(data) as ImageToolsJob;

  if (!parsed || typeof parsed !== "object" || typeof parsed.id !== "string") {
    throw new Error("Received invalid job payload from image-tools-api.");
  }

  return parsed;
}

export async function createDeepCompressionJob(
  files: File[],
  options: {
    quality?: number;
    targetSizeKb?: number;
  } = {},
) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  if (typeof options.quality === "number") {
    formData.append("quality", String(options.quality));
  }

  if (typeof options.targetSizeKb === "number") {
    formData.append("targetSizeKb", String(options.targetSizeKb));
  }

  return submitImageToolsJob(
    "/image-tools/infrastructure/deep-compression",
    formData,
    "Failed to create compression job.",
  );
}

export async function createFormatConversionJob(
  file: File,
  options: {
    targetFormat: "jpeg" | "png" | "webp" | "avif" | "tiff" | "svg";
    colorSpace?: "srgb" | "display-p3" | "adobe-rgb";
  },
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("targetFormat", options.targetFormat);

  if (options.colorSpace) {
    formData.append("colorSpace", options.colorSpace);
  }

  return submitImageToolsJob(
    "/image-tools/infrastructure/format-conversion",
    formData,
    "Failed to create conversion job.",
  );
}

export async function createConvertToSvgJob(file: File) {
  return createFormatConversionJob(file, {
    targetFormat: "svg",
  });
}

export async function createUpscaleJob(
  file: File,
  options: {
    scale: 2 | 4 | 8;
    faceEnhance?: boolean;
  },
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("scale", String(options.scale));

  if (typeof options.faceEnhance === "boolean") {
    formData.append("faceEnhance", String(options.faceEnhance));
  }

  return submitImageToolsJob(
    "/image-tools/ai/super-resolution",
    formData,
    "Failed to create upscale job.",
  );
}

export async function getImageToolsJob(jobId: string) {
  const token = getJobAccessToken(jobId);
  const response = await fetch(buildApiUrl(`/image-tools/jobs/${jobId}`), {
    cache: "no-store",
    headers: buildApiHeaders(token ? { "x-job-token": token } : undefined),
  });

  if (!response.ok) {
    throw new Error(
      await parseErrorMessage(response, "Failed to check job status."),
    );
  }

  return (await response.json()) as ImageToolsJob;
}

async function waitForImageToolsJobByPolling(
  jobId: string,
  options: WaitForJobOptions = {},
) {
  while (true) {
    if (options.signal?.aborted) {
      throw createAbortError();
    }

    const job = await getImageToolsJob(jobId);
    options.onUpdate?.(job);

    if (job.status === "completed") {
      return job;
    }

    if (job.status === "failed") {
      throw new Error(job.error ?? "Compression failed.");
    }

    if (job.status === "cancelled") {
      throw new Error("Compression job was cancelled.");
    }

    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
}

export async function waitForImageToolsJobCompletion(
  jobId: string,
  options: WaitForJobOptions = {},
) {
  if (typeof window === "undefined" || typeof EventSource === "undefined") {
    return waitForImageToolsJobByPolling(jobId, options);
  }

  return new Promise<ImageToolsJob>((resolve, reject) => {
    if (options.signal?.aborted) {
      reject(createAbortError());
      return;
    }

    const eventSource = new EventSource(
      appendJobToken(buildApiUrl(`/image-tools/jobs/${jobId}/stream`)),
    );

    const cleanup = () => {
      eventSource.close();
      options.signal?.removeEventListener("abort", handleAbort);
    };

    const settle = (callback: () => void) => {
      cleanup();
      callback();
    };

    const handleAbort = () => {
      settle(() => {
        reject(createAbortError());
      });
    };

    options.signal?.addEventListener("abort", handleAbort, { once: true });

    eventSource.onmessage = (event) => {
      let job: ImageToolsJob;

      try {
        job = parseJobEventData(event.data);
      } catch (error) {
        settle(() => {
          reject(
            error instanceof Error
              ? error
              : new Error("Failed to parse SSE job payload."),
          );
        });
        return;
      }

      options.onUpdate?.(job);

      if (job.status === "completed") {
        settle(() => resolve(job));
        return;
      }

      if (job.status === "failed") {
        settle(() => reject(new Error(job.error ?? "Compression failed.")));
        return;
      }

      if (job.status === "cancelled") {
        settle(() => reject(new Error("Compression job was cancelled.")));
      }
    };

    eventSource.onerror = () => {
      cleanup();
      waitForImageToolsJobByPolling(jobId, options).then(resolve).catch(reject);
    };
  });
}

export async function downloadImageToolsArtifact(pathOrUrl: string) {
  const response = await fetch(resolveImageToolsAssetUrl(pathOrUrl), {
    headers: buildApiHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      await parseErrorMessage(response, "Failed to download result file."),
    );
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (
    contentType.startsWith("text/html") ||
    contentType.startsWith("application/json")
  ) {
    throw new Error(
      "The download endpoint returned a non-image response. Please verify the API download route and proxy configuration.",
    );
  }

  return response.blob();
}

export function resolveDeepCompressionResults(
  job: ImageToolsJob,
): ResolvedDeepCompressionItem[] {
  const items = (job.output?.items ?? [])
    .map<ResolvedDeepCompressionItem>((item, index) => ({
      index: typeof item.index === "number" ? item.index : index,
      originalName: item.originalName,
      status: item.status === "failed" ? "failed" : "completed",
      downloadUrl:
        typeof item.compressedUrl === "string" ? item.compressedUrl : undefined,
      actualSizeKb:
        typeof item.actualSizeKb === "number" ? item.actualSizeKb : null,
      estimatedSavingsPercent:
        typeof item.estimatedSavingsPercent === "number"
          ? item.estimatedSavingsPercent
          : null,
      error: typeof item.error === "string" ? item.error : null,
    }))
    .sort((left, right) => left.index - right.index);

  if (items.length > 0) {
    return items;
  }

  return (job.output?.temporaryArtifacts ?? [])
    .map((artifact, index) => ({
      index,
      status: "completed" as const,
      downloadUrl:
        typeof artifact.downloadUrl === "string"
          ? artifact.downloadUrl
          : undefined,
      error: null,
      actualSizeKb: null,
      estimatedSavingsPercent: null,
    }))
    .filter((item) => item.downloadUrl);
}

export function resolveDeepCompressionDownloadUrls(job: ImageToolsJob) {
  return resolveDeepCompressionResults(job)
    .filter((item) => item.status === "completed")
    .map((item) => item.downloadUrl)
    .filter((url): url is string => typeof url === "string");
}

export function resolveSingleJobDownloadUrl(
  job: ImageToolsJob,
  preferredKeys: Array<keyof NonNullable<ImageToolsJob["output"]>>,
) {
  for (const key of preferredKeys) {
    const candidate = job.output?.[key];

    if (typeof candidate === "string") {
      return candidate;
    }
  }

  return (job.output?.temporaryArtifacts ?? [])
    .map((artifact) => artifact.downloadUrl)
    .find((url): url is string => typeof url === "string");
}
