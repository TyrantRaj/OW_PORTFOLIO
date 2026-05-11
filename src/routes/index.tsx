import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/portfolio/About";
import { Achievements } from "@/components/portfolio/Achievements";
import { Coding } from "@/components/portfolio/Coding";
import { Contact } from "@/components/portfolio/Contact";
import { Creative } from "@/components/portfolio/Creative";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { Loader } from "@/components/portfolio/Loader";
import { Navbar } from "@/components/portfolio/Navbar";
import { Projects } from "@/components/portfolio/Projects";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Skills } from "@/components/portfolio/Skills";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yuvaraj Developer" },
      {
        name: "description",
        content:
          "Portfolio of Yuvaraj — a software developer crafting games, AI/ML systems, full-stack web & mobile apps, interactive experiences and 3D creative work in Blender.",
      },
      { name: "keywords", content: "Yuvaraj, software developer, game developer, AI engineer, machine learning, full stack developer, app developer, 3D artist, Blender, creative technologist, portfolio" },
      { name: "author", content: "Yuvaraj" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#000000" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Yuvaraj — Portfolio" },
      { property: "og:title", content: "Yuvaraj — Software Developer, Game Dev & AI/ML Engineer" },
      {
        property: "og:description",
        content:
          "Premium handcrafted portfolio: game development, AI/ML, full stack engineering, app development and 3D creative work.",
      },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yuvaraj — Software Developer & Creative Technologist" },
      { name: "twitter:description", content: "Games, AI/ML, full-stack apps and 3D experiments — handcrafted portfolio." },
    ],
    links: [
  { rel: "canonical", href: "/" },

  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/favicon.svg?v=3",
  },

  {
    rel: "shortcut icon",
    href: "/favicon.svg?v=3",
  },
],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Yuvaraj",
          jobTitle: "Software Developer",
          description:
            "Software developer specializing in game development, AI/ML, full stack web & app development, interactive experiences and 3D design.",
          knowsAbout: [
            "Software Engineering",
            "Game Development",
            "Artificial Intelligence",
            "Machine Learning",
            "Full Stack Development",
            "Mobile App Development",
            "Creative Technology",
            "3D Design",
            "Blender",
          ],
          url: "/",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Loader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Coding />
      <Projects />
      <Creative />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
