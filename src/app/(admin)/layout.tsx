import type { Metadata } from "next"
import { Manrope} from "next/font/google"
import "../globals.css"
import Sidebar from "@/components/pages/admin/Sidebar";
import {SidebarProvider} from "@/context/SidebarContext";
import CustomBurgerIcon from "@/components/pages/admin/CustomBurgerIcon";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import {ToastContainer} from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import {ToolProvider} from "@/providers/TooltipProvider";

const inter = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Admin Panel",
    description: "Admin panel for My Next.js App",
}

export default function AdminLayout({
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
        <body className={`${inter.className} bg-gray-100`}>
        <SidebarProvider>
            <NextAuthProvider>
                <ReduxProvider>
                    <div className="flex h-screen">
                        <Sidebar/>
                        <div className="flex-1 p-8 overflow-auto relative">
                            <CustomBurgerIcon/>
                            <NextTopLoader color={"#172554"}/>
                            <main>
                                <ToolProvider>
                                    {children}
                                </ToolProvider>
                            </main>
                        </div>
                    </div>
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable={false}
                        pauseOnHover={false}
                    />
                </ReduxProvider>
            </NextAuthProvider>
        </SidebarProvider>

        </body>
        </html>
    )
}

