import { Link } from "@/i18n/navigation";
import { Clock3, ArrowRight } from "lucide-react";

type ComingSoonPageProps = {
  title?: string;
  description?: string;
};

const quickLinks = [
  { href: "/compress-image", label: "Compress Image" },
  { href: "/resize-image", label: "Resize Image" },
  { href: "/crop-image", label: "Crop Image" },
  { href: "/convert-to-webp", label: "Convert to WebP" },
];

export function ComingSoonPage({
  title = "Coming Soon",
  description = "This page is on the way. In the meantime, you can keep working with the tools that are already live.",
}: ComingSoonPageProps) {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-12">
        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Clock3 className="h-8 w-8" />
        </div>

        <h1 className="page-title-gradient text-4xl font-black tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              {item.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
