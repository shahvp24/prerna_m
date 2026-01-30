"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

type MagneticButtonProps = React.ComponentPropsWithoutRef<"a"> & {
  intensity?: number;
};

export default function MagneticButton({
  children,
  className,
  intensity = 0.25,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 180, mass: 0.4 });
  const springY = useSpring(y, { damping: 20, stiffness: 180, mass: 0.4 });

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    x.set(dx * intensity);
    y.set(dy * intensity);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 text-xs uppercase tracking-[0.3em] text-accent transition-colors hover:bg-accent hover:text-black",
        className
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}
