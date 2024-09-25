import { Link } from "@/i18n/routing";
import React from "react";
import {
    FaFacebookF,
    FaLinkedin,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

interface Props {
    title: string;
    size: number;
    url: string;
    position: string;
}

const SocialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
    X: FaXTwitter,
    Youtube: FaYoutube,
    Linkedin: FaLinkedin,
    Facebook: FaFacebookF,
};

export default function SocialButton(props: Props) {
    const IconComponent = SocialIcons[props.title];

    return (
        <Link
            className="flex relative items-center justify-center h-7 aspect-square group"
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div
                className={`absolute flex justify-center px-1 text-sm invisible opacity-0 duration-300 group-hover:opacity-100 group-hover:visible ${
                    props.position === "top"
                        ? "bottom-2/3 group-hover:bottom-[130%] bg-background"
                        : props.position === "bottom"
                        ? "top-2/3 group-hover:top-[130%] bg-primary"
                        : ""
                }`}
            >
                <p className="z-10">{props.title}</p>
                <div
                    className={`absolute h-3 aspect-square rotate-45 ${
                        props.position === "top"
                            ? "top-2/3 bg-background"
                            : props.position === "bottom"
                            ? "bottom-2/3 bg-primary"
                            : ""
                    }`}
                />
            </div>
            <div
                className={`${
                    props.title === "X"
                        ? "group-hover:text-x"
                        : props.title === "Linkedin"
                        ? "group-hover:text-linkedin"
                        : props.title === "Youtube"
                        ? "group-hover:text-youtube"
                        : props.title === "Facebook"
                        ? "group-hover:text-facebook"
                        : "group-hover:text-white"
                } duration-150`}
            >
                {IconComponent && <IconComponent size={props.size} />}
            </div>
        </Link>
    );
}
