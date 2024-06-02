import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import React from "react";
import Navbar from "@/app/_components/navbar";

export const metadata = {
  title: "Sway",
  description:
    "Sway is a cool and comfy clothing brand. Our styles mix modern trends with classic vibes for a vintage yet stylish look. We ensure the quality of the fabric and comfortability of the product.",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={`flex min-h-screen flex-col`}>
        <TRPCReactProvider>
          <Navbar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
