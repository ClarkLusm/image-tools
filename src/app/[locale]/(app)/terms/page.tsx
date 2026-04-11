import { SITE_NAME } from "@/lib/site";
import {
  createPageMetadata,
  resolveSupportedLanguage,
} from "@/app/lib/metadata";
import { getToolLayoutLookup } from "@/app/lib/tool-layout-lookup";
import { localizeReactTree } from "@/app/lib/react-translation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/terms",
    title: {
      en: "Terms of Service",
      vi: "Điều khoản dịch vụ",
      de: "Nutzungsbedingungen",
    },
    description: {
      en: `Read the terms for using ${SITE_NAME} and our image processing services.`,
      vi: `Xem các điều khoản khi sử dụng ${SITE_NAME} và dịch vụ xử lý ảnh của chúng tôi.`,
      de: `Lies die Bedingungen für die Nutzung von ${SITE_NAME} und unserer Bildverarbeitungsdienste.`,
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const languageCode = resolveSupportedLanguage(locale);
  const lookup = await getToolLayoutLookup(languageCode);

  return localizeReactTree(
    <main className="mx-auto container max-w-[960px] px-4 py-16 text-muted-foreground">
      <div className="tool-layout-header mb-6 text-center md:mb-8">
        <h1 className="page-title-gradient mb-3 text-3xl font-display font-extrabold tracking-tight md:text-4xl">
          Terms of Service
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
          By using {SITE_NAME}, you agree to the terms below.
        </p>
      </div>
      <div
        className="ProseMirror markdown prose dark:prose-invert w-full min-h-6 break-words focus:outline-none"
        contentEditable="true"
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
            Welcome to {SITE_NAME} (“we”, “our”, or “us”). By accessing or using our
            website and tools (the “Service”), you agree to be bound by these
            Terms of Service (“Terms”). If you do not agree with these Terms,
            please do not use the Service.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          1. Description of Service
        </h2>
        <p>
          <span>
            {SITE_NAME} provides free online tools for image processing, including
            but not limited to image compression, resizing, conversion, and
            background removal.
          </span>
        </p>
        <p>
          <span>
            The Service is provided on an “as is” and “as available” basis,
            without warranties of any kind.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          2. Use of the Service
        </h2>
        <p>
          <span>
            You agree to use the Service only for lawful purposes and in
            accordance with these Terms.
          </span>
        </p>
        <p>
          <span>You agree NOT to:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>
                Upload, process, or distribute illegal, harmful, or offensive
                content
              </span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Violate any applicable laws or regulations</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Infringe upon the intellectual property or privacy rights of
                others
              </span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Attempt to disrupt, damage, or interfere with the Service
              </span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Use automated tools or scripts in a way that imposes excessive
                load
              </span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            We reserve the right to suspend or restrict access if misuse is
            detected.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          3. User Content and Processing License
        </h2>
        <p>
          <span>
            You retain full ownership of any images or content you upload.
          </span>
        </p>
        <p>
          <span>By using the Service, you grant {SITE_NAME} a </span>
          <strong>
            <span>temporary, non-exclusive, limited license</span>
          </strong>
          <span>
            {" "}
            to process, modify, and transform your content solely for the
            purpose of providing the requested functionality.
          </span>
        </p>
        <p>
          <span>
            We do NOT claim ownership of your content and do NOT use your
            content for training artificial intelligence or machine learning
            models without your explicit consent.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          4. Data Protection and Retention
        </h2>
        <p>
          <span>
            {SITE_NAME} is designed with a privacy-first approach and follows
            globally recognized data protection principles, including standards
            aligned with GDPR-level practices.
          </span>
        </p>
        <p>
          <span>We commit to:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>
                Collect only the minimum data necessary to perform the requested
                function
              </span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Process files securely and temporarily</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Automatically and permanently delete all uploaded files
                within{" "}
              </span>
              <strong>
                <span>sixty (60) minutes</span>
              </strong>
              <span> after processing is completed</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Not store, archive, or back up user-uploaded content</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Not sell or share user-uploaded files with third parties
              </span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Not use user data for profiling or behavioral tracking
              </span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            You acknowledge that you should not upload sensitive or confidential
            information.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          5. Advertising, Cookies, and Tracking
        </h2>
        <p>
          <span>{SITE_NAME} uses third-party advertising services, including </span>
          <strong>
            <span>Google AdSense</span>
          </strong>
          <span>, to provide the Service free of charge.</span>
        </p>
        <p>
          <span>By using the Service, you acknowledge and agree that:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>
                Third-party vendors, including Google, use cookies and similar
                technologies to serve ads
              </span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Ads may be based on your prior visits to this website or other
                websites
              </span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Advertising cookies may be used to personalize content and ads
              </span>
            </p>
          </li>
        </ul>
        <p>
          <span>You can opt out of personalized advertising by visiting:</span>
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
        <p>
          <span>For full details, please refer to our Privacy Policy.</span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          6. Intellectual Property
        </h2>
        <p>
          <span>
            All content, software, branding, and design elements of the Service
            (excluding user-uploaded content) are the intellectual property of
            {SITE_NAME} and are protected by applicable laws.
          </span>
        </p>
        <p>
          <span>
            You may not copy, distribute, modify, or exploit any part of the
            Service without prior written permission.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          7. Disclaimer of Warranties
        </h2>
        <p>
          <span>
            The Service is provided “as is” and “as available” without
            warranties of any kind, whether express or implied.
          </span>
        </p>
        <p>
          <span>We do not guarantee:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Continuous or uninterrupted operation</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Error-free performance</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>That results will meet your expectations</span>
            </p>
          </li>
        </ul>
        <p>
          <span>Use of the Service is at your own risk.</span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          8. Limitation of Liability
        </h2>
        <p>
          <span>
            To the fullest extent permitted by applicable law, {SITE_NAME} shall not
            be liable for any indirect, incidental, consequential, or special
            damages arising from your use of the Service.
          </span>
        </p>
        <p>
          <span>This includes, but is not limited to:</span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Data loss</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>File corruption</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Service interruptions</span>
            </p>
          </li>
        </ul>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">9. Indemnification</h2>
        <p>
          <span>
            You agree to indemnify, defend, and hold harmless {SITE_NAME}, its
            owners, affiliates, and partners from and against any claims,
            liabilities, damages, losses, or expenses (including legal fees)
            arising from:
          </span>
        </p>
        <ul className="pl-8">
          <li className="list-disc">
            <p>
              <span>Your use of the Service</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Your violation of these Terms</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>Your infringement of any third-party rights</span>
            </p>
          </li>
          <li className="list-disc">
            <p>
              <span>
                Any content you upload that causes harm or legal claims
              </span>
            </p>
          </li>
        </ul>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          10. Third-Party Services
        </h2>
        <p>
          <span>
            The Service may contain links to third-party websites or services.
          </span>
        </p>
        <p>
          <span>
            We are not responsible for the content, policies, or practices of
            third-party providers.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          11. Changes to the Terms
        </h2>
        <p>
          <span>We may update these Terms from time to time.</span>
        </p>
        <p>
          <span>
            For any material changes, we will provide a prominent notice on the
            website.
          </span>
        </p>
        <p>
          <span>
            Your continued use of the Service after updates constitutes
            acceptance of the revised Terms.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <h2 className="text-xl font-semibold mb-2 mt-1">
          12. Global Applicability
        </h2>
        <p>
          <span>
            The Service is intended for a global audience. You are responsible
            for complying with the laws applicable in your jurisdiction.
          </span>
        </p>
        <p>
          <span>
            We aim to maintain high standards of user protection and data
            privacy across regions.
          </span>
        </p>
        <hr className="my-2.5 border-[#eaeaea]" />
        <p>
          <span>
            By using {SITE_NAME}, you acknowledge that you have read and agreed to
            these Terms of Service.
          </span>
        </p>
      </div>
    </main>,
    languageCode,
    lookup,
  );
}
