"use client";
import React from "react";
import ReduxProvider from "./ReduxProvider";
import { ThemeProvider } from "./theme-provider";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
