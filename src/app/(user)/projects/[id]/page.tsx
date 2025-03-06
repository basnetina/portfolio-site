import { notFound } from "next/navigation"
import {getSingleProject} from "@/server/services/GetProjects"
import UserProjectDetails from "@/app/(user)/projects/[id]/project-details";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params)?.id
    const projectData = await getSingleProject(id)
    const project = projectData?.data

    try {
        if (!project) {
            return notFound()
        }

        return <UserProjectDetails project={project} />
    } catch (error) {
        console.error("Error fetching project:", error)
        return notFound()
    }
}
