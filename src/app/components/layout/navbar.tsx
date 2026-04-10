"use client";

import { useState, type FocusEvent } from "react";
import { Camera, FileImage, type LucideIcon } from "lucide-react";
import { NavbarMobile } from "./navbar-mobile";
import { BrandLogo } from "./brand-logo";
import {
  convertTools,
  socialResizeTools,
  toolsMenu,
  topLevelNavItems,
  type LocalizedNavItem,
  type NavItem,
} from "./navbar-data";
import { NavActiveButton, NavLink } from "./nav-link";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";
import { DesktopLanguageMenu } from "./language-switcher";
import { localizeNavItem, useI18n } from "@/app/lib/i18n";
import { Link } from "@/i18n/navigation";

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
  items: LocalizedNavItem[];
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
  items: LocalizedNavItem[];
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

      <div className={cn("left-0", getPanelClassName(isOpen))}>
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
  const { t } = useI18n();
  const localizedToolsMenuItems = toolsMenu.items.map((item) =>
    localizeNavItem(item, t),
  );
  const localizedConvertTools = convertTools.map((item) =>
    localizeNavItem(item, t),
  );
  const localizedSocialResizeTools = socialResizeTools.map((item) =>
    localizeNavItem(item, t),
  );
  const localizedTopLevelNavItems = topLevelNavItems.map((item) =>
    localizeNavItem(item, t),
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40 relative">
      <div className="container mx-auto grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 px-4 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label={SITE_NAME}
          className="justify-self-start transition-transform duration-300 hover:scale-[1.01]"
        >
          <BrandLogo
            iconClassName="h-10"
            textClassName="[&>span:first-child]:text-[1.7rem]"
          />
        </Link>

        <nav className="hidden items-center justify-self-center gap-1 md:flex">
          <DesktopMegaMenu
            label={t("navigation.tools")}
            icon={toolsMenu.icon}
            items={localizedToolsMenuItems}
            menuKey="tools"
            openMenu={openMenu}
            onOpen={setOpenMenu}
            onClose={() => setOpenMenu(null)}
          />

          <DesktopDropdown
            label={t("navigation.convertImage")}
            icon={FileImage}
            items={localizedConvertTools}
            panelWidthClass="w-48"
            menuKey="convert"
            openMenu={openMenu}
            onOpen={setOpenMenu}
            onClose={() => setOpenMenu(null)}
          />

          <DesktopDropdown
            label={t("navigation.socialResize")}
            icon={Camera}
            items={localizedSocialResizeTools}
            panelWidthClass="w-52"
            menuKey="social"
            openMenu={openMenu}
            onOpen={setOpenMenu}
            onClose={() => setOpenMenu(null)}
          />

          {localizedTopLevelNavItems.map((item) => {
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

        <div className="flex items-center justify-end gap-2">
          <DesktopLanguageMenu />
          <NavbarMobile />
        </div>
      </div>
    </header>
  );
}
