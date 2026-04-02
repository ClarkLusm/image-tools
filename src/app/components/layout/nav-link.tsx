"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type MatchMode = "exact" | "startsWith";

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function matchPath(pathname: string, target: string, mode: MatchMode) {
  const normalizedPathname = normalizePath(pathname);
  const normalizedTarget = normalizePath(target);

  if (mode === "startsWith") {
    return (
      normalizedPathname === normalizedTarget ||
      normalizedPathname.startsWith(`${normalizedTarget}/`)
    );
  }

  return normalizedPathname === normalizedTarget;
}

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName: string;
  inactiveClassName: string;
  match?: MatchMode;
  activePaths?: string[];
};

export function NavLink({
  href,
  children,
  className,
  activeClassName,
  inactiveClassName,
  match = "exact",
  activePaths,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    activePaths && activePaths.length > 0
      ? activePaths.some((path) => matchPath(pathname, path, "startsWith"))
      : matchPath(pathname, href, match);

  return (
    <Link
      href={href}
      className={cn(className, isActive ? activeClassName : inactiveClassName)}
    >
      {children}
    </Link>
  );
}

type NavActiveButtonProps = {
  paths: string[];
  children: ReactNode;
  className?: string;
  activeClassName: string;
  inactiveClassName: string;
};

export function NavActiveButton({
  paths,
  children,
  className,
  activeClassName,
  inactiveClassName,
}: NavActiveButtonProps) {
  const pathname = usePathname();
  const isActive = paths.some((path) => matchPath(pathname, path, "startsWith"));

  return (
    <button
      type="button"
      className={cn(className, isActive ? activeClassName : inactiveClassName)}
    >
      {children}
    </button>
  );
}
