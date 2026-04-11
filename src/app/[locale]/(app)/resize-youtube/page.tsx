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
      label: isVietnamese ? "Thumbnail YouTube" : isGerman ? "YouTube Thumbnail" : "YouTube Thumbnail",
      width: 1280,
      height: 720,
    },
    {
      label: isVietnamese ? "YouTube Shorts" : isGerman ? "YouTube Shorts" : "YouTube Shorts",
      width: 1080,
      height: 1920,
    },
    {
      label: isVietnamese ? "Banner kênh YouTube" : isGerman ? "YouTube Kanalbanner" : "YouTube Channel Banner",
      width: 2560,
      height: 1440,
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
    path: "/resize-youtube",
    title: {
      en: "Resize YouTube Thumbnail Online (Free) - YouTube Image Size Tool 2026",
      vi: "Resize thumbnail YouTube online miễn phí - Công cụ kích thước ảnh YouTube 2026",
      de: "YouTube-Thumbnail online skalieren (kostenlos) - YouTube-Bildgrößen-Tool 2026",
    },
    description: {
      en: "Resize YouTube thumbnail online free with the right YouTube image size, YouTube thumbnail size, YouTube dimensions, banner size, and Shorts image presets.",
      vi: "Resize thumbnail YouTube online miễn phí với đúng kích thước ảnh YouTube, thumbnail, banner và preset ảnh cho Shorts.",
      de: "YouTube-Thumbnails kostenlos online skalieren mit den richtigen YouTube-Bildgrößen, Thumbnail-Maßen, Bannergrößen und Shorts-Presets.",
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
          ? "Đổi kích thước ảnh YouTube online"
          : isGerman
            ? "YouTube-Bilder online skalieren"
          : "Resize YouTube Images Online"
      }
      description={
        isVietnamese
          ? "Đổi kích thước thumbnail YouTube, ảnh cho Shorts và tài sản nhận diện kênh với đúng kích thước thumbnail, banner và các thông số phù hợp."
          : isGerman
            ? "Skaliere YouTube-Thumbnails, Shorts-Bilder und Channel-Branding-Assets mit den richtigen Größen für Thumbnail, Banner und Shorts."
          : "Resize YouTube thumbnails, Shorts images, and channel branding assets with the right YouTube image size, YouTube thumbnail size, and banner dimensions."
      }
      steps={[
        {
          title: isVietnamese ? "Tải ảnh lên" : isGerman ? "Bild hochladen" : "Upload Image",
          description: isVietnamese
            ? "Chọn ảnh bạn muốn chuẩn bị cho thumbnail YouTube, tài sản cho Shorts hoặc banner kênh."
            : isGerman
              ? "Wähle das Bild aus, das du für ein YouTube-Thumbnail, ein Shorts-Visual oder einen Channel-Banner vorbereiten möchtest."
            : "Choose the image you want to prepare for a YouTube thumbnail, Shorts asset, or banner workflow.",
        },
        {
          title: isVietnamese ? "Chọn preset" : isGerman ? "Preset wählen" : "Pick Preset",
          description: isVietnamese
            ? "Chọn đúng định dạng YouTube bạn cần, từ thumbnail đến kích thước dọc cho Shorts và banner kênh."
            : isGerman
              ? "Wähle das passende YouTube-Format, von Thumbnail-Größe über vertikale Shorts-Maße bis hin zu Channel-Banner-Artwork."
            : "Select the YouTube format you need, from thumbnail size to Shorts vertical dimensions and channel banner art.",
        },
        {
          title: isVietnamese ? "Tải xuống" : isGerman ? "Herunterladen" : "Download",
          description: isVietnamese
            ? "Xuất ảnh đã đổi kích thước ngay để sẵn sàng tải lên YouTube hoặc dùng cho phần nhận diện kênh."
            : isGerman
              ? "Exportiere das skalierte Bild sofort, damit es für YouTube-Upload oder Channel-Branding bereit ist."
            : "Export the resized image immediately so it is ready for YouTube upload or channel branding work.",
        },
      ]}
      faqs={[
        {
          q: isVietnamese
            ? "Thumbnail YouTube có kích thước bao nhiêu?"
            : isGerman
              ? "Welche Größe sollte ein YouTube-Thumbnail haben?"
            : "What size is YouTube thumbnail?",
          a: isVietnamese
            ? "YouTube khuyến nghị thumbnail tùy chỉnh ở 1280 x 720 với chiều rộng tối thiểu 640 pixel và tỷ lệ 16:9. Đây là kích thước làm việc an toàn nhất khi bạn muốn thumbnail hiển thị gọn gàng trong player và preview của YouTube."
            : isGerman
              ? "YouTube empfiehlt benutzerdefinierte Thumbnails mit 1280 x 720, einer Mindestbreite von 640 Pixeln und einem 16:9-Seitenverhältnis. Das ist die sicherste Arbeitsgröße, wenn dein Thumbnail sauber in Playern und Vorschauen dargestellt werden soll."
            : "YouTube Help recommends custom thumbnails at 1280 x 720 with a minimum width of 640 pixels and a 16:9 aspect ratio. That is the safest working size when you want a thumbnail that fits YouTube players and previews cleanly.",
        },
        {
          q: isVietnamese
            ? "Vì sao thumbnail YouTube của tôi bị mờ?"
            : isGerman
              ? "Warum ist mein YouTube-Thumbnail unscharf?"
            : "Why is my YouTube thumbnail blurry?",
          a: isVietnamese
            ? "Thumbnail bị mờ thường đến từ một trong ba nguyên nhân: ảnh nguồn quá nhỏ, phần chữ và chủ thể chưa đủ sắc trước khi xuất, hoặc tệp đã bị nén quá mạnh từ trước. Bắt đầu với canvas 1280 x 720 và ảnh nguồn sạch thường cho kết quả tốt hơn."
            : isGerman
              ? "Unscharfe Thumbnails entstehen meist aus drei Gründen: Die Quelle ist zu klein, Text und Motiv sind vor dem Export nicht scharf genug oder die Datei wurde bereits zu stark komprimiert. Mit einer sauberen 1280 x 720-Leinwand und einer guten Quelle erzielst du meist bessere Ergebnisse."
            : "Blurry thumbnails usually come from one of three issues: the source image is too small, the text and subject are not sharp enough before export, or the file has already been compressed too aggressively. Starting with a 1280 x 720 canvas and a clean source image usually gives better results.",
        },
        {
          q: isVietnamese
            ? "Kích thước banner YouTube là bao nhiêu?"
            : isGerman
              ? "Wie groß sollte ein YouTube-Banner sein?"
            : "What is YouTube banner size?",
          a: isVietnamese
            ? "YouTube khuyến nghị banner kênh ở 2560 x 1440 pixel, với kích thước tải lên tối thiểu là 2048 x 1152 và một vùng an toàn ở giữa cho chữ và logo. Banner bị cắt khác nhau trên từng thiết bị, nên việc giữ nhận diện chính trong vùng an toàn là rất quan trọng."
            : isGerman
              ? "YouTube empfiehlt einen Channel-Banner mit 2560 x 1440 Pixeln, einer minimalen Uploadgröße von 2048 x 1152 und einer sicheren Mittelzone für Text und Logos. Banner werden je nach Gerät unterschiedlich beschnitten, daher ist es wichtig, zentrale Marken-Elemente in der Safe Area zu halten."
            : "YouTube Help recommends a channel banner at 2560 x 1440 pixels, with a minimum upload size of 2048 x 1152 and a central safe area for text and logos. Banner art gets cropped differently across devices, so keeping key branding in the safe area is important.",
        },
        {
          q: isVietnamese
            ? "Tôi có cần kích thước khác cho YouTube Shorts không?"
            : isGerman
              ? "Brauche ich eine andere Größe für YouTube Shorts?"
            : "Do I need a different size for YouTube Shorts?",
          a: isVietnamese
            ? "Có. Shorts là định dạng dọc, nên 1080 x 1920 là kích thước làm việc thực tế nhất khi bạn đang chuẩn bị hình ảnh hoặc visual kiểu cover cho nội dung liên quan đến Shorts."
            : isGerman
              ? "Ja. Shorts sind vertikal, daher ist 1080 x 1920 die praktischste Arbeitsgröße, wenn du ein Bild oder coverartiges Visual für Shorts-Inhalte vorbereitest."
            : "Yes. Shorts are vertical, so 1080 x 1920 is the most practical working size when you are preparing an image or cover-style visual for Shorts-related content.",
        },
        {
          q: isVietnamese ? "Tệp của tôi có bị tải lên không?" : isGerman ? "Werden meine Dateien hochgeladen?" : "Are my files uploaded?",
          a: isVietnamese
            ? "Không. Quy trình resize này chạy cục bộ trong trình duyệt, nên bạn có thể chuẩn bị tài sản cho YouTube mà không cần tải ảnh nguồn lên máy chủ của chúng tôi."
            : isGerman
              ? "Nein. Dieser Resize-Workflow läuft lokal in deinem Browser, sodass du YouTube-Assets vorbereiten kannst, ohne die Quelle an unseren Server hochzuladen."
            : "No. This resize flow runs locally in your browser, so you can prepare YouTube assets without uploading the source image to our server.",
        },
      ]}
      relatedTools={[
        { name: isVietnamese ? "Resize ảnh Instagram" : isGerman ? "Instagram-Bild skalieren" : "Resize Instagram Image", path: "/resize-instagram" },
        { name: isVietnamese ? "Resize ảnh TikTok" : isGerman ? "TikTok-Bild skalieren" : "Resize TikTok Image", path: "/resize-tiktok" },
        { name: isVietnamese ? "Nén ảnh" : isGerman ? "Bild komprimieren" : "Compress Image", path: "/compress-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-youtube"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          {
            name: isVietnamese ? "Resize cho YouTube" : isGerman ? "Für YouTube skalieren" : "Resize for YouTube",
            url: `${siteUrl}/resize-youtube`,
          },
        ]}
      />
      <SocialResizeClient presets={getPresets(locale)} defaultPresetIndex={0} />

      <section className="mt-24 space-y-12 bg-card">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {isVietnamese
              ? "Hướng dẫn nhanh về kích thước ảnh YouTube"
              : isGerman
                ? "Kurzanleitung zu YouTube-Bildgrößen"
              : "Quick YouTube Size Guide"}
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            {isVietnamese
              ? "Nếu bạn cần các con số quan trọng một cách nhanh chóng, hãy bắt đầu từ đây. Kích thước thumbnail YouTube vẫn là 1280 x 720, Shorts phù hợp nhất ở 1080 x 1920, còn banner kênh nên được thiết kế trên canvas 2560 x 1440 với vùng an toàn ở trung tâm."
              : isGerman
                ? "Wenn du die wichtigsten Zahlen schnell brauchst, starte hier. Die YouTube-Thumbnail-Größe bleibt 1280 x 720, Shorts funktionieren am besten mit 1080 x 1920, und Channel-Banner sollten auf einer 2560 x 1440-Leinwand mit sicherer Mitte geplant werden."
              : "If you need the key numbers fast, start here. YouTube thumbnail size is still 1280 x 720, Shorts work best in 1080 x 1920, and channel banner design should be planned around a 2560 x 1440 canvas with a safe center area."}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese ? "Kích thước thumbnail" : isGerman ? "Thumbnail-Größe" : "Thumbnail Size"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "YouTube khuyến nghị kích thước 1280 x 720 với tỷ lệ 16:9 và chiều rộng tối thiểu 640 pixel cho thumbnail tùy chỉnh."
                : isGerman
                  ? "YouTube empfiehlt 1280 x 720 mit 16:9-Seitenverhältnis und einer Mindestbreite von 640 Pixeln für benutzerdefinierte Thumbnails."
                : "YouTube recommends 1280 x 720 with a 16:9 ratio and a minimum width of 640 pixels for custom thumbnails."}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese ? "Kích thước banner" : isGerman ? "Banner-Größe" : "Banner Size"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "Kích thước banner được khuyến nghị là 2560 x 1440. Hãy giữ chữ và logo quan trọng trong vùng an toàn ở giữa vì YouTube cắt banner khác nhau trên từng thiết bị."
                : isGerman
                  ? "Die empfohlene Banner-Größe ist 2560 x 1440. Halte wichtige Texte und Logos in der sicheren Mittelzone, weil YouTube Banner je nach Gerät unterschiedlich beschneidet."
                : "Recommended banner size is 2560 x 1440. Keep important text and logos inside the safe center area because YouTube crops banners differently across devices."}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese ? "Tỷ lệ Shorts" : isGerman ? "Shorts-Verhältnis" : "Shorts Ratio"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "1080 x 1920 là kích thước dọc đơn giản và thực tế nhất cho ảnh liên quan đến Shorts và các tài sản YouTube ưu tiên di động."
                : isGerman
                  ? "1080 x 1920 ist die einfachste und praktischste vertikale Größe für Shorts-bezogene Visuals und mobile YouTube-Assets."
                : "1080 x 1920 is the simplest vertical size for Shorts-related artwork and mobile-first YouTube assets."}
            </p>
          </article>
        </div>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {isVietnamese
              ? "Cách đổi kích thước ảnh cho YouTube"
              : isGerman
                ? "So skalierst du Bilder für YouTube"
              : "How to Resize Image for YouTube"}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {isVietnamese
              ? "Tải ảnh nguồn lên, chọn preset YouTube phù hợp rồi xuất tệp cuối cùng. Dùng preset thumbnail cho ảnh video thông thường, preset Shorts cho tài sản dọc và preset banner khi bạn đang chuẩn bị hình ảnh nhận diện kênh. Nếu cần đổi bố cục, hãy mở "
              : isGerman
                ? "Lade dein Quellbild hoch, wähle das passende YouTube-Preset und exportiere die finale Datei. Nutze das Thumbnail-Preset für klassische Video-Grafiken, das Shorts-Preset für vertikale Assets und das Banner-Preset für Channel-Branding. Wenn das Framing angepasst werden muss, öffne zuerst "
              : "Upload the source image, choose the right YouTube preset, and export the final file. Use the thumbnail preset for standard video artwork, the Shorts preset for vertical assets, and the banner preset when you are preparing channel branding. If framing needs to change, open "}
            <Link
              href="/crop-image"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese ? "Cắt ảnh" : isGerman ? "Bild zuschneiden" : "Crop Image"}
            </Link>{" "}
            {isVietnamese
              ? "trước. Nếu kết quả vẫn quá nặng, hãy hoàn tất bằng "
              : isGerman
                ? "zuerst. Wenn das Ergebnis danach immer noch zu schwer ist, schließe mit "
              : "first. If the result is still too heavy, finish with "}
            <Link
              href="/compress-image"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese ? "Nén ảnh" : isGerman ? "Bild komprimieren" : "Compress Image"}
            </Link>{" "}
            {isVietnamese ? "trước khi tải lên." : isGerman ? "ab, bevor du hochlädst." : "before upload."}
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {isVietnamese
              ? "Tỷ lệ khung hình tốt nhất cho YouTube"
              : isGerman
                ? "Bestes Seitenverhältnis für YouTube"
              : "Best Aspect Ratio for YouTube"}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {isVietnamese
              ? "Với thumbnail YouTube truyền thống và logic banner, 16:9 vẫn là nền tảng mạnh nhất. Với Shorts, 9:16 dọc là lựa chọn khớp hơn. Nếu bạn đăng chéo hình ảnh qua nhiều kênh mạng xã hội, hãy so sánh kết quả với "
              : isGerman
                ? "Für klassische YouTube-Thumbnails und Banner-Logik bleibt 16:9 die stärkste Grundlage. Für Shorts passt vertikales 9:16 besser. Wenn du Visuals plattformübergreifend nutzt, vergleiche die Ergebnisse mit "
              : "For classic YouTube thumbnails and banner logic, 16:9 remains the strongest baseline. For Shorts, vertical 9:16 is the better match. If you cross-post visuals across multiple social channels, compare results with "}
            <Link
              href="/resize-instagram"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese
                ? "Đổi kích thước cho Instagram"
                : isGerman
                  ? "Instagram skalieren"
                : "Resize Instagram"}
            </Link>{" "}
            and{" "}
            <Link
              href="/resize-tiktok"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese
                ? "Đổi kích thước cho TikTok"
                : isGerman
                  ? "TikTok skalieren"
                : "Resize TikTok"}
            </Link>{" "}
            {isVietnamese
              ? "để quy trình của bạn nhất quán trên các nền tảng."
              : isGerman
                ? "damit dein Workflow über mehrere Plattformen hinweg konsistent bleibt."
              : "so your workflow stays consistent across platforms."}
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {isVietnamese
              ? "Xây dựng quy trình tốt hơn cho nhà sáng tạo"
              : isGerman
                ? "Einen besseren Creator-Workflow aufbauen"
              : "Build a Better Creator Workflow"}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {isVietnamese
              ? "Một công cụ resize cho YouTube sẽ hữu ích hơn nhiều khi nó nằm trong một bộ công cụ rộng hơn cho nhà sáng tạo. Hãy chuẩn bị thumbnail tại đây, rồi tiếp tục sang "
              : isGerman
                ? "Ein YouTube-Resize-Tool wird deutlich nützlicher, wenn es Teil eines größeren Creator-Stacks ist. Bereite Thumbnails hier vor und gehe dann weiter zu "
              : "A YouTube resize tool becomes much more useful when it sits inside a broader creator stack. Prepare thumbnails here, continue into "}
            <Link
              href="/resize-instagram"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese ? "resize cho Instagram" : isGerman ? "Instagram-Resize" : "Instagram resize"}
            </Link>{" "}
            {isVietnamese ? "và " : isGerman ? "und " : "and "}
            <Link
              href="/resize-tiktok"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese ? "resize cho TikTok" : isGerman ? "TikTok-Resize" : "TikTok resize"}
            </Link>{" "}
            {isVietnamese ? "để phân phối nội dung, sau đó dùng " : isGerman ? "für die Distribution und nutze anschließend " : "for distribution, then use "}
            <Link
              href="/compress-image"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese ? "nén ảnh" : isGerman ? "Bildkomprimierung" : "image compression"}
            </Link>{" "}
            {isVietnamese
              ? "khi bạn cần tài sản nhẹ hơn cho xuất bản và cộng tác."
              : isGerman
                ? "wenn du leichtere Assets für Publishing und Zusammenarbeit brauchst."
              : "when you need lighter assets for publishing and collaboration."}
          </p>
        </section>
      </section>
    </ToolLayout>
  );
}
