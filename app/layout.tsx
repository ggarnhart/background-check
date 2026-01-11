import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { TakeIssueProvider } from "takeissue";

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
  title: "background-check",
  description: "Generate 4K wallpapers from color palettes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TakeIssueProvider
          apiKey={process.env.NEXT_PUBLIC_TAKE_ISSUE_API_KEY ?? ''}
        >
          {children}
        </TakeIssueProvider>
      </body>
    </html>
  );
}
