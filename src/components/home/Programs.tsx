import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import type { Database } from '@/types/database'
import { Eyebrow } from './decor'

type Program = Database['public']['Tables']['programs']['Row']
type PageSection = Database['public']['Tables']['page_sections']['Row']

const fallbackPrograms = [
  {
    id: 'pre-school', number: '01', level: 'Pre-School', age: 'Ages 2.5 – 5', tagline: 'The Prepared Environment',
    description: 'Montessori materials build fine motor skills, self-regulation, and early literacy.',
    features: ['Sensorial Learning', 'Practical Life Skills', 'Phonetic Reading'],
    icon: 'child_care', image: '/images/students-preschool-standing.jpeg',
  },
  {
    id: 'primary', number: '02', level: 'Primary', age: 'Grades 1 – 6', tagline: 'Growing Minds',
    description: 'From the Great Lessons to leadership projects, raising confident, curious thinkers.',
    features: ['Literacy & Mathematics', 'Sciences & Computing', 'Public Speaking & Leadership'],
    icon: 'auto_stories', image: '/images/students-classroom-fun.jpeg',
  },
  {
    id: 'jhs', number: '03', level: 'Junior High', age: 'JHS 1 – 3', tagline: 'Excellence & Achievement',
    description: 'Core subjects, critical thinking, and BECE preparation for secondary success.',
    features: ['English & Literature', 'Mathematics & Sciences', 'ICT & Computing'],
    icon: 'military_tech', image: '/images/students-teacher-outdoor.jpeg',
  },
]

const accents = ['#B31B1B', '#C98A1B', '#7A1E3A']

export default function Programs({ programs, section }: { programs?: Program[]; section?: PageSection }) {
  const items = programs?.length
    ? programs.map((program) => ({
        id: program.id, number: program.number, level: program.level, age: program.age_range, tagline: program.tagline,
        description: program.description, features: program.features, icon: program.icon, image: program.image_url,
      }))
    : fallbackPrograms

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
            Explore the full curriculum
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </AnimateOnView>

        <StaggerContainer className={`grid gap-6 md:grid-cols-2 ${items.length === 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {items.map((program, index) => {
            const accent = accents[index % accents.length]
            return (
              <StaggerItem key={program.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[32px] bg-[#FBF6EE] p-3 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(42,12,12,0.4)]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                    <Image src={program.image} alt={`${program.level} students at Brainy Kings & Queens`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#2A0C0C] backdrop-blur">{program.age}</span>
                    <span className="absolute bottom-3 right-5 text-6xl font-extrabold leading-none text-white/25">{program.number}</span>
                  </div>

                  <div className="relative flex flex-1 flex-col px-4 pb-4 pt-9">
                    <span
                      className="absolute -top-7 left-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ring-4 ring-[#FBF6EE]"
                      style={{ backgroundColor: accent }}
                    >
                      <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>{program.icon}</span>
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>{program.tagline}</p>
                    <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-[#2A0C0C]">{program.level}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#6B4A4A]">{program.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {program.features.map((feature) => (
                        <li key={feature} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4A2A2A] ring-1 ring-[#2A0C0C]/5">{feature}</li>
                      ))}
                    </ul>
                    <Link href="/curriculum" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#2A0C0C] transition hover:gap-3" style={{ color: accent }}>
                      Learn more
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
