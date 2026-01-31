"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "@/data/resume";
import SectionDivider from "@/components/ui/SectionDivider";
import { GraduationCap, Briefcase, Users, Calendar } from "lucide-react";

type Category = "All" | "Education" | "Experience" | "Leadership";

type TimelineItem = {
    id: string;
    type: "Education" | "Experience" | "Leadership";
    title: string;
    subtitle: string;
    date: string;
    year: number;
    description?: string;
    icon: React.ElementType;
};

export default function Timeline() {
    const [filter, setFilter] = useState<Category>("All");

    const timelineData = useMemo(() => {
        const parseYear = (str: string): number => {
            if (!str) return 0;
            const s = str.toLowerCase();
            if (s.includes("present") || s.includes("ongoing")) return 2029; // Future/Current
            const matches = s.match(/\d{4}/g);
            if (!matches) return 0;
            return Math.max(...matches.map(Number));
        };

        const items: TimelineItem[] = [];

        // Education
        resumeData.academics.forEach((item, index) => {
            items.push({
                id: `edu-${index}`,
                type: "Education",
                title: item.degree,
                subtitle: item.institution,
                date: item.year,
                year: parseYear(item.year),
                description: item.score,
                icon: GraduationCap,
            });
        });

        // Experience (Internships)
        // Add Deloitte (Incoming)
        items.push({
            id: "deloitte-incoming",
            type: "Experience",
            title: resumeData.deloitte.role,
            subtitle: "Deloitte",
            date: "Starting June 2026",
            year: 2026, // Explicit year for Deloitte
            description: "Incoming Tax Consultant | Campus Placement",
            icon: Briefcase,
        });

        resumeData.internships.forEach((item, index) => {
            items.push({
                id: `exp-${index}`,
                type: "Experience",
                title: item.role,
                subtitle: item.company,
                date: item.duration,
                year: parseYear(item.duration),
                description: item.highlights[0], // Use first highlight as summary
                icon: Briefcase,
            });
        });

        // Leadership (Positions)
        resumeData.positions.forEach((item, index) => {
            items.push({
                id: `lead-${index}`,
                type: "Leadership",
                title: item.role,
                subtitle: item.org,
                date: item.duration,
                year: parseYear(item.duration),
                description: item.note,
                icon: Users,
            });
        });

        // Sort by custom user defined priority
        const getPriority = (item: TimelineItem) => {
            const t = item.title.toLowerCase();
            if (item.id === "deloitte-incoming") return 1;
            if (t.includes("msc")) return 2;
            if (t.includes("placement committee")) return 3;
            if (t.includes("pro, navigators")) return 4;
            if (item.type === "Experience" && item.id.startsWith("exp-")) return 5;
            if (t.includes("pgdm")) return 6;
            return 99; // Everything else (B.Com, Schools) sorted by year below
        };

        return items.sort((a, b) => {
            const pA = getPriority(a);
            const pB = getPriority(b);

            if (pA !== pB) return pA - pB;

            // Secondary sort by year for items with same priority (e.g. internals, or rest)
            return b.year - a.year;
        });
    }, []);

    const filteredData = timelineData.filter(
        (item) => filter === "All" || item.type === filter
    );

    return (
        <section id="timeline" className="relative py-24 px-6 md:px-12 lg:px-24 bg-background">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl md:text-5xl text-foreground text-center md:text-left"
                >
                    My Journey
                </motion.h2>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {(["All", "Education", "Experience", "Leadership"] as Category[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 border ${filter === cat
                                ? "bg-accent text-black border-accent font-semibold"
                                : "bg-transparent text-foreground/60 border-muted hover:text-foreground hover:border-foreground/40"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative max-w-4xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-muted/30 md:-translate-x-1/2" />

                <div className="flex flex-col gap-12">
                    <AnimatePresence mode="popLayout">
                        {filteredData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Date/Icon Column */}
                                <div className="absolute left-4 md:left-1/2 top-0 md:-translate-x-1/2 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-background border border-accent/50 flex items-center justify-center z-10 relative">
                                        <item.icon className="w-4 h-4 text-accent" />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
                                    <div className={`flex flex-col gap-2 ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                        }`}>
                                        <div className={`flex items-center gap-2 mb-1 md:hidden`}>
                                            <span className="text-xs font-mono text-accent/80 uppercase tracking-widest bg-accent/10 px-2 py-1 rounded">
                                                {item.date}
                                            </span>
                                        </div>

                                        <span className={`hidden md:inline-block text-xs font-mono text-accent/80 uppercase tracking-widest mb-1 ${index % 2 === 0 ? "" : "self-end"
                                            }`}>
                                            {item.date}
                                        </span>

                                        <h3 className="text-xl md:text-2xl font-display text-foreground">
                                            {item.title}
                                        </h3>
                                        <p className="text-foreground/70 font-medium">
                                            {item.subtitle}
                                        </p>
                                        {item.description && (
                                            <p className="text-sm text-foreground/50 mt-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                        <span className="text-[10px] uppercase tracking-widest text-foreground/30 mt-2">
                                            {item.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Empty spacer for opposite side */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <SectionDivider />
        </section>
    );
}
