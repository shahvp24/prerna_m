"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { resumeData } from "@/data/resume";
import { useCursor } from "@/context/CursorContext";
import SectionDivider from "@/components/ui/SectionDivider";

const projectPreviews = [
    "/images/Placement Committee.jpeg",
    "/images/Herself-1.jpeg",
    "/images/Random.jpeg",
    "/images/Placement Committee.jpeg",
    "/images/Herself-1.jpeg",
];

export default function Projects() {
    const { setCursorText, setCursorVariant } = useCursor();
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="projects" className="relative py-24 px-6 md:px-12 lg:px-24 bg-surface">
            <div className="flex items-center gap-4 mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl md:text-5xl text-foreground"
                >
                    Projects
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12">
                <div className="flex flex-col gap-8">
                    {resumeData.projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => {
                                setActiveIndex(index);
                                setCursorText("VIEW");
                                setCursorVariant("text");
                            }}
                            onMouseLeave={() => {
                                setCursorText("");
                                setCursorVariant("default");
                            }}
                            className="group relative border-l-2 border-accent/20 pl-6 py-6 hover:border-accent hover:bg-white/5 transition-all duration-300 rounded-r-xl cursor-none"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
                                <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors">
                                    {project.title}
                                </h3>
                                <span className="text-foreground/40 text-sm font-body">{project.year}</span>
                            </div>
                            <p className="text-foreground/60 font-body text-sm leading-relaxed max-w-3xl group-hover:text-foreground/80 transition-colors">
                                {project.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="relative hidden lg:block">
                    <div className="sticky top-28">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.5 }}
                                className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-muted/30 bg-black/20"
                            >
                                <Image
                                    src={projectPreviews[activeIndex % projectPreviews.length]}
                                    alt={resumeData.projects[activeIndex]?.title ?? "Project preview"}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 text-sm uppercase tracking-[0.3em] text-white/70">
                                    Preview
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <SectionDivider />
        </section>
    );
}
