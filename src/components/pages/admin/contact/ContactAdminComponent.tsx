"use client"

import { useState, useEffect, useMemo } from "react"
import { useFetchContactsQuery } from "@/store/features/contacts"

interface Contact {
    id: string
    name: string
    email: string
    message: string
}

const ITEMS_PER_PAGE = 10

export function ContactAdminComponent() {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")

    const { data: contacts = [] } = useFetchContactsQuery(process.env.NEXT_PUBLIC_MY_EMAIL)

    const filteredContacts = useMemo(() => {
        return contacts?.filter?.(
            (contact: Contact) =>
                contact.name.toLowerCase().includes(search.toLowerCase()) ||
                contact.email.toLowerCase().includes(search.toLowerCase()) ||
                contact.message.toLowerCase().includes(search.toLowerCase())
        )
    }, [contacts, search])

    useEffect(() => {
        setPage(1)
    }, [contacts, search])

    const totalItems = filteredContacts?.length
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const paginatedContacts = filteredContacts?.slice?.(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    return (
        <div className="space-y-4 p-4">
            <div className="flex flex-col space-y-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <span className="text-sm text-gray-600">
            Showing {paginatedContacts?.length} of {totalItems} contacts
          </span>
                    <div className="flex items-center space-x-2">
                        <button
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span className="text-sm font-medium text-gray-700">
              Page {page} of {totalPages}
            </span>
                        <button
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Message
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {paginatedContacts?.map?.((contact: Contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl truncate">
                                    {contact.message}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
