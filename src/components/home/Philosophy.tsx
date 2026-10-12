import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import type { Database } from '@/types/database'
import { DotGrid, Eyebrow, Sparkle } from './decor'

type PageSection = Database['public']['Tables']['page_sections']['Row']

const pillars = [
  { icon: 'directions_run', label: 'Physical growth' },
  { icon: 'favorite', label: 'Emotional well-being' },
  { icon: 'diversity_3', label: 'Social skills' },
  { icon: 'psychology', label: 'Cognitive skills' },
]

export default function Philosophy({ section }: { section?: PageSection }) {
  return (
    <section className="relative overflow-hidden bg-[#FBF6EE] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Photo collage */}
        <AnimateOnView variant="fadeLeft" className="relative mx-auto w-full max-w-[540px] pb-10 pr-10 sm:pb-14 sm:pr-14">
          <DotGrid className="absolute -left-6 -top-6 h-32 w-32 text-[#B31B1B]/20" />
          <div className="relative aspect-[5/6] overflow-hidden rounded-[40px] rounded-tl-[120px] shadow-[0_30px_60px_-30px_rgba(42,12,12,0.45)]">
            <Image src="/images/students-montessori-classroom.jpeg" alt="Students learning in the Montessori classroom" fill sizes="(max-width: 1024px) 90vw, 540px" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 aspect-square w-[46%] overflow-hidden rounded-[32px] border-[6px] border-[#FBF6EE] shadow-xl">
            <Image src="/images/students-playground-trampoline.jpeg" alt="Students playing outdoors" fill sizes="260px" className="object-cover" />
          </div>
          <div className="absolute left-6 top-8 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2A0C0C] text-[#E2B45A]">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-extrabold text-[#2A0C0C]">Montessori</div>
              <div className="text-[11px] text-[#8C6F6F]">since 2010</div>
            </div>
          </div>
          <Sparkle className="absolute -right-2 top-10 h-6 w-6" />
        </AnimateOnView>

        {/* Copy */}
        <AnimateOnView variant="fadeRight">
          <Eyebrow>{section?.eyebrow ?? 'Our Philosophy'}</Eyebrow>
          <h2 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
            {section?.heading ?? <>We don&apos;t just teach children. <span className="text-primary">We crown them.</span></>}
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#6B4A4A]">
            {section?.body ?? 'The Montessori method recognises that children are natural learners, born with curiosity, dignity, and the capacity to lead. Our role is simply to prepare the environment and step aside.'}
          </p>

          <div className="mt-10 rounded-[28px] bg-white p-6 shadow-[0_20px_50px_-30px_rgba(42,12,12,0.3)] ring-1 ring-[#2A0C0C]/5 sm:p-7">
            <p className="mb-5 text-[15px] font-bold text-[#2A0C0C]">Holistic development for a brighter future</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <li key={pillar.label} className="flex items-center gap-3 text-[15px] font-medium text-[#4A2A2A]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FBEAEA] text-primary">
                    <span className="material-symbols-outlined text-[18px]">{pillar.icon}</span>
                  </span>
                  {pillar.label}
                </li>
              ))}
            </ul>
          </div>

          <Link href="/about" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#2A0C0C] py-2 pl-7 pr-2 text-[15px] font-bold text-white transition hover:bg-primary">
            Discover our story
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2B45A] text-[#2A0C0C] transition-transform group-hover:translate-x-0.5">
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </span>
          </Link>
        </AnimateOnView>
      </div>
    </section>
  )
}
