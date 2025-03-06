"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Share2, Bookmark, BookmarkCheck, Clock, User, Tag, ExternalLink } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectGet } from "@/types/ProjectInterface"
import unixToDate from "@/utils/unixToDate";
import {useFetchLimitedProjectsQuery} from "@/store/features/projects";
import ContentRenderer from "@/components/pages/users/blogs/ContentRenderer";

interface ProjectDetailsProps {
    project: ProjectGet
}

export default function UserProjectDetails({ project }: ProjectDetailsProps) {
    const router = useRouter()
    const [isSaved, setIsSaved] = useState(false)
    const {data: projects, isLoading: isLoadingProjects} = useFetchLimitedProjectsQuery(3)

    const limitedProjects = projects?.filter((item: ProjectGet) => item.id !== project?.id)

    // Format date if available
    const formattedDate = unixToDate(project?.created_at, "MMMM DD, YYYY") || 'Date not available'

    // Mock data for the tabs sections
    const projectTags = project?.tags
    const projectTeam = [
        { id: 1, name: 'Jane Cooper', role: 'Project Lead' },
        { id: 2, name: 'Alex Johnson', role: 'Developer' },
        { id: 3, name: 'Maria Garcia', role: 'Designer' }
    ]

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Back button and actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <Button
                    variant="ghost"
                    className="mb-4 sm:mb-0 pl-0"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Button>

                <div className="flex space-x-2 text-black">
                    <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsSaved(!isSaved)}
                    >
                        {isSaved ? (
                            <>
                                <BookmarkCheck className="mr-2 h-4 w-4 text-green-500" />
                                Saved
                            </>
                        ) : (
                            <>
                                <Bookmark className="mr-2 h-4 w-4" />
                                Save
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column - Project image and metadata */}
                <div className="lg:col-span-2">
                    <Card className="overflow-hidden">
                        <div className="relative h-[300px] sm:h-[400px] w-full">
                            <Image
                                src={project.imageUrl || '/placeholder.svg?height=800&width=1200'}
                                alt={project.title}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder.svg?height=800&width=1200';
                                }}
                            />
                        </div>

                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl md:text-3xl">{project.title}</CardTitle>
                                    <CardDescription className="mt-2 text-base">
                                        {project.description}
                                    </CardDescription>
                                </div>
                                <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200">Active</Badge>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>Created: {formattedDate}</span>
                                </div>
                            </div>

                            <Tabs defaultValue="overview">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="pt-4">
                                    {/*<div dangerouslySetInnerHTML={{__html: project?.details ?? <p></p>}}></div>*/}


                                        <ContentRenderer content={project?.details}/>


                                    <div className={'mt-20'}>
                                        <h3 className="font-medium text-lg mb-2">Technologies</h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {projectTags.map((tag) => (
                                                <Badge key={tag} variant="outline">{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                </TabsContent>

                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column - Additional info and actions */}
                <div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Related Projects</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {
                                isLoadingProjects ? (
                                    [1,2,3]?.map(i => <div key={i} className="block">
                                    <div className="flex items-center p-2 hover:bg-muted rounded-md transition-colors">
                                        <div
                                            className="w-12 h-12 bg-gray-200 rounded-md mr-3 relative overflow-hidden animate-pulse"/>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"/>
                                            <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"/>
                                        </div>
                                    </div>
                                </div> )
                                ): (
                                    limitedProjects?.map?.((pro: ProjectGet, i: number) => (
                                        <Link href={`/projects/${pro?.id}`} key={pro?.id} className="block">
                                            <div className="flex items-center p-2 hover:bg-muted rounded-md transition-colors">
                                                <div className="w-12 h-12 bg-gray-200 rounded-md mr-3 relative overflow-hidden">
                                                    <Image
                                                        src={pro?.imageUrl}
                                                        alt={pro?.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{pro?.title} {i}</p>
                                                    <p className="text-sm text-muted-foreground">{pro.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                )
                            }

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
