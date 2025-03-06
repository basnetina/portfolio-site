"use client"

import { useState } from "react"
import blogs, {useDeleteBlogMutation, useFetchBlogsServerQuery} from "@/store/features/blogs"
import { BlogGet } from "@/types/BlogType"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Tag, Trash2 } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import unixToDate from "@/utils/unixToDate";
import {useCustomToast} from "@/hooks/useCustomToast";

export default function BlogsPage() {
    const { data, isLoading, error } = useFetchBlogsServerQuery(process.env.NEXT_PUBLIC_MY_EMAIL )
    const [blogToDelete, setBlogToDelete] = useState<BlogGet | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteBlog, {isLoading:isLoadingDelete, data: dataDelete}] = useDeleteBlogMutation()

    const handleDeleteClick = (e: React.MouseEvent, blog: BlogGet) => {
        e.preventDefault()
        e.stopPropagation()
        setBlogToDelete(blog)
    }

    const handleDeleteConfirm = async () => {
        if (!blogToDelete) return

        setIsDeleting(true)
        try {
            deleteBlog(blogToDelete?.id)
        } catch (error) {
            setIsDeleting(false)
        } finally {
            setIsDeleting(false)
            setBlogToDelete(null)
        }
    }

    useCustomToast({
        data: dataDelete
    })

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8">My Blogs</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <Card key={index} className="overflow-hidden h-[320px]">
                            <Skeleton className="h-40 w-full" />
                            <CardHeader className="pb-2">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-5/6" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Oops!</h1>
                <p className="text-muted-foreground mb-8">We encountered an error while loading your blogs.</p>
                <p className="text-destructive">Please try again later.</p>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">No Blogs Found</h1>
                <p className="text-muted-foreground mb-8">You haven't created any blogs yet.</p>
                <Link
                    href="/admin/blogs/add"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    Create Your First Blog
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Blogs</h1>
                <Link
                    href="/admin/blogs/add"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    New Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((blog: BlogGet) => (
                    <div key={blog.id} className="group relative">
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => handleDeleteClick(e, blog)}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete blog</span>
                        </Button>

                        <Link href={`/admin/blogs/${blog.id}`}>
                            <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md group-hover:border-primary">
                                <div className="h-48 w-full bg-muted overflow-hidden">
                                    <img
                                        src={blog?.thumbnail || "https://placehold.co/384x192"}
                                        alt={blog?.title}
                                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                    />
                                </div>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        {
                                            <Badge variant="secondary" className="text-xs">
                                                <Tag className="h-3 w-3 mr-1" />
                                                ALL
                                            </Badge>
                                        }
                                        {blog?.created_at && (
                                            <span className="text-xs text-muted-foreground flex items-center">
                                                <CalendarIcon className="h-3 w-3 mr-1" />
                                                {unixToDate(blog.created_at)}
                                            </span>
                                        )}
                                    </div>
                                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                        {blog.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm line-clamp-3">
                                        {"No description available for this blog post."}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>

            <AlertDialog open={!!blogToDelete} onOpenChange={(open: boolean) => !open && setBlogToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this blog?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the blog
                            <strong className="block mt-2">{blogToDelete?.title}</strong>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
