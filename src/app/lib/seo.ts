export type CompressSizeEntry = {
  slug: string;
  label: string;
  sizeKB: number;
  purpose: string;
  howTo: string[];
  faqs: { q: string; a: string }[];
};

export const COMPRESS_SIZE_ENTRIES: CompressSizeEntry[] = [
  {
    slug: "10kb",
    label: "10 KB",
    sizeKB: 10,
    purpose: "favicons, tiny icons, and ultra-light UI assets",
    howTo: [
      "Use simple graphics with limited colors for best results.",
      "Prefer PNG or WebP for flat shapes and icons.",
      "Trim unnecessary padding before compressing to hit 10 KB.",
    ],
    faqs: [
      {
        q: "What works best at 10 KB?",
        a: "Icons, logos, and small UI assets compress well at 10 KB.",
      },
      {
        q: "Will photos look good at 10 KB?",
        a: "Not usually. Photos at 10 KB often lose detail and show artifacts.",
      },
    ],
  },
  {
    slug: "20kb",
    label: "20 KB",
    sizeKB: 20,
    purpose: "email thumbnails and lightweight blog images",
    howTo: [
      "Start with a smaller resolution before compressing.",
      "Use JPEG for photos and WebP for mixed content.",
      "Remove EXIF metadata to save a few KB.",
    ],
    faqs: [
      {
        q: "Is 20 KB enough for email thumbnails?",
        a: "Yes, for small previews and low-detail images.",
      },
      {
        q: "Which format is best for 20 KB?",
        a: "JPEG for photos, WebP for mixed content.",
      },
    ],
  },
  {
    slug: "50kb",
    label: "50 KB",
    sizeKB: 50,
    purpose: "fast-loading blog posts and documentation screenshots",
    howTo: [
      "Resize large screenshots before compressing.",
      "Use medium quality for balance between clarity and size.",
      "Prefer WebP for best size-to-quality ratio.",
    ],
    faqs: [
      {
        q: "Is 50 KB good for blog images?",
        a: "Yes, for small to medium images where speed matters.",
      },
      {
        q: "Do screenshots compress well to 50 KB?",
        a: "Yes, especially if you crop to the relevant area first.",
      },
    ],
  },
  {
    slug: "100kb",
    label: "100 KB",
    sizeKB: 100,
    purpose: "landing pages and social previews with decent detail",
    howTo: [
      "Keep long edge under 1600px for best results.",
      "Use JPEG for photos to maximize detail at 100 KB.",
      "Test on mobile to ensure clarity at smaller sizes.",
    ],
    faqs: [
      {
        q: "Is 100 KB enough for social previews?",
        a: "Usually yes, especially for 1200x630 previews.",
      },
      {
        q: "Will text stay readable at 100 KB?",
        a: "Yes if the image is not overly detailed or too large.",
      },
    ],
  },
  {
    slug: "200kb",
    label: "200 KB",
    sizeKB: 200,
    purpose: "portfolio images with more texture and clarity",
    howTo: [
      "Use slightly higher quality for texture-heavy images.",
      "Consider WebP for best quality at 200 KB.",
      "Crop to your focal area before compressing.",
    ],
    faqs: [
      {
        q: "Is 200 KB good for portfolio photos?",
        a: "Yes, it balances detail and performance well.",
      },
      {
        q: "Should I use WebP at 200 KB?",
        a: "Yes, WebP often preserves more detail at the same size.",
      },
    ],
  },
  {
    slug: "300kb",
    label: "300 KB",
    sizeKB: 300,
    purpose: "product images that need higher fidelity",
    howTo: [
      "Keep product edges sharp by avoiding extreme compression.",
      "Use JPEG quality around 80–90 for clean results.",
      "Check zoomed-in views to ensure fine details remain.",
    ],
    faqs: [
      {
        q: "Is 300 KB suitable for product listings?",
        a: "Yes, especially for e-commerce thumbnails and galleries.",
      },
      {
        q: "Will it affect sharp edges?",
        a: "Light compression at this size usually keeps edges crisp.",
      },
    ],
  },
  {
    slug: "500kb",
    label: "500 KB",
    sizeKB: 500,
    purpose: "hero images that still need to stay performant",
    howTo: [
      "Use large images with subtle gradients and detail.",
      "Prefer WebP for smoother gradients and lower size.",
      "Compress after final color grading to avoid extra artifacts.",
    ],
    faqs: [
      {
        q: "Is 500 KB OK for hero images?",
        a: "Yes, if your site needs a large, high-quality visual.",
      },
      {
        q: "What format should I use?",
        a: "WebP is usually best, JPEG is fine for compatibility.",
      },
    ],
  },
  {
    slug: "1mb",
    label: "1 MB",
    sizeKB: 1024,
    purpose: "large visuals where detail matters",
    howTo: [
      "Use this size for high-res photography or slides.",
      "Keep quality high but still compress to save bandwidth.",
      "Consider WebP to reduce size without visible loss.",
    ],
    faqs: [
      {
        q: "When should I target 1 MB?",
        a: "For large hero images or galleries where detail is important.",
      },
      {
        q: "Is 1 MB too heavy for mobile?",
        a: "It can be. Consider smaller sizes for mobile-first pages.",
      },
    ],
  },
  {
    slug: "2mb",
    label: "2 MB",
    sizeKB: 2048,
    purpose: "high-quality marketing or print-ready previews",
    howTo: [
      "Use 2 MB for marketing assets where quality is critical.",
      "Choose PNG only if transparency is required.",
      "Use JPEG/WebP for large photos to keep detail.",
    ],
    faqs: [
      {
        q: "Is 2 MB still web-friendly?",
        a: "It can be heavy; use it sparingly for premium visuals.",
      },
      {
        q: "Will 2 MB preserve print detail?",
        a: "It can, but final print resolution still matters.",
      },
    ],
  },
];
