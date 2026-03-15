"use client";

import {
  Camera,
  Image as ImageIcon,
  Minimize,
  Maximize,
  Eraser,
  Crop,
  FileImage,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  { name: "Resize Image", path: "/resize-image", icon: Maximize },
  { name: "Compress", path: "/compress-image", icon: Minimize },
  { name: "Remove EXIF", path: "/remove-metadata", icon: Eraser },
  { name: "Crop Image", path: "/crop-image", icon: Crop },
];

const convertTools = [
  { name: "Convert to PNG", path: "/convert-to-png", icon: FileImage },
  { name: "Convert to JPG", path: "/convert-to-jpg", icon: ImageIcon },
  { name: "Convert to WebP", path: "/convert-to-webp", icon: FileImage },
];

const socialResizeTools = [
  { name: "Instagram", path: "/resize-instagram", icon: Camera },
  { name: "TikTok", path: "/resize-tiktok", icon: FileImage },
  { name: "YouTube", path: "/resize-youtube", icon: FileImage },
  { name: "Facebook", path: "/resize-facebook", icon: FileImage },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [isSocialResizeOpen, setIsSocialResizeOpen] = useState(false);
  const isConvertActive = convertTools.some((tool) => tool.path === pathname);
  const isSocialResizeActive = socialResizeTools.some(
    (tool) => tool.path === pathname
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Camera className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Image<span className="text-primary">Tools</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {tools.map((tool) => {
            const isActive = pathname === tool.path;
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                href={tool.path}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  flex items-center gap-2
                  ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tool.name}
              </Link>
            );
          })}

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsConvertOpen((prev) => !prev)}
              onBlur={() => setTimeout(() => setIsConvertOpen(false), 150)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                flex items-center gap-2
                ${
                  isConvertActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }
              `}
            >
              <FileImage className="w-4 h-4" />
              Convert Image
            </button>
            <AnimatePresence>
              {isConvertOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-white shadow-lg p-2 z-50"
                >
                  {convertTools.map((tool) => {
                    const isActive = pathname === tool.path;
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.path}
                        href={tool.path}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
                          ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        {tool.name}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSocialResizeOpen((prev) => !prev)}
              onBlur={() => setTimeout(() => setIsSocialResizeOpen(false), 150)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                flex items-center gap-2
                ${
                  isSocialResizeActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }
              `}
            >
              <Camera className="w-4 h-4" />
              Social Resize
            </button>
            <AnimatePresence>
              {isSocialResizeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-white shadow-lg p-2 z-50"
                >
                  {socialResizeTools.map((tool) => {
                    const isActive = pathname === tool.path;
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.path}
                        href={tool.path}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
                          ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        {tool.name}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {tools.map((tool) => {
                const isActive = pathname === tool.path;
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    href={tool.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                      flex items-center gap-3
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {tool.name}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => setIsConvertOpen((prev) => !prev)}
                className={`
                  px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                  flex items-center justify-between
                  ${
                    isConvertActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  <FileImage className="w-5 h-5" />
                  Convert Image
                </span>
                <span className="text-sm">{isConvertOpen ? "−" : "+"}</span>
              </button>

              <AnimatePresence>
                {isConvertOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-4 flex flex-col gap-2"
                  >
                    {convertTools.map((tool) => {
                      const isActive = pathname === tool.path;
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.path}
                          href={tool.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                            flex items-center gap-3
                            ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }
                          `}
                        >
                          <Icon className="w-4 h-4" />
                          {tool.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setIsSocialResizeOpen((prev) => !prev)}
                className={`
                  px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                  flex items-center justify-between
                  ${
                    isSocialResizeActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  <Camera className="w-5 h-5" />
                  Social Resize
                </span>
                <span className="text-sm">{isSocialResizeOpen ? "−" : "+"}</span>
              </button>

              <AnimatePresence>
                {isSocialResizeOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-4 flex flex-col gap-2"
                  >
                    {socialResizeTools.map((tool) => {
                      const isActive = pathname === tool.path;
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.path}
                          href={tool.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                            flex items-center gap-3
                            ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }
                          `}
                        >
                          <Icon className="w-4 h-4" />
                          {tool.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
