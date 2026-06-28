import Image from 'next/image'
import Link from 'next/link'
import HeroSlideshow from '@/components/HeroSlideshow'
import ProgramsSection from '@/components/ProgramsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import AnimateOnView from '@/components/AnimateOnView'

const galleryItems = [
  {
    src: '/images/students-large-group-photo.jpeg',
    alt: 'Our entire school community together',
    caption: 'Our school family',
  },
  {
    src: '/images/students-cultural-day.jpeg',
    alt: 'Students celebrating cultural day in kente attire',
    caption: 'Cultural celebration day',
  },
  {
    src: '/images/student-uniform-portrait.jpeg',
    alt: 'Young student in school uniform',
    caption: 'Ready to lead',
  },
  {
    src: '/images/students-preschool-standing.jpeg',
    alt: 'Pre-school students in uniform',
    caption: 'Our youngest royals',
  },
  {
    src: '/images/students-classroom-fun.jpeg',
    alt: 'Students enjoying learning in the classroom',
    caption: 'Classroom joy',
  },
  {
    src: '/images/students-preschool-lunch-group.jpeg',
    alt: 'Pre-school students sharing a meal together',
    caption: 'Shared meals, shared values',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSlideshow />

      {/* ── 2. Mission Statement ── */}
      <section className="py-xl bg-surface">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
              {/* Left: large quote */}
              <div>
                <p className="text-label-sm font-bold text-secondary uppercase tracking-[0.25em] mb-lg">
                  Our Philosophy
                </p>
                <h2 className="text-headline-lg font-headline-lg text-on-surface leading-tight mb-lg">
                  We don&apos;t just teach children.{' '}
                  <span className="text-primary">We crown them.</span>
                </h2>
                <p className="text-body-lg text-on-surface-variant leading-relaxed">
                  The Montessori method recognises that children are natural learners — born
                  with curiosity, dignity, and the capacity to lead. Our role is simply to prepare
                  the environment and step aside.
                </p>
              </div>

              {/* Right: editorial photo with accent block */}
              <AnimateOnView variant="fadeRight">
                <div className="relative">
                  <div className="relative h-[400px] overflow-hidden">
                    <Image
                      src="/images/students-smiling-closeup.jpeg"
                      alt="Happy students at Brainy Kings and Queens"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Accent block */}
                  <div className="absolute -bottom-6 -left-6 bg-secondary-container p-md shadow-xl max-w-[200px]">
                    <p className="text-label-sm font-bold text-on-secondary-container uppercase tracking-wide mb-xs">
                      15+ Years
                    </p>
                    <p className="text-label-sm text-on-secondary-container/70">
                      of academic excellence in Kumasi
                    </p>
                  </div>
                </div>
              </AnimateOnView>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* ── 4. Programs ── */}
      <ProgramsSection />

      {/* ── 5. Gallery ── */}
      <section className="py-xl bg-surface-container-low">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="mb-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
              <div>
                <p className="text-label-sm font-bold text-secondary uppercase tracking-[0.25em] mb-sm">
                  Campus Life
                </p>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">
                  Life at Brainy Kings &amp; Queens
                </h2>
              </div>
              <Link
                href="/about"
                className="flex items-center gap-sm text-primary font-label-lg font-bold hover:gap-md transition-all self-start md:self-auto group"
              >
                See more
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </AnimateOnView>

          {/* Row 1: large (7/12) + two stacked (5/12) */}
          <AnimateOnView>
            <div className="flex flex-col md:flex-row gap-md mb-md">
              <div className="md:w-7/12 relative gallery-item overflow-hidden h-[340px] md:h-[500px]">
                <Image
                  src={galleryItems[0].src}
                  alt={galleryItems[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="gallery-caption">
                  <span className="text-white font-label-lg">{galleryItems[0].caption}</span>
                </div>
              </div>
              <div className="md:w-5/12 flex flex-col gap-md">
                {galleryItems.slice(1, 3).map((item) => (
                  <div key={item.src} className="flex-1 relative gallery-item overflow-hidden h-[160px] md:h-auto">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                    <div className="gallery-caption">
                      <span className="text-white font-label-lg">{item.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnView>

          {/* Row 2: three equal */}
          <AnimateOnView delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
              {galleryItems.slice(3).map((item) => (
                <div
                  key={item.src}
                  className="relative gallery-item overflow-hidden h-[220px]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="gallery-caption">
                    <span className="text-white font-label-lg">{item.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* ── 6. Testimonials ── */}
      <TestimonialsSection />

      {/* ── 7. Admissions CTA ── */}
      <section className="bg-primary py-xl">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="max-w-4xl mx-auto text-center">
            <p className="text-label-sm font-bold text-secondary-container uppercase tracking-[0.25em] mb-md">
              Admissions Open
            </p>
            <h2 className="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-on-primary mb-md leading-tight">
              Secure Your Child&apos;s <br className="hidden md:block" />
              Place Today
            </h2>
            <p className="text-body-lg text-on-primary/75 mb-xl max-w-xl mx-auto">
              Enrolment for the upcoming academic year is now open. Join a community that
              believes every child deserves a royal education.
            </p>
            <div className="flex flex-wrap gap-md justify-center">
              <Link
                href="/admissions"
                className="bg-secondary-container text-on-secondary-container px-10 py-4 font-label-lg font-bold flex items-center gap-sm hover:opacity-90 transition-all active:scale-95 shadow-xl"
              >
                Apply Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <a
                href="tel:0591664392"
                className="border-2 border-white/30 text-on-primary px-10 py-4 font-label-lg hover:border-white hover:bg-white/10 transition-all flex items-center gap-sm"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                0591664392
              </a>
            </div>
          </AnimateOnView>
        </div>
      </section>
    </>
  )
}
