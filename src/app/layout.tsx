import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import React from "react";
import Navbar from "@/app/_components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

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
    <ClerkProvider>
      <html lang="en" className={`${montserrat.className}`}>
        <body className={`flex min-h-screen flex-col`}>
          <TRPCReactProvider>
            <Navbar />
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
