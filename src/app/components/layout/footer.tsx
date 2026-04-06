import Link from "next/link";
import { BrandLogo } from "./brand-logo";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border/50 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" aria-label="OptiMAGES.com" className="opacity-90">
            <BrandLogo
              iconClassName="h-10"
              textClassName="[&>span:first-child]:text-[1.6rem] [&>span:nth-child(2)]:text-[1.6rem] [&>span:last-child]:text-[0.88rem]"
            />
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} OptiMAGES.com</span>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
