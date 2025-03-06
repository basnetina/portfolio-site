import type React from "react"
import {EducationTypeEdit} from "@/types/EducationType";
import EducationItems from "@/components/pages/education/EducationItem";

interface EducationItem {
    degree: string
    institution: string
    location: string
    year: string
    description: string
}

async function getEducationData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/education?email=${process.env.NEXT_PUBLIC_MY_EMAIL}`,{
            next: {
                tags: ['education']
            }
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }

}

const educationData: EducationItem[] = [
    {
        degree: "BSC Honours Computing",
        institution: "Leeds Beckett University",
        location: "Leeds LS1 3HE, United Kingdom",
        year: "2020 - 2022",
        description:
            "Specialized in Artificial Intelligence, Big Data and Machine Learning. Completed thesis on 'Understanding Big Data in Artificial Intelligence'.",
    },
    {
        degree: "BTech HND leading to BSC.IT",
        institution: "International School of Management and Technology",
        location: "Tinkune, Kathmandu, Nepal",
        year: "2018 - 2020",
        description:
            "Graduated with honors. Explored the networking areas of the computer. Completed thesis on 'Smart Agriculture System' ",
    },
    {
        degree: "+2 Science",
        institution: "Columbus College",
        location: "Shankhamul, Kathmandu, Nepal",
        year: "2014 - 2016",
        description:
            "Graduated with honors. Step up to the computing Worlds ",
    },
    {
        degree: "School",
        institution: "Columbus College",
        location: "Shankhamul, Kathmandu, Nepal",
        year: "2004 - 2014",
        description:
            "Completed my school level with optional mathematics and accounts in the major subject in 9 and 10",
    },
]


export async function EducationComponent  ()  {
    const res = await getEducationData()
    const educations = res?.education || []

    return (
        <section id="education" className="py-16 bg-gray-100 dark:bg-gray-900 mt-4 w-full rounded">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Education</h2>
                <div className="max-w-3xl mx-auto">
                    {educations?.map?.((item: EducationTypeEdit, index: number) => (
                        <EducationItems key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

