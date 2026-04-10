import {
  Maximize,
  Minimize,
  Eraser,
  Crop,
  FileImage,
  Scissors,
  Sparkles,
} from "lucide-react";

export const tools = [
  {
    translationKey: "resizeImage",
    icon: Maximize,
    path: "/resize-image",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    translationKey: "compressImage",
    icon: Minimize,
    path: "/compress-image",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    translationKey: "removeMetadata",
    icon: Eraser,
    path: "/remove-metadata",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    translationKey: "convertToWebp",
    icon: FileImage,
    path: "/convert-to-webp",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    translationKey: "convertToPng",
    icon: FileImage,
    path: "/convert-to-png",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    translationKey: "cropImage",
    icon: Crop,
    path: "/crop-image",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    translationKey: "removeBackground",
    icon: Scissors,
    path: "/remove-background",
    color: "text-sky-600",
    bg: "bg-sky-500/10",
  },
  {
    translationKey: "upscaleImage",
    icon: Sparkles,
    path: "/upscale-image",
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-500/10",
  },
];
