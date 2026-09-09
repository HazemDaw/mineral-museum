import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Playfair Display is used (rather than a Latin-only display serif) because
// it ships a Cyrillic subset — the museum's headings are Russian, and a
// display face without Cyrillic glyphs would silently fall back to a system
// font for every heading, undermining the whole typographic identity.
const displayFont = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

const bodyFont = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap"
});

// JetBrains Mono (not IBM Plex Mono) for the same reason: chemical formulas
// are Latin, but the mono face also carries small Cyrillic labels
// ("QR-код образца", eyebrow captions) and needs Cyrillic coverage.
const monoFont = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Музей минералогии и петрографии",
  description:
    "Интерактивная минералогическая коллекция кафедры геологии — сканируйте QR-код у образца, чтобы увидеть его кристаллическую структуру."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F5F7FB"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
