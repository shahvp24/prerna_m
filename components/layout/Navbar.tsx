"use client";

import { useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Academics", href: "#academics" },
  { label: "Internships", href: "#internships" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
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

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.25em] md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="link-underline text-foreground/60 hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Desktop Connect Button */}
            <a
              href="#contact"
              className="hidden md:inline-block rounded-full border border-accent/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent hover:bg-accent hover:text-black transition-colors"
            >
              Connect
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen ? "true" : undefined}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-muted/40 bg-background/60 text-foreground/70 backdrop-blur transition-colors hover:text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Mobile Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[95] h-full w-[75%] max-w-sm bg-surface border-l border-muted/30 px-8 py-24 md:hidden"
            >
              <nav className="flex flex-col gap-6">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="font-display text-2xl text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.a
                  href="#contact"
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 inline-block rounded-full border border-accent/40 px-6 py-3 text-center text-sm uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-black transition-colors"
                >
                  Connect
                </motion.a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
