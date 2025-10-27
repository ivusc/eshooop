import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const miSans = localFont({
  src: [
    {
      path: '../public/fonts/MiSansLatin-ExtraLight.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/MiSansLatin-Light.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/MiSansLatin-Medium.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/MiSansLatin-Demibold.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/MiSansLatin-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/MiSansLatin-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/MiSansLatin-Heavy.woff2',
      weight: '800',
      style: 'normal',
    }
  ],
  variable: '--font-misans',
})

export const metadata: Metadata = {
  title: "eshooop",
  description: "eshooop - A minimalist online shop built for the modern era.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${miSans.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
    </html>
  );
}
