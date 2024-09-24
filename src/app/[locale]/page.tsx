"use server";

import About from "@/components/homePage/about";
import Contact from "@/components/homePage/contact/contact";
import Portfolio from "@/components/homePage/portfolio/portfolio";
import Welcome from "@/components/homePage/welcome";
import Services from "@/components/homePage/services";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";

export default async function Home() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
        <main className="flex flex-col">
            <Navbar />
            <Welcome />
            <About />
            <Services />
            <Portfolio />
            <Contact />
            <Footer />
        </main>
    );
}
