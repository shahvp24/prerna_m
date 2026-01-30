"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Certifications() {
    return (
        <section id="certifications" className="relative py-24 px-6 md:px-12 lg:px-24 bg-background">
            <div className="flex items-center gap-4 mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl md:text-5xl text-foreground"
                >
                    Certifications
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resumeData.certifications.map((item, index) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-lg border border-muted/20 bg-surface px-6 py-5 text-foreground/70 font-body text-sm leading-relaxed"
                    >
                        {item}
                    </motion.div>
                ))}
            </div>
            <SectionDivider />
        </section>
    );
}
