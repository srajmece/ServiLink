import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppStateProvider } from "@/lib/store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ServiLink — Skilled Service Marketplace",
  description:
    "Connect with verified skilled service providers near you — electricians, plumbers, AC technicians, mechanics, EV and industrial technicians.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
