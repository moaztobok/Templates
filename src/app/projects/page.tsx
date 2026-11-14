import type { Metadata } from "next";
import ProjectsSection1 from "@/shared/sections/portfolio-2/Section1";
import AboutSection7 from "@/shared/sections/about-3/Section7";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsSection1 />
      <AboutSection7 />
    </>
  );
}
