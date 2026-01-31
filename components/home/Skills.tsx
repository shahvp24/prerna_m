"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Skills() {
    return (
        <section id="skills" className="relative py-24 px-6 md:px-12 lg:px-24 bg-background">
            <div className="flex items-center gap-4 mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl md:text-5xl text-foreground"
                >
                    Skills
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {resumeData.skills.map((skill, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex justify-between items-end"
                        >
                            <span className="font-body text-lg text-foreground/90 tracking-wide">{skill.name}</span>
                            <span className="font-display text-sm text-accent/80 font-semibold">{skill.level}%</span>
                        </motion.div>

                        <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ delay: 0.2 + index * 0.1, duration: 1, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="h-full bg-accent rounded-full"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <SectionDivider />
        </section>
    );
}
