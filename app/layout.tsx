import type { Metadata } from 'next'
import LocalFont from "next/font/local";
import { Roboto, Satisfy } from "next/font/google";
import "./globals.css";
import { FC, ReactNode } from "react";
import ThemeProvider from "./providers/ThemeProvider";
import ToasterProvider from "./providers/ToasterProvider";

//   different font family for our application
export const robotoFont = Roboto({
  subsets: ["cyrillic", "cyrillic-ext"],
  weight: "400",
});

export const satisfyFont = Satisfy({
  weight: ["400"],
  subsets: ["latin"],
});

export const regularFont = LocalFont({
  display: "swap",
  src: "./assets/Fonts/TwCenClassMTStd-Regular.otf",
});

export const boldFont = LocalFont({
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
      <body className={regularFont.className}>
        <ToasterProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;