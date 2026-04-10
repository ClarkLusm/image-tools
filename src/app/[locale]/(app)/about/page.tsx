import { SITE_NAME } from "@/lib/site";
import { createPageMetadata } from "@/app/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/about",
    title: {
      en: `About ${SITE_NAME}`,
      vi: `Giới thiệu về ${SITE_NAME}`,
    },
    description: {
      en: `Learn more about ${SITE_NAME}, our mission, and how we keep your images private.`,
      vi: `Tìm hiểu thêm về ${SITE_NAME}, sứ mệnh của chúng tôi và cách chúng tôi bảo vệ quyền riêng tư cho hình ảnh của bạn.`,
    },
  });
}

export default function Page() {
  return (
    <main className="mx-auto container max-w-[960px] px-4 py-16 text-muted-foreground">
      <div className="tool-layout-header mb-6 text-center md:mb-8">
        <h1 className="page-title-gradient mb-3 text-3xl font-display font-extrabold tracking-tight md:text-4xl">
          About Us
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
          Welcome to {SITE_NAME}.
        </p>
      </div>
      <div
        className="ProseMirror markdown prose dark:prose-invert w-full min-h-6 break-words focus:outline-none"
        aria-disabled="false"
        dir="auto"
        translate="no"
      >
        <p>
          <span>At </span>
          <strong>
            <span>{SITE_NAME}</span>
          </strong>
          <span>, we believe working with images should be </span>
          <strong>
            <span>fast, simple, and accessible to everyone</span>
          </strong>
          <span>.</span>
        </p>
        <p>
          <span>
            Whether you&apos;re a designer, marketer, developer, or just someone who
            needs to quickly edit a photo — our tools are built to help you get
            things done in seconds, not minutes.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>Why We Built {SITE_NAME}</span>
        </h2>
        <p>
          <span>We created {SITE_NAME} with a clear goal:</span>
        </p>
        <p>
          <span>Many existing image tools today are </span>
          <strong>
            <span>too complicated, slow, or require unnecessary sign-ups</span>
          </strong>
          <span>
            . Users often face limitations, hidden paywalls, or confusing
            interfaces.
          </span>
        </p>
        <p>
          <span>So we built {SITE_NAME} to remove those barriers.</span>
        </p>
        <p>
          <span>Our platform is designed to be:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Instant to use</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Free for essential features</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Accessible without registration</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Focused on real, everyday workflows</span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            We prioritize simplicity and speed — so you can focus on your work,
            not the tool.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>What We Do</span>
        </h2>
        <p>
          <span>
            {SITE_NAME} is an all-in-one platform that provides powerful online
            image tools, including:
          </span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>
                Image compression to reduce file size without losing quality
              </span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Image resizing for websites and social media</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Format conversion (JPG, PNG, WebP, and more)</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Cropping and basic editing tools</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                AI-powered features like background removal and image upscaling
              </span>
            </p>
          </li>
        </ul>
        <p>
          <span>All tools are fully online — no installation required.</span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>Why Choose {SITE_NAME}?</span>
        </h2>
        <h3>
          <span>Fast Performance</span>
        </h3>
        <p>
          <span>
            Our tools are optimized for speed, allowing you to process images in
            seconds.
          </span>
        </p>
        <h3>
          <span>Simple Experience</span>
        </h3>
        <p>
          <span>
            Clean interface, no unnecessary steps — upload, adjust, and
            download.
          </span>
        </p>
        <h3>
          <span>Privacy First</span>
        </h3>
        <p>
          <span>
            Your images are processed securely and automatically deleted after
            use.
          </span>
          <br />
          <span>We do not store your files.</span>
        </p>
        <h3>
          <span>Free &amp; Accessible</span>
        </h3>
        <p>
          <span>
            Most tools are free and available instantly without sign-up.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>Security &amp; Privacy Commitment</span>
        </h2>
        <p>
          <span>We take your privacy seriously.</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>All file transfers are encrypted using </span>
              <strong>
                <span>HTTPS/SSL</span>
              </strong>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Images are processed securely and not shared with third parties
              </span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Files are automatically deleted after processing</span>
            </p>
          </li>
        </ul>
        <p>
          <span>For more details, please read our Privacy Policy.</span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>Our Mission</span>
        </h2>
        <p>
          <span>Our mission is simple:</span>
        </p>
        <blockquote>
          <p>
            <span>
              To make image processing tools accessible to everyone — without
              complexity, cost, or compromise.
            </span>
          </p>
        </blockquote>
        <p>
          <span>We aim to serve </span>
          <strong>
            <span>millions of users worldwide every month</span>
          </strong>
          <span> with fast, reliable, and easy-to-use tools.</span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>Who Uses {SITE_NAME}?</span>
        </h2>
        <p>
          <span>{SITE_NAME} is built for a wide range of users:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Content creators</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Bloggers and marketers</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>E-commerce sellers</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Developers</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Students and everyday users</span>
            </p>
          </li>
        </ul>
        <p>
          <span>If you work with images, {SITE_NAME} is designed for you.</span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>Continuous Improvement</span>
        </h2>
        <p>
          <span>
            We continuously improve our tools based on real user feedback.
          </span>
        </p>
        <p>
          <span>
            Our goal is to become your trusted platform for all image-related
            tasks — from simple edits to advanced workflows.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>Trust &amp; Transparency</span>
        </h2>
        <p>
          <span>
            To ensure transparency and trust, please review our policies:
          </span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Privacy Policy</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Terms of Service</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Contact Page</span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            These pages are available in the footer of our website for easy
            access.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>Thank You</span>
        </h2>
        <p>
          <span>Thank you for choosing {SITE_NAME}.</span>
        </p>
        <p>
          <span>
            We’re here to make your image workflow faster, easier, and more
            efficient — every day.
          </span>
        </p>
      </div>
    </main>
  );
}
