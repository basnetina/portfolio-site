"use client"
import type React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"
import {
    useAddProjectTagMutation,
    useDeleteProjectTagMutation,
    useFetchProjectTagsQuery
} from "@/store/features/projects/tags";
import {ProjectTag, ProjectTagGet} from "@/types/ProjectInterface";
import CustomLoadingBtn from "@/components/custom-ui/loading/CustomLoadingBtn";
import {useCustomToast} from "@/hooks/useCustomToast";
import {toPascalCase} from "@/utils/toPascalCase";

const ProjectCategoriesPage = () => {
    const [addProjectTag, {data, isLoading: isLoadingAdd }] = useAddProjectTagMutation()
    const {data: tags, isLoading: isLoadingGet} = useFetchProjectTagsQuery(process.env.NEXT_PUBLIC_MY_EMAIL)
    const [deleteTag, {data: deleteTagData, isLoading: isLoadingDelete}] = useDeleteProjectTagMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProjectTag>({
        defaultValues: {
            label: "",
            value: ""
        }
    })

    const onSubmit: SubmitHandler<ProjectTag> = (data) => {
        const newTag: ProjectTag = {
            label: data.label?.trim(),
            value: toPascalCase(data?.label?.trim())
        }
        addProjectTag(newTag)

        reset()
    }

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            deleteTag(id)
        }
    }

    useCustomToast({
        data
    })

    useCustomToast({
        data: deleteTagData
    })

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Manage Project Tags</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
                    <div className="flex items-center">
                        <input
                            {...register("label", {required: "Category name is required"})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                            type="text"
                            placeholder="New Tag Name"
                        />
                        {( isLoadingAdd || isLoadingDelete) ? <CustomLoadingBtn /> : <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            <Plus size={18}/>
                        </button>}
                    </div>
                    {errors.label && <p className="text-red-500 text-xs italic mt-2">{errors.label.message}</p>}
                </form>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Existing Tags</h2>
                    <ul>
                        {
                            tags?.length === 0 && (
                                <p className="text-gray-600">No tags found.</p>
                            )
                        }
                        {tags?.map((tag: ProjectTagGet) => (
                            <li key={tag.id} className="flex justify-between items-center py-2 border-b">
                                <span>{tag?.label}</span>
                                <button onClick={() => handleDelete(tag.id)}
                                        className="text-red-500 hover:text-red-700">
                                    <Trash2 size={18}/>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProjectCategoriesPage