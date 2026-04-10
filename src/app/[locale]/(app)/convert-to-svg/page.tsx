import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  AppWindow,
  ArrowRight,
  Camera,
  FileImage,
  ScanSearch,
  Scissors,
  Signature,
  VectorSquare,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import { createPageMetadata } from "@/app/lib/metadata";

type Locale = "en" | "vi";

type VisualCard = {
  icon: LucideIcon;
  iconClassName: string;
  panelClassName: string;
};

const cardVisuals: VisualCard[] = [
  {
    icon: VectorSquare,
    iconClassName: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
    panelClassName: "bg-gradient-to-br from-sky-50/70 via-white to-white",
  },
  {
    icon: AppWindow,
    iconClassName: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
    panelClassName: "bg-gradient-to-br from-violet-50/70 via-white to-white",
  },
  {
    icon: Signature,
    iconClassName: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    panelClassName: "bg-gradient-to-br from-emerald-50/70 via-white to-white",
  },
  {
    icon: Camera,
    iconClassName: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
    panelClassName: "bg-gradient-to-br from-amber-50/70 via-white to-white",
  },
];

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  visualGuide: {
    title: string;
    description: string;
    eyebrow: string;
  };
  imageAlts: {
    hero: string;
    useCases: string;
    comparison: string;
  };
  steps: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  cards: { title: string; description: string }[];
  sectionA: {
    title: string;
    body: string[];
  };
  sectionB: {
    title: string;
    body: string[];
  };
  ctas: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  breadcrumbs: {
    home: string;
    current: string;
  };
};

const pageContent: Record<Locale, PageContent> = {
  en: {
    metaTitle: "Convert Image to SVG Online (Free) - JPG, PNG, WebP to SVG",
    metaDescription:
      "Convert image to SVG online free. Trace JPG, PNG, and WebP into scalable SVG files for logos, icons, signatures, and simple artwork.",
    title: "Convert Image to SVG Online",
    description:
      "Trace JPG, PNG, and WebP into clean SVG output for logos, icons, signatures, and simple graphics that need scalable vector results.",
    visualGuide: {
      eyebrow: "Vector Tracing",
      title: "See how raster artwork turns into scalable SVG",
      description:
        "This workflow is built for true SVG tracing, not fake file extension swaps. Cleaner source graphics lead to cleaner vector paths.",
    },
    imageAlts: {
      hero:
        "Illustration showing a raster image being traced into SVG vector paths",
      useCases:
        "Examples of logo, icon, signature, and badge graphics that work well for SVG conversion",
      comparison:
        "Side by side comparison of raster pixels and smooth SVG vector curves",
    },
    steps: [
      {
        title: "Upload a Raster Image",
        description:
          "Start with a JPG, PNG, or WebP file that has clear edges and simple shapes.",
      },
      {
        title: "Trace It into SVG",
        description:
          "The tool converts pixels into vector-style paths automatically after upload.",
      },
      {
        title: "Download the SVG",
        description:
          "Save the traced SVG for logos, print mockups, slides, or lightweight graphics workflows.",
      },
    ],
    faqs: [
      {
        q: "Is this a real SVG conversion or just a file rename?",
        a: "This workflow performs raster-to-SVG tracing rather than simply renaming the file extension. The output is generated as SVG markup so it can scale more cleanly than the source bitmap, especially for simple graphics with defined edges and limited colors.",
      },
      {
        q: "What images work best for Convert to SVG?",
        a: "The best source files are logos, icons, signatures, labels, badges, and flat illustrations. These images usually have clearer boundaries and fewer color transitions, which helps the tracer generate lighter and more usable SVG paths. Highly detailed photos can still be processed, but they often create larger and more complex SVG output.",
      },
      {
        q: "Can I convert a photo to SVG?",
        a: "Yes, but photo-based SVG output is rarely as clean as logo or icon tracing. Photographs contain gradients, textures, and tiny detail changes, so the vector result can become dense and harder to edit. If your goal is a practical SVG for design use, start with simple artwork or clean the image first.",
      },
      {
        q: "Are my files uploaded to the server?",
        a: "Yes. Convert to SVG is processed through our API because vector tracing is heavier than browser-only format conversion. Files are used only to generate the requested SVG output and temporary artifacts are cleaned up after the job expires.",
      },
    ],
    cards: [
      {
        title: "Best for Logos",
        description:
          "Brand marks and badges with clear edges usually trace into cleaner SVG output.",
      },
      {
        title: "Best for Icons",
        description:
          "Simple UI graphics and symbols work well because they have limited colors and defined shapes.",
      },
      {
        title: "Great for Signatures",
        description:
          "Handwritten marks and stamps can become scalable SVG assets for documents and mockups.",
      },
      {
        title: "Less Ideal for Photos",
        description:
          "Busy photography can still convert, but the resulting SVG may become larger and harder to edit.",
      },
    ],
    sectionA: {
      title: "When Should You Convert an Image to SVG?",
      body: [
        "SVG is most useful when you need artwork that scales cleanly across different sizes. That makes it a strong choice for logos, icons, simple illustrations, and signature-style graphics used in branding, slides, mockups, and print-ready layouts.",
        "If your search intent is image to SVG converter or convert PNG to SVG, the real need is usually scalability and cleaner reuse. Vector-style output can stay sharper across layouts than a small bitmap reused again and again.",
      ],
    },
    sectionB: {
      title: "Raster vs SVG - What Changes?",
      body: [
        "Raster files such as JPG, PNG, and WebP are built from pixels. SVG files describe shapes, curves, and fills with markup instead. That is why SVG can scale without the same kind of softness you see when a bitmap is enlarged too far.",
        "However, raster-to-SVG conversion is not magic. A detailed source image can turn into a very complex SVG. The cleanest results usually come from flat artwork, high contrast edges, and images that are already visually simple.",
      ],
    },
    ctas: {
      title: "Prepare your source before tracing",
      description:
        "Cleaning the image first often leads to a better SVG. Remove the background, crop tightly, or export a clean PNG before tracing.",
      primaryLabel: "Remove Background",
      primaryHref: "/remove-background",
      secondaryLabel: "Convert to PNG",
      secondaryHref: "/convert-to-png",
    },
    breadcrumbs: {
      home: "Home",
      current: "Convert to SVG",
    },
  },
  vi: {
    metaTitle: "Chuyển ảnh sang SVG online miễn phí - JPG, PNG, WebP sang SVG",
    metaDescription:
      "Chuyển ảnh sang SVG online miễn phí. Chuyển ảnh JPG, PNG và WebP thành SVG có thể scale cho logo, icon, chữ ký và graphic đơn giản.",
    title: "Chuyển ảnh sang SVG online",
    description:
      "Chuyển ảnh JPG, PNG và WebP thành SVG cho logo, icon, chữ ký và graphic đơn giản khi bạn cần đầu ra vector dễ scale hơn.",
    visualGuide: {
      eyebrow: "Vector Tracing",
      title: "Xem cách ảnh raster được trace thành SVG dễ scale",
      description:
        "Workflow này được tối ưu cho việc trace hình khối thật, không phải kiểu đổi đuôi file giả. Ảnh nguồn càng sạch thì path vector đầu ra càng đẹp.",
    },
    imageAlts: {
      hero: "Minh họa quá trình trace ảnh raster thành các path SVG vector",
      useCases:
        "Ví dụ logo, icon, chữ ký và badge là các loại ảnh phù hợp để chuyển ảnh sang SVG",
      comparison:
        "So sánh cận cảnh giữa pixel raster và đường cong vector SVG mượt hơn",
    },
    steps: [
      {
        title: "Tải ảnh raster lên",
        description:
          "Bắt đầu với file JPG, PNG hoặc WebP có viền rõ và hình khối đơn giản.",
      },
      {
        title: "Chuyển ảnh sang SVG",
        description:
          "Tool sẽ tự động chuyển pixel thành các path kiểu vector ngay sau khi upload.",
      },
      {
        title: "Tải file SVG về",
        description:
          "Lưu SVG đã chuyển đổi để dùng cho logo, slide, mockup hoặc workflow graphic gọn nhẹ.",
      },
    ],
    faqs: [
      {
        q: "Đây là convert SVG thật hay chỉ đổi đuôi file?",
        a: "Đây là workflow trace raster sang SVG chứ không phải chỉ đổi đuôi file. Kết quả đầu ra được tạo dưới dạng SVG markup để có thể scale sạch hơn file bitmap gốc, đặc biệt với các ảnh đơn giản có viền rõ và ít màu.",
      },
      {
        q: "Loại ảnh nào phù hợp nhất để chuyển ảnh sang SVG?",
        a: "Các file phù hợp nhất là logo, icon, chữ ký, nhãn, badge và illustration phẳng. Những ảnh này thường có biên rõ và ít chuyển màu hơn, nên tracer tạo ra SVG nhẹ và dễ dùng hơn. Ảnh chụp nhiều chi tiết vẫn có thể xử lý nhưng thường tạo ra file SVG phức tạp hơn.",
      },
      {
        q: "Có thể chuyển ảnh chụp sang SVG không?",
        a: "Có, nhưng SVG từ ảnh chụp hiếm khi sạch bằng logo hoặc icon. Ảnh chụp có gradient, texture và rất nhiều thay đổi chi tiết nhỏ, nên file vector sau khi trace có thể dày path và khó chỉnh sửa hơn. Nếu bạn cần SVG thực dụng cho thiết kế, hãy bắt đầu từ graphic đơn giản hoặc làm sạch ảnh trước.",
      },
      {
        q: "File có được upload lên server không?",
        a: "Có. Convert to SVG được xử lý qua API vì vector tracing nặng hơn convert format chạy ngay trong browser. File chỉ được dùng để tạo ra SVG mà bạn yêu cầu và các artifact tạm sẽ được dọn sau khi job hết hạn.",
      },
    ],
    cards: [
      {
        title: "Hợp với Logo",
        description:
          "Logo và badge có viền rõ thường trace ra SVG sạch hơn và dễ dùng hơn.",
      },
      {
        title: "Hợp với Icon",
        description:
          "Graphic giao diện và biểu tượng đơn giản hoạt động tốt vì ít màu và có shape rõ ràng.",
      },
      {
        title: "Tốt cho Chữ ký",
        description:
          "Chữ ký hoặc dấu tay có thể thành asset SVG dễ scale cho tài liệu và mockup.",
      },
      {
        title: "Không lý tưởng cho Ảnh chụp",
        description:
          "Ảnh nhiều chi tiết vẫn convert được, nhưng SVG tạo ra thường nặng và khó chỉnh sửa hơn.",
      },
    ],
    sectionA: {
      title: "Khi nào nên chuyển ảnh sang SVG?",
      body: [
        "SVG hữu ích nhất khi bạn cần graphic có thể scale sạch ở nhiều kích thước khác nhau. Vì thế nó rất phù hợp cho logo, icon, illustration đơn giản và graphic dạng chữ ký dùng trong branding, slide, mockup và bố cục in ấn.",
        "Nếu bạn đang tìm image to SVG converter hoặc convert PNG to SVG, nhu cầu thực tế thường là cần file dễ scale và tái sử dụng sạch hơn. Đầu ra kiểu vector sẽ giữ cảm giác sắc hơn so với việc phóng to một bitmap nhỏ quá nhiều lần.",
      ],
    },
    sectionB: {
      title: "Raster và SVG khác nhau ở điểm nào?",
      body: [
        "Các file raster như JPG, PNG và WebP được tạo từ pixel. SVG thì mô tả shape, curve và fill bằng markup. Đó là lý do SVG có thể scale mà không bị mềm như bitmap khi bị phóng quá lớn.",
        "Tuy vậy, trace raster sang SVG không phải phép màu. Một ảnh nguồn quá chi tiết có thể tạo ra SVG rất phức tạp. Kết quả sạch nhất thường đến từ artwork phẳng, biên tương phản rõ và bố cục vốn đã đơn giản.",
      ],
    },
    ctas: {
      title: "Làm sạch ảnh trước khi trace",
      description:
        "Dọn nguồn trước thường cho SVG đẹp hơn. Hãy xóa nền, crop gọn hoặc xuất PNG sạch trước khi trace.",
      primaryLabel: "Xóa nền",
      primaryHref: "/remove-background",
      secondaryLabel: "Chuyển sang PNG",
      secondaryHref: "/convert-to-png",
    },
    breadcrumbs: {
      home: "Trang chủ",
      current: "Chuyển ảnh sang SVG",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/convert-to-svg",
    title: {
      en: pageContent.en.metaTitle,
      vi: pageContent.vi.metaTitle,
    },
    description: {
      en: pageContent.en.metaDescription,
      vi: pageContent.vi.metaDescription,
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = pageContent[(locale as Locale) === "vi" ? "vi" : "en"];

  return (
    <ToolLayout
      title={content.title}
      description={content.description}
      schemaPath="/convert-to-svg"
      steps={content.steps}
      faqs={content.faqs}
      relatedTools={[
        { name: "Convert to PNG", path: "/convert-to-png" },
        { name: "Remove Background", path: "/remove-background" },
        { name: "Crop Image", path: "/crop-image" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    >
      <div className="space-y-12">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-convert-to-svg"
          items={[
            { name: content.breadcrumbs.home, url: `${SITE_URL}/` },
            {
              name: content.breadcrumbs.current,
              url: `${SITE_URL}/convert-to-svg`,
            },
          ]}
        />

        <FormatConvertClient
          task="convert-to-svg"
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
          }}
          outputExt=".svg"
          outputMime="image/svg+xml"
          showQuality={false}
          autoProcessOnSelect
        />

        <section className="overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-r from-primary/[0.08] via-white to-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-12 lg:items-center">
            <div className="p-6 md:p-8 lg:col-span-5">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <VectorSquare className="h-3.5 w-3.5" />
                {content.visualGuide.eyebrow}
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground md:text-3xl">
                {content.visualGuide.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                {content.visualGuide.description}
              </p>
            </div>

            <div className="relative min-h-[280px] border-t border-primary/10 bg-white lg:col-span-7 lg:min-h-[360px] lg:border-t-0 lg:border-l">
              <Image
                src="/images/hero-raster-to-svg.webp"
                alt={content.imageAlts.hero}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card, index) => {
            const visual = cardVisuals[index % cardVisuals.length];
            const CardIcon = visual.icon;

            return (
              <article
                key={card.title}
                className={`rounded-2xl border border-border/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)] transition-transform hover:-translate-y-1 ${visual.panelClassName}`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${visual.iconClassName}`}
                >
                  <CardIcon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {card.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-8">
          <article className="overflow-hidden rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50/70 via-white to-white shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
            <div className="grid gap-0 lg:grid-cols-12 lg:items-stretch">
              <div className="p-6 md:p-8 lg:col-span-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <Wand2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {content.sectionA.title}
                </h2>
                {content.sectionA.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 leading-7 text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="relative min-h-[260px] border-t border-sky-100 bg-white lg:col-span-6 lg:min-h-[100%] lg:border-t-0 lg:border-l">
                <Image
                  src="/images/svg-use-cases.webp"
                  alt={content.imageAlts.useCases}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/70 via-white to-white shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
            <div className="grid gap-0 lg:grid-cols-12 lg:items-stretch">
              <div className="relative order-2 min-h-[260px] border-t border-emerald-100 bg-white lg:order-1 lg:col-span-6 lg:min-h-[100%] lg:border-t-0 lg:border-r">
                <Image
                  src="/images/raster-vs-vector-zoom.webp"
                  alt={content.imageAlts.comparison}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="order-1 p-6 md:p-8 lg:order-2 lg:col-span-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <ScanSearch className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {content.sectionB.title}
                </h2>
                {content.sectionB.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 leading-7 text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-xl border border-primary/10 bg-gradient-to-r from-primary/[0.08] via-white to-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-display font-bold text-foreground">
                {content.ctas.title}
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                {content.ctas.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
              <Link
                href={content.ctas.primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(37,99,235,0.24)] transition-transform hover:-translate-y-0.5"
              >
                <Scissors className="h-4 w-4" />
                {content.ctas.primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={content.ctas.secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <FileImage className="h-4 w-4" />
                {content.ctas.secondaryLabel}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
}
