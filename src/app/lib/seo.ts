export type CompressSizeEntry = {
  slug: string;
  label: string;
  sizeKB: number;
  purpose: string;
  howTo: string[];
  faqs: { q: string; a: string }[];
};

export type CompressUseCaseEntry = {
  slug: string;
  title: string;
  description: string;
  purpose: string;
  howTo: string[];
  faqs: { q: string; a: string }[];
  recommendedSizes: { label: string; slug: string }[];
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

export const COMPRESS_USE_CASE_ENTRIES: CompressUseCaseEntry[] = [
  {
    slug: "email-attachments",
    title: "Compress Image for Email Attachments",
    description:
      "Shrink images so they attach and send quickly without bouncing.",
    purpose: "email attachments and faster sending",
    howTo: [
      "Resize large photos before compressing to reduce size fast.",
      "Use JPEG for photos and WebP for mixed content.",
      "Aim for 200–500 KB for smooth email delivery.",
    ],
    faqs: [
      {
        q: "What size is safe for email attachments?",
        a: "Many providers handle a few MB, but 200–500 KB per image keeps emails fast.",
      },
      {
        q: "Will quality drop a lot?",
        a: "Not if you start with a smaller resolution before compressing.",
      },
    ],
    recommendedSizes: [
      { label: "200 KB", slug: "200kb" },
      { label: "300 KB", slug: "300kb" },
      { label: "500 KB", slug: "500kb" },
    ],
  },
  {
    slug: "gmail",
    title: "Compress Image for Gmail",
    description:
      "Optimize images for Gmail attachments and fast loading in threads.",
    purpose: "Gmail sharing and faster loading",
    howTo: [
      "Target smaller images for quick upload and delivery.",
      "Use JPEG for photos to keep file size down.",
      "Stick to 200–500 KB for most images.",
    ],
    faqs: [
      {
        q: "Will Gmail accept large images?",
        a: "Gmail supports large attachments, but smaller files send faster and load better.",
      },
      {
        q: "Do I need WebP?",
        a: "JPEG is widely compatible and usually sufficient for Gmail.",
      },
    ],
    recommendedSizes: [
      { label: "200 KB", slug: "200kb" },
      { label: "300 KB", slug: "300kb" },
      { label: "500 KB", slug: "500kb" },
    ],
  },
  {
    slug: "whatsapp",
    title: "Compress Image for WhatsApp",
    description:
      "Reduce image size for faster sending and fewer upload issues in WhatsApp.",
    purpose: "WhatsApp sharing and quicker uploads",
    howTo: [
      "Use 200–500 KB for quick sends without obvious loss.",
      "Resize before compressing to avoid heavy artifacts.",
      "Choose JPEG for photos and PNG for sharp graphics.",
    ],
    faqs: [
      {
        q: "Will compression reduce quality in WhatsApp?",
        a: "A moderate size like 200–500 KB usually keeps images clean.",
      },
      {
        q: "Is JPG better than PNG for WhatsApp?",
        a: "JPG is smaller for photos; PNG is better for text or logos.",
      },
    ],
    recommendedSizes: [
      { label: "200 KB", slug: "200kb" },
      { label: "300 KB", slug: "300kb" },
      { label: "500 KB", slug: "500kb" },
    ],
  },
  {
    slug: "telegram",
    title: "Compress Image for Telegram",
    description:
      "Optimize images to send quickly and keep chats lightweight in Telegram.",
    purpose: "Telegram sharing and faster uploads",
    howTo: [
      "Aim for 200–500 KB for most images.",
      "Use WebP if you want smaller files with good quality.",
      "Crop to the subject before compressing.",
    ],
    faqs: [
      {
        q: "What size is good for Telegram?",
        a: "200–500 KB keeps uploads fast while preserving quality.",
      },
      {
        q: "Does Telegram compress images automatically?",
        a: "It can, but pre‑compressing gives you better control.",
      },
    ],
    recommendedSizes: [
      { label: "200 KB", slug: "200kb" },
      { label: "300 KB", slug: "300kb" },
      { label: "500 KB", slug: "500kb" },
    ],
  },
  {
    slug: "shopify-product",
    title: "Compress Image for Shopify Product Pages",
    description:
      "Speed up Shopify product pages with optimized image sizes.",
    purpose: "Shopify product listings and faster page loads",
    howTo: [
      "Use 200–500 KB for product images to balance quality and speed.",
      "Keep long edge under 2000px before compressing.",
      "Use WebP for best performance when possible.",
    ],
    faqs: [
      {
        q: "Will compression hurt product image quality?",
        a: "Not if you keep size moderate and avoid overly aggressive compression.",
      },
      {
        q: "What format should I use?",
        a: "JPEG or WebP for photos, PNG for transparent backgrounds.",
      },
    ],
    recommendedSizes: [
      { label: "300 KB", slug: "300kb" },
      { label: "500 KB", slug: "500kb" },
      { label: "1 MB", slug: "1mb" },
    ],
  },
  {
    slug: "etsy-listing",
    title: "Compress Image for Etsy Listings",
    description:
      "Optimize listing photos for faster Etsy browsing and clearer previews.",
    purpose: "Etsy listings and quick page loads",
    howTo: [
      "Use 200–500 KB for listing photos.",
      "Resize to the final display size before compressing.",
      "Keep text and product details clear.",
    ],
    faqs: [
      {
        q: "What size works well for Etsy?",
        a: "200–500 KB per image is a good balance for clarity and speed.",
      },
      {
        q: "Should I keep images high-res?",
        a: "Yes, but compress to reduce load time without losing detail.",
      },
    ],
    recommendedSizes: [
      { label: "200 KB", slug: "200kb" },
      { label: "300 KB", slug: "300kb" },
      { label: "500 KB", slug: "500kb" },
    ],
  },
  {
    slug: "wordpress",
    title: "Compress Image for WordPress Uploads",
    description:
      "Reduce image sizes for faster WordPress uploads and lighter pages.",
    purpose: "WordPress uploads and performance",
    howTo: [
      "Resize large photos before compressing.",
      "Use JPEG for photos to minimize size.",
      "Aim for 100–300 KB for blog images.",
    ],
    faqs: [
      {
        q: "Will smaller images improve performance?",
        a: "Yes, smaller images reduce page weight and speed up loading.",
      },
      {
        q: "Should I upload WebP to WordPress?",
        a: "If supported, WebP provides better compression and quality.",
      },
    ],
    recommendedSizes: [
      { label: "100 KB", slug: "100kb" },
      { label: "200 KB", slug: "200kb" },
      { label: "300 KB", slug: "300kb" },
    ],
  },
  {
    slug: "linkedin-banner",
    title: "Compress Image for LinkedIn Banners",
    description:
      "Optimize LinkedIn banner images for crisp display and fast loading.",
    purpose: "LinkedIn banners and profile visuals",
    howTo: [
      "Keep your banner under 500 KB for quick loading.",
      "Resize to your final banner dimensions before compressing.",
      "Use JPEG for photos, PNG for graphics with text.",
    ],
    faqs: [
      {
        q: "Will compression blur text?",
        a: "Use moderate compression and PNG if you need sharper text.",
      },
      {
        q: "What size should I target?",
        a: "200–500 KB usually looks sharp while loading fast.",
      },
    ],
    recommendedSizes: [
      { label: "200 KB", slug: "200kb" },
      { label: "300 KB", slug: "300kb" },
      { label: "500 KB", slug: "500kb" },
    ],
  },
];
