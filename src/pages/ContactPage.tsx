import PageMeta from '@/seo/PageMeta'
import ContactSection from '@/shared/sections/about-1/Section4'

const ContactPage = () => {
  return (
    <>
      <PageMeta title="Dreammbymoaz — Contact" />
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
  )
}

export default ContactPage
