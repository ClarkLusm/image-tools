import { Camera } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border/50 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-80">
            <Camera className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-lg text-foreground">
              ImageTools
            </span>
          </div>

          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ImageTools. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
