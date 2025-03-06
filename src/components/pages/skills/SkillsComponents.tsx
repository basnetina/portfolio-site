import HexSkill from "@/components/pages/skills/HexSkill";
import {categoryColors, SkillCategory, SkillGet} from "@/types/SkillsInterface";

async function getSkillsData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/skills?email=${process.env.NEXT_PUBLIC_MY_EMAIL}`,{
            next: {
                tags: ['skills']
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

export default async function  SkillsComponents()  {
    const res = await getSkillsData()
    const skills = res?.cms_skills || []

    const categories: SkillCategory[] = Array.from(new Set(skills?.map((skill: SkillGet) => skill?.category)))

    return (
        <>
            <section id="skills" className="py-16 mt-4 rounded w-full bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Skills</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {categories?.map((category, index: number) => (
                            <div key={index} className="w-full md:w-auto">
                                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">{category}</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {skills
                                        ?.filter((skill: SkillGet) => skill.category === category)
                                        .map((skill: SkillGet) => (
                                            <HexSkill
                                                key={skill.name}
                                                name={skill.name}
                                                level={skill.level}
                                                color={categoryColors[skill.category]}
                                            />
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

