"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const greetings = [
    "Hi",
    "Hola",
    "Bonjour",
    "Ciao",
    "Hallo",
    "Olá",
    "Hej",
    "Hei",
    "Aloha",
    "Namaste",
    "Salaam",
    "Konnichiwa",
    "Annyeong",
    "Ni Hao",
    "Merhaba",
    "Sawasdee",
    "Zdravstvuyte",
    "Hej",
    "Selamat",
    "Habari",
    "Shalom",
    "Yassas",
    "Sawubona",
    "Xin Chao",
    "Halo",
    "Salve",
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const loopedGreetings = useMemo(() => [...greetings, ...greetings], []);

    useEffect(() => {
        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        const preventScroll = (event: Event) => event.preventDefault();
        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });
        window.addEventListener("keydown", preventScroll, { passive: false });

        const scrollLock = setInterval(() => window.scrollTo(0, 0), 50);

        const timer = setTimeout(() => {
            const revealTimer = setTimeout(() => onComplete(), 120);
            const hideTimer = setTimeout(() => setIsVisible(false), 700);

            return () => {
                clearTimeout(hideTimer);
                clearTimeout(revealTimer);
            };
        }, 2600);

        return () => {
            clearInterval(scrollLock);
            clearTimeout(timer);
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
            window.removeEventListener("keydown", preventScroll);
            document.body.style.overflow = prevBodyOverflow;
            document.documentElement.style.overflow = prevHtmlOverflow;
        };
    }, [onComplete]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.4 },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] as const },
        },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loader"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a,transparent_60%)] opacity-80" />
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <div className="text-foreground/50 text-xs uppercase tracking-[0.4em] font-body">
                            Greetings
                        </div>
                        <div className="h-[18vw] md:h-[8vw] overflow-hidden">
                            <motion.div
                                animate={{ y: ["0%", "-50%"] }}
                                transition={{
                                    duration: greetings.length * 0.7,
                                    ease: "linear",
                                    repeat: Infinity,
                                }}
                                className="flex flex-col"
                                style={{ willChange: "transform" }}
                            >
                                {loopedGreetings.map((greeting, index) => (
                                    <div
                                        key={`${greeting}-${index}`}
                                        className="h-[18vw] md:h-[8vw] flex items-center justify-center font-display text-[14vw] md:text-[8vw] tracking-tight text-foreground"
                                    >
                                        {greeting}
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-foreground/40 text-xs tracking-[0.35em] uppercase font-body"
                        >
                            Loading
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
