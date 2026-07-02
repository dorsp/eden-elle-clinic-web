import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { MotionLayer } from "@/components/motion-layer";
import { SiteShell } from "@/components/site-shell";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant"
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost"
});

export const metadata: Metadata = {
  title: {
    default: "Elle De Marrer | Elevating Beauty Forward",
    template: "%s | Elle De Marrer"
  },
  description:
    "A luxury aesthetic clinic experience for advanced facial, body, and doctor-led treatments.",
  metadataBase: new URL("https://elledemarrer.com")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <LenisProvider>
          <MotionLayer />
          <SiteShell>{children}</SiteShell>
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
