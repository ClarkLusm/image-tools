import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import {
  createPageMetadata,
  resolveSupportedLanguage,
} from "@/app/lib/metadata";
import ToolNextActions from "@/app/components/tools/tool-next-actions";
import { getToolNextActions } from "@/app/lib/tool-next-actions";

function getPresets(locale: string) {
  const isVietnamese = locale === "vi";
  const isGerman = locale === "de";

  return [
    {
      label: isVietnamese ? "Bài đăng Facebook" : isGerman ? "Facebook Beitrag" : "Facebook Post",
      width: 1200,
      height: 630,
    },
    {
      label: isVietnamese ? "Ảnh bìa Facebook" : isGerman ? "Facebook Titelbild" : "Facebook Cover",
      width: 851,
      height: 315,
    },
    {
      label: isVietnamese ? "Ảnh hồ sơ Facebook" : isGerman ? "Facebook Profil" : "Facebook Profile",
      width: 320,
      height: 320,
    },
    {
      label: isVietnamese ? "Tin Facebook" : isGerman ? "Facebook Story" : "Facebook Story",
      width: 1080,
      height: 1920,
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
    path: "/resize-facebook",
    title: {
      en: "Resize Facebook Images Online (Free) - Facebook Cover & Post Size Tool",
      vi: "Resize ảnh Facebook online miễn phí - Công cụ kích thước cover và post Facebook",
      de: "Facebook-Bilder online skalieren (kostenlos) - Tool für Titelbild- und Beitragsgrößen",
    },
    description: {
      en: "Resize Facebook images online free with the right Facebook cover size, Facebook post size, Facebook image dimensions, Facebook event cover guidance, and profile image presets.",
      vi: "Resize ảnh Facebook online miễn phí với đúng kích thước cover, post, profile và hướng dẫn event cover Facebook cùng các preset thực tế.",
      de: "Facebook-Bilder kostenlos online skalieren mit den richtigen Größen für Titelbilder, Beiträge, Profilbilder und Event-Cover-Presets.",
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
  const languageCode = resolveSupportedLanguage(locale);
  const nextActions = getToolNextActions("social-resize", languageCode);
  return (
    <ToolLayout
      locale={locale}
      title={
        isVietnamese
          ? "Đổi kích thước ảnh Facebook online"
          : isGerman
            ? "Facebook-Bilder online skalieren"
          : "Resize Facebook Images Online"
      }
      description={
        isVietnamese
          ? "Đổi kích thước cho bài đăng, ảnh bìa, ảnh hồ sơ và tin Facebook với các preset thực tế và dễ dùng cho người sáng tạo."
          : isGerman
            ? "Skaliere Beiträge, Titelbilder, Profilbilder und Stories für Facebook mit praxisnahen und creatorfreundlichen Presets."
          : "Resize for Facebook posts, cover photos, profile images, and stories with practical Facebook image dimensions and creator-friendly presets."
      }
      steps={[
        {
          title: isVietnamese ? "Tải ảnh lên" : isGerman ? "Bild hochladen" : "Upload Image",
          description: isVietnamese
            ? "Chọn hình ảnh bạn muốn chuẩn bị cho bài đăng, ảnh bìa, ảnh hồ sơ hoặc tin Facebook."
            : isGerman
              ? "Wähle das Bild, das du für einen Facebook-Beitrag, ein Titelbild, Profilfoto oder eine Story vorbereiten möchtest."
            : "Choose the image you want to prepare for a Facebook post, cover, profile photo, or story.",
        },
        {
          title: isVietnamese ? "Chọn preset" : isGerman ? "Preset wählen" : "Select Preset",
          description: isVietnamese
            ? "Chọn đúng định dạng Facebook bạn cần, từ ảnh bài đăng đến ảnh bìa và ảnh hồ sơ."
            : isGerman
              ? "Wähle das passende Facebook-Format, von Beitragsbild bis Titelbild und Profilgrafik."
            : "Pick the Facebook format you need, from post size to cover photo and profile artwork.",
        },
        {
          title: isVietnamese ? "Tải xuống" : isGerman ? "Herunterladen" : "Download",
          description: isVietnamese
            ? "Xuất ảnh đã đổi kích thước ngay để sẵn sàng tải lên Facebook."
            : isGerman
              ? "Exportiere das skalierte Bild sofort, damit es direkt für Facebook bereit ist."
            : "Export the resized image instantly so it is ready for Facebook upload.",
        },
      ]}
      faqs={[
        {
          q: isVietnamese
            ? "Kích thước ảnh Facebook là bao nhiêu?"
            : isGerman
              ? "Welche Bildgrößen verwendet Facebook?"
            : "What is Facebook image size?",
          a: isVietnamese
            ? "Câu trả lời phụ thuộc vào vị trí hiển thị. Kích thước phổ biến cho ảnh bài đăng Facebook là 1200 x 630, ảnh bìa Page hoạt động tốt ở 851 x 315, còn ảnh hồ sơ nên được chuẩn bị dưới dạng vuông, lý tưởng là 320 x 320 để có chất lượng tốt. Vì vậy một trang resize Facebook tốt cần bao phủ nhiều preset thay vì coi mọi ảnh tải lên như một đồ họa mạng xã hội chung chung."
            : isGerman
              ? "Die Antwort hängt von der Platzierung ab. Eine gängige Facebook-Beitragsgröße ist 1200 x 630, Seiten-Titelbilder funktionieren gut mit 851 x 315, und Profilbilder sollten als Quadrat vorbereitet werden, idealerweise mit 320 x 320 für gute Qualität. Genau deshalb sollte eine starke Facebook-Resize-Seite mehr als nur ein einziges Preset abdecken."
            : "The answer depends on placement. A common Facebook post image size is 1200 x 630, Page cover photos work well at 851 x 315, and profile photos should be prepared as square images, ideally 320 x 320 for quality. That is why a strong Facebook resize page needs to cover more than one preset instead of treating every upload like a generic social graphic.",
        },
        {
          q: isVietnamese
            ? "Kích thước ảnh bìa Facebook là bao nhiêu?"
            : isGerman
              ? "Wie groß sollte ein Facebook-Titelbild sein?"
            : "What is Facebook cover size?",
          a: isVietnamese
            ? "Tài liệu trợ giúp của Facebook cho biết ảnh bìa Page nên có ít nhất 400 x 150 pixel và tải nhanh nhất dưới dạng JPG sRGB ở 851 x 315. Đây là điểm bắt đầu thực tế nhất cho ảnh bìa có chữ hoặc yếu tố thương hiệu, đặc biệt khi bạn muốn một kích thước cover hoạt động ổn hơn trên cả desktop lẫn mobile."
            : isGerman
              ? "Laut Facebook Help sollten Seiten-Titelbilder mindestens 400 x 150 Pixel groß sein und laden als sRGB-JPG mit 851 x 315 am schnellsten. Das ist der praktischste Ausgangspunkt für Titelgrafiken mit Text oder Branding, besonders wenn sie auf Desktop und Mobilgeräten sauber funktionieren sollen."
            : "Facebook Help says Page cover photos should be at least 400 x 150 pixels and load fastest as an sRGB JPG at 851 x 315. That is the most practical starting point for cover artwork with text or brand elements, especially when you want a clean Facebook cover size that survives desktop and mobile cropping more gracefully.",
        },
        {
          q: isVietnamese
            ? "Tôi nên dùng kích thước nào cho ảnh hồ sơ Facebook?"
            : isGerman
              ? "Welche Größe sollte ich für ein Facebook-Profilbild verwenden?"
            : "What size should I use for a Facebook profile picture?",
          a: isVietnamese
            ? "Facebook cho biết ảnh hồ sơ Page sẽ hiển thị ở 176 x 176 trên desktop và 196 x 196 trên điện thoại, đồng thời khuyến nghị tải lên ảnh vuông 320 x 320 để có chất lượng tốt nhất."
            : isGerman
              ? "Facebook gibt an, dass Seiten-Profilfotos auf dem Desktop mit 176 x 176 und auf Smartphones mit 196 x 196 angezeigt werden. Empfohlen wird ein quadratischer Upload mit 320 x 320 für die beste Qualität."
            : "Facebook Help says Page profile photos display at 176 x 176 on desktop and 196 x 196 on smartphones, and recommends uploading a 320 x 320 square image for best quality.",
        },
        {
          q: isVietnamese
            ? "Kích thước ảnh bìa sự kiện Facebook có giống ảnh bìa Page không?"
            : isGerman
              ? "Ist die Größe eines Facebook-Event-Covers dieselbe wie bei einem Seiten-Titelbild?"
            : "Is Facebook event cover size the same as Page cover size?",
          a: isVietnamese
            ? "Không. Ảnh bìa sự kiện Facebook hoạt động như một vị trí ngang riêng biệt, nên việc tái sử dụng ảnh bìa Page thường dẫn tới crop lệch. Nếu bạn đang chuẩn bị ảnh cho sự kiện, hãy coi đây là một workflow riêng thay vì giả định ảnh bìa Page sẽ khớp hoàn hảo."
            : isGerman
              ? "Nein. Event-Cover auf Facebook verhalten sich wie eine eigene breite Platzierung, daher führt die Wiederverwendung eines normalen Seiten-Titelbilds oft zu unpassenden Zuschnitten. Wenn du Event-Grafiken vorbereitest, solltest du dieses Asset als eigenen Workflow behandeln."
            : "No. Facebook event cover visuals behave like a separate wide placement, so reusing a Page cover often leads to awkward crops. If you are preparing event graphics, treat Facebook event cover size as its own asset workflow instead of assuming your standard Page cover will fit perfectly.",
        },
        {
          q: isVietnamese
            ? "Công cụ có hỗ trợ định dạng tin Facebook không?"
            : isGerman
              ? "Unterstützt das Tool auch Facebook Stories?"
            : "Do you support Facebook story format?",
          a: isVietnamese
            ? "Có. Hãy dùng preset dọc 1080 x 1920 khi bạn cần bố cục phù hợp cho tin Facebook trên di động."
            : isGerman
              ? "Ja. Nutze das vertikale 1080 x 1920-Preset, wenn du ein Story-taugliches Layout für mobile Facebook-Anzeige brauchst."
            : "Yes. Use the 1080 x 1920 vertical preset when you need a Story-friendly layout for mobile viewing.",
        },
        {
          q: isVietnamese ? "Tệp của tôi có bị tải lên không?" : isGerman ? "Werden meine Dateien hochgeladen?" : "Are my files uploaded?",
          a: isVietnamese
            ? "Không. Toàn bộ quá trình resize diễn ra cục bộ trong trình duyệt, nên bạn có thể chuẩn bị tài sản cho Facebook mà không cần gửi ảnh lên máy chủ của chúng tôi."
            : isGerman
              ? "Nein. Die gesamte Größenänderung läuft lokal in deinem Browser, sodass du Facebook-Assets vorbereiten kannst, ohne Bilder an unseren Server zu senden."
            : "No. All resizing happens locally in your browser, so you can prepare Facebook assets without sending the image to our server.",
        },
      ]}
      relatedTools={[
        { name: isVietnamese ? "Resize ảnh Instagram" : isGerman ? "Instagram-Bild skalieren" : "Resize Instagram Image", path: "/resize-instagram" },
        { name: isVietnamese ? "Resize ảnh TikTok" : isGerman ? "TikTok-Bild skalieren" : "Resize TikTok Image", path: "/resize-tiktok" },
        { name: isVietnamese ? "Resize ảnh YouTube" : isGerman ? "YouTube-Bild skalieren" : "Resize YouTube Image", path: "/resize-youtube" },
        { name: isVietnamese ? "Nén ảnh" : isGerman ? "Bild komprimieren" : "Compress Image", path: "/compress-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-facebook"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          {
            name: isVietnamese ? "Resize cho Facebook" : isGerman ? "Für Facebook skalieren" : "Resize for Facebook",
            url: `${siteUrl}/resize-facebook`,
          },
        ]}
      />
      <SocialResizeClient presets={getPresets(locale)} defaultPresetIndex={0} />

      <ToolNextActions
        className="mt-10"
        title={nextActions.title}
        description={nextActions.description}
        items={nextActions.items}
      />

      <section className="mt-24 space-y-12 bg-card">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {isVietnamese
              ? "Hướng dẫn nhanh về kích thước ảnh Facebook"
              : isGerman
                ? "Kurzanleitung zu Facebook-Bildgrößen"
              : "Quick Facebook Size Guide"}
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            {isVietnamese
              ? "Nếu bạn chỉ cần những thông tin cốt lõi, hãy bắt đầu từ đây. Ảnh bài đăng, ảnh bìa và ảnh hồ sơ trên Facebook có yêu cầu khác nhau, nên dùng preset riêng là cách nhanh nhất để tránh cắt lệch và ảnh bị mờ."
              : isGerman
                ? "Wenn du nur die wichtigsten Grundlagen brauchst, starte hier. Beiträge, Titelbilder und Profilbilder auf Facebook haben unterschiedliche Anforderungen, deshalb ist ein eigenes Preset der schnellste Weg, um unsaubere Zuschnitte und Unschärfe zu vermeiden."
              : "If you want the essentials first, start here. Facebook post, cover, and profile placements each have different needs, so using a dedicated preset is the fastest way to avoid awkward crops and blurry uploads."}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese ? "Kích thước ảnh bìa Facebook" : isGerman ? "Facebook-Titelbildgröße" : "Facebook Cover Size"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "Trung tâm trợ giúp Facebook cho biết ảnh bìa Trang tải nhanh nhất ở kích thước 851 x 315. Hãy giữ nội dung quan trọng cách xa mép ngoài vì ảnh bìa bị cắt khác nhau trên từng thiết bị."
                : isGerman
                  ? "Laut Facebook Help laden Seiten-Titelbilder mit 851 x 315 am schnellsten. Halte wichtige Texte von den Rändern fern, weil Titelbilder je nach Gerät unterschiedlich beschnitten werden."
                : "Facebook Help says Page cover images load fastest at 851 x 315. Keep important text away from the far edges because cover art is cropped differently across devices."}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese ? "Kích thước ảnh bài đăng Facebook" : isGerman ? "Facebook-Beitragsgröße" : "Facebook Post Size"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "1200 x 630 là kích thước mặc định thực tế cho bài chia sẻ, ảnh preview và đồ họa mạng xã hội. Đây là một trong những kích thước Facebook hữu ích nhất để tối ưu."
                : isGerman
                  ? "1200 x 630 ist ein praxisnaher Standard für geteilte Beiträge, Vorschauen und Social-Grafiken. Es ist eine der nützlichsten Facebook-Bildgrößen für die Optimierung."
                : "1200 x 630 is a practical default for shared posts, previews, and social graphics. It is one of the most useful long-tail Facebook image dimensions to target."}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese ? "Ảnh hồ sơ" : isGerman ? "Profilbild" : "Profile Image"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "Ảnh hồ sơ được hiển thị theo dạng hình tròn, nên ảnh nguồn vuông 320 x 320 sạch sẽ giúp bạn kiểm soát logo, khuôn mặt và nhận diện trung tâm tốt hơn."
                : isGerman
                  ? "Profilbilder werden kreisförmig dargestellt, deshalb gibt dir eine saubere 320 x 320-Quadratquelle bessere Kontrolle über Logos, Gesichter und zentriertes Branding."
                : "Profile images are displayed as circles, so a clean 320 x 320 square source gives you better control over logos, faces, and centered branding."}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese
                ? "Quy trình chuẩn bị ảnh bìa sự kiện"
                : isGerman
                  ? "Workflow für Event-Cover"
                : "Event Cover Workflow"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "Đồ họa cho sự kiện nên được xử lý như một tài sản ngang riêng biệt. Nếu bạn đang tối ưu cho ảnh bìa sự kiện Facebook, đừng tái sử dụng ảnh bìa Page mà hãy chuẩn bị một ảnh riêng."
                : isGerman
                  ? "Event-Grafiken sollten als eigenes breites Asset behandelt werden. Wenn du für Facebook-Event-Cover optimierst, verwende nicht einfach dein Seiten-Titelbild erneut, sondern bereite eine eigene Grafik vor."
                : "Event graphics should be treated as a separate wide asset. If you are targeting Facebook event cover size searches, avoid reusing your Page cover art and prepare a dedicated image instead."}
            </p>
          </article>
        </div>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {isVietnamese
                ? "Kích thước ảnh bài đăng Facebook"
                : isGerman
                  ? "Facebook-Beitragsgröße"
                : "Facebook Post Size"}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              {isVietnamese
                ? "Với ảnh bài đăng và đồ họa chia sẻ, 1200 x 630 vẫn là lựa chọn mặc định rất thực tế vì nó cân bằng tốt giữa chất lượng và khả năng tương thích trong preview link cũng như bố cục bài đăng Facebook. Đây cũng là một trong những câu trả lời thực tế nhất cho các truy vấn như "
                : isGerman
                  ? "Für Feed-Beiträge und geteilte Grafiken bleibt 1200 x 630 ein sehr sauberer Standard, weil es Qualität und Kompatibilität in Link-Vorschauen und typischen Facebook-Beitragslayouts gut ausbalanciert. Es ist außerdem eine der praktischsten Antworten auf Suchanfragen wie "
                : "For feed posts and shared graphics, 1200 x 630 remains a clean default because it balances quality with compatibility across link previews and general Facebook post layouts. It is also one of the most practical answers to searches like "}
              <span className="font-medium text-foreground">
                facebook post size
              </span>{" "}
              {isVietnamese ? "và " : isGerman ? "und " : "and "}
              <span className="font-medium text-foreground">
                facebook post dimensions
              </span>
              .
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {isVietnamese
                ? "Kích thước ảnh hồ sơ Facebook"
                : isGerman
                  ? "Facebook-Profilbildgröße"
                : "Facebook Profile Picture Size"}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              {isVietnamese
                ? "Ảnh hồ sơ sẽ bị cắt thành hình tròn trong giao diện, nên ảnh nguồn an toàn nhất vẫn là ảnh vuông. Facebook cho biết ảnh hồ sơ Page nên dùng 320 x 320 để có chất lượng tốt nhất, nhờ đó logo, khuôn mặt và nhận diện trung tâm sẽ dễ được giữ trọn hơn sau khi áp dụng crop tròn."
                : isGerman
                  ? "Profilfotos werden in der Oberfläche kreisförmig beschnitten, daher bleibt eine quadratische Quelle die sicherste Wahl. Facebook empfiehlt für Seiten-Profilbilder 320 x 320, damit Logos, Gesichter und zentrierte Branding-Elemente nach dem runden Zuschnitt besser erhalten bleiben."
                : "Profile photos are cropped to a circle in the interface, so the safest source image is still a square. Facebook says a Page profile picture should be 320 x 320 for best quality, which makes it easier to keep logos, faces, and centered brand marks visible after the circular crop is applied."}
            </p>
          </article>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {isVietnamese
                ? "Tỷ lệ khung hình tốt nhất cho Facebook"
                : isGerman
                  ? "Bestes Seitenverhältnis für Facebook"
                : "Best Aspect Ratio for Facebook"}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              {isVietnamese
                ? "Không có một tỷ lệ Facebook tốt nhất cho mọi trường hợp. Ảnh ngang phù hợp nhất cho cover và nhiều đồ họa bài đăng, ảnh vuông mạnh hơn cho ảnh hồ sơ và hình ảnh thương hiệu đơn giản, còn 9:16 dọc là lựa chọn đúng cho tin Facebook. Khớp tỷ lệ với vị trí hiển thị quan trọng hơn việc cố ép một kích thước dùng cho tất cả."
                : isGerman
                  ? "Es gibt nicht das eine beste Facebook-Seitenverhältnis für jeden Anwendungsfall. Breite Bilder funktionieren am besten für Titelbilder und viele Beitragsgrafiken, quadratische Bilder sind stärker für Profilfotos und einfache Markenvisuals, und vertikales 9:16 ist die passende Wahl für Stories. Das Verhältnis an die Platzierung anzupassen ist wichtiger als überall dieselbe Größe zu erzwingen."
                : "There is no single best Facebook aspect ratio for every use case. Wide images work best for covers and many shared post graphics, square images are strongest for profile photos and simple branded visuals, and vertical 9:16 is the right fit for Stories. Matching the ratio to the placement is more important than forcing one image size everywhere."}
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {isVietnamese
                ? "Cách đổi kích thước ảnh cho Facebook"
                : isGerman
                  ? "So skalierst du Bilder für Facebook"
                : "How to Resize Image for Facebook"}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              {isVietnamese
                ? "Tải ảnh lên, chọn đúng preset Facebook rồi xuất kích thước cuối cùng. Nếu cần căn lại bố cục tốt hơn, hãy mở "
                : isGerman
                  ? "Lade dein Bild hoch, wähle das passende Facebook-Preset und exportiere die finale Größe. Wenn du ein besseres Framing brauchst, öffne zuerst "
                : "Upload your image, choose the right Facebook preset, and export the final size. If you need better framing, open "}
              <Link
                href="/crop-image"
                className="font-medium text-primary hover:underline"
              >
                {isVietnamese ? "Cắt ảnh" : isGerman ? "Bild zuschneiden" : "Crop Image"}
              </Link>{" "}
              {isVietnamese
                ? "trước. Nếu tệp đầu ra vẫn lớn hơn mức cần thiết, hãy hoàn tất bằng "
                : isGerman
                  ? "zuerst. Wenn die Ausgabedatei danach immer noch größer ist als nötig, schließe mit "
                : "first. If the output file is still larger than needed, finish with "}
              <Link
                href="/compress-image"
                className="font-medium text-primary hover:underline"
              >
                {isVietnamese ? "Nén ảnh" : isGerman ? "Bild komprimieren" : "Compress Image"}
              </Link>{" "}
              {isVietnamese ? "trước khi xuất bản." : isGerman ? "ab, bevor du veröffentlichst." : "before publishing."}
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {isVietnamese
              ? "Xây dựng quy trình mạng xã hội tốt hơn"
              : isGerman
                ? "Einen besseren Social-Workflow aufbauen"
              : "Build a Better Social Workflow"}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {isVietnamese
              ? "Resize cho Facebook sẽ hiệu quả hơn nữa khi nằm trong một quy trình xuất bản mạng xã hội rộng hơn. Hãy tiếp tục sang "
              : isGerman
                ? "Facebook-Resize funktioniert noch besser, wenn es Teil eines größeren Social-Publishing-Workflows ist. Wechsle anschließend zu "
              : "Facebook resize works even better when it sits inside a broader social publishing flow. Continue into "}
            <Link
              href="/resize-instagram"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese
                ? "Đổi kích thước cho Instagram"
                : isGerman
                  ? "Instagram skalieren"
                : "Resize Instagram"}
            </Link>
            ,{" "}
            <Link
              href="/resize-tiktok"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese
                ? "Đổi kích thước cho TikTok"
                : isGerman
                  ? "TikTok skalieren"
                : "Resize TikTok"}
            </Link>
            , and{" "}
            <Link
              href="/resize-youtube"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese
                ? "Đổi kích thước cho YouTube"
                : isGerman
                  ? "YouTube skalieren"
                : "Resize YouTube"}
            </Link>{" "}
            {isVietnamese
              ? "khi bạn muốn một chuỗi tài sản đa nền tảng nhất quán hơn."
              : isGerman
                ? "wenn du eine konsistentere Multi-Plattform-Asset-Pipeline aufbauen möchtest."
              : "when you want a more consistent multi-platform asset pipeline."}
          </p>
        </section>
      </section>
    </ToolLayout>
  );
}
