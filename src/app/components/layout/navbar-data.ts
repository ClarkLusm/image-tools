import {
  Camera,
  Crop,
  Eraser,
  FileImage,
  Image as ImageIcon,
  Maximize,
  Minimize,
  Scissors,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  name: string;
  path: string;
  icon: LucideIcon;
};

export const primaryTools: NavItem[] = [
  { name: "Resize Image", path: "/resize-image", icon: Maximize },
  { name: "Compress", path: "/compress-image", icon: Minimize },
  { name: "Remove EXIF", path: "/remove-metadata", icon: Eraser },
  { name: "Crop Image", path: "/crop-image", icon: Crop },
  { name: "Remove Background", path: "/remove-background", icon: Scissors },
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
