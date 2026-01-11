import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { TakeIssueProvider } from "takeissue";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Background Check",
  description: "Generate 4K wallpapers from color palettes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="background-check-theme">
          <TakeIssueProvider
            apiKey={process.env.NEXT_PUBLIC_TAKE_ISSUE_API_KEY ?? ''}
          >
            {children}
          </TakeIssueProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
