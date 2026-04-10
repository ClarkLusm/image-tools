"use client";

import { useState } from "react";
import { Menu, X, Camera, FileImage } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  convertTools,
  socialResizeTools,
  toolsMenu,
  topLevelNavItems,
  type LocalizedNavItem,
  type NavItem,
} from "./navbar-data";
import { MobileLanguageMenu } from "./language-switcher";
import { localizeNavItem, useI18n } from "@/app/lib/i18n";

function getItemPaths(item: NavItem | LocalizedNavItem) {
  return item.activePaths ?? [item.path];
}

function matchesPath(pathname: string, target: string) {
  return pathname === target || pathname.startsWith(`${target}/`);
}

export function NavbarMobile() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
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

  const closeMenu = () => {
    setIsOpen(false);
    setIsToolsOpen(false);
    setIsConvertOpen(false);
    setIsSocialOpen(false);
  };

  const isToolsActive = localizedToolsMenuItems.some((tool) =>
    getItemPaths(tool).some((path) => matchesPath(pathname, path))
  );
  const isConvertActive = localizedConvertTools.some((tool) =>
    matchesPath(pathname, tool.path)
  );
  const isSocialActive = localizedSocialResizeTools.some((tool) =>
    matchesPath(pathname, tool.path)
  );
  const ToolsIcon = toolsMenu.icon;

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={t("navigation.toggleMenu")}
        aria-expanded={isOpen}
        onClick={() => {
          if (isOpen) {
            closeMenu();
            return;
          }
          setIsOpen(true);
        }}
        className="p-2 text-muted-foreground hover:text-foreground"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-border bg-background z-50">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setIsToolsOpen((prev) => !prev)}
              className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                isToolsActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-3">
                <ToolsIcon className="w-5 h-5" />
                {t("navigation.tools")}
              </span>
              <span className="text-sm">{isToolsOpen ? "−" : "+"}</span>
            </button>

            {isToolsOpen && (
              <div className="ml-4 flex flex-col gap-2">
                {localizedToolsMenuItems.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = getItemPaths(tool).some((path) =>
                    matchesPath(pathname, path)
                  );

                  return (
                    <Link
                      key={tool.path}
                      href={tool.path}
                      onClick={closeMenu}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tool.name}
                    </Link>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsConvertOpen((prev) => !prev)}
              className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                isConvertActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-3">
                <FileImage className="w-5 h-5" />
                {t("navigation.convertImage")}
              </span>
              <span className="text-sm">{isConvertOpen ? "−" : "+"}</span>
            </button>

            {isConvertOpen && (
              <div className="ml-4 flex flex-col gap-2">
                {localizedConvertTools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = matchesPath(pathname, tool.path);

                  return (
                    <Link
                      key={tool.path}
                      href={tool.path}
                      onClick={closeMenu}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tool.name}
                    </Link>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsSocialOpen((prev) => !prev)}
              className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                isSocialActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-3">
                <Camera className="w-5 h-5" />
                {t("navigation.socialResize")}
              </span>
              <span className="text-sm">{isSocialOpen ? "−" : "+"}</span>
            </button>

            {isSocialOpen && (
              <div className="ml-4 flex flex-col gap-2">
                {localizedSocialResizeTools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = matchesPath(pathname, tool.path);

                  return (
                    <Link
                      key={tool.path}
                      href={tool.path}
                      onClick={closeMenu}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tool.name}
                    </Link>
                  );
                })}
              </div>
            )}

            {localizedTopLevelNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = getItemPaths(item).some((path) =>
                matchesPath(pathname, path)
              );

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center gap-3 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}

            <MobileLanguageMenu />
          </nav>
        </div>
      )}
    </div>
  );
}
