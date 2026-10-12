'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { heroContainer, heroItem } from '@/lib/animations'

type Props = {
  image: string
  imageAlt: string
  eyebrow: string
  heading: React.ReactNode
  body?: string | null
  cta?: { label: string; href: string }
  /** Small facts shown as pills under the copy. */
  highlights?: { icon: string; label: string }[]
  /** Focus point for the background photo, e.g. "object-top". */
  imagePosition?: string
}

/** Framed photo panel used at the top of every inner page, matching the homepage hero. */
export default function PageHero({ image, imageAlt, eyebrow, heading, body, cta, highlights, imagePosition = 'object-center' }: Props) {
  return (
    <section className="bg-[#FBF6EE] p-2 sm:p-3">
      <div className="relative isolate flex min-h-[560px] flex-col overflow-hidden rounded-[28px] bg-[#1A0505] [clip-path:inset(0_round_28px)] sm:min-h-[620px] sm:rounded-[40px] sm:[clip-path:inset(0_round_40px)]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={image} alt={imageAlt} fill sizes="100vw" priority className={`object-cover ${imagePosition}`} />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-[#1A0505]/60" />

        <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-5 pb-14 pt-40 md:px-8 lg:pb-20">
          <motion.div variants={heroContainer} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={heroItem} className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#E2B45A]">
              <span className="h-px w-10 bg-[#E2B45A]" />
              {eyebrow}
            </motion.div>
            <motion.h1 variants={heroItem} className="text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[68px]">
              {heading}
            </motion.h1>
            {body && (
              <motion.p variants={heroItem} className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75">
                {body}
              </motion.p>
            )}
            {(cta || highlights?.length) && (
              <motion.div variants={heroItem} className="mt-9 flex flex-wrap items-center gap-3">
                {cta && (
                  <Link
                    href={cta.href}
                    className="inline-flex h-14 items-center gap-2 rounded-full bg-white px-7 text-[15px] font-bold text-[#2A0C0C] transition hover:bg-[#E2B45A]"
                  >
                    {cta.label}
                    <span className="material-symbols-outlined text-[20px]">north_east</span>
                  </Link>
                )}
                {highlights?.map((item) => (
                  <span key={item.label} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 text-sm font-medium text-white/85 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[18px] text-[#E2B45A]">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
