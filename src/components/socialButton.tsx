import { Link } from "@/i18n/routing";
import React from "react";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

interface Props {
    id: string;
    size: number;
    url: string;
}

const SocialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
    x: FaXTwitter,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
};

export default function SocialButton(props: Props) {
    const IconComponent = SocialIcons[props.id];

    return (
        <Link
            className="flex items-center justify-center hover:text-tertiary duration-150"
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <IconComponent size={props.size} />
        </Link>
    );
}
