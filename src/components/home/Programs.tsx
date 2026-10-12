import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import type { Database } from '@/types/database'
import { Eyebrow } from './decor'

type PageSection = Database['public']['Tables']['page_sections']['Row']

export type ProgramCard = { id: string; level: string; age: string; tagline: string; icon: string; image: string }

export const FALLBACK_PROGRAMS: ProgramCard[] = [
  {
    id: 'pre-school', level: 'Pre-School', age: 'Ages 2.5 – 5', tagline: 'The Prepared Environment',
    icon: 'child_care', image: '/images/students-preschool-standing.jpeg',
  },
  {
    id: 'primary', level: 'Primary', age: 'Grades 1 – 6', tagline: 'Growing Minds',
    icon: 'auto_stories', image: '/images/students-classroom-fun.jpeg',
  },
  {
    id: 'jhs', level: 'Junior High', age: 'JHS 1 – 3', tagline: 'Excellence & Achievement',
    icon: 'military_tech', image: '/images/students-teacher-outdoor.jpeg',
  },
]

const accents = ['#B31B1B', '#C98A1B', '#7A1E3A']

export default function Programs({ items, section }: { items: ProgramCard[]; section?: PageSection }) {

  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateOnView className="mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>{section?.eyebrow ?? 'Academic Programs'}</Eyebrow>
            <h2 className="max-w-2xl text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
              {section?.heading ?? 'A Royal Path Through Every Stage'}
            </h2>
          </div>
          <Link href="/curriculum" className="group inline-flex items-center gap-2 self-start rounded-full border border-[#2A0C0C]/15 px-6 py-3 text-sm font-bold text-[#2A0C0C] transition hover:border-primary hover:text-primary lg:self-auto">
            Full curriculum
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </AnimateOnView>

        <StaggerContainer className={`grid gap-6 md:grid-cols-2 ${items.length === 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {items.map((program, index) => {
            const accent = accents[index % accents.length]
            return (
              <StaggerItem key={program.id}>
                <Link href="/curriculum" className="group relative block aspect-[3/4] overflow-hidden rounded-[32px]">
                  <Image src={program.image} alt={`${program.level} students at Brainy Kings & Queens`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#2A0C0C]">{program.age}</span>
                  <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[24px] bg-white p-3 pr-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: accent }}>
                      <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{program.icon}</span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-extrabold tracking-tight text-[#2A0C0C]">{program.level}</h3>
                      <p className="truncate text-xs font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>{program.tagline}</p>
                    </div>
                    <span className="material-symbols-outlined text-[22px] text-[#2A0C0C] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
