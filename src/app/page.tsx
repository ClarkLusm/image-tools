import { Layers, ShieldCheck, Zap } from "lucide-react";
import UploadBox from "./components/home/upload-box";
import Hero from "./components/home/hero";
import BreadcrumbsJsonLd from "./components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Free Online Image Tools",
  description:
    "Compress, convert, resize, crop, and optimize images in seconds. Fast, secure, and browser-friendly.",
};

const features = [
  {
    title: "Lightning Fast",
    description:
      "Most tools process instantly in your browser without uploading to a server.",
    icon: Zap,
  },
  {
    title: "Privacy First",
    description: "Client-side tools mean your images never leave your device.",
    icon: ShieldCheck,
  },
  {
    title: "High Quality",
    description:
      "Advanced algorithms ensure you get the best possible output quality.",
    icon: Layers,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-home"
        items={[{ name: "Home", url: `${SITE_URL}/` }]}
      />
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-border">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 bg-background">
          {/* hero abstract wavy background */}
          <img
            src="images/background.png"
            alt="Abstract background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground mb-6">
              The only{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                image tools
              </span>{" "}
              you need.
            </h1>
            <p className="text-xl text-muted-foreground">
              Fast, free, and secure online image processing. Resize, compress,
              convert, and edit your photos in seconds.
            </p>
          </div>

          <UploadBox />
        </div>
      </section>

      {/* Tool Grid Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Explore Our Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to optimize and format your images for the
              web, social media, or print.
            </p>
          </div>

          <Hero />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
