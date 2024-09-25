"use client";

import { Project, ProjectService } from "@/services/projectService";
import projects from "../data/projects.json";
import React from "react";

export default function UploadButton() {
    const projectService = new ProjectService();
    return (
        <button
            onClick={() => {
                projects.forEach(async (x) => {
                    var project = await projectService.create(x as Project);
                    console.log(project);
                });
            }}
        >
            Upload Button
        </button>
    );
}
