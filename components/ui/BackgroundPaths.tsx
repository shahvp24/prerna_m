"use client";

import { motion, useReducedMotion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const shouldReduceMotion = useReducedMotion();

  // Reduced from 28 to 14 paths for better GPU performance
  const paths = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    d: `M-${360 - i * 12 * position} -${180 + i * 10}C-${360 - i * 12 * position} -${180 + i * 10} -${300 - i * 12 * position} ${210 - i * 10} ${140 - i * 12 * position} ${330 - i * 10}C${600 - i * 12 * position} ${450 - i * 10} ${680 - i * 12 * position} ${860 - i * 10} ${680 - i * 12 * position} ${860 - i * 10}`,
    width: 0.5 + i * 0.05,
    opacity: 0.2 + i * 0.04,
    duration: 20 + i * 1.2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="h-full w-full text-white/90" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: shouldReduceMotion ? 1 : 0.4, opacity: 0.8 }}
            animate={shouldReduceMotion ? {} : {
              pathLength: 1,
              opacity: [0.5, 0.9, 0.5],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function BackgroundPaths() {
  return (
    <div className="absolute inset-0 z-0 bg-paths">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
