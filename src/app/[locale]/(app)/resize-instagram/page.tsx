import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/app/lib/metadata";

function getPresets(locale: string) {
  const isVietnamese = locale === "vi";
  const isGerman = locale === "de";

  return [
    {
      label: isVietnamese ? "Tin" : isGerman ? "Story" : "Story",
      width: 1080,
      height: 1920,
    },
    {
      label: isVietnamese ? "Vuông" : isGerman ? "Quadrat" : "Square",
      width: 1080,
      height: 1080,
    },
    {
      label: isVietnamese ? "Dọc" : isGerman ? "Hochformat" : "Portrait",
      width: 1080,
      height: 1350,
    },
    {
      label: isVietnamese ? "Ngang" : isGerman ? "Querformat" : "Landscape",
      width: 1080,
      height: 566,
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/resize-instagram",
    title: {
      en: "Resize Instagram Images Online Free - Instagram Size Tool 2026",
      vi: "Resize ảnh Instagram online miễn phí - Công cụ kích thước Instagram 2026",
      de: "Instagram-Bilder online kostenlos skalieren - Instagram-Größentool 2026",
    },
    description: {
      en: "Resize and auto-optimize images for Instagram posts, stories, and reels to reduce blur after upload. Fast, no login, and browser-based.",
      vi: "Resize và tự động tối ưu ảnh cho bài đăng, story và reel Instagram để giảm mờ sau khi upload. Nhanh, không cần đăng nhập và chạy trên trình duyệt.",
      de: "Skaliere und optimiere Bilder für Instagram-Posts, Stories und Reels, um Unschärfe nach dem Upload zu reduzieren. Schnell, ohne Login und direkt im Browser.",
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVietnamese = locale === "vi";
  const isGerman = locale === "de";
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      locale={locale}
      title={
        isVietnamese
          ? "Đổi kích thước ảnh Instagram online"
          : isGerman
            ? "Instagram-Bilder online skalieren"
          : "Resize Instagram Images Online"
      }
      description={
        isVietnamese
          ? "Tải ảnh lên một lần, chọn đúng định dạng và xuất file tối ưu cho Instagram với tùy chọn tự động giảm mờ sau khi nền tảng nén lại."
          : isGerman
            ? "Einmal hochladen, Format wählen und Instagram-fertige Bilder exportieren, mit optionaler Auto-Optimierung gegen Unschärfe nach der Instagram-Komprimierung."
          : "Upload once, pick a format, and export IG-ready images with optional auto-optimization to reduce blur after Instagram compression."
      }
      steps={[
        {
          title: isVietnamese ? "Tải ảnh lên" : isGerman ? "Bild hochladen" : "Upload Image",
          description: isVietnamese
            ? "Thả ảnh nguồn vào và giữ toàn bộ quá trình xử lý ngay trên trình duyệt."
            : isGerman
              ? "Lade dein Quellbild hoch und halte die gesamte Verarbeitung direkt im Browser."
            : "Drop your source image and keep everything browser-side.",
        },
        {
          title: isVietnamese ? "Chọn định dạng Instagram" : isGerman ? "IG-Format wählen" : "Pick IG Format",
          description: isVietnamese
            ? "Chọn ảnh vuông cho feed, ảnh dọc, ảnh ngang hoặc đầu ra cho story/reel."
            : isGerman
              ? "Wähle quadratisches Feed-Format, Hochformat, Querformat oder Story-/Reel-Ausgabe."
            : "Choose feed square, portrait, landscape, or story/reel output.",
        },
        {
          title: isVietnamese ? "Tự động tối ưu" : isGerman ? "Automatisch optimieren" : "Auto Optimize",
          description: isVietnamese
            ? "Bật công cụ tối ưu Instagram để tinh chỉnh JPEG phù hợp hơn với việc Instagram nén lại."
            : isGerman
              ? "Aktiviere die Instagram-Optimierung, um JPEG-Ausgaben besser auf die erneute Instagram-Komprimierung abzustimmen."
            : "Enable Instagram Optimization Engine to tune JPEG output for IG recompression.",
        },
        {
          title: isVietnamese ? "Tải xuống và đăng" : isGerman ? "Herunterladen und veröffentlichen" : "Download and Publish",
          description: isVietnamese
            ? "Xuất tệp cuối cùng và đăng với ít suy giảm chất lượng hơn."
            : isGerman
              ? "Exportiere die finale Datei und veröffentliche sie mit weniger Qualitätsverlust."
            : "Export the final file and post with less quality loss.",
        },
      ]}
      faqs={[
        {
          q: isVietnamese
            ? "Vì sao ảnh Instagram bị mờ dù ảnh gốc vẫn sắc nét?"
            : isGerman
              ? "Warum wirken Instagram-Bilder unscharf, obwohl das Original scharf ist?"
            : "Why do Instagram images look blurry even when the original looks sharp?",
          a: isVietnamese
            ? "Instagram sẽ nén lại nội dung bạn tải lên. Nếu kích thước, định dạng hoặc chất lượng tệp không khớp với đầu ra phổ biến của Instagram, nền tảng có thể giảm kích thước và nén mạnh tay hơn, gây mềm ảnh và xuất hiện lỗi nén."
            : isGerman
              ? "Instagram komprimiert hochgeladene Medien erneut. Wenn Dateimaße, Format oder Qualität nicht zu typischen Instagram-Ausgaben passen, kann die Plattform aggressiver verkleinern und recomprimieren, was zu Unschärfe und Artefakten führt."
            : "Instagram recompresses uploaded media. If your file dimensions, format, or quality are not aligned to common Instagram outputs, IG may downscale and recompress aggressively, which can introduce softness and artifacts."
        },
        {
          q: isVietnamese
            ? "Công cụ sẽ crop hay kéo giãn ảnh của tôi?"
            : isGerman
              ? "Wird mein Bild zugeschnitten oder gestreckt?"
            : "Do you crop or stretch my image?",
          a: isVietnamese
            ? "Quy trình này ưu tiên crop trước. Khi bạn chọn preset, khung crop sẽ khóa theo đúng tỷ lệ Instagram đó để bạn có thể căn lại bố cục trước khi xuất. Sau đó công cụ sẽ crop và resize đúng theo kích thước mục tiêu."
            : isGerman
              ? "Dieser Workflow arbeitet zuerst mit Zuschnitt. Wenn du ein Preset wählst, wird die Crop-Fläche auf das passende Instagram-Seitenverhältnis gesperrt, damit du die Komposition vor dem Export anpassen kannst. Danach wird exakt auf das Zielmaß zugeschnitten und skaliert."
            : "This flow is crop-first. When you choose a preset, the crop guide locks to that Instagram ratio so you can reframe the image before export. The tool then crops and resizes to the exact target dimensions."
        },
        {
          q: isVietnamese
            ? "Tệp của tôi có bị tải lên máy chủ không?"
            : isGerman
              ? "Werden meine Dateien auf einen Server hochgeladen?"
            : "Are my files uploaded to a server?",
          a: isVietnamese
            ? "Không với quy trình này. Resize cho Instagram chạy cục bộ trong trình duyệt bằng image worker, nên vừa nhanh vừa riêng tư mà không cần đăng nhập."
            : isGerman
              ? "Nein, nicht bei diesem Workflow. Das Instagram-Resize läuft lokal in deinem Browser mit unserem Image Worker, dadurch bleibt es schnell und privat ganz ohne Login."
            : "No for this flow. Instagram resize runs locally in your browser using our image worker, which keeps processing fast and private without requiring login."
        },
        {
          q: isVietnamese
            ? "Trên Instagram nên dùng 1080 hay 2048?"
            : isGerman
              ? "Sollte ich auf Instagram 1080 oder 2048 verwenden?"
            : "1080 vs 2048 on Instagram: which one should I use?",
          a: isVietnamese
            ? "Với phần lớn quy trình, đầu ra dựa trên chuẩn 1080 vẫn đáng tin cậy và hiệu quả. Tệp lớn hơn vẫn có thể bị Instagram nén lại và không phải lúc nào cũng cho kết quả nhìn thấy tốt hơn sau khi tải lên."
            : isGerman
              ? "Für die meisten Workflows bleiben 1080-basierte Ausgaben zuverlässig und effizient. Größere Exporte können von Instagram trotzdem erneut komprimiert werden und liefern nach dem Upload nicht immer sichtbar bessere Ergebnisse."
            : "For most workflows, 1080-based outputs are reliable and efficient. Larger exports can still be recompressed by Instagram and do not always produce visibly better results after upload."
        }
      ]}
      relatedTools={[
        { name: isVietnamese ? "Đổi kích thước ảnh" : isGerman ? "Bildgröße ändern" : "Resize Image", path: "/resize-image" },
        { name: isVietnamese ? "Cắt ảnh" : isGerman ? "Bild zuschneiden" : "Crop Image", path: "/crop-image" },
        { name: isVietnamese ? "Nén ảnh" : isGerman ? "Bild komprimieren" : "Compress Image", path: "/compress-image" },
        { name: isVietnamese ? "Tăng độ phân giải ảnh" : isGerman ? "Bild hochskalieren" : "Upscale Image", path: "/upscale-image" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-instagram"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          {
            name: isVietnamese ? "Resize cho Instagram" : isGerman ? "Für Instagram skalieren" : "Resize for Instagram",
            url: `${siteUrl}/resize-instagram`,
          },
        ]}
      />
      <SocialResizeClient
        presets={getPresets(locale)}
        defaultPresetIndex={0}
        instagramOptimization
      />

      <section className="mt-24 space-y-8 bg-card">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            {isVietnamese
              ? "Vì sao chất lượng ảnh Instagram giảm sau khi tải lên"
              : isGerman
                ? "Warum die Instagram-Qualität nach dem Upload sinkt"
              : "Why Instagram quality drops after upload"}
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            {isVietnamese
              ? "Instagram không giữ nguyên hoàn toàn tệp bạn xuất ra. Nền tảng có thể đổi kích thước, nén lại và mã hóa lại tùy theo vị trí hiển thị và thiết bị. Quy trình an toàn nhất là chuẩn hóa kích thước trước, giữ bố cục sạch và dùng mức nén phù hợp trước khi đăng."
              : isGerman
                ? "Instagram lässt deine exportierte Datei nicht unverändert. Die Plattform kann je nach Platzierung und Gerät neu skalieren, recomprimieren und neu encodieren. Am sichersten ist es, die Maße vorab anzupassen, die Komposition sauber zu halten und uploadfähige Komprimierung zu nutzen."
              : "Instagram does not keep your original export untouched. It may resize, recompress, and re-encode based on placement and device context. The safest workflow is to pre-fit dimensions, keep clean composition, and use upload-ready compression before posting."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-background p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese
                ? "Thiết lập xuất ảnh tốt nhất trước khi tải lên"
                : isGerman
                  ? "Beste Exporteinstellungen vor dem Upload"
                : "Best export settings before upload"}
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>
                {isVietnamese
                  ? "Dùng đúng kích thước mục tiêu như 1080x1080, 1080x1350 hoặc 1080x1920."
                  : isGerman
                    ? "Verwende exakte Zielmaße wie 1080x1080, 1080x1350 oder 1080x1920."
                  : "Use exact target dimensions (1080x1080, 1080x1350, 1080x1920)."}
              </li>
              <li>
                {isVietnamese
                  ? "Ưu tiên JPEG cho ảnh chụp để tránh tệp quá nặng."
                  : isGerman
                    ? "Bevorzuge JPEG für Fotoinhalte, um übergroße Dateien zu vermeiden."
                  : "Prefer JPEG for photo content to avoid oversized files."}
              </li>
              <li>
                {isVietnamese
                  ? "Làm nét vừa phải trước khi xuất để tối ưu hiển thị trên di động."
                  : isGerman
                    ? "Schärfe moderat vor dem Export nach, um die mobile Darstellung zu verbessern."
                  : "Apply moderate sharpening before export for mobile viewing."}
              </li>
              <li>
                {isVietnamese
                  ? "Giữ dung lượng ở mức hợp lý để giảm nguy cơ bị máy chủ nén lại quá mạnh."
                  : isGerman
                    ? "Halte die Dateigröße praxisnah, um aggressive Server-Rekomprimierung zu reduzieren."
                  : "Keep file size practical to reduce aggressive server recompression."}
              </li>
            </ul>
          </article>

          <article className="rounded-xl border border-border bg-background p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese
                ? "Hiểu lầm 1080 so với 2048"
                : isGerman
                  ? "1080-vs-2048-Mythos"
                  : "1080 vs 2048 myth"}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "Xuất ảnh lớn hơn không phải lúc nào cũng tốt hơn. Trong nhiều trường hợp, Instagram vẫn nén lại về đầu ra phù hợp với nền tảng. Một tệp sạch dựa trên chuẩn 1080 với mức nén cân bằng thường đẹp hơn một tệp quá lớn rồi bị nén rất mạnh."
                : isGerman
                  ? "Größer zu exportieren gewinnt nicht immer. In vielen Fällen komprimiert Instagram trotzdem auf plattformgerechte Ausgaben zurück. Eine saubere 1080-basierte Datei mit ausgewogener Komprimierung sieht oft besser aus als ein übergroßer Upload, der danach stark neu komprimiert wird."
                : "Exporting bigger does not always win. In many cases, Instagram still recompresses toward platform-friendly outputs. A clean 1080-based file with balanced compression often looks better than an oversized upload that gets heavily recompressed."}
            </p>
          </article>
        </div>

        <div className="grid gap-4 rounded-xl border border-border bg-background p-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese
                ? "Cần nhiều hơn một lần đổi kích thước đơn lẻ?"
                : isGerman
                  ? "Mehr als nur ein einmaliges Resize?"
                : "Need more than one-off resize?"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "Với team hoặc người dùng nâng cao, bạn có thể tiếp tục sang các quy trình theo lô và chuỗi công cụ nâng cao. Bạn cũng có thể phục hồi chất lượng trước khi đổi kích thước nếu ảnh nguồn có độ phân giải thấp."
                : isGerman
                  ? "Für Teams und Power-User lohnen sich batchorientierte Abläufe und erweiterte Tool-Ketten. Du kannst auch vor dem Resize eine Qualitätswiederherstellung einsetzen, wenn die Quelle niedrig aufgelöst ist."
                : "For teams and power users, continue with batch-focused flows and advanced tool chains. You can also expand to quality recovery before resize when source assets are low resolution."}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/compress-image"
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:opacity-95"
            >
              {isVietnamese ? "Mở công cụ nén hàng loạt" : isGerman ? "Batch-Komprimierung öffnen" : "Open Batch Compress"}
            </Link>
            <Link
              href="/upscale-image"
              className="rounded-lg border border-border bg-card px-4 py-2.5 text-center text-sm font-semibold text-foreground hover:bg-secondary"
            >
              {isVietnamese ? "Cải thiện chất lượng ảnh nguồn" : isGerman ? "Quellbild verbessern" : "Improve Source Quality"}
            </Link>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
