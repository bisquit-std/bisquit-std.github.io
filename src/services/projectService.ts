import { ImageTypes } from "@/constants/constants";
import { FirebaseBaseService } from "./FirebaseBaseService";

export interface Project {
    id: string;
    title: string;
    type: string;
    description: string;
    technologies: string[];
    platforms: string[];
    url?: string;
    imageCount: number;
    coverType: ImageTypes;
    imageType: ImageTypes;
}

interface CreateProject {
    title: string;
    type: string;
    description: string;
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
