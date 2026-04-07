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
      <div className="bg-[#FCFCFC] p-4">
        <div className="mb-4">
          <h3 className="text-xl font-display font-bold text-foreground">
            Maybe You Need
          </h3>
        </div>

        <div className="py-6">
          {visibleGroups.map((group) => (
            <section key={group.label}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(pathname, item);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                      active
                        ? "bg-white text-primary shadow-[inset_0_0_0_1px_rgba(14,165,233,0.12)]"
                        : "text-slate-500 hover:bg-white hover:text-primary"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                );
              })}
            </section>
          ))}
        </div>
      </div>
    </aside>
  );
}
