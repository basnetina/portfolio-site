"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import type { ProjectGet } from "@/types/ProjectInterface"
import { Search, SlidersHorizontal } from "lucide-react"
import unixToDate from "@/utils/unixToDate";
import Link from "next/link";

interface UserProjectPageProps {
    projects: ProjectGet[]
}

const UserProjectPageClient = ({ projects }: UserProjectPageProps) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    const [currentPage, setCurrentPage] = useState(1)
    const [showFilters, setShowFilters] = useState(false)

    const itemsPerPage = 6

    // Filter projects based on search term
    const filteredProjects = projects?.filter(
        (project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )


    // Sort projects
    const sortedProjects = [...(filteredProjects || [])].sort((a, b) => {

        if (sortBy === "newest") {
            return new Date(unixToDate(b.created_at)).getTime() - new Date(unixToDate(a.created_at) || 0).getTime()
        } else if (sortBy === "oldest") {
            return new Date(unixToDate(a.created_at)).getTime() - new Date(unixToDate(b.created_at) || 0).getTime()
        } else if (sortBy === "alphabetical") {
            return a.title.localeCompare(b.title)
        }
        return 0
    })

    // Paginate projects
    const totalPages = Math.ceil((sortedProjects?.length || 0) / itemsPerPage)
    const paginatedProjects = sortedProjects?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <>
            <div className="bg-sky-50 w-full rounded-md container py-6 text-black">
                {/* Filter and search section */}
                <div className="mb-6 px-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-auto flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1) // Reset to first page on search
                                }}
                                className="pl-10 bg-white text-black"
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto text-black">
                            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                                <SelectTrigger className="w-full md:w-[180px] bg-white">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                    <SelectItem value="alphabetical">A-Z</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button variant="outline" className="bg-white" onClick={() => setShowFilters(!showFilters)}>
                                <SlidersHorizontal size={18} className="mr-2" />
                                Filters
                            </Button>
                        </div>
                    </div>

                    {/* Advanced filters (expandable) */}
                    {showFilters && (
                        <div className="mt-4 p-4 bg-white rounded-md border">
                            <h3 className="font-medium mb-3">Filter Options</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500 mb-1 block">Category</label>
                                    <Select defaultValue="all">
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Categories</SelectItem>
                                            <SelectItem value="web">Web Development</SelectItem>
                                            <SelectItem value="mobile">Mobile Apps</SelectItem>
                                            <SelectItem value="design">Design</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 mb-1 block">Status</label>
                                    <Select defaultValue="all">
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Statuses" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 mb-1 block">Date Range</label>
                                    <Select defaultValue="all">
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Time</SelectItem>
                                            <SelectItem value="week">Last Week</SelectItem>
                                            <SelectItem value="month">Last Month</SelectItem>
                                            <SelectItem value="year">Last Year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button variant="outline" size="sm" className="mr-2">
                                    Reset
                                </Button>
                                <Button size="sm">Apply Filters</Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results count */}
                <div className="px-4 mb-4">
                    <p className="text-sm text-gray-500">
                        Showing {paginatedProjects?.length || 0} of {filteredProjects?.length || 0} projects
                    </p>
                </div>

                {/* Projects grid */}
                {paginatedProjects?.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium">No projects found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 py-4 text-black gap-4">
                        {paginatedProjects?.map((project: ProjectGet) => (
                            <Card key={project?.id} className="h-full flex flex-col">
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{project?.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{project?.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="relative h-48 w-full">
                                        <img
                                            src={project?.imageUrl || "/placeholder.svg?height=300&width=400"}
                                            alt={project?.title}
                                            className="h-full w-full object-cover rounded-md"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement
                                                target.src = "/placeholder.svg?height=300&width=400"
                                            }}
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {project.created_at ? new Date(unixToDate(project?.created_at)).toLocaleDateString() : "No date"}
                    </span>
                                        <Link href={`/projects/${project?.id}`}>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </Link>

                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                    let pageNumber

                                    // Logic to show pages around current page
                                    if (totalPages <= 5) {
                                        pageNumber = i + 1
                                    } else if (currentPage <= 3) {
                                        pageNumber = i + 1
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNumber = totalPages - 4 + i
                                    } else {
                                        pageNumber = currentPage - 2 + i
                                    }

                                    return (
                                        <PaginationItem key={i}>
                                            <PaginationLink onClick={() => setCurrentPage(pageNumber)} isActive={currentPage === pageNumber}>
                                                {pageNumber}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                })}

                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </>
    )
}

export default UserProjectPageClient

