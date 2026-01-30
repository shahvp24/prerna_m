"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
    const { cursorText, cursorVariant } = useCursor();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // We'll track specific hover states for basic elements independently if needed,
    // but primarily rely on cursorVariant from context.
    const [isHoveringLink, setIsHoveringLink] = useState(false);

    const springConfig = { damping: 35, stiffness: 400, mass: 1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        // Add listeners for basic interactive elements to auto-trigger "button" state
        // if not already overridden by specific context usage.
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHoveringLink(true);
            } else {
                setIsHoveringLink(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    const variants = {
        default: {
            width: 12,
            height: 12,
            backgroundColor: "#F4F1EC",
            mixBlendMode: "difference" as const,
        },
        button: {
            width: 48,
            height: 48,
            backgroundColor: "#F4F1EC",
            mixBlendMode: "difference" as const,
        },
        text: {
            width: 100,
            height: 100,
            backgroundColor: "#C7A46B", // Gold for text view
            mixBlendMode: "normal" as const,
            color: "#0B0B0B"
        }
    };

    const activeVariant = cursorVariant === "text" ? "text" : (cursorVariant === "button" || isHoveringLink ? "button" : "default");

    return (
        <motion.div
            className="fixed top-0 left-0 z-[999] pointer-events-none flex items-center justify-center rounded-full"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
            }}
            variants={variants}
            animate={activeVariant}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
            <AnimatePresence>
                {activeVariant === "text" && cursorText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="font-display font-bold text-xs uppercase tracking-widest text-black"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
