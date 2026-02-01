import type { Metadata } from "next";
import { Montserrat, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const roboto = Roboto_Condensed({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

import { GlobalProvider } from "@/context/GlobalStore";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  keywords: ["PPF India", "Automotive Protection", "TPU Film", "Ceramic Coating", "Gentech Guard", "Car Armor"],
  openGraph: {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    url: "https://gentechguard.com",
    siteName: siteConfig.company.name,
    images: [
      {
        url: "/assets/logo-final.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/assets/gentech-favicon.ico",
    shortcut: "/assets/gentech-favicon.ico",
    apple: "/assets/gentech-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased`}
        suppressHydrationWarning
      >
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
