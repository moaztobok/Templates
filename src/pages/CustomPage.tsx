import PageMeta from '@/seo/PageMeta'
import HomeSection3 from '@/shared/sections/about-1/Section2'
import AboutSection1 from '@/shared/sections/about-3/Section1'
import AboutSection2 from '@/shared/sections/about-3/Section2'
import AboutSection4 from '@/shared/sections/about-3/Section4'
import AboutSection6 from '@/shared/sections/about-3/Section6'
import AboutSection7 from '@/shared/sections/about-3/Section7'
import HomeSection1 from '@/shared/sections/index-2/Section1'
import HomeSection2 from '@/shared/sections/index-2/Section2'
import HomeSection4 from '@/shared/sections/index-6/Section3'
import ProjectsSection1 from '@/shared/sections/portfolio-2/Section1'
import ProjectDetailsSection1 from '@/shared/sections/portfolio-details-2/Section1'
import ProjectDetailsSection2 from '@/shared/sections/portfolio-details-1/Section2'
import ContactSection from '@/shared/sections/about-1/Section4'
import React from 'react'

type Page = 'home' | 'about' | 'projects'| 'projectPage' | 'contact'

const CustomPage = () => {
    const [page, usePage] = React.useState<Page>('about')
  return (
      <>
        <PageMeta title="Dreammbymoaz" />
        {page === 'home' && <>
              <HomeSection1 />
              <HomeSection2 />
              <HomeSection3 />
              <HomeSection4 />
        </>}
        {page === 'about' && <>
          <AboutSection1 />
          <AboutSection2 />
          {/* <AboutSection3 /> */}
          <AboutSection4 />
          {/* <AboutSection5 /> */}
          <AboutSection6 />
            <AboutSection7 />
        </>}
        {page === 'projects' && <>
          <ProjectsSection1 />
          <AboutSection7 />
        </>}
        {page === 'projectPage' && <>
          <ProjectDetailsSection1 />
          <ProjectDetailsSection2 />
        </>}
        {page === 'contact' && <>
          <div className="pt-85">
            <div className="at-banner-thumb overflow-hidden scale-up-img pt-md-0 pt-20">
              <img className="img-cover scale-up" data-speed=".8" src="/assets/imgs/pages/img-166.webp" alt="orisa" width={1920} height={800} loading="lazy" />
            </div>
          </div>
          <ContactSection />
        </>}
      </>
  )
}

export default CustomPage