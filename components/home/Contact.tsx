"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";
import { resumeData } from "@/data/resume";
import { useCursor } from "@/context/CursorContext";

export default function Contact() {
    const { setCursorText, setCursorVariant } = useCursor();

    return (
        <section id="contact" className="relative py-24 px-6 md:px-12 lg:px-24 bg-background border-t border-muted/20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="space-y-3">
                        <motion.h2
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="font-display text-4xl md:text-6xl text-foreground"
                        >
                            Let&apos;s talk.
                        </motion.h2>
                        <p className="text-foreground/70 font-body text-lg leading-relaxed max-w-xl">
                            Open to consulting, strategy, and finance collaborations. Let&apos;s connect and build something
                            meaningful.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-foreground/50">
                        <span>Response</span>
                        <span className="h-px w-12 bg-accent/60" />
                        <span>24 hours</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 gap-4">
                    <motion.a
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        href={`mailto:${resumeData.contact.email}`}
                        onMouseEnter={() => {
                            setCursorText("EMAIL");
                            setCursorVariant("text");
                        }}
                        onMouseLeave={() => {
                            setCursorText("");
                            setCursorVariant("default");
                        }}
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-muted/30 bg-surface px-6 py-5 hover:border-accent/60 transition-colors cursor-none"
                    >
                        <div className="flex items-center gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                                <Mail className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-sm text-foreground/50 font-body">Email</p>
                                <p className="text-foreground font-body">{resumeData.contact.email}</p>
                            </div>
                        </div>
                        <span className="text-foreground/40 text-xs uppercase tracking-widest group-hover:text-accent transition-colors">Send</span>
                    </motion.a>

                    <motion.a
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        href={resumeData.contact.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => {
                            setCursorText("OPEN");
                            setCursorVariant("text");
                        }}
                        onMouseLeave={() => {
                            setCursorText("");
                            setCursorVariant("default");
                        }}
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-muted/30 bg-surface px-6 py-5 hover:border-accent/60 transition-colors cursor-none"
                    >
                        <div className="flex items-center gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                                <Linkedin className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-sm text-foreground/50 font-body">LinkedIn</p>
                                <p className="text-foreground font-body">Connect with Prerna</p>
                            </div>
                        </div>
                        <span className="text-foreground/40 text-xs uppercase tracking-widest group-hover:text-accent transition-colors">Open</span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
