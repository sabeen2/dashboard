import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AppProvider from "@/providers/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A UI dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex-1 flex">
              <aside className="md:w-64 h-screen md:sticky top-0">
                <Sidebar />
              </aside>

              <main className="flex-1 overflow-y-auto bg-background mx-4">
                {children}
              </main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
