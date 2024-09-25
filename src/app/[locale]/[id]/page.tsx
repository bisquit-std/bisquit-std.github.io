import Footer from "@/components/footer";
import ImageCarousel from "@/components/imageCarousel";
import LocaleButton from "@/components/navbar/localeButton";
import ThemeButton from "@/components/navbar/themeButton";
import UploadButton from "@/components/uploadButton";
import { ImageTypes } from "@/constants/constants";
import { Link } from "@/i18n/routing";
import { StorageService } from "@/services/imageService";
import { ProjectService } from "@/services/projectService";

import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default async function ProjectPage({
    params,
}: {
    params: { id: string };
}) {
    const projectService = new ProjectService();
    const project = await projectService.getById(params.id);

    return (
        <>
            <div className="fixed w-screen h-screen -z-10 background" />
            <div className="flex flex-col min-h-screen items-center py-10 bg-black bg-opacity-0">
                <div className="w-full">
                    <ImageCarousel
                        images={StorageService.getProjectImages(
                            params.id,
                            project.imageCount
                        )}
                        type={project.imageType}
                    />
                </div>
                <div className="flex fixed top-0 left-0 w-64 items-center h-11 border-b border-r rounded-br-lg overflow-hidden border-text">
                    <Link
                        className="flex items-center justify-center w-1/4 h-full border-r border-text bg-primary hover:text-tertiary"
                        href={"/"}
                    >
                        <FaArrowLeft size={18} />
                    </Link>
                    <div className="flex items-center justify-center w-2/4 h-full border-r border-text">
                        <LocaleButton />
                    </div>
                    <div className="flex items-center justify-center w-1/4 h-full bg-primary">
                        <ThemeButton />
                    </div>
                </div>
                <p>{project.title}</p>
                <UploadButton />
            </div>
            <Footer long />
        </>
    );
}
