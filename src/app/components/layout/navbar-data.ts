import {
  Blocks,
  Camera,
  Crop,
  Eraser,
  FileImage,
  Images,
  Image as ImageIcon,
  Maximize,
  Minimize,
  Newspaper,
  Scissors,
  Smartphone,
  Sparkles,
  ThumbsUp,
  Video,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  translationKey: string;
  path: string;
  icon: LucideIcon;
  activePaths?: string[];
  hasDescription?: boolean;
};

export type LocalizedNavItem = NavItem & {
  name: string;
  description?: string;
};

export const primaryTools: NavItem[] = [
  {
    translationKey: "resizeImage",
    path: "/resize-image",
    icon: Maximize,
    hasDescription: true,
  },
  {
    translationKey: "compressImage",
    path: "/compress-image",
    icon: Minimize,
    activePaths: ["/compress-image", "/compress-image-to"],
    hasDescription: true,
  },
  {
    translationKey: "removeMetadata",
    path: "/remove-metadata",
    icon: Eraser,
    hasDescription: true,
  },
  {
    translationKey: "cropImage",
    path: "/crop-image",
    icon: Crop,
    hasDescription: true,
  },
  {
    translationKey: "removeBackground",
    path: "/remove-background",
    icon: Scissors,
    hasDescription: true,
  },
  {
    translationKey: "upscaleImage",
    path: "/upscale-image",
    icon: Sparkles,
    hasDescription: true,
  },
];

export const convertTools: NavItem[] = [
  { translationKey: "convertToPng", path: "/convert-to-png", icon: FileImage },
  { translationKey: "convertToJpg", path: "/convert-to-jpg", icon: ImageIcon },
  { translationKey: "convertToWebp", path: "/convert-to-webp", icon: Images },
];

export const socialResizeTools: NavItem[] = [
  { translationKey: "resizeInstagram", path: "/resize-instagram", icon: Camera },
  { translationKey: "resizeTiktok", path: "/resize-tiktok", icon: Smartphone },
  { translationKey: "resizeYoutube", path: "/resize-youtube", icon: Video },
  { translationKey: "resizeFacebook", path: "/resize-facebook", icon: ThumbsUp },
];

export const topLevelNavItems: NavItem[] = [
  {
    translationKey: "blog",
    path: "/blog",
    icon: Newspaper,
    hasDescription: true,
  },
];

export const toolsMenu = {
  icon: Blocks,
  items: primaryTools,
};
