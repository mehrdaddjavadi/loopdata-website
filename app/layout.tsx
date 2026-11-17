import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loopdata — One view of your entire business",
  description:
    "Connect every data source, uncover what matters, and turn information into confident decisions with Loopdata.",
  applicationName: "Loopdata",
  openGraph: {
    title: "Loopdata — One view of your entire business",
    description: "Your data, connected. Your next move, clear.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080B19",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
