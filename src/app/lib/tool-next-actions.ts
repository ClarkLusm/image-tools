import type { ToolNextActionItem } from "@/app/components/tools/tool-next-actions";
import type { SupportedLanguage } from "@/app/lib/i18n-config";
import {
  FileImage,
  FileType,
  Maximize2,
  Scissors,
  ShieldCheck,
  Sparkles,
  VectorSquare,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";

type ActionKey =
  | "compress"
  | "resize"
  | "crop"
  | "upscale"
  | "removeBackground"
  | "removeMetadata"
  | "convertPng"
  | "convertJpg"
  | "convertWebp"
  | "convertSvg";

export type ToolNextActionPreset =
  | "resize-image"
  | "compress-image"
  | "target-compress"
  | "crop-image"
  | "remove-background"
  | "remove-metadata"
  | "upscale-image"
  | "social-resize"
  | "convert-to-png"
  | "convert-to-jpg"
  | "convert-to-webp"
  | "convert-to-svg";

type ActionMeta = {
  href: string;
  icon: LucideIcon;
};

type LocalizedAction = {
  title: string;
  description: string;
};

type NextActionBlock = {
  title: string;
  description: string;
  keys: ActionKey[];
};

export type ToolNextActionsContent = {
  title: string;
  description: string;
  items: ToolNextActionItem[];
};

const actionMeta = {
  compress: { href: "/compress-image", icon: Zap },
  resize: { href: "/resize-image", icon: Maximize2 },
  crop: { href: "/crop-image", icon: Scissors },
  upscale: { href: "/upscale-image", icon: Sparkles },
  removeBackground: { href: "/remove-background", icon: Wand2 },
  removeMetadata: { href: "/remove-metadata", icon: ShieldCheck },
  convertPng: { href: "/convert-to-png", icon: FileImage },
  convertJpg: { href: "/convert-to-jpg", icon: FileType },
  convertWebp: { href: "/convert-to-webp", icon: FileImage },
  convertSvg: { href: "/convert-to-svg", icon: VectorSquare },
} satisfies Record<ActionKey, ActionMeta>;

const localizedActions = {
  en: {
    compress: {
      title: "Compress Image",
      description: "Reduce file weight for web, email, upload limits, and sharing.",
    },
    resize: {
      title: "Resize Image",
      description: "Set exact dimensions before publishing, uploading, or sending.",
    },
    crop: {
      title: "Crop Image",
      description: "Refine framing and remove extra space around the subject.",
    },
    upscale: {
      title: "Upscale Image",
      description: "Enhance low-resolution images before reuse or publishing.",
    },
    removeBackground: {
      title: "Remove Background",
      description: "Create a cleaner subject cutout for products and social assets.",
    },
    removeMetadata: {
      title: "Remove Metadata",
      description: "Strip EXIF, GPS, and hidden camera details before sharing.",
    },
    convertPng: {
      title: "Convert to PNG",
      description: "Export crisp graphics and transparent-friendly image files.",
    },
    convertJpg: {
      title: "Convert to JPG",
      description: "Create lightweight photo files with broad compatibility.",
    },
    convertWebp: {
      title: "Convert to WebP",
      description: "Use a modern web format that often stays sharp and small.",
    },
    convertSvg: {
      title: "Convert to SVG",
      description: "Trace simple graphics into scalable vector-style output.",
    },
  },
  vi: {
    compress: {
      title: "Nén ảnh",
      description: "Giảm dung lượng cho web, email, giới hạn upload và chia sẻ.",
    },
    resize: {
      title: "Đổi kích thước ảnh",
      description: "Đặt kích thước chính xác trước khi đăng, upload hoặc gửi.",
    },
    crop: {
      title: "Cắt ảnh",
      description: "Căn lại bố cục và loại bỏ khoảng thừa quanh chủ thể.",
    },
    upscale: {
      title: "Phóng to ảnh AI",
      description: "Tăng chất lượng ảnh độ phân giải thấp trước khi sử dụng lại.",
    },
    removeBackground: {
      title: "Xóa nền",
      description: "Tạo ảnh chủ thể sạch hơn cho sản phẩm và nội dung social.",
    },
    removeMetadata: {
      title: "Xóa metadata",
      description: "Gỡ EXIF, GPS và thông tin camera ẩn trước khi chia sẻ.",
    },
    convertPng: {
      title: "Đổi sang PNG",
      description: "Xuất đồ họa sắc nét và file thân thiện với nền trong suốt.",
    },
    convertJpg: {
      title: "Đổi sang JPG",
      description: "Tạo file ảnh chụp nhẹ và tương thích rộng.",
    },
    convertWebp: {
      title: "Đổi sang WebP",
      description: "Dùng định dạng web hiện đại, thường sắc nét và nhẹ hơn.",
    },
    convertSvg: {
      title: "Đổi sang SVG",
      description: "Trace đồ họa đơn giản thành output dạng vector dễ phóng to.",
    },
  },
  de: {
    compress: {
      title: "Bild komprimieren",
      description: "Reduziere Dateigröße für Web, E-Mail, Upload-Limits und Teilen.",
    },
    resize: {
      title: "Bildgröße ändern",
      description: "Setze exakte Maße vor Veröffentlichung, Upload oder Versand.",
    },
    crop: {
      title: "Bild zuschneiden",
      description: "Verbessere den Bildausschnitt und entferne unnötige Ränder.",
    },
    upscale: {
      title: "Bild hochskalieren",
      description: "Verbessere niedrig aufgelöste Bilder vor Wiederverwendung.",
    },
    removeBackground: {
      title: "Hintergrund entfernen",
      description: "Erstelle saubere Freisteller für Produkte und Social Assets.",
    },
    removeMetadata: {
      title: "Metadaten entfernen",
      description: "Entferne EXIF, GPS und versteckte Kameradaten vor dem Teilen.",
    },
    convertPng: {
      title: "In PNG konvertieren",
      description: "Exportiere klare Grafiken und transparente Bilddateien.",
    },
    convertJpg: {
      title: "In JPG konvertieren",
      description: "Erstelle leichte Fotodateien mit breiter Kompatibilität.",
    },
    convertWebp: {
      title: "In WebP konvertieren",
      description: "Nutze ein modernes Webformat, das oft scharf und klein bleibt.",
    },
    convertSvg: {
      title: "In SVG konvertieren",
      description: "Wandle einfache Grafiken in skalierbare Vektor-Ausgaben um.",
    },
  },
} satisfies Record<SupportedLanguage, Record<ActionKey, LocalizedAction>>;

const ctaByLanguage = {
  en: "Open tool",
  vi: "Mở công cụ",
  de: "Tool öffnen",
} satisfies Record<SupportedLanguage, string>;

const blocks = {
  en: {
    "resize-image": {
      title: "What to do after resizing?",
      description:
        "Use the resized image as a cleaner source, then reduce file weight, enhance quality, or convert it for the final upload.",
      keys: ["compress", "upscale", "convertWebp", "convertJpg", "convertPng"],
    },
    "compress-image": {
      title: "What to do after compressing?",
      description:
        "Once the file is lighter, prepare it for the exact channel with resizing, format conversion, or privacy cleanup.",
      keys: ["resize", "convertWebp", "convertJpg", "removeMetadata", "crop"],
    },
    "target-compress": {
      title: "Need a better result?",
      description:
        "If the target file size is too strict, resize, crop, or convert the image before compressing again.",
      keys: ["resize", "crop", "convertJpg", "convertWebp", "compress"],
    },
    "crop-image": {
      title: "What to do after cropping?",
      description:
        "A good crop fixes composition. Next, match exact dimensions, reduce file size, or prepare the image for social platforms.",
      keys: ["resize", "compress", "convertWebp", "removeBackground", "upscale"],
    },
    "remove-background": {
      title: "What to do after removing the background?",
      description:
        "Turn the cutout into a reusable asset by exporting PNG, cropping, resizing, or optimizing the final file.",
      keys: ["convertPng", "crop", "resize", "compress", "upscale"],
    },
    "remove-metadata": {
      title: "What to do after cleaning metadata?",
      description:
        "After privacy cleanup, make the image lighter, resize it, or convert it for the place where you will share it.",
      keys: ["compress", "resize", "convertJpg", "convertPng", "convertWebp"],
    },
    "upscale-image": {
      title: "What to do after upscaling?",
      description:
        "AI upscaling gives you a cleaner source. Finish it with compression, cropping, resizing, or format conversion.",
      keys: ["compress", "crop", "resize", "convertPng", "removeBackground"],
    },
    "social-resize": {
      title: "Ready to publish?",
      description:
        "After social resizing, compress the file, convert the format, or reuse the same image for another platform.",
      keys: ["compress", "convertJpg", "convertWebp", "resize", "crop"],
    },
    "convert-to-png": {
      title: "What to do after converting to PNG?",
      description:
        "Use the PNG result as a clean asset, then compress, resize, crop, or clean metadata before publishing.",
      keys: ["compress", "resize", "crop", "removeMetadata", "upscale"],
    },
    "convert-to-jpg": {
      title: "What to do after converting to JPG?",
      description:
        "JPG is practical for photos. Next, compress, resize, crop, or clean metadata before publishing.",
      keys: ["compress", "resize", "crop", "removeMetadata", "upscale"],
    },
    "convert-to-webp": {
      title: "What to do after converting to WebP?",
      description:
        "WebP is great for modern web delivery. Next, resize, compress, crop, or clean metadata before publishing.",
      keys: ["resize", "compress", "crop", "removeMetadata", "upscale"],
    },
    "convert-to-svg": {
      title: "What to do after converting to SVG?",
      description:
        "Use SVG for scalable graphics, or keep refining the source with compression, resizing, cropping, and cleanup.",
      keys: ["compress", "resize", "crop", "removeBackground", "upscale"],
    },
  },
  vi: {
    "resize-image": {
      title: "Sau khi resize ảnh thì nên làm gì?",
      description:
        "Dùng ảnh đã resize như bản nguồn gọn hơn, rồi nén dung lượng, tăng chất lượng hoặc đổi định dạng trước khi upload.",
      keys: ["compress", "upscale", "convertWebp", "convertJpg", "convertPng"],
    },
    "compress-image": {
      title: "Sau khi nén ảnh thì nên làm gì?",
      description:
        "Khi file đã nhẹ hơn, hãy chuẩn bị ảnh cho đúng kênh bằng resize, đổi định dạng hoặc xóa metadata.",
      keys: ["resize", "convertWebp", "convertJpg", "removeMetadata", "crop"],
    },
    "target-compress": {
      title: "Cần kết quả tốt hơn?",
      description:
        "Nếu mức dung lượng mục tiêu quá chặt, hãy resize, crop hoặc đổi định dạng trước khi nén lại.",
      keys: ["resize", "crop", "convertJpg", "convertWebp", "compress"],
    },
    "crop-image": {
      title: "Sau khi cắt ảnh thì nên làm gì?",
      description:
        "Crop tốt sẽ sửa bố cục. Tiếp theo, hãy đặt kích thước chính xác, giảm dung lượng hoặc chuẩn bị ảnh cho social.",
      keys: ["resize", "compress", "convertWebp", "removeBackground", "upscale"],
    },
    "remove-background": {
      title: "Sau khi xóa nền thì nên làm gì?",
      description:
        "Biến ảnh tách nền thành asset dễ dùng bằng cách xuất PNG, crop, resize hoặc tối ưu dung lượng.",
      keys: ["convertPng", "crop", "resize", "compress", "upscale"],
    },
    "remove-metadata": {
      title: "Sau khi xóa metadata thì nên làm gì?",
      description:
        "Sau khi làm sạch quyền riêng tư, hãy nén, resize hoặc đổi định dạng ảnh cho nơi bạn sắp chia sẻ.",
      keys: ["compress", "resize", "convertJpg", "convertPng", "convertWebp"],
    },
    "upscale-image": {
      title: "Sau khi upscale ảnh thì nên làm gì?",
      description:
        "Upscale AI tạo bản nguồn rõ hơn. Hãy hoàn thiện bằng nén, crop, resize hoặc đổi định dạng.",
      keys: ["compress", "crop", "resize", "convertPng", "removeBackground"],
    },
    "social-resize": {
      title: "Sẵn sàng đăng chưa?",
      description:
        "Sau khi resize cho social, hãy nén file, đổi định dạng hoặc dùng lại ảnh cho nền tảng khác.",
      keys: ["compress", "convertJpg", "convertWebp", "resize", "crop"],
    },
    "convert-to-png": {
      title: "Sau khi đổi sang PNG thì nên làm gì?",
      description:
        "Dùng PNG như asset sạch hơn, rồi nén, resize, crop hoặc xóa metadata trước khi đăng.",
      keys: ["compress", "resize", "crop", "removeMetadata", "upscale"],
    },
    "convert-to-jpg": {
      title: "Sau khi đổi sang JPG thì nên làm gì?",
      description:
        "JPG rất hợp với ảnh chụp. Tiếp theo, hãy nén, resize, crop hoặc xóa metadata trước khi đăng.",
      keys: ["compress", "resize", "crop", "removeMetadata", "upscale"],
    },
    "convert-to-webp": {
      title: "Sau khi đổi sang WebP thì nên làm gì?",
      description:
        "WebP rất tốt cho web hiện đại. Tiếp theo, hãy resize, nén, crop hoặc xóa metadata trước khi đăng.",
      keys: ["resize", "compress", "crop", "removeMetadata", "upscale"],
    },
    "convert-to-svg": {
      title: "Sau khi đổi sang SVG thì nên làm gì?",
      description:
        "Dùng SVG cho đồ họa dễ phóng to, hoặc tiếp tục tinh chỉnh ảnh nguồn bằng nén, resize, crop và cleanup.",
      keys: ["compress", "resize", "crop", "removeBackground", "upscale"],
    },
  },
  de: {
    "resize-image": {
      title: "Was kommt nach dem Skalieren?",
      description:
        "Nutze das skalierte Bild als saubere Quelle und komprimiere, verbessere oder konvertiere es für den finalen Upload.",
      keys: ["compress", "upscale", "convertWebp", "convertJpg", "convertPng"],
    },
    "compress-image": {
      title: "Was kommt nach dem Komprimieren?",
      description:
        "Wenn die Datei leichter ist, bereite sie mit Skalierung, Konvertierung oder Datenschutz-Cleanup für den Zielkanal vor.",
      keys: ["resize", "convertWebp", "convertJpg", "removeMetadata", "crop"],
    },
    "target-compress": {
      title: "Brauchst du ein besseres Ergebnis?",
      description:
        "Wenn das Ziel zu streng ist, skaliere, schneide oder konvertiere das Bild vor dem nächsten Komprimieren.",
      keys: ["resize", "crop", "convertJpg", "convertWebp", "compress"],
    },
    "crop-image": {
      title: "Was kommt nach dem Zuschneiden?",
      description:
        "Ein guter Zuschnitt verbessert die Komposition. Danach kannst du Maße setzen, komprimieren oder Social-Ausgaben vorbereiten.",
      keys: ["resize", "compress", "convertWebp", "removeBackground", "upscale"],
    },
    "remove-background": {
      title: "Was kommt nach dem Entfernen des Hintergrunds?",
      description:
        "Mache den Freisteller wiederverwendbar, indem du PNG exportierst, zuschneidest, skalierst oder optimierst.",
      keys: ["convertPng", "crop", "resize", "compress", "upscale"],
    },
    "remove-metadata": {
      title: "Was kommt nach dem Bereinigen der Metadaten?",
      description:
        "Nach dem Datenschutz-Cleanup kannst du das Bild komprimieren, skalieren oder für den Zielkanal konvertieren.",
      keys: ["compress", "resize", "convertJpg", "convertPng", "convertWebp"],
    },
    "upscale-image": {
      title: "Was kommt nach dem Hochskalieren?",
      description:
        "KI-Upscaling liefert eine bessere Quelle. Schließe mit Komprimieren, Zuschneiden, Skalieren oder Konvertieren ab.",
      keys: ["compress", "crop", "resize", "convertPng", "removeBackground"],
    },
    "social-resize": {
      title: "Bereit zum Veröffentlichen?",
      description:
        "Nach dem Social-Resize kannst du komprimieren, konvertieren oder dasselbe Bild für eine andere Plattform nutzen.",
      keys: ["compress", "convertJpg", "convertWebp", "resize", "crop"],
    },
    "convert-to-png": {
      title: "Was kommt nach der PNG-Konvertierung?",
      description:
        "Nutze PNG als sauberes Asset und komprimiere, skaliere, schneide zu oder entferne Metadaten vor dem Veröffentlichen.",
      keys: ["compress", "resize", "crop", "removeMetadata", "upscale"],
    },
    "convert-to-jpg": {
      title: "Was kommt nach der JPG-Konvertierung?",
      description:
        "JPG ist praktisch für Fotos. Danach kannst du komprimieren, skalieren, zuschneiden oder Metadaten entfernen.",
      keys: ["compress", "resize", "crop", "removeMetadata", "upscale"],
    },
    "convert-to-webp": {
      title: "Was kommt nach der WebP-Konvertierung?",
      description:
        "WebP ist stark für moderne Web-Ausgabe. Skaliere, komprimiere, schneide zu oder entferne Metadaten vor dem Veröffentlichen.",
      keys: ["resize", "compress", "crop", "removeMetadata", "upscale"],
    },
    "convert-to-svg": {
      title: "Was kommt nach der SVG-Konvertierung?",
      description:
        "Nutze SVG für skalierbare Grafiken oder verfeinere die Quelle weiter mit Komprimierung, Skalierung, Zuschnitt und Cleanup.",
      keys: ["compress", "resize", "crop", "removeBackground", "upscale"],
    },
  },
} satisfies Record<
  SupportedLanguage,
  Record<ToolNextActionPreset, NextActionBlock>
>;

export function getToolNextActions(
  preset: ToolNextActionPreset,
  languageCode: SupportedLanguage,
): ToolNextActionsContent {
  const cta = ctaByLanguage[languageCode];
  const block = blocks[languageCode][preset];

  return {
    title: block.title,
    description: block.description,
    items: block.keys.map((key) => ({
      ...localizedActions[languageCode][key],
      ...actionMeta[key],
      cta,
    })),
  };
}
