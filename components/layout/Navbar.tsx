"use client";

import { motion, useScroll } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Internships", href: "#internships" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-1/2 z-[90] w-[92%] -translate-x-1/2 rounded-full border border-muted/40 bg-background/70 px-6 py-3 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-6">
        <a href="#home" className="font-display text-sm tracking-[0.3em] uppercase text-foreground">
          PRERNA
        </a>
        <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.25em] md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="link-underline text-foreground/60 hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full border border-accent/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent hover:bg-accent hover:text-black transition-colors"
          >
            Connect
          </a>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.nav>
  );
}
