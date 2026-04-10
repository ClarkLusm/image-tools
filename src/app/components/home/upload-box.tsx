"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Uploader } from "@/app/components/shared/uploader";
import { useState } from "react";
import { motion } from "framer-motion";
import { tools } from "./_tools";

export default function UploadBox() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const t = useTranslations("common");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card/80 backdrop-blur-xl p-2 rounded-3xl border border-white/20 shadow-2xl shadow-primary/5">
        <Uploader onFileSelect={setUploadedFile} className="bg-white/50" />
      </div>

      {/* Smart Suggestions after upload */}
      {uploadedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-card rounded-2xl border border-border shadow-lg"
        >
          <h3 className="font-display font-semibold text-lg mb-4 text-center">
            {t("uploadBox.prompt")}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className={`${tool.bg} ${tool.color} p-2 rounded-lg`}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm">
                  {t(`navItems.${tool.translationKey}.name`)}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
