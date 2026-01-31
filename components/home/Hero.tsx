"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import BackgroundPaths from "@/components/ui/BackgroundPaths";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { resumeData } from "@/data/resume";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);

    return (
        <section id="home" ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-background">
            <BackgroundPaths />
            <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_left,#1f1f1f,transparent_60%)] opacity-70" />

            <motion.div
                style={{ opacity }}
                className="relative z-10 grid min-h-screen grid-cols-1 items-center gap-10 px-6 md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-24"
            >
                <div className="relative flex flex-col gap-6 pt-24 lg:pt-0">
                    <div className="pointer-events-none absolute -left-6 -right-6 -top-4 -bottom-6 z-0 hidden rounded-[32px] border border-white/[0.03] bg-white/[0.02] backdrop-blur-sm md:block" />
                    <motion.h1
                        data-hero-name
                        className="relative z-10 font-display text-[12vw] md:text-[7.5vw] lg:text-[5.8vw] leading-[0.9] tracking-tight text-foreground"
                    >
                        {resumeData.hero.name}
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 h-px w-24 origin-left bg-accent"
                    />
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                        <div className="h-[1px] w-12 bg-accent hidden md:block" />
                        <RevealText
                            text={resumeData.hero.role}
                            className="relative z-10 font-body text-lg md:text-2xl tracking-wide text-foreground/80"
                            delay={1.1}
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.6 }}
                        className="relative z-10 text-sm text-accent font-body"
                    >
                        {resumeData.hero.institution}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.9, duration: 0.6 }}
                        className="relative z-10 text-foreground/60 font-body text-base max-w-lg"
                    >
                        Strategy-led, finance-focused, and execution-driven — translating complex problems into structured outcomes.
                    </motion.p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <MagneticButton href="#about" className="relative z-10 cursor-none">
                            View Profile
                        </MagneticButton>
                        <a
                            href="/resume-prerna-m.pdf"
                            className="relative z-10 link-underline text-xs uppercase tracking-[0.3em] text-foreground/70 hover:text-foreground transition-colors"
                        >
                            Download Resume
                        </a>
                    </div>
                </div>

                {/* Right-side Hero Image */}
                <motion.div style={{ y, scale }} className="relative h-[70vh] w-full max-w-lg justify-self-end">
                    <Image
                        src={resumeData.hero.image}
                        alt={resumeData.hero.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        className="object-contain object-center"
                    />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2 text-foreground/40">
                        <span className="text-[10px] tracking-widest uppercase font-body">Scroll</span>
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
