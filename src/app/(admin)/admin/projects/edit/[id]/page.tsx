"use client"

import {ProjectTagGet} from "@/types/ProjectInterface";
import React, {use, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Project} from "@/types/types";
import {getBase64} from "@/utils/getBase64";
import {useRouter} from "next/navigation";
import {useFetchSingleProjectQuery, useUpdateProjectMutation} from "@/store/features/projects";
import {useFetchProjectTagsQuery} from "@/store/features/projects/tags";
import {useCustomToast} from "@/hooks/useCustomToast";
import LoadingSpinner from "@/components/custom-ui/loading/LoadingSpinner";
import {getFileFromBase64Pdf} from "@/utils/getFileFromBase64Pdf";
import CustomLoadingBtn from "@/components/custom-ui/loading/CustomLoadingBtn";
import {revalidateProjects} from "@/app/actions";
import {Content} from "@tiptap/react";
import {MinimalTiptapEditor} from "@/components/minimal-tiptap";

const ProjectEditPage = ({
                              params
                          }: {
    params: Promise<{ id: string }>
}) => {
    const router = useRouter()
    const [updateProject, {data, isLoading: isLoadingUpdate} ] = useUpdateProjectMutation()
    const {data: tags, isLoading: isLoadingTags} = useFetchProjectTagsQuery(process.env.NEXT_PUBLIC_MY_EMAIL)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const {id: projectId} = use(params)
    const [value, setValue] = useState<Content>('')

    const {
        data: project,
        isLoading: isLoadingGet
    } = useFetchSingleProjectQuery(projectId)


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Project>({
        defaultValues: {
            title: "",
            description: "",
            imageUrl: '',
            githubUrl: '',
            liveUrl: '',
            tags: []
        }
    })

    useEffect(()=>{
        if(project?.tags && Object.keys?.(project?.tags)?.length > 0){
            reset({
                title: project?.title,
                description: project?.description,
                imageUrl: project?.imageUrl,
                githubUrl: project?.githubUrl,
                liveUrl: project?.liveUrl,
                tags: project?.tags,
            })
            const separate = project?.imageUrl.split(';')?.[0]
            const separate1 = separate.split(':')?.[1]

            setValue(project?.details)

            setSelectedFile(getFileFromBase64Pdf(project?.imageUrl, `${project?.title}.jpg`, separate1))
        }

    },[project])

    const onSubmit: SubmitHandler<Project> = async (formData) => {
        if (!selectedFile) {
            alert("Please select an image file")
            return
        }

        try {
            setIsUploading(true)
            const base64Image = await getBase64(selectedFile)

            const projectData = {
                ...formData,
                imageUrl: base64Image,
                details: value
            }

            await updateProject({
                ...projectData,
                id: projectId
            })
            await revalidateProjects()
        } catch (error) {
            console.error("Error uploading image:", error)
            alert("Error uploading image")
        } finally {
            setIsUploading(false)
        }
    }
    useCustomToast({
        data,
        successFn: () => {
            reset();
            router.push("/admin/projects")
        }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }
    return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Update Project: </h1>
                {isLoadingGet ? <LoadingSpinner /> : <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                    <div className="mb-4 flex gap-4 justify-between">
                        <div>
                            <div className={'flex gap-1'}>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                    Project Image
                                </label>
                                <span style={{ color: 'red', fontSize: 12}}>*</span>
                            </div>
                            <input
                                onChange={handleFileChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="image"
                                type="file"
                                accept="image/*"
                            />
                            {selectedFile && <p className="text-sm mt-1">Selected file: {selectedFile.name}</p>}
                        </div>
                        <div>
                            <img alt={'project file'} src={project?.imageUrl} height={200} width={300}/>
                        </div>
                    </div>


                    <div className="mb-4">
                        <div className={'flex gap-1'}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <span style={{ color: 'red', fontSize: 12}}>*</span>
                        </div>
                        <input
                            {...register("title", {required: "Title is required"})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Project Title"
                        />
                        {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
                    </div>

                    <div className="mb-4">
                        <div className={'flex gap-1'}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Short Description
                            </label>
                            <span style={{ color: 'red', fontSize: 12}}>*</span>
                        </div>
                        <textarea
                            {...register("description", {required: "Description is required"})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Project Description in Short"
                            rows={4}
                        />
                        {errors.description &&
                            <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="githubUrl">
                            GitHub URL
                        </label>
                        <input
                            {...register("githubUrl")}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="githubUrl"
                            type="text"
                            placeholder="https://github.com/username/project"
                        />
                        {errors.githubUrl && <p className="text-red-500 text-xs italic">{errors.githubUrl.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="liveUrl">
                            Live URL
                        </label>
                        <input
                            {...register("liveUrl")}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="liveUrl"
                            type="text"
                            placeholder="https://project-demo.com"
                        />
                        {errors.liveUrl && <p className="text-red-500 text-xs italic">{errors.liveUrl.message}</p>}
                    </div>
                    <div className="mb-4">
                        <div className={'flex gap-1'}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                                Tags
                            </label>
                            <span style={{ color: 'red', fontSize: 12}}>*</span>
                        </div>
                        <select
                            multiple
                            {...register("tags", {required: "At least one tag is required"})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="tags"
                        >
                            {tags?.map((tag: ProjectTagGet) => (
                                <option key={tag?.label} value={tag?.value}>
                                    {tag?.label}
                                </option>
                            ))}
                        </select>
                        {errors.tags && <p className="text-red-500 text-xs italic">{errors.tags.message}</p>}
                    </div>
                    <div className="mb-4">
                        <div className={'flex gap-1'}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                                Details
                            </label>
                            <span style={{ color: 'red', fontSize: 12}}>*</span>
                        </div>

                        <MinimalTiptapEditor
                            value={value}
                            onChange={setValue}
                            className="w-full"
                            editorContentClassName="p-5"
                            output="html"
                            placeholder="Write project details..."
                            autofocus={true}
                            editable={true}
                            editorClassName="focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        {isLoadingUpdate ? <CustomLoadingBtn /> : <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update Project
                        </button>}

                    </div>
                </form>}
            </div>
    )
}

export default ProjectEditPage