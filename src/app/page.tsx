import Hero from '@/components/home/Hero'
import Philosophy, { PHILOSOPHY_PHOTOS } from '@/components/home/Philosophy'
import Programs, { FALLBACK_PROGRAMS } from '@/components/home/Programs'
import WhyUs, { WHY_US_REASONS } from '@/components/home/WhyUs'
import Gallery from '@/components/home/Gallery'
import Testimonials from '@/components/home/Testimonials'
import AdmissionsCta from '@/components/home/AdmissionsCta'
import { PhotoPicker } from '@/lib/photos'
import {
  getGalleryItems,
  getHeroSlides,
  getPageSections,
  getPrograms,
  getSiteSettings,
  getTestimonials,
} from '@/lib/data'

export const dynamic = 'force-dynamic'

const HERO_PHOTOS = [
  '/images/students-large-group-photo.jpeg',
  '/images/students-uniform-outdoor-group.jpeg',
  '/images/students-cultural-day.jpeg',
  '/images/students-group-pavilion.jpeg',
]

const GALLERY_PHOTOS = [
  { src: '/images/students-uniform-badges.jpeg', alt: 'Students proudly showing school badges', caption: 'Royal pride' },
  { src: '/images/student-field-trip-tree.jpeg', alt: 'Student on a field trip', caption: 'Beyond the classroom' },
  { src: '/images/students-preschool-twins.jpeg', alt: 'Two pre-school girls in uniform', caption: 'Our youngest royals' },
  { src: '/images/students-preschool-lunch-group.jpeg', alt: 'Pre-school students sharing lunch', caption: 'Shared meals' },
  { src: '/images/students-outdoor-play-1.jpeg', alt: 'Children playing outdoors', caption: 'Play time' },
  { src: '/images/student-field-trip-bench-2.jpeg', alt: 'Young student on a field trip', caption: 'Field trip explorer' },
  { src: '/images/students-preschool-cubbies.jpeg', alt: 'Pre-school students at their cubbies', caption: 'Practical life' },
  { src: '/images/students-bench-outdoor.jpeg', alt: 'Students together outdoors', caption: 'Friends for life' },
]

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

  // Photos added in the Content Studio come first; built-in photos fill the rest
  // without repeating anything already on the page.
  const photos = new PhotoPicker()
  const heroSlides = slides.length
    ? photos.unique(slides.map((slide) => ({ id: slide.id, src: slide.image_url, alt: slide.alt_text })), (slide) => slide.src)
    : photos.pickMany(HERO_PHOTOS, 4).map((src) => ({ src, alt: 'Students at Brainy Kings & Queens' }))

  const programItems = programs.length
    ? programs.map((program) => ({ id: program.id, level: program.level, age: program.age_range, tagline: program.tagline, icon: program.icon, image: program.image_url }))
    : FALLBACK_PROGRAMS.map((program) => ({ ...program, image: photos.has(program.image) ? photos.pick() : program.image }))
  programItems.forEach((program) => photos.claim(program.image))

  const cmsGallery = photos.unique(
    galleryItems.map((item) => ({ src: item.image_url, alt: item.alt_text, caption: item.caption })),
    (item) => item.src,
  )

  const philosophyPhotos = photos.pickMany(PHILOSOPHY_PHOTOS, 3)
  const whyUsPhotos = WHY_US_REASONS.map((reason) => photos.pick(reason.photos))
  const testimonialsPhoto = photos.pick(['/images/students-group-celebration.jpeg'])
  const ctaPhoto = photos.pick(['/images/students-outdoor-play-2.jpeg', '/images/students-outdoor-play-1.jpeg'])
  const gallery = galleryItems.length ? cmsGallery : photos.unique(GALLERY_PHOTOS, (item) => item.src)

  return (
    <>
      <Hero slides={heroSlides} section={section('hero')} />
      <Philosophy section={section('mission')} photos={philosophyPhotos} />
      <Programs items={programItems} section={section('programs')} />
      <WhyUs images={whyUsPhotos} />
      {gallery.length > 0 && <Gallery photos={gallery} section={section('gallery')} />}
      <Testimonials testimonials={testimonials} section={section('testimonials')} image={testimonialsPhoto} />
      <AdmissionsCta section={section('cta')} phone={settings?.phone} image={ctaPhoto} />
    </>
  )
}
