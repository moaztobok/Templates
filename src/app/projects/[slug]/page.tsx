import type { Metadata } from "next";
import ProjectDetailsSection1 from "@/shared/sections/portfolio-details-2/Section1";
import ProjectDetailsSection2 from "@/shared/sections/portfolio-details-1/Section2";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}

export default function ProjectDetailsPage() {
  return (
    <>
      <ProjectDetailsSection1 />
      <ProjectDetailsSection2 />
    </>
  );
}
