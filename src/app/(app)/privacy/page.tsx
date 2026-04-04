import { SITE_URL } from "@/lib/site";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read how ImageTools processes your images and protects your privacy.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function Page() {
  return (
    <main className="mx-auto container max-w-[960px] px-4 py-16 text-muted-foreground">
      <div className="tool-layout-header mb-6 text-center md:mb-8">
        <div className="mb-3 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-2">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <h1 className="mb-3 text-3xl font-display font-extrabold tracking-tight text-foreground md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
          We respect your privacy and minimize data handling.
        </p>
      </div>
      <div
        className="ProseMirror markdown prose dark:prose-invert w-full min-h-6 break-words focus:outline-none"
        aria-disabled="false"
        dir="auto"
        translate="no"
      >
        <p className="text-gray-500 mb-4">
          <span>Last Modified:</span>
          <span> April 2026</span>
        </p>
        <p>
          <span>
            OptPho (“we”, “our”, or “us”) respects your privacy and is committed
            to protecting your personal data. This Privacy Policy explains how
            we collect, use, and safeguard your information when you use our
            website and services (the “Service”).
          </span>
        </p>
        <p>
          <span>
            By using OptPho, you agree to the practices described in this
            Privacy Policy.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>1. Information We Collect</span>
        </h2>
        <p>
          <span>
            We collect minimal information necessary to operate the Service.
          </span>
        </p>
        <h3>
          <span>a. User-Provided Data</span>
        </h3>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Images and files you upload for processing</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Any information you voluntarily provide (e.g., email if you
                contact us)
              </span>
            </p>
          </li>
        </ul>
        <h3>
          <span>b. Automatically Collected Data</span>
        </h3>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>IP address</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Browser type and device information</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Pages visited and interactions</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Referring URLs</span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            This data may be collected through cookies and analytics tools.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>2. How We Use Your Information</span>
        </h2>
        <p>
          <span>We use the collected data to:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Provide and operate the Service</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Process your uploaded images</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Improve website performance and user experience</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Monitor usage and prevent abuse</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Display relevant advertisements</span>
            </p>
          </li>
        </ul>
        <p>
          <span>We do NOT sell your personal data.</span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>3. Image Processing and Data Retention</span>
        </h2>
        <p>
          <span>
            Your uploaded images are processed securely and temporarily.
          </span>
        </p>
        <p>
          <span>We commit to:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Processing files only for the requested functionality</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Automatically deleting all uploaded files within </span>
              <strong>
                <span>60 minutes</span>
              </strong>
              <span> after processing</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Not storing, backing up, or sharing your images</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Not using your content for AI training or machine learning
                purposes
              </span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            You should avoid uploading sensitive or confidential information.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>4. Cookies and Tracking Technologies</span>
        </h2>
        <p>
          <span>We use cookies and similar technologies to:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Analyze traffic and usage patterns</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Improve functionality</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Serve advertisements</span>
            </p>
          </li>
        </ul>
        <p>
          <span>Cookies may include:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Essential cookies (required for the Service)</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Analytics cookies</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Advertising cookies</span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            You can control or disable cookies through your browser settings.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>5. Advertising (Google AdSense)</span>
        </h2>
        <p>
          <span>
            We use Google AdSense to display advertisements. Google, as a
            third-party vendor, uses cookies to serve ads on our site. Google's
            use of advertising cookies enables it and its partners to serve ads
            to our users based on their visit to OptPho and/or other sites on
            the Internet.
          </span>
        </p>
        <p>
          <span>You may opt out of personalized advertising by visiting:</span>
          <br />
          <a href="https://www.google.com/settings/ads">
            <span>https://www.google.com/settings/ads</span>
          </a>
        </p>
        <p>
          <span>
            For more information about managing ad preferences, visit:
          </span>
          <br />
          <a href="http://www.networkadvertising.org">
            <span>http://www.networkadvertising.org</span>
          </a>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>6. Third-Party Services</span>
        </h2>
        <p>
          <span>We may use third-party services such as:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Analytics providers (e.g., Google Analytics)</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Advertising networks (e.g., Google AdSense)</span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            These services may collect data in accordance with their own privacy
            policies.
          </span>
        </p>
        <p>
          <span>We are not responsible for third-party practices.</span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>7. Data Security</span>
        </h2>
        <p>
          <span>
            We implement reasonable technical and organizational measures to
            protect your data.
          </span>
        </p>
        <p>
          <span>
            All data transmitted between your device and our servers is
            encrypted using{" "}
          </span>
          <strong>
            <span>HTTPS (SSL/TLS)</span>
          </strong>
          <span> to prevent unauthorized interception during transfer.</span>
        </p>
        <p>
          <span>
            However, no method of transmission over the internet is completely
            secure, and we cannot guarantee absolute security.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>8. Your Rights</span>
        </h2>
        <p>
          <span>
            Depending on your location, you may have rights under applicable
            data protection laws, including:
          </span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>The right to access your data</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>The right to request deletion</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>The right to object to processing</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>The right to withdraw consent at any time</span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            Please note that withdrawing consent does not affect the lawfulness
            of any processing carried out before your withdrawal.
          </span>
        </p>
        <p>
          <span>To exercise your rights, please contact us.</span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>9. Children's Privacy</span>
        </h2>
        <p>
          <span>
            OptPho is not intended for children under the age of 13 (or
            applicable age in your jurisdiction).
          </span>
        </p>
        <p>
          <span>We do not knowingly collect personal data from children.</span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>10. International Users</span>
        </h2>
        <p>
          <span>OptPho is accessible worldwide.</span>
        </p>
        <p>
          <span>
            By using the Service, you acknowledge that your data may be
            processed in different jurisdictions depending on our
            infrastructure.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          <span>11. Changes to This Privacy Policy</span>
        </h2>
        <p>
          <span>We may update this Privacy Policy from time to time.</span>
        </p>
        <p>
          <span>
            Any changes will be posted on this page with an updated date.
          </span>
        </p>
        <p>
          <span>
            For significant changes, we may provide a prominent notice.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <p>
          <span>
            By using OptPho, you acknowledge that you have read and understood
            this Privacy Policy.
          </span>
        </p>
      </div>
    </main>
  );
}
