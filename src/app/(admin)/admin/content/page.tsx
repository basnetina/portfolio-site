"use client"

import Link from "next/link";
import {useState} from "react";
import ProfileUpdateForm from "@/components/pages/admin/cms/landing/ProfileUpdateForm";
import SocialLinksUpdateForm from "@/components/pages/admin/cms/landing/SocialLinksUpdateForm";
import TabResume from "@/components/pages/admin/cms/landing/TabResume";


const LadingContentManagementPage = () => {
    const [tab, setTab] = useState<string>("profile")


    const tabList = [
        'profile', 'social links', "resume"
    ]
    return (
        <div className="min-h-screen">

        <div  className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {tabList?.map(item  => <li key={item} className="me-2">
                        <Link onClick={()=> setTab(item)} href="#"
                              className={`inline-flex  capitalize items-center p-2 ${tab === item ? 'bg-blue-950 text-white' : ''} justify-center border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group`}>
                            <svg
                                className={`w-4 h-4 me-2 text-gray-400 ${tab === item ? 'text-white group-hover:text-white' : ''} group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`}
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                            <span className={tab === item ? 'hover:text-white' : ''}>
                                {item}
                            </span>
                        </Link>
                    </li> )}
                </ul>
            </div>
            {/*tab ends here*/}

            {
                tab === "profile" && <ProfileUpdateForm />
            }

            {
                tab === 'social links' && <SocialLinksUpdateForm />
            }

            {
                tab === "resume" && <TabResume />
            }


        </div>
    )
}

export default LadingContentManagementPage

