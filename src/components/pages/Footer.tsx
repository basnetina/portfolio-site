import type React from "react"
import Link from "next/link"
import { Github, Linkedin, Twitter, Facebook, Mail } from "lucide-react"
import SocialLinks from "@/components/pages/home/SocialLinks";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold mb-4">{process.env.NEXT_PUBLIC_MY_NAME}</h3>
                        <p className="text-gray-400">Full Stack Developer passionate about creating innovative web solutions.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <nav className="flex flex-col space-y-2 w-32">
                            <Link href="/#projects" className="hover:text-blue-400 transition duration-300">
                                Projects
                            </Link>
                            <Link href="/#skills" className="hover:text-blue-400 transition duration-300">
                                Skills
                            </Link>
                            <Link href="/#education" className="hover:text-blue-400 transition duration-300">
                                Education
                            </Link>
                            <Link href="/#contact" className="hover:text-blue-400 transition duration-300">
                                Contact
                            </Link>
                        </nav>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <SocialLinks color={'#ffffff'}/>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_MY_NAME || "PRASHANT ADHIKARI"}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

