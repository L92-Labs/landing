import type { Metadata } from "next";
import "./brand.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "L92 Labs",
  description:
    "L92 Labs — Cloudflare-native tools for AI agents: artifact hosting, web crawling, and domain naming.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "L92 Labs",
    description:
      "Cloudflare-native tools for AI agents: artifact hosting, web crawling, and domain naming.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
