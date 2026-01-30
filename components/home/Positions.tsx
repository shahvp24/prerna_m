"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Positions() {
    return (
        <section id="positions" className="relative py-24 px-6 md:px-12 lg:px-24 bg-surface">
            <div className="flex items-center gap-4 mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl md:text-5xl text-foreground"
                >
                    Positions of Responsibility
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resumeData.positions.map((item, index) => (
                    <motion.div
                        key={`${item.role}-${item.duration}`}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-lg border border-muted/20 bg-background px-6 py-6"
                    >
                        <div className="flex flex-col gap-2 mb-3">
                            <h3 className="font-display text-xl text-foreground">{item.role}</h3>
                            <p className="text-foreground/60 font-body text-sm">{item.org}</p>
                            <span className="text-foreground/40 text-xs font-body">{item.duration}</span>
                        </div>
                        <p className="text-foreground/70 font-body text-sm leading-relaxed">{item.note}</p>
                    </motion.div>
                ))}
            </div>
            <SectionDivider />
        </section>
    );
}
