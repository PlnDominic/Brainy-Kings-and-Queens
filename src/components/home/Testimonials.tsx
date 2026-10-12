'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import type { Database } from '@/types/database'
import { Eyebrow, Sparkle } from './decor'

type Testimonial = Database['public']['Tables']['testimonials']['Row']
type PageSection = Database['public']['Tables']['page_sections']['Row']

const fallback = [
  { key: 'abena', quote: "My daughter woke up one morning and said, 'Mum, I can't wait to get to school.' That told me everything I needed to know.", name: 'Abena K.', role: 'Parent · Pre-School' },
  { key: 'emmanuel', quote: "The Montessori approach here is unlike anything I've seen elsewhere in Kumasi. The children learn to think, not just memorize facts.", name: 'Dr. Emmanuel O.', role: 'Parent · Lower Primary' },
  { key: 'josephine', quote: 'Watching our son grow into a confident, curious young man has been remarkable. Brainy Kings & Queens gave him that foundation.', name: 'Josephine M.', role: 'Parent · Upper Primary' },
]

function initials(name: string) {
  return name.replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/i, '').split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}

export default function Testimonials({ testimonials, section }: { testimonials?: Testimonial[]; section?: PageSection }) {
  const items = testimonials?.length
    ? testimonials.map((item) => ({ key: item.id, quote: item.quote, name: item.name, role: item.role }))
    : fallback
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = items[index % items.length]

  useEffect(() => {
    if (paused || items.length < 2) return
    const timer = setInterval(() => setIndex((value) => (value + 1) % items.length), 7000)
    return () => clearInterval(timer)
  }, [paused, items.length])

  const go = (step: number) => setIndex((value) => (value + step + items.length) % items.length)

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative">
          <Eyebrow>{section?.eyebrow ?? 'What Parents Say'}</Eyebrow>
          <h2 className="max-w-md text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
            {section?.heading ?? 'Stories from Our Royal Community'}
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex text-[#E2B45A]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <span className="text-sm font-semibold text-[#7A5C5C]">Loved by Kumasi families</span>
          </div>
          <div className="relative mt-10 hidden h-56 w-56 overflow-hidden rounded-full ring-8 ring-[#FBF6EE] lg:block">
            <Image src="/images/students-group-celebration.jpeg" alt="Students celebrating together" fill sizes="224px" className="object-cover" />
          </div>
          <Sparkle className="absolute bottom-6 left-52 hidden h-6 w-6 lg:block" />
        </div>

        <div
          className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#B31B1B] to-[#5A1010] p-8 text-white shadow-[0_40px_80px_-40px_rgba(122,20,20,0.8)] sm:p-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span aria-hidden="true" className="material-symbols-outlined pointer-events-none absolute right-8 top-6 select-none text-[120px] leading-none text-white/10" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="text-xl font-medium leading-relaxed sm:text-2xl">&ldquo;{current.quote}&rdquo;</blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2B45A] text-sm font-extrabold text-[#2A0C0C]">{initials(current.name)}</span>
                  <div>
                    <div className="font-bold">{current.name}</div>
                    <div className="text-sm text-white/65">{current.role}</div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {items.length > 1 && (
            <div className="relative mt-10 flex items-center justify-between gap-4 border-t border-white/15 pt-6">
              <div className="flex gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.key}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === index % items.length ? 'w-8 bg-[#E2B45A]' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {[-1, 1].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => go(step)}
                    aria-label={step < 0 ? 'Previous testimonial' : 'Next testimonial'}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition hover:bg-white hover:text-[#B31B1B]"
                  >
                    <span className="material-symbols-outlined text-[20px]">{step < 0 ? 'arrow_back' : 'arrow_forward'}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
