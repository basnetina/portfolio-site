"use client"

import type React from "react";
import {motion} from "framer-motion";
import {Calendar, GraduationCap, MapPin} from "lucide-react";
import {EducationType} from "@/types/EducationType";

const EducationItems: React.FC<EducationType> = ({ degree, endYear, institution, location, year, description }) => {
    return (
        <motion.div
            className="mb-8 flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex-shrink-0 w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                <GraduationCap size={40} className="text-white" />
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{degree}</h3>
                <h4 className="text-lg text-gray-600 dark:text-gray-300">{institution}</h4>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <MapPin size={16} className="mr-1" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <Calendar size={16} className="mr-1" />
                    <span>{year}-{endYear}</span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
            </div>
        </motion.div>
    )
}


export default EducationItems