import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Quicksand } from "next/font/google";
import { Metadata } from "next";
import type { Viewport } from "next";
import Script from 'next/script';
// import { cookieToInitialState } from "wagmi";
// import { config as walletConfig } from "@/lib/wallet";
// import WagmiProviderComp from "@/lib/wagmi-provider";
import { gtmScript, gtmNoscript } from "@/utils/gtm";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "KaloKalo",
  description: "KaloKalo",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const initialState = cookieToInitialState(walletConfig, headers().get("cookie"));
  return (
    <html lang="en" className={`${quicksand.className} scroll-smooth`}>
      <head>
        <Script
          type="text/javascript"
          src="https://f63a9361-540e-4315-afac-1065a440c415.snippet.anjouangaming.org/anj-seal.js"
          strategy="beforeInteractive"
        />
        <Script 
          id="gtm-script" 
          strategy="beforeInteractive" 
          dangerouslySetInnerHTML={{ __html: gtmScript }} 
        />
      </head>
      <body className="antialiased text-kk-midnight-100">
        <noscript dangerouslySetInnerHTML={{ __html: gtmNoscript }} />
        <SessionProvider>
          {/* <WagmiProviderComp initialState={initialState}> */}
          {children}
          <PrismicPreview repositoryName={repositoryName} />
          {/* </WagmiProviderComp> */}
        </SessionProvider>
      </body>
    </html>
  );
}
