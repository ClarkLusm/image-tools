"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  convertTools,
  primaryTools,
  socialResizeTools,
  type NavItem,
} from "./navbar-data";

type ToolGroup = {
  label: string;
  items: NavItem[];
};

const toolGroups: ToolGroup[] = [
  {
    label: "AI Processing",
    items: primaryTools,
  },
  {
    label: "Convert",
    items: convertTools,
  },
  {
    label: "Social Resize",
    items: socialResizeTools,
  },
];

function normalizePath(path: string) {
  if (path === "/") {
    return path;
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function matchesPath(pathname: string, target: string) {
  const normalizedPathname = normalizePath(pathname);
  const normalizedTarget = normalizePath(target);

  return (
    normalizedPathname === normalizedTarget ||
    normalizedPathname.startsWith(`${normalizedTarget}/`)
  );
}

function isItemActive(pathname: string, item: NavItem) {
  const paths = item.activePaths?.length ? item.activePaths : [item.path];
  return paths.some((path) => matchesPath(pathname, path));
}

export function ToolSidebar() {
  const pathname = usePathname();
  const currentGroupLabel = toolGroups.find((group) =>
    group.items.some((item) => isItemActive(pathname, item)),
  )?.label;
  const visibleGroups = toolGroups.filter(
    (group) => group.label !== currentGroupLabel,
  );

  return (
    <aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
      <div className="bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Tools
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Image editing</p>
        </div>

        <div className="space-y-8">
          {visibleGroups.map((group) => (
            <section key={group.label}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
                {group.label}
              </p>
              <div className="space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(pathname, item);

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                        active
                          ? "bg-primary/8 text-primary shadow-[inset_0_0_0_1px_rgba(14,165,233,0.12)]"
                          : "text-slate-500 hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </aside>
  );
}
