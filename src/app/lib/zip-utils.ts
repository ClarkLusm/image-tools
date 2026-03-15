import { downloadBlob } from "@/lib/image-utils";

export type ZipItem = {
  filename: string;
  blob: Blob;
};

export const downloadZip = async (items: ZipItem[], zipName: string) => {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  items.forEach((item) => {
    zip.file(item.filename, item.blob);
  });
  const blob = await zip.generateAsync({ type: "blob" });
  downloadBlob(blob, zipName);
};
