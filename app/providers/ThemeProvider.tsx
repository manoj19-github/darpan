"use client";

import React, { FC } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

// interface ThemeProviderProps{}
const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  ...rest
}): JSX.Element => {
  return <NextThemeProvider {...rest}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
