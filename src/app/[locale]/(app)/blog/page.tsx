import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Image as ImageIcon, Sparkles } from "lucide-react";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { createPageMetadata } from "@/app/lib/metadata";

const upcomingPosts = [
  {
    title: "How to choose the right image format for the web",
    description:
      "A practical guide to JPG, JPEG, PNG, and WebP with examples for content sites and landing pages.",
  },
  {
    title: "Image compression tips that keep quality intact",
    description:
      "Workflows for shrinking file sizes without making product photos, blog images, or banners look soft.",
  },
  {
    title: "Social resize checklists for major platforms",
    description:
      "Recommended dimensions and prep tips for Instagram, TikTok, YouTube, and Facebook assets.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/blog",
    title: {
      en: "Blog",
      vi: "Blog",
    },
    description: {
      en: `Read upcoming guides, tutorials, and practical image optimization tips from ${SITE_NAME}.`,
      vi: `Đọc các hướng dẫn sắp ra mắt, tutorial và mẹo tối ưu ảnh thực tế từ ${SITE_NAME}.`,
    },
    openGraphTitle: {
      en: `${SITE_NAME} Blog`,
      vi: `Blog ${SITE_NAME}`,
    },
    openGraphDescription: {
      en: "Upcoming guides and practical tutorials for compression, conversion, resizing, and image workflows.",
      vi: "Các hướng dẫn sắp ra mắt và tutorial thực tế về nén ảnh, chuyển đổi định dạng, resize và workflow xử lý ảnh.",
    },
  });
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background py-12 lg:py-20">
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-blog"
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl">
        <section className="rounded-[2rem] border border-border bg-white px-6 py-10 md:px-10 md:py-14 shadow-xl shadow-black/[0.04]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              <BookOpen className="h-4 w-4" />
              {SITE_NAME} Blog
            </div>
            <h1 className="page-title-gradient mt-5 text-3xl font-display font-extrabold tracking-tight md:text-5xl">
              Guides and practical image tips are on the way.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
              This blog hub is ready for tutorials, optimization walkthroughs,
              and format guides. While the first articles are being prepared,
              you can jump straight into the tools and start working on your
              images now.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/compress-image"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-95"
              >
                Explore tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/convert-to-webp"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Start with WebP
                <ImageIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">
            <Sparkles className="h-4 w-4" />
            Planned topics
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {upcomingPosts.map((post) => (
              <article
                key={post.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm shadow-black/[0.03]"
              >
                <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                  Coming soon
                </span>
                <h2 className="mt-4 text-xl font-display font-bold text-foreground">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
