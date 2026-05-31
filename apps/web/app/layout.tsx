import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const chicago = localFont({
  src: "./fonts/chicagoKare-Regular.woff2",
});

export const metadata: Metadata = {
  title: "Jugal Kishore Reddy Thangella — Portfolio",
  description:
    "System 7-inspired portfolio for Jugal Kishore Reddy Thangella (@tjkreddy)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-[#D6D6D6] text-black ${chicago.className}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
