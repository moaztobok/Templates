import type { Metadata } from "next";
import HomeSection1 from "@/shared/sections/index-2/Section1";
import HomeSection2 from "@/shared/sections/index-2/Section2";
import HomeSection3 from "@/shared/sections/about-1/Section2";
import HomeSection4 from "@/shared/sections/index-6/Section3";

export const metadata: Metadata = {
  title: "Dreammbymoaz",
};

export default function HomePage() {
  return (
    <>
      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
    </>
  );
}
