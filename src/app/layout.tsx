import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AMEPAC — Arba Minch Entertainment Performing Arts & Circus",
  description:
    "Official website of Arba Minch Entertainment Performing Arts & Circus (AMEPAC), established in 2011. Parent organization: Building Tomorrow Integrated Youth & Community Development Organization (registered Nov 2022). Located in Arba Minch, South Ethiopia.",
  keywords: [
    "Arba Minch Circus",
    "AMEPAC",
    "Ethiopian Circus",
    "Building Tomorrow Integrated Youth",
    "Gamo Zone Performing Arts",
    "African Circus",
    "Contortionist",
    "Yoga Brothers",
    "Troupe African Pride",
    "Troupe Gamo Bayira",
    "Troupe Black Lioness",
    "South Ethiopia Performing Arts",
  ],
  authors: [{ name: "AMEPAC" }],
  openGraph: {
    title: "AMEPAC — Arba Minch Entertainment Performing Arts & Circus",
    description:
      "Showcasing Ethiopian circus arts, cultural dance, acrobatics, and youth empowerment from Arba Minch, South Ethiopia.",
    type: "website",
    locale: "en_US",
    siteName: "AMEPAC",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#17251F] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
