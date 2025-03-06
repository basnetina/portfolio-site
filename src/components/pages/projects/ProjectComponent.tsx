import {CircleChevronRight, ExternalLink, Github} from "lucide-react";
import {Project, ProjectGet} from "@/types/ProjectInterface";
import Link from "next/link";


const ProjectCard: React.FC<ProjectGet> = ({ id, title, description, imageUrl, githubUrl, liveUrl, tags }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <Link href={`/projects/${id}`}>
            <img
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
            />
        </Link>

        <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                    >
            {tag}
          </span>
                ))}
            </div>
            <div className="flex justify-between">
                <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white flex items-center"
                >
                    <Github size={20} className="mr-1" /> Code
                </a>
                <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                >
                    <ExternalLink size={20} className="mr-1" /> Live Demo
                </a>
            </div>
        </div>
    </div>
)

async function getProjectData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?email=${process.env.NEXT_PUBLIC_MY_EMAIL}&limit=3`,{
            next: {
                tags: ['projects']
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

export default async  function ProjectComponent() {
    const res = await getProjectData()
    const data = res?.projects || []

    return (
        <>
            <section id="projects" className=" py-16 mt-4 bg-gray-100 dark:bg-gray-900 rounded w-full">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">My Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data?.map((project: ProjectGet) => (
                            <ProjectCard {...project} key={project?.id}/>
                        ))}
                    </div>
                    <div>
                        {data?.length === 3 && <div className={'mt-4 flex justify-center'}>
                            <Link href={'/projects'}>
                                <button className="btn btn-primary bg-blue-950 gap-4 flex items-center py-2 px-2 rounded-md">
                                    See More Projects <CircleChevronRight size={20}/>
                                </button>
                            </Link>
                        </div>}
                    </div>


                </div>
            </section>
        </>
    )
}

