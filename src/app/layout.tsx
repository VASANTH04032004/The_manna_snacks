import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Manna Snacks — All Time Favourite",
    template: "%s | The Manna Snacks",
  },
  description:
    "The Manna Snacks — premium organic snacks crafted with tradition. Wholesale and retail by Vel Brothers Food Products. Tasty & Delicious since generations.",
  keywords: ["The Manna Snacks", "Manna Snacks", "Vel Brothers Food Products", "organic snacks", "wholesale snacks", "Indian snacks", "traditional snacks", "Madurai snacks"],
  openGraph: {
    title: "The Manna Snacks — All Time Favourite",
    description: "Premium organic snacks crafted with tradition. Wholesale and retail.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
        {children}
      </body>
    </html>
  );
}
