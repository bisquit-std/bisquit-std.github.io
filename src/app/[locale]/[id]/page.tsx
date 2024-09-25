import Footer from "@/components/footer";
import ImageCarousel from "@/components/imageCarousel";
import LocaleButton from "@/components/navbar/localeButton";
import ThemeButton from "@/components/navbar/themeButton";
import UploadButton from "@/components/uploadButton";
import { Link } from "@/i18n/routing";
import { StorageService } from "@/services/imageService";
import { ProjectService } from "@/services/projectService";
import { getTranslations } from "next-intl/server";

import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { VscDebugBreakpointLog } from "react-icons/vsc";

export default async function ProjectPage({
    params: { id, locale },
}: {
    params: { id: string; locale: string };
}) {
    const t = await getTranslations();
    const projectService = new ProjectService();
    const project = await projectService.getById(id);

    return (
        <>
            <div className="fixed w-screen h-screen -z-10 background" />
            <div className="flex fixed top-0 left-0 w-64 items-center h-11 border-b border-r rounded-br-lg overflow-hidden border-text z-10">
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
            <div className="flex flex-col min-h-screen items-center">
                <div className="w-full">
                    <ImageCarousel
                        images={StorageService.getProjectImages(
                            id,
                            project.imageCount
                        )}
                        type={project.imageType}
                    />
                </div>
                <div className="flex flex-col w-[50%] gap-1 mt-10 mb-20">
                    <p
                        style={{
                            boxShadow: "0 0 16px -12px var(--text)",
                        }}
                        className="text-4xl font-medium bg-primary rounded-md py-4 text-center"
                    >
                        {project.title}
                    </p>
                    <div className="flex gap-1">
                        <div
                            style={{
                                boxShadow: "0 0 16px -12px var(--text)",
                            }}
                            className="flex flex-col w-2/3 p-5 gap-3 bg-primary rounded-md relative"
                        >
                            <p className="text-2xl text-tertiary">
                                {t("Common.description")}
                            </p>
                            <p>
                                {
                                    project.description[
                                        locale as keyof typeof project.description
                                    ]
                                }
                            </p>
                        </div>
                        <div className="flex flex-col w-1/3 gap-1">
                            <div
                                style={{
                                    boxShadow: "0 0 16px -12px var(--text)",
                                }}
                                className="flex flex-col p-5 gap-3 bg-primary rounded-md"
                            >
                                <p className="text-xl text-tertiary">
                                    {t("Common.type")}
                                </p>
                                <p className="font-light">
                                    {
                                        project.type[
                                            locale as keyof typeof project.description
                                        ]
                                    }
                                </p>
                            </div>
                            <div
                                style={{
                                    boxShadow: "0 0 16px -12px var(--text)",
                                }}
                                className="flex flex-col p-5 gap-3 bg-primary rounded-md"
                            >
                                <p className="text-xl text-tertiary">
                                    {project.platforms.length > 1
                                        ? t("Common.platforms")
                                        : t("Common.platform")}
                                </p>
                                <p className="font-light">
                                    {project.platforms
                                        .map((x) => t(`Common.${x}`))
                                        .join(", ")}
                                </p>
                            </div>
                            <div
                                style={{
                                    boxShadow: "0 0 16px -12px var(--text)",
                                }}
                                className="flex flex-col p-5 gap-1 bg-primary rounded-md"
                            >
                                <p className="text-xl text-tertiary">
                                    {t("Common.technologies")}
                                </p>
                                <div className="flex flex-col">
                                    {project.technologies.map((x, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={
                                                    "flex items-center gap-1 font-light"
                                                }
                                            >
                                                <VscDebugBreakpointLog />{" "}
                                                <p>{x}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {project.url && (
                                <Link
                                    href={project.url}
                                    style={{
                                        boxShadow: "0 0 16px -12px var(--text)",
                                    }}
                                    className="bg-tertiary rounded-md p-2 text-center font-medium text-background"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t("Common.checkOut")}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                {/* <UploadButton /> */}
            </div>
            <Footer long />
        </>
    );
}
