import { notFound } from "next/navigation"
import Image from "next/image"
import { Suspense } from "react"
import unixToDate from "@/utils/unixToDate"
import Divider from "@/components/custom-ui/divider/Divider"
import ContentRenderer from "@/components/pages/users/blogs/ContentRenderer";

async function getBlogData(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
            next: { tags: ['blogs'] },
        })

        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error("Error fetching blog:", error)
        return null
    }
}

// Loading component
function BlogSkeleton() {
    return (
        <div className="w-full max-w-3xl mx-auto px-4 animate-pulse">
            <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-6"></div>
            <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
            </div>
            <Divider className="bg-gray-100 h-[0.01rem] mb-6" />
            <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
        </div>
    )
}

// Blog content component
async function BlogContent({ id }: { id: string }) {
    const data1 = await getBlogData(id)
    const data = data1?.data

    if (!data || Object.keys(data).length === 0) {
        notFound()
    }

    return (
        <article className="w-full max-w-4xl mx-auto bg-[#18212f] px-4 md:px-20 py-10 rounded-md ">

            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">{data.title}</h1>

            <div className="mt-6 flex gap-4 items-center">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full relative overflow-hidden">
                        <Image src="/home/ina.jpeg" alt="Author" fill className="object-cover" sizes="48px" />
                    </div>
                </div>
                <div>
                    <div className="font-medium">{data.created_by}</div>
                    <div className="text-sm text-muted-foreground">{unixToDate(data.created_at, "MMM DD, YYYY")}</div>
                </div>
            </div>

            <Divider className="bg-gray-100 h-[0.01rem] my-6" />
            <ContentRenderer content={data.content}/>

        </article>
    )
}

export default async function BlogPage({ params }: { params: Promise<{ title: string }> }) {
    const title = (await params)?.title
    const mainId = title?.split("-").at(-1)

    if (!mainId) {
        return notFound()
    }

    return (
        <main>

            <Suspense fallback={<BlogSkeleton />}>
                <BlogContent id={mainId} />
            </Suspense>
        </main>
    )
}


export async function generateMetadata({ params }: {params: Promise<{ title: string}>}) {
    const title = (await params)?.title
    const id = title?.split("-").at(-1)
    if (!id) {
        return {}
    }
    const data1 = await getBlogData(id)
    const blog = data1?.data

    return {
        title: blog?.title,
        description: blog?.subtitle,
    }
}