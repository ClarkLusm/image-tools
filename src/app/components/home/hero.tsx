"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tools } from "./_tools";

export default function Hero() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {tools.map((tool, idx) => (
        <motion.div
          key={tool.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
        >
          <Link
            href={tool.path}
            className="block h-full p-6 bg-card rounded-2xl border border-border/60 hover:border-primary/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              className={`w-14 h-14 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              <tool.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {tool.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {tool.description}
            </p>
            <div className="flex items-center text-sm font-semibold text-primary mt-auto">
              Try it now{" "}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
