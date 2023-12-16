import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FC, ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;