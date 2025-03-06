export interface EducationType {
    degree: string
    institution: string
    location: string
    year: string
    endYear: string
    description: string
}

export interface EducationTypeEdit extends EducationType{
    id: string
}