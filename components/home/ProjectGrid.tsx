"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const projects = [
    {
        id: 1,
        title: "Deloitte Journey",
        category: "Professional Experience",
        image: "/images/Herself-1.jpeg", // Placeholder, ideally use video frame or different image
        year: "2024",
    },
    {
        id: 2,
        title: "Placement Committee",
        category: "Leadership",
        image: "/images/Placement Committee.jpeg",
        year: "2023",
    },
    {
        id: 3,
        title: "Academic Excellence",
        category: "Education",
        image: "/images/Random.jpeg",
        year: "2022",
    },
];

export default function ProjectGrid() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
            <div className="flex justify-between items-end mb-16">
                <h2 className="font-display text-4xl md:text-6xl text-foreground">
                    SELECTED WORK
                </h2>
            </div>

            <div className="flex flex-col gap-12">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="group relative border-t border-white/10 pt-12 cursor-none"
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10 relative pointer-events-none">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-accent uppercase tracking-wider">{project.category}</span>
                                <h3 className="text-3xl md:text-5xl font-display text-foreground group-hover:pl-4 transition-all duration-300">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="flex items-center gap-12">
                                <span className="text-white/40">{project.year}</span>
                                <div className="bg-white/10 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Hover Image Reveal */}
                        <motion.div
                            initial={false}
                            animate={{
                                opacity: hoveredProject === project.id ? 1 : 0,
                                scale: hoveredProject === project.id ? 1 : 0.95,
                                x: hoveredProject === project.id ? 20 : 0
                            }}
                            className="hidden md:block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[250px] z-0 pointer-events-none overflow-hidden rounded-lg"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
