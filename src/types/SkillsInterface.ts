export interface Skill {
    name: string
    level: number
    category: SkillCategory | ""
}

export interface SkillGet extends Skill{
    id: string
}

export enum SkillCategory {
    FullStack = "FullStack",
    Frontend = "Frontend(JS/TS)",
    Backend = "Backend",
    Database = "Database",
    Tools = "Tools",
    Mobile = "Mobile",
    Other = "Other"
}

export const categoryColors: { [key: string]: string } = {
    "FullStack": "#34dbcd",
    "Frontend(JS/TS)": "#3498db",
    Backend: "#2ecc71",
    Database: "#e74c3c",
    Tools: "#f39c12",
    Mobile: "rgba(0,0,0,0.45)",
}