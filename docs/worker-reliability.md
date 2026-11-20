# Worker reliability and deployment safeguards

This branch is based on `main` and is independent of the UI/UX branch.

## Image worker

- Request IDs route responses to the correct Promise.
- Image decoding is checked against abort signals and worker generations before dispatch.
- Requests support `AbortSignal` as the fourth argument to `imageWorkerClient.process` and `useImageWorker().processImage`.
- The hook exposes `cancelAll()` and tracks concurrent requests with an active count.
- Worker errors, message decoding errors, termination and 120-second timeouts reject pending requests.
- Worker-owned `ImageBitmap` instances are closed in `finally`; untransferred main-thread bitmaps are closed after dispatch failures.
- Encoded Blob MIME is checked against the requested supported output type; unsupported formats fail rather than silently producing a mislabeled file.
- Download Object URLs are revoked after a delay.

**Cancellation semantics:** cancelling a request discards its result on the client; a CPU-intensive operation already running inside the worker may continue until it finishes. The timeout terminates and restarts the shared worker, rejecting all pending requests. Callers requiring latest-only results should abort their prior request explicitly.

## Deployment

- `GET /api/health` returns `{"status":"ok"}` with no-store caching.
- `scripts/deploy-artifact.sh` waits for readiness on `HEALTHCHECK_URL` (default `http://127.0.0.1:$PORT/api/health`) after PM2 reload.
- On failure, the script restores the prior release symlink and reloads PM2; the failed deployment exits nonzero.
- `HEALTHCHECK_ATTEMPTS` defaults to 20, with two seconds between checks.
- A successful health response proves the frontend server responds, **not** that the separate image API is healthy.

## Verification before merge

1. Run `pnpm install --frozen-lockfile && pnpm lint && pnpm build` with the required build environment variables.
2. Test simultaneous conversions and verify `isProcessing` remains true until the last request settles.
3. Abort during image decoding and during processing; confirm no stale UI updates or unresolved Promise.
4. Verify PNG, JPEG and WebP output MIME and intentionally unsupported MIME errors.
5. Run a large image and simulate worker crash, timeout and repeated cancellation; monitor memory.
6. Deploy to staging, verify `/api/health`, then simulate an unhealthy release and confirm rollback.
7. Add automated unit/integration tests around worker message routing, abort, crash and MIME handling before merging.

No build, browser test or production deploy has been executed as part of these GitHub file edits.
