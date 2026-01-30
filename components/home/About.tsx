"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import RevealText from "@/components/ui/RevealText";
import { resumeData } from "@/data/resume";
import SectionDivider from "@/components/ui/SectionDivider";

export default function About() {
    return (
        <section id="about" className="relative py-24 px-6 md:px-12 lg:px-24 bg-background border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative aspect-[3/4] w-full max-w-md mx-auto md:mx-0 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
                >
                    <Image
                        src="/images/Herself-1.jpeg"
                        alt="Prerna M."
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Text Side */}
                <div className="flex flex-col gap-8">
                    <span className="text-sm text-accent uppercase tracking-wider">About</span>

                    <div className="flex flex-col gap-6">
                        <RevealText
                            text={resumeData.about.heading}
                            className="font-display text-4xl md:text-6xl text-foreground"
                        />

                        {resumeData.about.paragraphs.map((paragraph, index) => (
                            <motion.p
                                key={paragraph}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
                                className="text-white/60 text-lg leading-relaxed font-body max-w-lg"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8"
                    >
                        <a
                            href="/resume-prerna-m.pdf"
                            className="inline-block border border-white/20 px-8 py-3 rounded-full text-foreground hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs"
                        >
                            Download Resume
                        </a>
                    </motion.div>
                </div>
            </div>
            <SectionDivider />
        </section>
    );
}
