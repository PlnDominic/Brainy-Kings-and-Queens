'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { heroContainer, heroItem } from '@/lib/animations'
import type { Database } from '@/types/database'
import { Crown } from './decor'

type HeroSlide = Database['public']['Tables']['hero_slides']['Row']
type PageSection = Database['public']['Tables']['page_sections']['Row']
type Slide = { id?: string; src: string; alt: string }

const fallbackSlides: Slide[] = [
  { src: '/images/students-group-pavilion.jpeg', alt: 'Students at the school pavilion' },
  { src: '/images/students-cultural-day.jpeg', alt: 'Cultural celebration day' },
  { src: '/images/students-uniform-outdoor-group.jpeg', alt: 'Students in uniform at Brainy Kings & Queens' },
  { src: '/images/students-large-group-photo.jpeg', alt: 'Our school community' },
]

const SLIDE_DURATION = 6000

/** Circular "Admissions open" seal with slowly rotating text. */
function AdmissionsSeal() {
  return (
    <Link
      href="/admissions"
      aria-label="Admissions open, enrol today"
      className="group relative flex h-28 w-28 items-center justify-center rounded-full bg-[#2A0C0C]/40 backdrop-blur-md transition hover:bg-[#2A0C0C]/60 lg:h-36 lg:w-36"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]" aria-hidden="true">
        <defs>
          <path id="seal-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-white text-[8.5px] font-bold uppercase">
          <textPath href="#seal-circle" textLength="236" lengthAdjust="spacing">Admissions open · Enrol today · </textPath>
        </text>
      </svg>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2B45A] transition-transform group-hover:scale-110 lg:h-14 lg:w-14">
        <Crown className="h-6 w-7" color="#2A0C0C" />
      </span>
    </Link>
  )
}

export default function Hero({ slides: cmsSlides, section }: { slides?: HeroSlide[]; section?: PageSection }) {
  const slides: Slide[] = cmsSlides?.length
    ? cmsSlides.map((slide) => ({ id: slide.id, src: slide.image_url, alt: slide.alt_text }))
    : fallbackSlides
  const [current, setCurrent] = useState(0)
  const [cycle, setCycle] = useState(0)

  // Restarting the timer on every change keeps manual clicks and the progress bar in sync.
  useEffect(() => {
    if (slides.length < 2) return
    const timer = setTimeout(() => {
      setCurrent((previous) => (previous + 1) % slides.length)
      setCycle((value) => value + 1)
    }, SLIDE_DURATION)
    return () => clearTimeout(timer)
  }, [cycle, slides.length])

  function goTo(index: number) {
    setCurrent(index)
    setCycle((value) => value + 1)
  }

  return (
    <section className="bg-[#FBF6EE] p-2 sm:p-3">
      <div className="relative isolate flex min-h-[640px] flex-col overflow-hidden rounded-[28px] bg-[#1A0505] [clip-path:inset(0_round_28px)] sm:min-h-[720px] sm:rounded-[40px] sm:[clip-path:inset(0_round_40px)] lg:min-h-[800px]">
        {/* Slides with a slow zoom */}
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1.5, ease: 'linear' }}
            >
              <Image src={slides[current].src} alt={slides[current].alt} fill sizes="100vw" className="object-cover" priority={current === 0} />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Legibility overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0505] via-[#1A0505]/45 to-[#1A0505]/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1A0505]/70 via-transparent to-transparent" />

        <div className="absolute right-8 top-28 z-10 hidden md:block lg:right-12 lg:top-32">
          <AdmissionsSeal />
        </div>

        {/* Copy anchored to the bottom */}
        <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-5 pb-36 pt-48 md:px-8 lg:pb-40">
          <motion.div variants={heroContainer} initial="hidden" animate="visible">
            <motion.div variants={heroItem} className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#E2B45A]">
              <span className="h-px w-10 bg-[#E2B45A]" />
              {section?.eyebrow ?? 'Kumasi · Ghana · Est. 2010'}
            </motion.div>

            <motion.h1 variants={heroItem} className="max-w-5xl text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] text-white sm:text-[68px] lg:text-[88px]">
              {section?.heading ?? (
                <>
                  Every Child is Born a King.{' '}
                  <span className="bg-gradient-to-r from-[#F3D28C] to-[#E2B45A] bg-clip-text text-transparent">We Help Them Reign.</span>
                </>
              )}
            </motion.h1>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <motion.div variants={heroItem}>
                <p className="max-w-lg text-[17px] leading-relaxed text-white/75">
                  {section?.body ?? 'Brainy Kings and Queens Montessori, where independent thinking, royal character, and academic excellence converge from age 2.5 through JHS 3.'}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={section?.cta_href ?? '/admissions'}
                    className="inline-flex h-14 items-center gap-2 rounded-full bg-white px-7 text-[15px] font-bold text-[#2A0C0C] transition hover:bg-[#E2B45A]"
                  >
                    {section?.cta_label ?? 'Apply for Admission'}
                    <span className="material-symbols-outlined text-[20px]">north_east</span>
                  </Link>
                  <Link
                    href="/curriculum"
                    className="inline-flex h-14 items-center gap-2 rounded-full border border-white/30 px-7 text-[15px] font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
                  >
                    Explore programs
                  </Link>
                </div>
              </motion.div>

              {/* Slide thumbnails */}
              {slides.length > 1 && (
                <motion.div variants={heroItem} className="flex gap-2 sm:gap-3">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id || index}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`Show photo ${index + 1}`}
                      aria-current={index === current}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl transition sm:h-20 sm:w-24 ${
                        index === current ? 'ring-2 ring-[#E2B45A] ring-offset-2 ring-offset-[#1A0505]' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={slide.src} alt="" fill sizes="96px" className="object-cover" />
                      {index === current && (
                        <motion.span
                          key={cycle}
                          className="absolute inset-x-0 bottom-0 h-1 origin-left bg-[#E2B45A]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
