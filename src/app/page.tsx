import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Philosophy from '@/components/home/Philosophy'
import Programs from '@/components/home/Programs'
import WhyUs from '@/components/home/WhyUs'
import Gallery from '@/components/home/Gallery'
import Testimonials from '@/components/home/Testimonials'
import AdmissionsCta from '@/components/home/AdmissionsCta'
import {
  getGalleryItems,
  getHeroSlides,
  getPageSections,
  getPrograms,
  getSiteSettings,
  getTestimonials,
} from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [slides, programs, testimonials, galleryItems, pageSections, settings] = await Promise.all([
    getHeroSlides(),
    getPrograms(),
    getTestimonials(),
    getGalleryItems('home'),
    getPageSections('home'),
    getSiteSettings(),
  ])
  const section = (key: string) => pageSections.find((item) => item.section_key === key)

  return (
    <>
      <Hero slides={slides} section={section('hero')} />
      <Stats />
      <Philosophy section={section('mission')} />
      <Programs programs={programs} section={section('programs')} />
      <WhyUs />
      <Gallery items={galleryItems} section={section('gallery')} />
      <Testimonials testimonials={testimonials} section={section('testimonials')} />
      <AdmissionsCta section={section('cta')} phone={settings?.phone} />
    </>
  )
}
