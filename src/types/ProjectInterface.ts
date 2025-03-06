export interface  Project {
    title: string
    description: string
    imageUrl: string
    githubUrl?: string
    liveUrl?: string
    tags: string[],
    details: string
}

export interface TimeObj {
    seconds: number;
    nanoseconds: number;
}

export interface ProjectGet extends Project {
    id: string;
    created_at: TimeObj;
    updated_at: TimeObj;
}

export interface ProjectTag {
    label: string,
    value: string
}

export interface ProjectTagGet extends ProjectTag {
    id: string
}

export interface ProjectFilter {
    tags?: string[]
}

export interface ProjectSort {
    field: keyof Project,
    order: 'asc' | 'desc'
}

export interface ProjectPagination {
    page: number,
    pageSize: number
}