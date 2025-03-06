"use client"

import { EducationType } from "@/types/EducationType"
import type React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import CustomLoadingBtn from "@/components/custom-ui/loading/CustomLoadingBtn";
import {revalidateEducation} from "@/app/actions";

interface EducationFormProps {
    education?: EducationType
    onSubmit: (education: EducationType) => void
    onCancel?: () => void,
    isLoading?: boolean
}

const EducationForm: React.FC<EducationFormProps> = ({ education, onSubmit, onCancel, isLoading=false }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EducationType>({
        defaultValues: education || {
            degree: "",
            institution: "",
            location: "",
            year: "",
            endYear: "",
            description: "",
        },
    })

    const onSubmitForm: SubmitHandler<EducationType> = async (data) => {
        onSubmit(data)
        await revalidateEducation()
    }

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
                <label htmlFor="degree" className="block text-gray-700 text-sm font-bold mb-2">
                    Degree
                </label>
                <input
                    id="degree"
                    {...register("degree", { required: "Degree is required" })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.degree && <p className="text-red-500 text-xs italic">{errors.degree.message}</p>}
            </div>
            <div>
                <label htmlFor="institution" className="block text-gray-700 text-sm font-bold mb-2">
                    Institution
                </label>
                <input
                    id="institution"
                    {...register("institution", { required: "Institution is required" })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.institution && <p className="text-red-500 text-xs italic">{errors.institution.message}</p>}
            </div>
            <div>
                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                    Location
                </label>
                <input
                    id="location"
                    {...register("location", { required: "Location is required" })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.location && <p className="text-red-500 text-xs italic">{errors.location.message}</p>}
            </div>
            <div>
                <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">
                    Start Year
                </label>
                <input
                    id="year"
                    {...register("year", {
                        required: "Year is required",
                        pattern: {
                            value: /^\d{4}$/,
                            message: "Year must be a 4-digit number",
                        },
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.year && <p className="text-red-500 text-xs italic">{errors.year.message}</p>}
            </div>
            <div>
                <label htmlFor="endYear" className="block text-gray-700 text-sm font-bold mb-2">
                    End Year
                </label>
                <input
                    id="endYear"
                    {...register("endYear", {
                        required: "End Year is required",
                        pattern: {
                            value: /^\d{4}$/,
                            message: "End Year must be a 4-digit number",
                        },
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.endYear && <p className="text-red-500 text-xs italic">{errors.endYear.message}</p>}
            </div>
            <div>
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    {...register("description", { required: "Description is required" })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={3}
                />
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
            </div>
            <div className="flex items-center justify-between">
                {isLoading ? <CustomLoadingBtn /> : <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {education ? "Update" : "Add"} Education
                </button>}
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}

export default EducationForm

