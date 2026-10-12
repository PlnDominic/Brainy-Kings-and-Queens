'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { heroContainer, heroItem } from '@/lib/animations'
import type { Database } from '@/types/database'

type PageSection = Database['public']['Tables']['page_sections']['Row']
export type Slide = { id?: string; src: string; alt: string }

const SLIDE_DURATION = 6000

export default function Hero({ slides, section }: { slides: Slide[]; section?: PageSection }) {
  const [current, setCurrent] = useState(0)
  const [cycle, setCycle] = useState(0)

  // Restarting the timer on every change keeps manual clicks and the auto-advance in sync.
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
        {/* Photos shown at full strength, with a slow zoom */}
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

        <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-5 pb-16 pt-48 md:px-8 lg:pb-20">
          <motion.div variants={heroContainer} initial="hidden" animate="visible">
            <motion.h1
              variants={heroItem}
              className="max-w-4xl text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[80px]"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)' }}
            >
              {section?.heading ?? <>Every Child is Born a King.</>}
            </motion.h1>

            <motion.div variants={heroItem} className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href={section?.cta_href ?? '/admissions'}
                className="inline-flex h-14 items-center gap-2 rounded-full bg-white px-7 text-[15px] font-bold text-[#2A0C0C] transition hover:bg-[#E2B45A]"
              >
                {section?.cta_label ?? 'Apply for Admission'}
                <span className="material-symbols-outlined text-[20px]">north_east</span>
              </Link>

              {slides.length > 1 && (
                <div className="flex items-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id || index}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`Show photo ${index + 1}`}
                      aria-current={index === current}
                      className={`h-2 rounded-full transition-all ${index === current ? 'w-8 bg-white' : 'w-2 bg-white/60 hover:bg-white'}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
