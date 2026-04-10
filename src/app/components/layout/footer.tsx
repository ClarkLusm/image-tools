"use client";

import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site";
import { BrandLogo } from "./brand-logo";
import { useI18n } from "@/app/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-white border-t border-border/50 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" aria-label={SITE_NAME} className="opacity-90">
            <BrandLogo
              iconClassName="h-10"
              textClassName="[&>span:first-child]:text-[1.6rem]"
            />
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} {SITE_NAME}</span>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              {t("footer.about")}
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              {t("footer.terms")}
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors">
              {t("footer.blog")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
