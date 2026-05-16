import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Stock Bazar Analysis",
  description: "Stock market analysis dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
        <body className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
