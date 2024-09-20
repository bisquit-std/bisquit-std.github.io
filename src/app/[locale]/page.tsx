import About from "@/components/homePage/about";
import Contact from "@/components/homePage/contact";
import Portfolio from "@/components/homePage/portfolio";
import Welcome from "@/components/homePage/welcome";
import WhatWeDo from "@/components/homePage/whatWeDo";

export default function Home() {
    return (
        <main className="flex flex-col">
            <Welcome />
            <About />
            <WhatWeDo />
            <Portfolio />
            <Contact />
        </main>
    );
}
