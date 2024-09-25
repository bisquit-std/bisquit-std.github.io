"use server";

import About from "@/components/homePage/about";
import Contact from "@/components/homePage/contact/contact";
import Portfolio from "@/components/homePage/portfolio/portfolio";
import Welcome from "@/components/homePage/welcome";
import Services from "@/components/homePage/services";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { ProjectService } from "@/services/projectService";

export default async function Home() {
    const projectService = new ProjectService();

    const projects = await projectService.getAll();

    return (
        <main className="flex flex-col">
            <Navbar />
            <Welcome />
            <About />
            <Services />
            <Portfolio projects={projects} />
            <Contact />
            <Footer />
        </main>
    );
}
