import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const API = "https://api.example.test/v1";

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });
}

describe("image-tools-api client", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Fresh module per test: job tokens live in module state.
    vi.resetModules();
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const loadClient = () => import("./image-tools-api");

  it("creates a job and sends its access token on later requests", async () => {
    const client = await loadClient();
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ id: "job-1", accessToken: "tok/+=" }))
      .mockResolvedValueOnce(jsonResponse({ id: "job-1", status: "running", progress: 35 }));

    const jobId = await client.createUpscaleJob(new File(["x"], "a.png"), {
      scale: 4,
    });
    await client.getImageToolsJob(jobId);

    expect(jobId).toBe("job-1");
    const [createUrl, createInit] = fetchMock.mock.calls[0];
    expect(createUrl).toBe(`${API}/image-tools/ai/super-resolution`);
    expect(createInit.method).toBe("POST");
    expect((createInit.body as FormData).get("scale")).toBe("4");

    const [getUrl, getInit] = fetchMock.mock.calls[1];
    expect(getUrl).toBe(`${API}/image-tools/jobs/job-1`);
    expect(getInit.headers["x-job-token"]).toBe("tok/+=");
  });

  it("adds the job token to download URLs and leaves other URLs alone", async () => {
    const client = await loadClient();
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: "job-2", accessToken: "secret token" }));
    await client.createDeepCompressionJob([new File(["x"], "a.jpg")], { quality: 70 });

    expect(
      client.resolveImageToolsAssetUrl("/image-tools/jobs/job-2/files/out.jpg"),
    ).toBe(`${API}/image-tools/jobs/job-2/files/out.jpg?token=secret%20token`);
    expect(
      client.resolveImageToolsAssetUrl(`${API}/image-tools/jobs/job-2/files/out.jpg?token=x`),
    ).toBe(`${API}/image-tools/jobs/job-2/files/out.jpg?token=x`);
    expect(client.resolveImageToolsAssetUrl("/image-tools/jobs/other/files/a.jpg")).toBe(
      `${API}/image-tools/jobs/other/files/a.jpg`,
    );
    expect(client.resolveImageToolsAssetUrl("/v1/image-tools/capabilities")).toBe(
      `${API}/image-tools/capabilities`,
    );
  });

  it("surfaces API error messages", async () => {
    const client = await loadClient();
    fetchMock.mockResolvedValueOnce(
      jsonResponse(
        { message: "The server is busy processing other images." },
        { status: 503 },
      ),
    );

    await expect(
      client.createFormatConversionJob(new File(["x"], "a.png"), {
        targetFormat: "webp",
      }),
    ).rejects.toThrow("The server is busy processing other images.");
  });

  it("rejects responses without a job id", async () => {
    const client = await loadClient();
    fetchMock.mockResolvedValueOnce(jsonResponse({}));

    await expect(client.createConvertToSvgJob(new File(["x"], "a.png"))).rejects.toThrow(
      "Missing job id",
    );
  });

  it("refuses to treat an HTML error page as a downloaded image", async () => {
    const client = await loadClient();
    fetchMock.mockResolvedValueOnce(
      new Response("<html></html>", { headers: { "content-type": "text/html" } }),
    );

    await expect(
      client.downloadImageToolsArtifact("/image-tools/jobs/j/files/a.png"),
    ).rejects.toThrow("non-image response");
  });

  it("resolves deep-compression results from items or artifacts", async () => {
    const client = await loadClient();

    expect(
      client.resolveDeepCompressionResults({
        id: "j",
        status: "completed",
        progress: 100,
        output: {
          items: [
            { index: 1, status: "failed", error: "bad" },
            { index: 0, status: "completed", compressedUrl: "/a.jpg", actualSizeKb: 12 },
          ],
        },
      }),
    ).toEqual([
      expect.objectContaining({ index: 0, status: "completed", downloadUrl: "/a.jpg", actualSizeKb: 12 }),
      expect.objectContaining({ index: 1, status: "failed", error: "bad" }),
    ]);

    expect(
      client.resolveDeepCompressionDownloadUrls({
        id: "j",
        status: "completed",
        progress: 100,
        output: { temporaryArtifacts: [{ downloadUrl: "/x.jpg" }, {}] },
      }),
    ).toEqual(["/x.jpg"]);
  });

  it("picks the preferred output URL for single-file jobs", async () => {
    const client = await loadClient();
    const job = {
      id: "j",
      status: "completed" as const,
      progress: 100,
      output: {
        enhancedUrl: "/enhanced.png",
        temporaryArtifacts: [{ downloadUrl: "/fallback.png" }],
      },
    };

    expect(client.resolveSingleJobDownloadUrl(job, ["cutoutUrl", "enhancedUrl"])).toBe(
      "/enhanced.png",
    );
    expect(client.resolveSingleJobDownloadUrl(job, ["cutoutUrl"])).toBe("/fallback.png");
  });
});
