import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Horizon 2035 — SEO in the Age of AI",
  description: "Four scenario futures for marketing & discovery",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
