"use client"
import {useEffect, useState} from "react"
import Link from "next/link"
import { Source_Code_Pro } from "next/font/google"
import {usePathname, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {Icon} from "@iconify/react";
import textToCamelCase from "@/utils/textToCamelCase";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] })

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("")
    const router = useRouter()
    const pathname = usePathname()
    const {data: session} = useSession()

    useEffect(() => {
        const hash = window.location.hash.slice(1)
        if (hash) {
            console.log(hash)
            setActiveSection(hash)
        }
    }, [pathname])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }


    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
        e.preventDefault()
        const element = document.getElementById(section)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setActiveSection(section)
            router.push(`/#${section}`, { scroll: false })
        }
    }


    return (
        <header className="bg-gray-800 bg-opacity-50 py-4 fixed w-full z-50">
            <div className="container mx-auto px-4">
                <nav className="flex justify-between items-center">
                    <Link href={'/'} onClick={()=>{
                        setActiveSection("")
                    }} className={`text-2xl font-bold ${sourceCodePro.className}`}>
                        {`<${textToCamelCase(process.env.NEXT_PUBLIC_MY_NAME)} />`}
                    </Link>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                    <div className={pathname !== '/' ? 'hidden': ''}>
                        <ul
                            className={` md:flex md:space-x-4 capitalize text-lg ${isMenuOpen ? "block" : "hidden"} absolute md:relative top-full left-0 right-0 bg-gray-800 md:bg-transparent p-4 md:p-0 mt-2 md:mt-0`}
                        >
                            {["projects","skills", "education", "contact"].map(item => <li key={item} className="mb-2 md:mb-0 relative">
                                <a
                                    onClick={(e) => handleNavClick(e, item)}
                                    href={`#${item}`}
                                    className={`block transition duration-300 ${
                                        activeSection === item ? "text-gray-100 relative font-bold" : "hover:text-gray-100"
                                    }`}
                                >
                                    {item}
                                </a>
                            </li> )}

                            <li>
                                <Link
                                    href="/blogs"
                                    className="block bg-red-700 hover:bg-red-800 text-white px-3 py-0 rounded-full transition duration-300 text-center"
                                >
                                    Blogs
                                </Link>
                            </li>


                            {session?.user && <li>
                                <Link
                                    href="/admin/dashboard"
                                    className="block bg-green-700 hover:bg-green-800 text-white px-3 py-0 my-4 md:my-0 rounded-full transition duration-300 text-center"
                                >
                                    <div className={'flex items-center gap-2 justify-center'}>
                                        Admin Dashboard <Icon icon={'pixelarticons:dashboard'} />
                                    </div>
                                </Link>
                            </li>}
                        </ul>
                    </div>

                </nav>
            </div>
        </header>
    )
}

export default Header

