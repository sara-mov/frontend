import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SARA - Search Analysis Recommend Application",
  description:
    "SARA - Search Analysis Recommend Application is a personalized movie recommendation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-montserrat antialiased`}
        >
          <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </body>
      </html>
    </ThemeProvider>
  );
}
