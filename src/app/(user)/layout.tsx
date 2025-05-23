import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "../globals.css";
import ParticlesProvider from "@/components/particles";
import {ReactNode} from "react";
import Header from "@/components/Header";
import Footer from "@/components/pages/Footer";
import ReduxProvider from "@/providers/ReduxProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import NextTopLoader from "nextjs-toploader";
import RouterEventProvider from "@/providers/RouterEventProvider";
import Script from "next/script";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
})

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_MY_NAME} - Portfolio`,
    description:   `Personal portfolio of ${process.env.NEXT_PUBLIC_MY_NAME}, showcasing projects and skills`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/favicon/site.webmanifest"/>
          <meta name="google-site-verification" content="2cVT6_IlYMRxWDFeY9jKUvtkVsXw_nG8X3TedM-Kmv8" />
          <Script src={`${process.env.NEXT_PUBLIC_BASE_PATH}/analytics.js`}/>
      </head>
      <body className={`${poppins.variable} antialiased bg-gray-900 text-white min-h-screen`}>
      <ParticlesProvider id="tsparticles">
          <ReduxProvider>
              <RouterEventProvider>
                  <NextAuthProvider>
                      <div className="flex flex-col min-h-screen">
                      <Header/>
                      <main className="flex-grow container mx-auto px-4 py-24">
                          {children}
                      </main>
                      <Footer/>

                  </div>

                  </NextAuthProvider>
              </RouterEventProvider>
              <NextTopLoader color={"#ffffff"}/>

          </ReduxProvider>
      </ParticlesProvider>
      </body>
      </html>
  );
}

