import { ToolLayout } from "@/app/components/layout/tool-layout";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import UpscaleImageClient from "./upscale-image-client";

export const metadata = {
  title: "Upscale Image Online",
  description:
    "Upscale low-resolution images with AI super resolution. Enlarge photos by 2x, 4x, or 8x and restore cleaner detail.",
  alternates: {
    canonical: `${SITE_URL}/upscale-image`,
  },
};

export default function Page() {
  return (
    <ToolLayout
      title="Upscale Image"
      description="Increase image resolution with AI super resolution. Great for product photos, scanned graphics, portraits, and older low-resolution assets."
      steps={[
        {
          title: "Upload image",
          description: "Choose a JPG, PNG, or WebP image from your device.",
        },
        {
          title: "Pick enlargement settings",
          description:
            "Select 2x, 4x, or 8x scaling and enable face enhancement if needed.",
        },
        {
          title: "Download the upscaled result",
          description: "Wait for the AI job to finish, then save the output.",
        },
      ]}
      faqs={[
        {
          q: "What scale should I choose?",
          a: "2x is best for gentle improvements, 4x is a strong default, and 8x is best reserved for high-quality originals that need a large export.",
        },
        {
          q: "Does this sharpen blurry images?",
          a: "It can recover cleaner edges and texture, but extremely blurred or tiny originals will still have quality limits.",
        },
        {
          q: "When should I enable face enhancement?",
          a: "Turn it on for portraits, selfies, and profile photos. Leave it off for product shots, logos, and screenshots.",
        },
      ]}
      relatedTools={[
        { name: "Resize Image", path: "/resize-image" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-upscale-image"
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Upscale Image", url: `${SITE_URL}/upscale-image` },
        ]}
      />
      <div className="space-y-12">
        <UpscaleImageClient />

        <section className="space-y-8">
          <div className="px-6 text-center md:px-10">
            <h2 className="text-3xl font-display font-bold tracking-tight text-foreground md:text-4xl">
              Traditional vs. AI Upscaling
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Why pixels are not enough: the science behind our neural network.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-[linear-gradient(135deg,rgba(241,245,249,0.92),rgba(255,255,255,0.96))] shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
                <thead>
                  <tr className="bg-slate-100/80 text-foreground">
                  <th className="px-8 py-6 text-lg font-semibold">Feature</th>
                  <th className="px-8 py-6 text-lg font-semibold">
                    Traditional (Bicubic)
                  </th>
                  <th className="px-8 py-6 text-lg font-semibold text-sky-700">
                    OptiPix AI Upscaling
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Edge Clarity",
                    traditional: "Blurry and feathered edges",
                    ai: "Razor-sharp reconstruction",
                  },
                  {
                    feature: "Noise Handling",
                    traditional: "Magnifies existing grain",
                    ai: "Smart noise suppression",
                  },
                  {
                    feature: "Texture Generation",
                    traditional: "Flat, plastic look",
                    ai: "Realistic skin/hair synthesis",
                  },
                ].map((row, index, rows) => (
                  <tr
                    key={row.feature}
                    className={index < rows.length - 1 ? "border-b border-border/60" : ""}
                  >
                    <td className="border-b border-border/50 px-8 py-8 text-lg font-semibold text-foreground last:border-b-0">
                      {row.feature}
                    </td>
                    <td className="border-b border-border/50 px-8 py-8 text-lg text-slate-700 last:border-b-0">
                      {row.traditional}
                    </td>
                    <td className="border-b border-border/50 px-8 py-8 text-lg font-semibold text-sky-900 last:border-b-0">
                      {row.ai}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
}
