"use client"

import type { BlogList } from "@/types/BlogType"
import unixToDate from "@/utils/unixToDate"
import Link from "next/link"
import { useFetchBlogsServerQuery } from "@/store/features/blogs"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

const titleToSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
}

function BlogItemSkeleton() {
    return (
        <div className="flex items-center gap-4 py-4 border rounded-md p-2">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="w-full">
                <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
        </div>
    )
}

export default function BlogListWithFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentPage = Number(searchParams.get("page") || "1")
    const searchQuery = searchParams.get("search") || ""
    const sortBy = searchParams.get("sort") || "newest"

    const { data: blogs, isLoading } = useFetchBlogsServerQuery({email:process.env.NEXT_PUBLIC_MY_EMAIL, withThumbnail: false})

    const itemsPerPage = 5

    const filteredAndSortedBlogs = blogs
        ? blogs
            .filter(
                (blog: BlogList) =>
                    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    blog.created_by.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .sort((a: BlogList, b: BlogList) => {
                if (sortBy === "newest")
                    return new Date(unixToDate(b.created_at)).getTime() - new Date(unixToDate(a.created_at) || 0).getTime()
                if (sortBy === "oldest")
                    return new Date(unixToDate(a.created_at)).getTime() - new Date(unixToDate(b.created_at) || 0).getTime()
                if (sortBy === "a-z") return a.title.localeCompare(b.title)
                if (sortBy === "z-a") return b.title.localeCompare(a.title)
                return 0
            })
        : []

    const totalItems = filteredAndSortedBlogs.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const paginatedBlogs = filteredAndSortedBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const updateSearchParams = (params: Record<string, string>) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())

        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                newSearchParams.set(key, value)
            } else {
                newSearchParams.delete(key)
            }
        })

        router.push(`?${newSearchParams.toString()}`)
    }

    const handleSearch = (query: string) => {
        updateSearchParams({ search: query, page: "1" })
    }

    const handleSortChange = (value: string) => {
        updateSearchParams({ sort: value, page: "1" })
    }

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        updateSearchParams({ page: page.toString() })
    }

    const [searchInput, setSearchInput] = useState(searchQuery)

    const handleSearchDebounced = (query: string) => {
        updateSearchParams({ search: query, page: "1" })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== searchQuery) {
                handleSearchDebounced(searchInput)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [searchInput, searchQuery, handleSearchDebounced])

    return (
        <>
            <section id="blog" className="py-16 bg-gray-100 dark:bg-gray-900 mt-4 w-full rounded">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Blogs</h2>

                    <div className="max-w-3xl mx-auto mb-8">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    type="text"
                                    placeholder="Search blogs..."
                                    className="pl-10 text-black"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </div>
                            <div className="w-full sm:w-48 text-black">
                                <Select value={sortBy} onValueChange={handleSortChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                        <SelectItem value="oldest">Oldest First</SelectItem>
                                        <SelectItem value="a-z">A-Z</SelectItem>
                                        <SelectItem value="z-a">Z-A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Results summary */}
                        {!isLoading && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Showing {paginatedBlogs.length} of {totalItems} results
                                {searchQuery && ` for "${searchQuery}"`}
                            </p>
                        )}
                    </div>

                    {/* Blog List */}
                    <div className="max-w-3xl mx-auto flex gap-4 flex-col">
                        {isLoading ? (
                            Array(5)
                                .fill(0)
                                .map((_, index) => <BlogItemSkeleton key={index} />)
                        ) : paginatedBlogs.length > 0 ? (
                            paginatedBlogs.map((item: BlogList) => <BlogItem key={item?.id} item={item} />)
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-600 dark:text-gray-400">No blogs found matching your criteria.</p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => {
                                        setSearchInput("")
                                        updateSearchParams({ search: "", page: "1", sort: "newest" })
                                    }}
                                >
                                    Clear filters
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {!isLoading && totalPages > 1 && (
                        <div className="max-w-3xl mx-auto mt-8 flex justify-center text-black">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        className={currentPage === page ? "pointer-events-none" : ""}
                                    >
                                        {page}
                                    </Button>
                                ))}

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

const BlogItem = ({ item }: { item: BlogList }) => {
    const slug = `/blogs/${titleToSlug(item?.title)}-${item?.id}`
    return (
        <Link href={slug}>
            <div className="flex items-center gap-4 py-4 border rounded-md p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex-shrink-0">
                    <div
                        className="w-12 h-12 rounded-full items-center flex justify-center text-xl font-bold"
                        style={{
                            backgroundImage: "linear-gradient(to right, white, black)",
                        }}
                    >
                        <img
                            src={"/home/ina.jpeg"}
                            alt={"profile image"}
                            className={"w-12 h-12 rounded-full items-center object-cover"}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                    <div>
                        <p className="text-[0.9rem] text-gray-600 dark:text-gray-400">{item?.created_by}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {unixToDate(item?.created_at, "dddd, MMMM D, YYYY h:mm A")}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

