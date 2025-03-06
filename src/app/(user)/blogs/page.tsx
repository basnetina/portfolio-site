import { Suspense } from "react"
import BlogListWithFilters from "@/app/(user)/blogs/blog-list-with-filter";

export default function BlogsPage() {
    return (
        <Suspense fallback={<BlogListSkeleton />}>
            <BlogListWithFilters />
        </Suspense>
    )
}

function BlogListSkeleton() {
    return (
        <section className="py-16 bg-gray-100 dark:bg-gray-900 mt-4 w-full rounded">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Blogs</h2>
                <div className="max-w-3xl mx-auto flex gap-4 flex-col">
                    {Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <div key={index} className="flex items-center gap-4 py-4 border rounded-md p-2">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                                </div>
                                <div className="w-full">
                                    <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                                    <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                                    <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    )
}

