import { ImageTypes } from "@/constants/constants";
import { FirebaseBaseService } from "./FirebaseBaseService";

export interface Project {
    id: string;
    title: string;
    type: {
        en: string;
        tr: string;
        es: string;
    };
    description: {
        en: string;
        tr: string;
        es: string;
    };
    technologies: string[];
    platforms: string[];
    url?: string;
    imageCount: number;
    coverType: ImageTypes;
    imageType: ImageTypes;
}

interface CreateProject {
    title: string;
    type: {
        en: string;
        tr: string;
        es: string;
    };
    description: {
        en: string;
        tr: string;
        es: string;
    };
    technologies: string[];
    platforms: string[];
    url?: string;
    imageCount: number;
    coverType: ImageTypes;
    imageType: ImageTypes;
}

interface UpdateProject {}

export class ProjectService extends FirebaseBaseService<
    Project,
    CreateProject,
    UpdateProject
> {
    constructor() {
        super("projects");
    }
}
