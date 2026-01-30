import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400", "600", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "Prerna M. - Business Management Portfolio",
  description: "Strategy, Operations, Leadership.",
};

import { CursorProvider } from "@/context/CursorContext";

// ... (other imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased selection:bg-white selection:text-black cursor-none">
        <div className="noise-overlay" aria-hidden="true" />
        <CursorProvider>
          <SmoothScroll>
            <Navbar />
            <CustomCursor />
            {children}
          </SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
