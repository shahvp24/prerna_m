"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Academics() {
    return (
        <section id="academics" className="relative py-24 px-6 md:px-12 lg:px-24 bg-surface">
            <div className="flex items-center gap-4 mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl md:text-5xl text-foreground"
                >
                    Academics
                </motion.h2>
            </div>

            {/* Mobile: Card View */}
            <div className="md:hidden space-y-4">
                {resumeData.academics.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-5 bg-background rounded-xl border border-muted/20"
                    >
                        <h3 className="font-display text-lg text-foreground mb-1">{item.degree}</h3>
                        <p className="text-foreground/70 text-sm mb-3">{item.institution}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-foreground/50 text-xs uppercase tracking-wider">{item.year}</span>
                            <span className="text-accent font-semibold text-sm">{item.score}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Desktop: Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left font-body">
                    <thead>
                        <tr className="border-b border-accent/30">
                            <th className="py-4 pr-4 text-foreground/60 text-sm uppercase tracking-wider">Degree</th>
                            <th className="py-4 pr-4 text-foreground/60 text-sm uppercase tracking-wider">Institution</th>
                            <th className="py-4 pr-4 text-foreground/60 text-sm uppercase tracking-wider">Year</th>
                            <th className="py-4 text-foreground/60 text-sm uppercase tracking-wider">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumeData.academics.map((item, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="border-b border-muted/20"
                            >
                                <td className="py-4 pr-4 text-foreground">{item.degree}</td>
                                <td className="py-4 pr-4 text-foreground/70">{item.institution}</td>
                                <td className="py-4 pr-4 text-foreground/70">{item.year}</td>
                                <td className="py-4 text-accent font-semibold">{item.score}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <SectionDivider />
        </section>
    );
}
