"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    d: `M-${360 - i * 6 * position} -${180 + i * 5}C-${360 - i * 6 * position} -${180 + i * 5} -${300 - i * 6 * position} ${210 - i * 5} ${140 - i * 6 * position} ${330 - i * 5}C${600 - i * 6 * position} ${450 - i * 5} ${680 - i * 6 * position} ${860 - i * 5} ${680 - i * 6 * position} ${860 - i * 5}`,
    width: 0.5 + i * 0.03,
    opacity: 0.25 + i * 0.02,
    duration: 18 + i * 0.6,
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
            initial={{ pathLength: 0.4, opacity: 0.8 }}
            animate={{
              pathLength: 1,
              opacity: [0.5, 0.9, 0.5],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Number.POSITIVE_INFINITY,
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
