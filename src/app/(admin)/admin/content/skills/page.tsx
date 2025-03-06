"use client"

import type React from "react"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import {
    useAddSkillMutation,
    useDeleteSkillMutation,
    useFetchSkillsQuery,
    useUpdateSkillMutation
} from "@/store/features/cms/skills";
import {useCustomToast} from "@/hooks/useCustomToast";
import {categoryColors, Skill, SkillGet} from "@/types/SkillsInterface";
import {revalidateSkills} from "@/app/actions";


const SkillsManagementPage: React.FC = () => {
    const [editingSkill, setEditingSkill] = useState<SkillGet | null>(null)
    const [deleteSkill, setDeleteSkill] = useState<SkillGet | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    // custom
    const [addSkill, {isLoading: isLoadingAdd, data: dataAdd}] = useAddSkillMutation()
    const [updateSkill, {isLoading: isLoadingUpdate, data: dataUpdate}] = useUpdateSkillMutation()
    const [handleDeleteSkill, {isLoading: isLoadingDelete, data: dataDelete}] = useDeleteSkillMutation()

    const {data: getSkills, isLoading} = useFetchSkillsQuery(process.env.NEXT_PUBLIC_MY_EMAIL)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Skill>({
        defaultValues: {
            name: "",
            level: 0,
            category: "",
        }
    })

    const onSubmit: SubmitHandler<Skill> = async (data) => {
        if (editingSkill) {
            updateSkill({...editingSkill, ...data})
            setEditingSkill(null)
            reset({
                name: "",
                level: 0,
                category: ""
            })
        } else {
            addSkill(data)
        }
        reset()
        await revalidateSkills()
    }

    const handleEdit = (skill: SkillGet) => {
        setEditingSkill(skill)
        reset(skill)
    }

    const handleDelete = (skill: SkillGet) => {
        setDeleteSkill(skill)
    }

    const confirmDelete = () => {
        if (deleteSkill) {
            handleDeleteSkill(deleteSkill.id)
            setDeleteSkill(null)
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = getSkills?.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    useCustomToast({
        data: dataAdd
    })

    useCustomToast({
        data: dataUpdate
    })

    useCustomToast({
        data: dataDelete
    })

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Skills Management</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">Name</label>
                        <input {...register("name", { required: "Name is required" })} className="w-full p-2 border rounded" />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>
                    <div>
                        <label className="block mb-2">Level (0-100)</label>
                        <input
                            type="number"
                            {...register("level", {
                                required: "Level is required",
                                min: { value: 0, message: "Minimum level is 0" },
                                max: { value: 100, message: "Maximum level is 100" },
                            })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.level && <span className="text-red-500">{errors.level.message}</span>}
                    </div>
                    <div>
                        <label className="block mb-2">Category</label>
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select a category</option>
                            {Object.keys(categoryColors).map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-500">{errors.category.message}</span>}
                    </div>
                </div>
                <div className={'flex justify-end gap-4'}>
                    <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        {editingSkill ? "Update Skill" : "Add Skill"}
                    </button>
                    <button type={'button'} onClick={()=> reset({
                        name: "",
                        level: 0,
                        category: "",
                    })} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                       Reset
                    </button>
                </div>

            </form>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Skills List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Level</th>
                            <th className="p-2 text-left">Category</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems?.map((skill: SkillGet) => (
                            <tr key={skill.id} className="border-b">
                                <td className="p-2">{skill.name}</td>
                                <td className="p-2">{skill.level}</td>
                                <td className="p-2">
                    <span
                        className="px-2 py-1 rounded text-white text-sm"
                        style={{ backgroundColor: categoryColors[skill.category] }}
                    >
                      {skill.category}
                    </span>
                                </td>
                                <td className="p-2">
                                    <button onClick={() => handleEdit(skill)} className="mr-2 text-blue-500 hover:text-blue-700">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(skill)} className="text-red-500 hover:text-red-700">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span>
            Page {currentPage} of {Math.ceil(getSkills?.length / itemsPerPage)}
          </span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(getSkills?.length / itemsPerPage)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {deleteSkill && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete the skill "{deleteSkill.name}"?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setDeleteSkill(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SkillsManagementPage

