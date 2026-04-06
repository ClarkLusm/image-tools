"use client";

import { useState, type FocusEvent } from "react";
import Link from "next/link";
import { Camera, FileImage, type LucideIcon } from "lucide-react";
import { NavbarMobile } from "./navbar-mobile";
import { BrandLogo } from "./brand-logo";
import {
  convertTools,
  socialResizeTools,
  toolsMenu,
  topLevelNavItems,
  type NavItem,
} from "./navbar-data";
import { NavActiveButton, NavLink } from "./nav-link";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

type DesktopMenuKey = "tools" | "convert" | "social";

function getItemPaths(item: NavItem) {
  return item.activePaths ?? [item.path];
}

function getPanelClassName(isOpen: boolean) {
  return cn(
    "absolute top-full z-50 pt-2 transition-all duration-200",
    isOpen
      ? "visible translate-y-0 opacity-100 pointer-events-auto"
      : "invisible translate-y-1 opacity-0 pointer-events-none"
  );
}

function handleBlur(
  event: FocusEvent<HTMLDivElement>,
  onClose: () => void
) {
  const nextTarget = event.relatedTarget;

  if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
    onClose();
  }
}

function DesktopDropdown({
  label,
  icon: Icon,
  items,
  panelWidthClass,
  menuKey,
  openMenu,
  onOpen,
  onClose,
}: {
  label: string;
  icon: LucideIcon;
  items: NavItem[];
  panelWidthClass: string;
  menuKey: DesktopMenuKey;
  openMenu: DesktopMenuKey | null;
  onOpen: (menuKey: DesktopMenuKey) => void;
  onClose: () => void;
}) {
  const isOpen = openMenu === menuKey;

  return (
    <div
      className="relative"
      onMouseEnter={() => onOpen(menuKey)}
      onMouseLeave={onClose}
      onFocusCapture={() => onOpen(menuKey)}
      onBlurCapture={(event) => handleBlur(event, onClose)}
    >
      <NavActiveButton
        paths={items.map((item) => item.path)}
        onClick={() => (isOpen ? onClose() : onOpen(menuKey))}
        ariaExpanded={isOpen}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
        activeClassName="bg-primary/10 text-primary"
        inactiveClassName="text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <Icon className="w-4 h-4" />
        {label}
      </NavActiveButton>

      <div className={cn("right-0", getPanelClassName(isOpen))}>
        <div
          className={`${panelWidthClass} max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-white shadow-lg p-2`}
        >
          {items.map((tool) => {
            const ToolIcon = tool.icon;

            return (
              <NavLink
                key={tool.path}
                href={tool.path}
                match="startsWith"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                activeClassName="bg-primary/10 text-primary"
                inactiveClassName="text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <ToolIcon className="w-4 h-4" />
                {tool.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DesktopMegaMenu({
  label,
  icon: Icon,
  items,
  menuKey,
  openMenu,
  onOpen,
  onClose,
}: {
  label: string;
  icon: LucideIcon;
  items: NavItem[];
  menuKey: DesktopMenuKey;
  openMenu: DesktopMenuKey | null;
  onOpen: (menuKey: DesktopMenuKey) => void;
  onClose: () => void;
}) {
  const isOpen = openMenu === menuKey;

  return (
    <div
      className="relative"
      onMouseEnter={() => onOpen(menuKey)}
      onMouseLeave={onClose}
      onFocusCapture={() => onOpen(menuKey)}
      onBlurCapture={(event) => handleBlur(event, onClose)}
    >
      <NavActiveButton
        paths={items.flatMap(getItemPaths)}
        onClick={() => (isOpen ? onClose() : onOpen(menuKey))}
        ariaExpanded={isOpen}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
        activeClassName="bg-primary/10 text-primary"
        inactiveClassName="text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <Icon className="w-4 h-4" />
        {label}
      </NavActiveButton>

      <div className={cn("right-0", getPanelClassName(isOpen))}>
        <div className="w-[min(36rem,calc(100vw-2rem))] rounded-2xl border border-border bg-white p-3 shadow-xl">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((tool) => {
              const ToolIcon = tool.icon;

              return (
                <NavLink
                  key={tool.path}
                  href={tool.path}
                  match="startsWith"
                  activePaths={getItemPaths(tool)}
                  onClick={onClose}
                  className="group/item rounded-xl border p-4 transition-colors"
                  activeClassName="border-primary/25 bg-primary/10 text-primary"
                  inactiveClassName="border-border bg-background text-foreground hover:border-primary/20 hover:bg-secondary/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                      <ToolIcon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-semibold">{tool.name}</div>
                      <p className="text-xs leading-5 text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<DesktopMenuKey | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40 relative">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label={SITE_NAME}
          className="transition-transform duration-300 hover:scale-[1.01]"
        >
          <BrandLogo
            iconClassName="h-10"
            textClassName="[&>span:first-child]:text-[1.7rem]"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <DesktopMegaMenu
            label={toolsMenu.name}
            icon={toolsMenu.icon}
            items={toolsMenu.items}
            menuKey="tools"
            openMenu={openMenu}
            onOpen={setOpenMenu}
            onClose={() => setOpenMenu(null)}
          />

          <DesktopDropdown
            label="Convert Image"
            icon={FileImage}
            items={convertTools}
            panelWidthClass="w-48"
            menuKey="convert"
            openMenu={openMenu}
            onOpen={setOpenMenu}
            onClose={() => setOpenMenu(null)}
          />

          <DesktopDropdown
            label="Social Resize"
            icon={Camera}
            items={socialResizeTools}
            panelWidthClass="w-52"
            menuKey="social"
            openMenu={openMenu}
            onOpen={setOpenMenu}
            onClose={() => setOpenMenu(null)}
          />

          {topLevelNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                href={item.path}
                onClick={() => setOpenMenu(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                activePaths={getItemPaths(item)}
                activeClassName="bg-primary/10 text-primary"
                inactiveClassName="text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <NavbarMobile />
      </div>
    </header>
  );
}
