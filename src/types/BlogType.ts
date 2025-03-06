import {TimeObj} from "@/types/ProjectInterface";

export interface BlogInterface {
    title: string;
    content: string;
    created_by?: string;
    subtitle?:string;
    created_at?: TimeObj;
    updated_at?: TimeObj;
    thumbnail?: string;
}

export interface BlogGet extends BlogInterface {
    id: string;
}

export interface BlogList {
    title: string;
    subtitle?:string;
    created_at?: TimeObj;
    updated_at?: TimeObj;
    thumbnail?: string;
    id?:string;
    created_by: string;
}
