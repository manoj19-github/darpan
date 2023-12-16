import type { Metadata } from 'next'
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";
import { FC, ReactNode } from "react";

export const robotoFont = Roboto({
  subsets: ["cyrillic", "cyrillic-ext"],
  weight: "400",
});

export const regularFont = localFont({
  // src: './my-font.woff2',
  display: "swap",
  src: "./assets/Fonts/TwCenClassMTStd-Regular.otf",
});

export const boldFont = localFont({
  // src: './my-font.woff2',
  display: "swap",
  src: "./assets/Fonts/TwCenMTStd-Bold.otf",
});

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Darpan",
  description: "Connects people , connects you",
};

const RootLayout: FC<RootLayoutProps> = ({ children }): JSX.Element => {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={regularFont.className}>{children}</body>
    </html>
  );
};

export default RootLayout;