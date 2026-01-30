"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import Hero from "@/components/home/Hero";
import DeloitteReveal from "@/components/home/DeloitteReveal";
import Academics from "@/components/home/Academics";
import Internships from "@/components/home/Internships";
import Projects from "@/components/home/Projects";
import About from "@/components/home/About";
import Certifications from "@/components/home/Certifications";
import Achievements from "@/components/home/Achievements";
import Activities from "@/components/home/Activities";
import Positions from "@/components/home/Positions";
import Contact from "@/components/home/Contact";
import { resumeData } from "@/data/resume";
import { LayoutGroup } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <LayoutGroup>
      <main className="min-h-screen bg-background">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

        <div
          aria-hidden={isLoading}
          className={`transition-opacity duration-700 ${isLoading ? "opacity-0 pointer-events-none select-none" : "opacity-100"}`}
        >
          <Hero />
          <About />
          <DeloitteReveal />
          <Academics />
          <Internships />
          <Projects />
          <Certifications />
          <Achievements />
          <Activities />
          <Positions />
          <Contact />

          {/* Footer */}
          <footer className="py-16 px-6 md:px-12 lg:px-24 bg-background border-t border-muted/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <p className="font-display text-2xl text-foreground">Prerna M.</p>
                <p className="text-foreground/50 text-sm font-body">Portfolio</p>
              </div>
              <p className="text-foreground/40 text-sm font-body">
                &copy; {new Date().getFullYear()} {resumeData.hero.name}
              </p>
            </div>
          </footer>
        </div>
      </main>
    </LayoutGroup>
  );
}
