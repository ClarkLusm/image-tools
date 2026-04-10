import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/app/lib/metadata";

function getPresets(locale: string) {
  const isVietnamese = locale === "vi";

  return [
    {
      label: isVietnamese ? "TikTok dọc" : "TikTok Vertical",
      width: 1080,
      height: 1920,
    },
    {
      label: isVietnamese ? "Ảnh hồ sơ TikTok" : "TikTok Profile",
      width: 200,
      height: 200,
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
    path: "/resize-tiktok",
    title: {
      en: "Resize TikTok Image Online Free",
      vi: "Resize ảnh TikTok online miễn phí",
    },
    description: {
      en: "Resize TikTok image online free. Prepare the right TikTok image size, TikTok dimensions, and assets for TikTok posts, profile images, thumbnails, and cover visuals.",
      vi: "Resize ảnh TikTok online miễn phí. Chuẩn bị đúng kích thước ảnh TikTok, dimensions và tài nguyên cho bài đăng, ảnh hồ sơ, thumbnail và ảnh cover.",
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
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title={
        isVietnamese
          ? "Resize ảnh TikTok online miễn phí"
          : "Resize TikTok Image Online Free"
      }
      description={
        isVietnamese
          ? "Đổi kích thước cho bài đăng, ảnh hồ sơ, thumbnail và ảnh bìa TikTok với các thông số thực tế, thân thiện cho người sáng tạo."
          : "Resize for TikTok post, profile, thumbnail, and cover workflows with the right TikTok image size and creator-friendly TikTok dimensions."
      }
      steps={[
        {
          title: isVietnamese ? "Tải ảnh lên" : "Upload Image",
          description: isVietnamese
            ? "Chọn ảnh bạn muốn chuẩn bị cho bài đăng TikTok, ảnh bìa hoặc ảnh hồ sơ."
            : "Choose the image you want to prepare for TikTok posts, cover art, or profile use.",
        },
        {
          title: isVietnamese
            ? "Chọn kích thước TikTok"
            : "Select TikTok Dimensions",
          description: isVietnamese
            ? "Chọn preset TikTok dọc hoặc kích thước hồ sơ vuông tùy theo nơi tài sản sẽ xuất hiện."
            : "Pick a vertical TikTok preset or a square profile size depending on where the asset will appear.",
        },
        {
          title: isVietnamese ? "Tải xuống và đăng" : "Download and Publish",
          description: isVietnamese
            ? "Xuất ảnh đã đổi kích thước ngay, rồi đăng lên TikTok với thông số khớp nền tảng gọn gàng hơn."
            : "Export the resized image instantly, then post to TikTok with dimensions that fit the platform more cleanly.",
        },
      ]}
      faqs={[
        {
          q: isVietnamese
            ? "Kích thước ảnh TikTok là bao nhiêu?"
            : "What is TikTok image size?",
          a: isVietnamese
            ? "Với phần lớn quy trình của người sáng tạo, canvas dọc 1080 x 1920 vẫn là kích thước làm việc an toàn nhất vì TikTok được xây quanh bố cục toàn màn hình 9:16. Với ảnh hồ sơ, ảnh vuông sẽ dễ chuẩn bị hơn và sau đó TikTok tự crop trong giao diện hồ sơ."
            : "For most creator workflows, a 1080 x 1920 vertical canvas remains the safest working size because TikTok is built around a 9:16 full-screen layout. For profile artwork, a square image is easier to prepare and then TikTok applies its own crop inside the profile UI.",
        },
        {
          q: isVietnamese
            ? "Tôi có thể resize ảnh bìa TikTok không?"
            : "Can I resize TikTok cover photo?",
          a: isVietnamese
            ? "Có. Bạn có thể chuẩn bị một ảnh dọc cho ảnh bìa hoặc thumbnail TikTok để tệp nguồn đã khớp với định hướng hiển thị của nền tảng. Một ảnh nguồn 9:16 sạch thường cho bạn nhiều linh hoạt hơn khi chọn vùng hiển thị sau này."
            : "Yes. You can prepare a vertical image for TikTok cover or thumbnail usage so the source file already matches the platform's visual direction. A clean 9:16 source usually gives you more flexibility when selecting the visible cover area later.",
        },
        {
          q: isVietnamese
            ? "Tôi nên dùng kích thước TikTok nào cho ảnh hồ sơ?"
            : "What TikTok dimensions should I use for a profile picture?",
          a: isVietnamese
            ? "Trung tâm trợ giúp TikTok lưu ý rằng ảnh hồ sơ phải có ít nhất 20 x 20 pixel, nhưng trên thực tế bạn nên tải lên ảnh vuông lớn hơn nhiều để có độ rõ tốt hơn. Preset vuông 200 x 200 là mức cơ bản đơn giản cho ảnh hồ sơ và avatar."
            : "TikTok's Help Center notes that profile photos must be at least 20 x 20 pixels, but in practice you should upload a much larger square image for better clarity. A 200 x 200 square preset is a simple baseline for profile artwork and avatars.",
        },
        {
          q: isVietnamese
            ? "Tôi có nên nén ảnh TikTok trước khi tải lên không?"
            : "Should I compress a TikTok image before uploading?",
          a: isVietnamese
            ? "Thường là có, đặc biệt khi tệp gốc quá nặng. Đổi kích thước trước rồi nén nhẹ sẽ giúp giảm dung lượng mà vẫn giữ ảnh đủ sắc nét để xem trên di động."
            : "Usually yes, especially when the original file is oversized. Resizing first and then running a light compression pass can reduce file weight while keeping the image sharp enough for mobile viewing.",
        },
      ]}
      relatedTools={[
        { name: isVietnamese ? "Resize ảnh Instagram" : "Resize Instagram Image", path: "/resize-instagram" },
        { name: isVietnamese ? "Resize ảnh YouTube" : "Resize YouTube Image", path: "/resize-youtube" },
        { name: isVietnamese ? "Nén ảnh" : "Compress Image", path: "/compress-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-tiktok"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          {
            name: isVietnamese ? "Resize cho TikTok" : "Resize for TikTok",
            url: `${siteUrl}/resize-tiktok`,
          },
        ]}
      />
      <SocialResizeClient presets={getPresets(locale)} defaultPresetIndex={0} />

      <section className="mt-24 space-y-12 bg-card">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {isVietnamese
              ? "Hướng dẫn nhanh về kích thước ảnh TikTok"
              : "Quick TikTok Size Guide"}
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            {isVietnamese
              ? "Nếu bạn chỉ cần các thông tin cốt lõi, hãy bắt đầu từ đây. Tỷ lệ dọc 9:16 là mặc định an toàn nhất cho nội dung hướng tới TikTok, còn ảnh vuông là định dạng dễ dùng nhất cho ảnh hồ sơ và tài sản nhận diện."
              : "If you only need the essentials, start here. Vertical 9:16 is the safest default for TikTok-facing creative, while square artwork is the easiest format for profile images and branding assets."}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese ? "Kích thước ảnh hồ sơ TikTok" : "TikTok Profile Size"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "TikTok cho biết ảnh hồ sơ phải có ít nhất 20 x 20 pixel, nhưng ảnh vuông lớn hơn sẽ cho kết quả sạch hơn với avatar và dấu hiệu thương hiệu."
                : "TikTok says profile photos must be at least 20 x 20 pixels, but a larger square image gives cleaner results for avatars and brand marks."}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese ? "Tỷ lệ ảnh video TikTok" : "TikTok Video Ratio"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "1080 x 1920 vẫn là kích thước thực tế nhất cho nội dung dọc trên TikTok vì nó khớp trải nghiệm xem 9:16 của ứng dụng."
                : "1080 x 1920 remains the most practical TikTok dimension for vertical content because it matches the app&apos;s 9:16 viewing experience."}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {isVietnamese ? "Thumbnail TikTok" : "TikTok Thumbnail"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {isVietnamese
                ? "Hãy bắt đầu với một ảnh nguồn dọc sạch nếu bạn muốn linh hoạt hơn khi căn thumbnail hoặc ảnh kiểu cover về sau."
                : "Start with a clean vertical source if you want more freedom when framing a thumbnail or cover-style image later."}
            </p>
          </article>
        </div>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {isVietnamese
              ? "Cách đổi kích thước ảnh cho TikTok"
              : "How to Resize Image for TikTok"}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {isVietnamese
              ? "Tải ảnh nguồn lên, chọn preset TikTok phù hợp với mục tiêu của bạn, rồi xuất tệp đã đổi kích thước. Nếu bố cục quan trọng, hãy dùng "
              : "Upload your source image, pick the TikTok preset that matches your goal, and export the resized file. If composition matters, use "}
            <Link
              href="/crop-image"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese ? "Cắt ảnh" : "Crop Image"}
            </Link>{" "}
            {isVietnamese
              ? "trước. Nếu tệp vẫn còn nặng hơn mức cần thiết, hãy hoàn tất bằng "
              : "first. If the file is still heavier than it needs to be, finish with "}
            <Link
              href="/compress-image"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese ? "Nén ảnh" : "Compress Image"}
            </Link>{" "}
            {isVietnamese ? "để có bản tải lên nhẹ hơn." : "for a lighter upload."}
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {isVietnamese
              ? "Xây dựng quy trình mạng xã hội tốt hơn"
              : "Build a Better Social Workflow"}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {isVietnamese
              ? "Tính năng resize cho TikTok hoạt động hiệu quả nhất khi là một phần của quy trình nội dung rộng hơn. Khi ảnh đã sẵn sàng tại đây, bạn có thể tiếp tục sang "
              : "TikTok resize works best as part of a broader content pipeline. Once your asset is ready here, continue into "}
            <Link
              href="/resize-instagram"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese ? "resize cho Instagram" : "Instagram resize"}
            </Link>
            ,{" "}
            <Link
              href="/resize-youtube"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese ? "resize cho YouTube" : "YouTube resize"}
            </Link>
            , and{" "}
            <Link
              href="/compress-image"
              className="font-medium text-primary hover:underline"
            >
              {isVietnamese ? "nén ảnh" : "image compression"}
            </Link>{" "}
            {isVietnamese
              ? "để giữ cho tài sản mạng xã hội của bạn nhất quán và gọn nhẹ."
              : "to keep your social assets consistent and lightweight."}
          </p>
        </section>
      </section>
    </ToolLayout>
  );
}
