import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "selector",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                background: "var(--background)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary: "var(--tertiary)",
                text: "var(--text)",
            },
            textColor: {
                background: "var(--background)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary: "var(--tertiary)",
                text: "var(--text)",
                x: "var(--x)",
                linkedin: "var(--linkedin)",
                youtube: "var(--youtube)",
                facebook: "var(--facebook)",
            },
            borderColor: {
                background: "var(--background)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary: "var(--tertiary)",
                text: "var(--text)",
            },
        },
    },
    plugins: [],
};
export default config;
