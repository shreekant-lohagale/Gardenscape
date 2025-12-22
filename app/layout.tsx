import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/ui/preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gardenscape | Green Havens",
  description: "Professional gardening and landscaping services.",
  openGraph: {
    title: "Gardenscape | Green Havens",
    description: "Transforming outdoor spaces into living sanctuaries.",
    url: "https://gardenscape.demo",
    siteName: "Gardenscape",
    images: [
      {
        url: "https://images.unsplash.com/photo-1598555819385-a7455d31168f?w=1200",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gardenscape | Green Havens",
    description: "Transforming outdoor spaces into living sanctuaries.",
    images: ["https://images.unsplash.com/photo-1598555819385-a7455d31168f?w=1200"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <Preloader />
          <div className="grain-overlay" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
