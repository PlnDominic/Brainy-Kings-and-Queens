import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import type { Database } from '@/types/database'
import { Crown, DotGrid, Sparkle } from './decor'

type PageSection = Database['public']['Tables']['page_sections']['Row']

type Defaults = { eyebrow: string; heading: string; body: string; label: string }

const HOME_DEFAULTS: Defaults = {
  eyebrow: 'Admissions Open',
  heading: "Secure Your Child's Place Today",
  body: 'Enrolment for the new academic year is open.',
  label: 'Apply Now',
}

export default function AdmissionsCta({ section, phone, defaults = HOME_DEFAULTS, image = '/images/students-outdoor-play-1.jpeg', className = 'bg-white' }: {
  section?: PageSection
  phone?: string | null
  defaults?: Defaults
  image?: string
  /** Background of the strip around the banner, to match the section above. */
  className?: string
}) {
  const tel = phone || '0591664392'
  return (
    <section className={`${className} px-5 pb-24 md:px-8 lg:pb-32`}>
      <AnimateOnView variant="scaleIn" className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#E2B45A]">
        <DotGrid className="pointer-events-none absolute bottom-6 left-1/2 h-28 w-40 text-[#2A0C0C]/15" />
        <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:p-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#2A0C0C] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#E2B45A]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#E2B45A]" />
              {section?.eyebrow ?? defaults.eyebrow}
            </div>
            <h2 className="max-w-xl text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#2A0C0C] sm:text-[48px]">
              {section?.heading ?? defaults.heading}
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[#2A0C0C]/75">
              {section?.body ?? defaults.body}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={section?.cta_href ?? '/admissions'}
                className="group inline-flex items-center gap-3 rounded-full bg-[#2A0C0C] py-2 pl-7 pr-2 text-[15px] font-bold text-white transition hover:bg-primary"
              >
                {section?.cta_label ?? defaults.label}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2B45A] text-[#2A0C0C] transition-transform group-hover:translate-x-0.5">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </span>
              </Link>
              <a href={`tel:${tel.replace(/\s/g, '')}`} className="inline-flex items-center gap-3 rounded-full px-2 py-2 text-[15px] font-bold text-[#2A0C0C]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#2A0C0C]/20">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </span>
                {tel}
              </a>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[340px] lg:block">
            <Crown className="absolute -top-12 left-1/2 h-10 w-14 -translate-x-1/2" color="#2A0C0C" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[32px] border-[6px] border-white/60 shadow-2xl">
              <Image src={image} alt="Brainy Kings & Queens students" fill sizes="340px" className="object-cover" />
            </div>
            <Sparkle className="absolute -left-4 top-1/4 h-7 w-7" color="#2A0C0C" />
            <Sparkle className="absolute -right-3 bottom-1/4 h-5 w-5" color="#fff" />
          </div>
        </div>
      </AnimateOnView>
    </section>
  )
}
