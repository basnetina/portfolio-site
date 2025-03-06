import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {getServerProjects} from "@/server/services/GetProjects";
import {ProjectGet} from "@/types/ProjectInterface";
import type React from "react";
import UserProjectPageClient from "@/components/pages/users/projects/UserProjectPageClient";

const UserProjectPage = async ()=> {
    const projectsData = await getServerProjects()
    const projects= projectsData?.projects

    return (
        <>
            <div className={'bg-sky-50 w-full rounded-md container'}>


                {/*projects grid*/}

                <UserProjectPageClient projects={projects} />


            </div>
        </>
    )
}

export default UserProjectPage