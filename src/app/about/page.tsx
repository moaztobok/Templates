import type { Metadata } from "next";
import AboutSection1 from "@/shared/sections/about-3/Section1";
import AboutSection2 from "@/shared/sections/about-3/Section2";
import AboutSection4 from "@/shared/sections/about-3/Section4";
import AboutSection6 from "@/shared/sections/about-3/Section6";
import AboutSection7 from "@/shared/sections/about-3/Section7";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <AboutSection1 />
      <AboutSection2 />
      <AboutSection4 />
      <AboutSection6 />
      <AboutSection7 />
    </>
  );
}
