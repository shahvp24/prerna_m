"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Internships() {
    return (
        <section id="internships" className="relative py-24 px-6 md:px-12 lg:px-24 bg-background">
            <div className="flex items-center gap-4 mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl md:text-5xl text-foreground"
                >
                    Internships
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {resumeData.internships.map((internship, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="p-8 bg-surface rounded-lg border border-muted/20"
                    >
                        <div className="flex flex-col gap-2 mb-6">
                            <h3 className="font-display text-2xl text-foreground">{internship.company}</h3>
                            <p className="text-accent font-body">{internship.role}</p>
                            <p className="text-foreground/50 text-sm font-body">{internship.duration}</p>
                        </div>
                        <ul className="space-y-3">
                            {internship.highlights.map((highlight, hIndex) => (
                                <li key={hIndex} className="text-foreground/70 font-body text-sm leading-relaxed flex gap-2">
                                    <span className="text-accent" aria-hidden="true">&bull;</span>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
            <SectionDivider />
        </section>
    );
}
