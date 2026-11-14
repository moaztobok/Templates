import type { Metadata } from "next";
import ContactSection from "@/shared/sections/about-1/Section4";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-85">
        <div className="at-banner-thumb overflow-hidden scale-up-img pt-md-0 pt-20">
          <img
            className="img-cover scale-up"
            data-speed=".8"
            src="/assets/imgs/pages/img-166.webp"
            alt="orisa"
            width={1920}
            height={800}
            loading="lazy"
          />
        </div>
      </div>
      <ContactSection />
    </>
  );
}
