"use client";

import { useEffect, useState, ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: ReactNode }) {
    const [useNativeScroll, setUseNativeScroll] = useState(false);

    useEffect(() => {
        // Check for Edge browser or reduced motion preference
        const userAgent = navigator.userAgent.toLowerCase();
        const isEdge = userAgent.includes("edg/");
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (isEdge || prefersReducedMotion) {
            setUseNativeScroll(true);
            document.documentElement.style.scrollBehavior = prefersReducedMotion ? "auto" : "smooth";
        }
    }, []);

    // Use native scroll for Edge or reduced motion preference
    if (useNativeScroll) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
