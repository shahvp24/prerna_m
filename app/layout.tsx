import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import { CursorProvider } from "@/context/CursorContext";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400", "600", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["300", "400", "500", "700"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0B" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://prerna-portfolio.vercel.app"),
  title: "Prerna M. | Business Management Portfolio",
  description: "Business Management graduate specializing in finance, strategy, and operations. Placed at Deloitte. IBA Bangalore alumnus with expertise in consulting and financial analysis.",
  keywords: ["Prerna M", "Business Management", "Finance", "Deloitte", "IBA Bangalore", "Strategy", "Consulting", "PGDM", "Portfolio"],
  authors: [{ name: "Prerna M." }],
  creator: "Prerna M.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Prerna M. | Business Management Portfolio",
    description: "Business Management graduate | Deloitte Associate | IBA Bangalore",
    siteName: "Prerna M. Portfolio",
    images: [
      {
        url: "/images/hero-page-v2.png",
        width: 1200,
        height: 630,
        alt: "Prerna M. - Business Management Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prerna M. | Business Management Portfolio",
    description: "Business Management graduate | Deloitte Associate | IBA Bangalore",
    images: ["/images/hero-page-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "msapplication-TileColor": "#0B0B0B",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased selection:bg-white selection:text-black md:cursor-none">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:rounded-lg focus:font-body focus:text-sm"
        >
          Skip to main content
        </a>
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

