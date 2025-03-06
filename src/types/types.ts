export interface Project {
    id: string
    title: string
    description: string
    imageUrl: string
    githubUrl: string
    liveUrl: string
    tags: string[],
    details: string
}


export type ResumeType = {
    filename: string,
    file: string,
}
