'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { heroContainer, heroItem } from '@/lib/animations'

const slides = [
  { src: '/images/students-group-pavilion.jpeg', alt: 'Students at the school pavilion' },
  { src: '/images/students-large-group-photo.jpeg', alt: 'Our school community' },
  { src: '/images/students-cultural-day.jpeg', alt: 'Cultural celebration day' },
  { src: '/images/school-building.jpeg', alt: 'Brainy Kings & Queens campus' },
  { src: '/images/students-uniform-outdoor-group.jpeg', alt: 'Students in uniform at Brainy Kings & Queens' },
  { src: '/images/students-preschool-twins.jpeg', alt: 'Young students in Brainy Kings & Queens uniform' },
]

const SLIDE_DURATION = 5000

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
      setKey((k) => k + 1)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [])

  function goTo(i: number) {
    setCurrent(i)
    setKey((k) => k + 1)
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#1A0505' }}>

      {/* Slideshow background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            className="object-cover"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle left-side gradient for text readability only */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/15 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop relative z-10 pt-28 pb-32">
        <motion.div
          className="max-w-2xl"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={heroItem} className="flex items-center gap-md mb-lg">
            <div className="h-px w-10 bg-secondary-container flex-shrink-0" />
            <span className="text-secondary-container text-label-sm font-bold tracking-[0.3em] uppercase">
              Kumasi · Ghana · Est. 2010
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={heroItem}
            className="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-white mb-lg leading-tight"
          >
            Every Child is Born a King.{' '}
            <br className="hidden md:block" />
            <span className="text-secondary-container">We Help Them Reign.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={heroItem}
            className="text-body-lg text-white/80 mb-xl max-w-xl leading-relaxed"
          >
            Brainy Kings and Queens Montessori — where independent thinking,
            royal character, and academic excellence converge from age 2.5 through JHS 3.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={heroItem} className="flex flex-wrap gap-md">
            <Link
              href="/admissions"
              className="bg-secondary-container text-on-secondary-container px-8 py-4 font-label-lg font-bold flex items-center gap-sm hover:opacity-90 transition-all active:scale-95 shadow-xl"
            >
              Apply for Admission
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="/about"
              className="border-2 border-white/30 text-white px-8 py-4 font-label-lg hover:border-white hover:bg-white/10 transition-all"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide progress indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-margin-mobile md:px-margin-desktop">
        <div className="container mx-auto flex items-center gap-sm">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="relative h-[3px] w-16 bg-white/20 overflow-hidden flex-shrink-0"
            >
              {i === current && (
                <motion.div
                  key={key}
                  className="absolute inset-0 bg-secondary-container origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                />
              )}
              {i < current && (
                <div className="absolute inset-0 bg-secondary-container" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll nudge */}
      <motion.div
        className="absolute bottom-8 right-8 z-20 flex-col items-center gap-xs text-white/40 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span
          className="text-label-sm tracking-widest uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <motion.span
          className="material-symbols-outlined text-[20px]"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          arrow_downward
        </motion.span>
      </motion.div>
    </section>
  )
}
