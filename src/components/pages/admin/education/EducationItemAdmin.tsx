
import type React from "react"
import {EducationType} from "@/types/EducationType";

interface EducationItemProps {
    education: EducationType
    onEdit: () => void
    onDelete: () => void
}

const EducationItemAdmin: React.FC<EducationItemProps> = ({ education, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-2">{education.degree}</h2>
            <p className="text-gray-700 mb-2">{education.institution}</p>
            <p className="text-gray-600 mb-2">{education.location}</p>
            <p className="text-gray-600 mb-2">{education.year} - {education?.endYear}</p>
            <p className="text-gray-700 mb-4">{education.description}</p>
            <div className="flex justify-end space-x-2">
                <button
                    onClick={onEdit}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default EducationItemAdmin

