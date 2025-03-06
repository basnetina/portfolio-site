"use client"

import type React from "react"
import Link from "next/link"
import {Edit, Trash2, Plus, Github} from "lucide-react"
import {useDeleteProjectMutation, useFetchProjectsQuery} from "@/store/features/projects";
import {ProjectGet} from "@/types/ProjectInterface";
import {Icon} from "@iconify/react";

const ProjectListPage: React.FC = () => {
    const {data, isLoading: isLoadingGET} = useFetchProjectsQuery(process.env.NEXT_PUBLIC_MY_EMAIL)
    const [deleteProject, {isLoading: isLoadingDelete}] = useDeleteProjectMutation()

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            deleteProject(id)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Project Management</h1>
                <Link href="/admin/projects/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <Plus className="inline mr-2" size={18} />
                    Add New Project
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    isLoadingGET && (
                        <div className="text-center text-gray-600 animate-bounce">
                            <Icon icon={'eos-icons:loading'} className={'text-4xl'}/>
                        </div>
                    )
                }
                {
                    data?.length === 0 && (
                        <>
                            <p className=" text-2xl text-gray-600 mt-10">No projects found...</p>
                        </>
                    )
                }
                {data?.map((project: ProjectGet) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={project.imageUrl || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project?.tags?.map?.((tag) => (
                                    <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                                ))}
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <Link href={`/admin/projects/edit/${project.id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                                        <Edit size={18} className="inline" />
                                    </Link>
                                    <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700">
                                        <Trash2 size={18} className="inline" />
                                    </button>
                                </div>
                                <div className={'flex items-center'}>
                                    {project?.githubUrl && <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-gray-700 mr-2"
                                    >
                                        <Github size={18}/>
                                    </a>}
                                    {project.liveUrl && <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        Demo
                                    </a>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectListPage

