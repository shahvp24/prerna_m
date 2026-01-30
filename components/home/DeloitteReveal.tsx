"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { useEffect, useRef } from "react";
import SectionDivider from "@/components/ui/SectionDivider";

export default function DeloitteReveal() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const playPromise = video.play();
                    if (playPromise && typeof playPromise.catch === "function") {
                        playPromise.catch(() => {});
                    }
                } else {
                    video.pause();
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="deloitte" className="relative py-24 px-6 md:px-12 lg:px-24 bg-background">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="font-display text-3xl md:text-5xl text-foreground"
                    >
                        {resumeData.deloitte.title}
                    </motion.h2>
                </div>
                <p className="text-foreground/60 font-body text-lg">
                    {resumeData.deloitte.role} <span aria-hidden="true">&bull;</span> {resumeData.deloitte.caption}
                </p>
            </div>

            {/* Video Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mt-12 relative aspect-[9/16] md:aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-lg border border-accent/20 bg-black"
            >
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    playsInline
                    controls
                    className="h-full w-full object-contain"
                >
                    <source src={resumeData.deloitte.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </motion.div>
            <SectionDivider />
        </section>
    );
}
