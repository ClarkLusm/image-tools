import Link from "next/link";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import RemoveMetadataClient from "./remove-metadata-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Remove Image Metadata Online (Free) - Delete EXIF Data Tool",
  description:
    "Remove image metadata online free. Delete EXIF data, strip GPS location, and clean hidden camera information before sharing photos online.",
  alternates: {
    canonical: `${SITE_URL}/remove-metadata`,
  },
};

export default function Page() {
  return (
    <ToolLayout
      title="Remove Image Metadata Online"
      description="Delete EXIF data, hidden location details, device information, and camera tags from photos before you share them online."
      steps={[
        {
          title: "Upload Image",
          description:
            "Choose the photo that may contain hidden metadata such as GPS, camera, or timestamp information.",
        },
        {
          title: "Strip Hidden Data",
          description:
            "The tool rebuilds the image in your browser and removes metadata fields that can reveal private information.",
        },
        {
          title: "Download a Clean Copy",
          description:
            "Save the metadata-free image and share it with stronger privacy and less accidental data exposure.",
        },
      ]}
      faqs={[
        {
          q: "What is image metadata?",
          a: "Image metadata is hidden information stored inside a file. In photos this often includes EXIF data such as camera model, date taken, image settings, and sometimes GPS coordinates. It is useful in photography workflows, but it can also expose information you did not intend to share.",
        },
        {
          q: "What is EXIF data?",
          a: "EXIF stands for Exchangeable Image File Format. It is one of the most common metadata systems used by cameras and smartphones to store details like shutter speed, ISO, focal length, capture date, and location data. When people search to remove metadata from image files, EXIF is usually the main thing they want to strip.",
        },
        {
          q: "Why should I remove metadata from photos?",
          a: "Removing metadata can protect privacy, reduce unwanted information sharing, and prevent accidental exposure of where or when a photo was taken. It is especially useful when you upload images to public websites, send screenshots to clients, or share photos from personal devices.",
        },
        {
          q: "When should I keep metadata instead of deleting it?",
          a: "Keeping metadata can still be useful for professional photography, asset management, archival workflows, and situations where capture details help organize or verify files. The right choice depends on whether the image is being preserved for internal use or shared publicly.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. This metadata removal flow runs locally in your browser, which is especially important for a privacy-focused tool because the original file never needs to leave your device just to be cleaned.",
        },
      ]}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "Resize Image", path: "/resize-image" },
        { name: "Convert to PNG", path: "/convert-to-png" },
        { name: "Convert to JPG", path: "/convert-to-jpg" },
      ]}
    >
      <div className="space-y-10">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-remove-metadata"
          items={[
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Remove Metadata", url: `${SITE_URL}/remove-metadata` },
          ]}
        />

        <RemoveMetadataClient />

        <section className="mt-24 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Quick Privacy Guide for Image Metadata
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              Metadata removal is not just an image utility task. It is a
              privacy and security workflow. Photos often carry hidden EXIF
              information such as device details, timestamps, and GPS location.
              If you share an image publicly without checking that hidden data,
              you may reveal more than the picture itself was meant to show.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Protect GPS Location
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Some photos include precise location data, which can reveal
                where the image was captured.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Hide Device Details
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Camera models, phone types, and capture settings can remain
                embedded even after an image looks visually ordinary.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Safer Client Sharing
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                A clean image is often the better version to send to clients,
                vendors, marketplaces, and public channels.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Local Processing
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                This flow stays in your browser, which is a strong trust signal
                for a tool built around privacy protection.
              </p>
            </article>
          </div>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                What Is Image Metadata (EXIF)?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Image metadata is data stored inside the file alongside the
                visible picture. The most common kind in photography is EXIF
                data, which can include capture date, camera settings, device
                model, orientation, lens details, and sometimes GPS
                coordinates. The image may look harmless, but the file can still
                carry a surprising amount of context in the background.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That is why searches like{" "}
                <span className="font-medium text-foreground">
                  remove metadata from image
                </span>
                ,{" "}
                <span className="font-medium text-foreground">
                  remove exif data online
                </span>
                , and{" "}
                <span className="font-medium text-foreground">
                  strip metadata photo
                </span>{" "}
                are not just technical curiosity. They come from a real need to
                control what hidden information leaves your device.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Why You Should Remove Metadata
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                The strongest reason is privacy. If a file contains location
                data, capture date, or device information, sharing it publicly
                can reveal more than you intended. This matters when posting to
                social media, sending images to clients, listing products,
                sharing travel photos, or publishing screenshots that may expose
                internal details.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                The second reason is security and compliance. Cleaned images are
                easier to share in professional workflows because there is less
                hidden data to audit or explain later. This makes metadata
                removal especially useful for agencies, creators, journalists,
                marketplace sellers, and privacy-conscious teams.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                How to Remove Metadata from Images
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Upload the image, run the cleanup step, and download the clean
                version. In this flow the browser rebuilds the file without the
                hidden metadata payload, which means you can create a safer copy
                before the image is uploaded anywhere else. For many users, that
                is the simplest answer to{" "}
                <span className="font-medium text-foreground">
                  delete image metadata
                </span>{" "}
                and{" "}
                <span className="font-medium text-foreground">
                  remove exif data
                </span>
                .
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                If the image also needs a different size or lighter output, you
                can continue into{" "}
                <Link
                  href="/resize-image"
                  className="font-medium text-primary hover:underline"
                >
                  Resize Image
                </Link>{" "}
                or{" "}
                <Link
                  href="/compress-image"
                  className="font-medium text-primary hover:underline"
                >
                  Compress Image
                </Link>{" "}
                after the privacy cleanup step.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                When Should You Keep Metadata?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Not every workflow should remove metadata. Photographers,
                archivists, and content teams sometimes rely on EXIF data to
                organize libraries, verify shooting details, or preserve capture
                history. In those cases metadata can be useful and even
                desirable.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                The best rule is simple: keep metadata when it supports internal
                management or professional records, and remove it when the image
                is leaving your trusted environment. That tension makes this
                topic particularly strong for SEO because it has real nuance,
                not just a one-size-fits-all answer.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Common Use Cases for Metadata Removal
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                The most obvious use case is public sharing. Before uploading
                travel photos, screenshots, listings, press images, or personal
                photos to social media, marketplaces, or websites, many users
                want a cleaned version without hidden location or device data.
                Another common use case is client delivery, where sending a
                clean file can reduce unnecessary exposure and make the handoff
                feel more professional.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                This is why metadata cleanup fits neatly into the broader image
                processing ecosystem. A user might clean the file first for
                privacy, then resize it, compress it, or convert it for the
                final destination.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Build a Safer Image Workflow
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Metadata cleanup works best as part of a full image workflow.
                Remove hidden data first, then continue into{" "}
                <Link
                  href="/compress-image"
                  className="font-medium text-primary hover:underline"
                >
                  compression
                </Link>{" "}
                for lighter delivery,{" "}
                <Link
                  href="/resize-image"
                  className="font-medium text-primary hover:underline"
                >
                  resizing
                </Link>{" "}
                for the correct dimensions, or format conversion such as{" "}
                <Link
                  href="/convert-to-png"
                  className="font-medium text-primary hover:underline"
                >
                  PNG
                </Link>{" "}
                and{" "}
                <Link
                  href="/convert-to-jpg"
                  className="font-medium text-primary hover:underline"
                >
                  JPG
                </Link>
                .
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That makes this page more than a niche tool. It becomes a strong
                long-tail authority page around image privacy, security, and
                cleaner sharing practices.
              </p>
            </article>
          </section>
        </section>
      </div>
    </ToolLayout>
  );
}
