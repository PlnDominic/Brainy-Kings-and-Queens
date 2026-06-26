'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { heroContainer, heroItem } from '@/lib/animations'

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/images/school-building.jpeg"
          alt="Brainy Kings & Queens school building"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent" />
      </motion.div>

      {/* Decorative radial glow */}
      <div
        className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(254,214,91,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <motion.div
          className="max-w-2xl"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-base px-4 py-1 bg-secondary-container text-on-secondary-container mb-md"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-label-sm font-bold tracking-wider uppercase">
              Nurturing Future Leaders
            </span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-on-surface mb-md leading-tight"
          >
            Where Royal Dignity Meets{' '}
            <span className="text-primary">Curious Minds.</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-body-lg font-body-lg text-on-surface-variant mb-lg max-w-lg"
          >
            A Montessori environment designed to foster independence, creativity, and academic
            excellence in every child. We treat every student as a king or queen of their own
            learning journey.
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-wrap items-center gap-md">
            <Link
              href="/admissions"
              className="bg-primary text-on-primary px-8 py-4 font-label-lg flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1"
            >
              Enroll Today
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="/curriculum"
              className="border-2 border-secondary text-secondary px-8 py-4 font-label-lg hover:bg-secondary-container transition-all"
            >
              View Curriculum
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
