import { Inter } from "next/font/google"
import "../globals.css"
import NextAuthProvider from "@/providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Login Page~Portfolio",
    description: "A showcase of your work and skills",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
            <link rel="manifest" href="/favicon/site.webmanifest"/>
        </head>
        <body className={inter.className}>
            <NextAuthProvider>{children}</NextAuthProvider>
        </body>
        </html>
    )
}

