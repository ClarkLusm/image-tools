import { Link } from "@/i18n/navigation";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToolNextActionItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  cta?: string;
};

type ToolNextActionsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: ToolNextActionItem[];
  className?: string;
};

export default function ToolNextActions({
  eyebrow,
  title,
  description,
  items,
  className,
}: ToolNextActionsProps) {
  return (
    <section
      className={cn(
        "overflow-hidden",
        className,
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 text-2xl font-display font-bold text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-border/80 bg-background/90 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
              {item.cta ? (
                <div className="mt-4 flex items-center text-sm font-bold text-primary">
                  {item.cta}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
