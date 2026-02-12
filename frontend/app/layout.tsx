import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ShipStack - The AI Builder Operating System",
  description: "Discover, evaluate, and assemble the perfect tech stack using AI scoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, "min-h-screen bg-background font-sans antialiased selection:bg-primary/20")}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
