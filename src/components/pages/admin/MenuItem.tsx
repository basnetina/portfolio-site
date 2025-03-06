"use client"
import {ChevronDown, ChevronRight} from "lucide-react";
import {useState} from "react";
import Link from "next/link";
import { Icon } from '@iconify/react';
import {usePathname} from "next/navigation";


interface MenuItem {
    title: string
    icon: string
    path?: string
    submenu?: { title: string; path: string }[]
}
const MenuItem = ({ item }: { item: MenuItem; }) => {
    const [isOpen, setIsOpen] = useState(false)
    const hasSubmenu = item.submenu && item.submenu.length > 0

    const pathname = usePathname()
    const isActive = pathname === item.path || (item.submenu && item.submenu.some((subItem) => pathname === subItem.path))

    return (
        <div>
            <Link
                href={item.path || "#"}
                className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded ${isActive ? "text-white font-bold bg-gray-700" : ""}`}
                onClick={() => hasSubmenu && setIsOpen(!isOpen)}
            >
                {item.icon && <Icon icon={item?.icon} className={`w-5 h-5 mr-2 text-gray-400 ${isActive ? "text-white font-bold bg-gray-700" : ""}`} />}

                <span>{item?.title}</span>
                {hasSubmenu && (
                    <span className="ml-auto">
            {isOpen ? <ChevronDown className="w-4 h-4"/> : <ChevronRight className="w-4 h-4"/>}
          </span>
                )}
            </Link>
            {hasSubmenu && isOpen && (
                <div className="ml-4 mt-2 space-y-2">
                    {item.submenu!.map((subItem) => (
                        <Link
                            key={subItem?.path}
                            href={subItem?.path}
                            className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                        >
                            {subItem?.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MenuItem