import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import React from "react";
import Navbar from "@/app/_components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/app/_components/theme-provider";
import Footer from "@/app/_components/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "Sway - SlayWithSway",
  description:
    "Sway is a cool and comfy clothing brand. Our styles mix modern trends with classic vibes for a vintage yet stylish look. We ensure the quality of the fabric and comfortability of the product.",
  icons: [{ rel: "icon", url: "/logo_with_bg.jpg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${montserrat.className}`}>
        <body>
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
