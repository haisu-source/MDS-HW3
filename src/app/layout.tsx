import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const nunito = Nunito({
  variable: "--font-nunito-var",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LifeStyling — Grow Gently",
  description: "A personal growth tool for mood, reading, and habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${nunito.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col font-[var(--font-nunito-var)]">
          <AppProvider>
            <Navigation />
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
              {children}
            </main>
            <Footer />
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
