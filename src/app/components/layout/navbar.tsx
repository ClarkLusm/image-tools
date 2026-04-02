import Link from "next/link";
import { Camera, FileImage, type LucideIcon } from "lucide-react";
import { NavbarMobile } from "./navbar-mobile";
import {
  convertTools,
  primaryTools,
  socialResizeTools,
  type NavItem,
} from "./navbar-data";
import { NavActiveButton, NavLink } from "./nav-link";

function DesktopDropdown({
  label,
  icon: Icon,
  items,
  panelWidthClass,
}: {
  label: string;
  icon: LucideIcon;
  items: NavItem[];
  panelWidthClass: string;
}) {
  return (
    <div className="relative group">
      <NavActiveButton
        paths={items.map((item) => item.path)}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
        activeClassName="bg-primary/10 text-primary"
        inactiveClassName="text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <Icon className="w-4 h-4" />
        {label}
      </NavActiveButton>

      <div
        className={`absolute right-0 mt-2 ${panelWidthClass} rounded-xl border border-border bg-white shadow-lg p-2 z-50 opacity-0 invisible translate-y-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto`}
      >
        {items.map((tool) => {
          const ToolIcon = tool.icon;

          return (
            <NavLink
              key={tool.path}
              href={tool.path}
              match="startsWith"
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
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40 relative">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Camera className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Image<span className="text-primary">Tools</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {primaryTools.map((tool) => {
            const Icon = tool.icon;
            const activePaths =
              tool.path === "/compress-image"
                ? ["/compress-image", "/compress-image-to"]
                : [tool.path];

            return (
              <NavLink
                key={tool.path}
                href={tool.path}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                activePaths={activePaths}
                activeClassName="bg-primary/10 text-primary"
                inactiveClassName="text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Icon className="w-4 h-4" />
                {tool.name}
              </NavLink>
            );
          })}

          <DesktopDropdown
            label="Convert Image"
            icon={FileImage}
            items={convertTools}
            panelWidthClass="w-48"
          />

          <DesktopDropdown
            label="Social Resize"
            icon={Camera}
            items={socialResizeTools}
            panelWidthClass="w-52"
          />
        </nav>

        <NavbarMobile />
      </div>
    </header>
  );
}
