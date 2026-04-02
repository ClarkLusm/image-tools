import {
  Blocks,
  Camera,
  Crop,
  Eraser,
  FileImage,
  Image as ImageIcon,
  Maximize,
  Minimize,
  Newspaper,
  Scissors,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  name: string;
  path: string;
  icon: LucideIcon;
  description?: string;
  activePaths?: string[];
};

export const primaryTools: NavItem[] = [
  {
    name: "Resize Image",
    path: "/resize-image",
    icon: Maximize,
    description: "Adjust image dimensions while preserving detail.",
  },
  {
    name: "Compress",
    path: "/compress-image",
    icon: Minimize,
    description: "Reduce file size for web, email, and sharing.",
    activePaths: ["/compress-image", "/compress-image-to"],
  },
  {
    name: "Remove EXIF",
    path: "/remove-metadata",
    icon: Eraser,
    description: "Strip metadata for privacy before publishing.",
  },
  {
    name: "Crop Image",
    path: "/crop-image",
    icon: Crop,
    description: "Trim photos to the exact area you need.",
  },
  {
    name: "Remove Background",
    path: "/remove-background",
    icon: Scissors,
    description: "Create transparent cutouts in a few clicks.",
  },
  {
    name: "Upscale Image",
    path: "/upscale-image",
    icon: Sparkles,
    description: "Enlarge low-resolution images with AI super resolution.",
  },
];

export const convertTools: NavItem[] = [
  { name: "Convert to PNG", path: "/convert-to-png", icon: FileImage },
  { name: "Convert to JPG", path: "/convert-to-jpg", icon: ImageIcon },
  { name: "Convert to WebP", path: "/convert-to-webp", icon: FileImage },
];

export const socialResizeTools: NavItem[] = [
  { name: "Instagram", path: "/resize-instagram", icon: Camera },
  { name: "TikTok", path: "/resize-tiktok", icon: FileImage },
  { name: "YouTube", path: "/resize-youtube", icon: FileImage },
  { name: "Facebook", path: "/resize-facebook", icon: FileImage },
];

export const topLevelNavItems: NavItem[] = [
  {
    name: "Blog",
    path: "/blog",
    icon: Newspaper,
    description: "Guides, tips, and updates from ImageTools.",
  },
];

export const toolsMenu = {
  name: "Tools",
  icon: Blocks,
  items: primaryTools,
};
