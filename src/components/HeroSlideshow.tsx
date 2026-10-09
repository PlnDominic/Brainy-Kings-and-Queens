'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { heroContainer, heroItem } from '@/lib/animations'
import type { Database } from '@/types/database'

type HeroSlide = Database['public']['Tables']['hero_slides']['Row']
type PageSection = Database['public']['Tables']['page_sections']['Row']
type Slide = { id?: string; src: string; alt: string; link?: string | null }

const fallbackSlides: Slide[] = [
  { src: '/images/students-group-pavilion.jpeg', alt: 'Students at the school pavilion' },
  { src: '/images/students-large-group-photo.jpeg', alt: 'Our school community' },
  { src: '/images/students-cultural-day.jpeg', alt: 'Cultural celebration day' },
  { src: '/images/school-building.jpeg', alt: 'Brainy Kings & Queens campus' },
  { src: '/images/students-uniform-outdoor-group.jpeg', alt: 'Students in uniform at Brainy Kings & Queens' },
  { src: '/images/students-preschool-twins.jpeg', alt: 'Young students in Brainy Kings & Queens uniform' },
]

const SLIDE_DURATION = 5000

export default function HeroSlideshow({ slides: cmsSlides, section, useFallbackContent = true }: { slides?: HeroSlide[]; section?: PageSection; useFallbackContent?: boolean }) {
  const slides: Slide[] = cmsSlides === undefined
    ? fallbackSlides
    : cmsSlides.map((slide) => ({ id: slide.id, src: slide.image_url, alt: slide.alt_text, link: slide.link }))
  const [current, setCurrent] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => {
      setCurrent((previous) => (previous + 1) % slides.length)
      setKey((previous) => previous + 1)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [slides.length])

  function goTo(index: number) {
    setCurrent(index)
    setKey((previous) => previous + 1)
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden" style={{ background: '#1A0505' }}>
      <AnimatePresence mode="sync">
        {slides.length > 0 && <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <Image src={slides[current].src} alt={slides[current].alt} fill sizes="100vw" className="object-cover" priority={current === 0} />
        </motion.div>}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

      <div className="container relative z-10 mx-auto px-margin-mobile pt-28 pb-32 md:px-margin-desktop">
        <motion.div className="max-w-2xl" variants={heroContainer} initial="hidden" animate="visible">
          <motion.div variants={heroItem} className="mb-lg flex items-center gap-md">
            <div className="h-px w-10 flex-shrink-0 bg-secondary-container" />
            <span className="text-label-sm font-bold uppercase tracking-[0.3em] text-secondary-container">
              {section?.eyebrow ?? (useFallbackContent ? 'Kumasi · Ghana · Est. 2010' : '')}
            </span>
          </motion.div>

          <motion.h1 variants={heroItem} className="mb-lg text-headline-lg-mobile font-headline-xl leading-tight text-white md:text-headline-xl">
            {section?.heading ?? (useFallbackContent ? <>Every Child is Born a King.{' '}<br className="hidden md:block" /><span className="text-secondary-container">We Help Them Reign.</span></> : '')}
          </motion.h1>

          <motion.p variants={heroItem} className="mb-xl max-w-xl text-body-lg leading-relaxed text-white/80">
            {section?.body ?? (useFallbackContent ? 'Brainy Kings and Queens Montessori — where independent thinking, royal character, and academic excellence converge from age 2.5 through JHS 3.' : '')}
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-wrap gap-md">
            {(section?.cta_label || useFallbackContent) && (
              <Link href={section?.cta_href ?? slides[current]?.link ?? (useFallbackContent ? '/admissions' : '#')} className="flex items-center gap-sm bg-secondary-container px-8 py-4 font-label-lg font-bold text-on-secondary-container shadow-xl transition-all hover:opacity-90 active:scale-95">
                {section?.cta_label ?? 'Apply for Admission'}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            )}
            <Link href="/about" className="border-2 border-white/30 px-8 py-4 font-label-lg text-white transition-colors hover:border-white hover:bg-white/10">
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20 px-margin-mobile md:px-margin-desktop">
        <div className="container mx-auto flex items-center gap-sm">
          {slides.map((slide, index) => (
            <button key={slide.id || index} onClick={() => goTo(index)} aria-label={`Slide ${index + 1}`} className="relative h-[3px] w-16 flex-shrink-0 overflow-hidden bg-white/20">
              {index === current && (
                <motion.div key={key} className="absolute inset-0 origin-left bg-secondary-container" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }} />
              )}
              {index < current && <div className="absolute inset-0 bg-secondary-container" />}
            </button>
          ))}
        </div>
      </div>

      <motion.div className="absolute bottom-8 right-8 z-20 hidden flex-col items-center gap-xs text-white/40 md:flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        <span className="text-label-sm uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <motion.span className="material-symbols-outlined text-[20px]" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          arrow_downward
        </motion.span>
      </motion.div>
    </section>
  )
}
