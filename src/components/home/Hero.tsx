'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { heroContainer, heroItem } from '@/lib/animations'
import type { Database } from '@/types/database'
import { Crown, DotGrid, Sparkle, Squiggle, Wave } from './decor'

type HeroSlide = Database['public']['Tables']['hero_slides']['Row']
type PageSection = Database['public']['Tables']['page_sections']['Row']
type Slide = { id?: string; src: string; alt: string }

const fallbackSlides: Slide[] = [
  { src: '/images/students-uniform-outdoor-group.jpeg', alt: 'Students in uniform at Brainy Kings & Queens' },
  { src: '/images/students-preschool-twins.jpeg', alt: 'Young students in Brainy Kings & Queens uniform' },
  { src: '/images/students-cultural-day.jpeg', alt: 'Cultural celebration day' },
  { src: '/images/students-group-pavilion.jpeg', alt: 'Students at the school pavilion' },
]

const trust = [
  { icon: 'verified_user', label: 'Safe, caring campus' },
  { icon: 'school', label: 'Montessori-trained teachers' },
  { icon: 'child_care', label: 'Ages 2.5 to JHS 3' },
]

const SLIDE_DURATION = 5000

export default function Hero({ slides: cmsSlides, section }: { slides?: HeroSlide[]; section?: PageSection }) {
  const slides: Slide[] = cmsSlides?.length
    ? cmsSlides.map((slide) => ({ id: slide.id, src: slide.image_url, alt: slide.alt_text }))
    : fallbackSlides
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => setCurrent((previous) => (previous + 1) % slides.length), SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative overflow-hidden bg-[#2A0C0C] text-white">
      {/* Background glow and texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_20%,rgba(179,27,27,0.55),transparent_70%),radial-gradient(50%_50%_at_0%_100%,rgba(226,180,90,0.12),transparent_70%)]" />
      <DotGrid className="pointer-events-none absolute left-0 top-24 h-48 w-48 text-white/[0.07]" />
      <Sparkle className="absolute left-[3%] top-[48%] hidden h-4 w-4 opacity-60 xl:block" />
      <Sparkle className="absolute left-[46%] top-[16%] hidden h-3 w-3 opacity-50 lg:block" color="#fff" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-40 pt-32 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-48 lg:pt-36">
        {/* Copy */}
        <motion.div variants={heroContainer} initial="hidden" animate="visible">
          <motion.div variants={heroItem} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-2 pr-4 text-xs font-semibold tracking-wide text-white/80 backdrop-blur">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E2B45A] text-[#2A0C0C]">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            </span>
            {section?.eyebrow ?? 'Kumasi · Ghana · Est. 2010'}
          </motion.div>

          <motion.h1 variants={heroItem} className="font-headline-xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[52px] lg:text-[64px]">
            {section?.heading ?? (
              <>
                Every Child is Born a King.{' '}
                <span className="relative inline-block text-[#E2B45A]">
                  We Help Them Reign.
                  <Squiggle className="absolute -bottom-3 left-0 h-3 w-40 sm:w-56" />
                </span>
              </>
            )}
          </motion.h1>

          <motion.p variants={heroItem} className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/70 sm:text-lg">
            {section?.body ?? 'Brainy Kings and Queens Montessori, where independent thinking, royal character, and academic excellence converge from age 2.5 through JHS 3.'}
          </motion.p>

          <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={section?.cta_href ?? '/admissions'}
              className="group inline-flex items-center gap-3 rounded-full bg-[#E2B45A] py-2 pl-7 pr-2 text-[15px] font-bold text-[#2A0C0C] shadow-[0_12px_40px_-12px_rgba(226,180,90,0.7)] transition hover:bg-[#ecc576]"
            >
              {section?.cta_label ?? 'Apply for Admission'}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2A0C0C] text-[#E2B45A] transition-transform group-hover:translate-x-0.5">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </span>
            </Link>
            <Link href="/about" className="group inline-flex items-center gap-3 rounded-full px-2 py-2 text-[15px] font-semibold text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition group-hover:border-[#E2B45A] group-hover:text-[#E2B45A]">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </span>
              Discover our story
            </Link>
          </motion.div>

          <motion.ul variants={heroItem} className="mt-12 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/10 pt-8">
            {trust.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm font-medium text-white/80">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-[#E2B45A] ring-1 ring-white/10">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </span>
                {item.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Arched photo frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <div className="absolute -inset-4 rounded-t-[999px] rounded-b-[48px] border-2 border-dashed border-[#E2B45A]/40" />
          <div className="absolute -right-10 -top-6 h-40 w-40 rounded-full bg-[#B31B1B] blur-3xl opacity-60" />
          <Crown className="absolute -top-16 left-1/2 h-12 w-16 -translate-x-1/2" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[40px] bg-[#3A1212] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-8 ring-white/[0.06]">
            <AnimatePresence mode="sync">
              <motion.div
                key={current}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              >
                <Image src={slides[current].src} alt={slides[current].alt} fill sizes="(max-width: 1024px) 90vw, 460px" className="object-cover" priority={current === 0} />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2A0C0C]/70 to-transparent" />
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.id || index}
                  type="button"
                  aria-label={`Show photo ${index + 1}`}
                  onClick={() => setCurrent(index)}
                  className={`h-1.5 rounded-full transition-all ${index === current ? 'w-6 bg-[#E2B45A]' : 'w-1.5 bg-white/50 hover:bg-white'}`}
                />
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="absolute left-2 bottom-20 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-[#2A0C0C] shadow-2xl sm:-left-14"
          >
            <div className="flex -space-x-3">
              {['/images/students-smiling-closeup.jpeg', '/images/student-uniform-portrait.jpeg', '/images/students-preschool-standing.jpeg'].map((src) => (
                <div key={src} className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white">
                  <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="leading-tight">
              <div className="text-lg font-extrabold">250+</div>
              <div className="text-[11px] font-semibold text-[#8C6F6F]">happy students</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute right-2 top-24 rounded-2xl bg-[#B31B1B] px-4 py-3 text-white shadow-2xl sm:-right-10"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#E2B45A]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
              <div className="leading-tight">
                <div className="text-lg font-extrabold">15+ years</div>
                <div className="text-[11px] text-white/70">of excellence</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Wave fill="#FBF6EE" className="absolute bottom-0 left-0 h-16 w-full md:h-24" />
    </section>
  )
}
