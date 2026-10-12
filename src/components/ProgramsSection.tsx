'use client'

import Image from 'next/image'
import Link from 'next/link'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import AnimateOnView from '@/components/AnimateOnView'
import type { Database } from '@/types/database'

type Program = Database['public']['Tables']['programs']['Row']
type PageSection = Database['public']['Tables']['page_sections']['Row']

const programsFallback = [
  {
    number: '01',
    level: 'Pre-School',
    age: 'Ages 2.5 – 5',
    tagline: 'The Prepared Environment',
    description: 'Montessori materials build fine motor skills, self-regulation, and early literacy.',
    features: ['Sensorial Learning', 'Practical Life Skills', 'Phonetic Reading'],
    icon: 'child_care',
    image: '/images/students-preschool-standing.jpeg',
    borderColor: 'border-primary',
    accentText: 'text-primary',
  },
  {
    number: '02',
    level: 'Primary',
    age: 'Grades 1 – 6',
    tagline: 'Growing Minds',
    description: 'From the Great Lessons to leadership projects, raising confident, curious thinkers.',
    features: ['Literacy & Mathematics', 'Sciences & Computing', 'Public Speaking & Leadership'],
    icon: 'auto_stories',
    image: '/images/students-classroom-fun.jpeg',
    borderColor: 'border-secondary',
    accentText: 'text-secondary',
  },
  {
    number: '03',
    level: 'Junior High',
    age: 'JHS 1 – 3',
    tagline: 'Excellence & Achievement',
    description: 'Core subjects, critical thinking, and BECE preparation for secondary success.',
    features: ['English & Literature', 'Mathematics & Sciences', 'ICT & Computing'],
    icon: 'military_tech',
    image: '/images/students-teacher-outdoor.jpeg',
    borderColor: 'border-primary',
    accentText: 'text-primary',
  },
]

export default function ProgramsSection({ programs, section }: { programs?: Program[]; section?: PageSection }) {
  const displayPrograms = programs === undefined
    ? programsFallback.map((program) => ({ ...program, id: program.level }))
    : programs.map((program) => ({
        id: program.id,
        number: program.number,
        level: program.level,
        age: program.age_range,
        tagline: program.tagline,
        description: program.description,
        features: program.features,
        icon: program.icon,
        image: program.image_url,
        borderColor: program.border_color || 'border-primary',
        accentText: program.accent_text_color || 'text-primary',
      }))

  return (
    <section className="py-xl bg-surface overflow-hidden">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <AnimateOnView className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div>
            <p className="text-label-sm font-bold text-secondary uppercase tracking-[0.25em] mb-sm">
              {section?.eyebrow ?? 'Academic Programs'}
            </p>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              {section?.heading ?? <>A Royal Path <br className="hidden sm:block" /> Through Every Stage</>}
            </h2>
          </div>
          <Link
            href="/curriculum"
            className="flex items-center gap-sm text-primary font-label-lg font-bold hover:gap-md transition-all self-start md:self-auto group"
          >
            Full Curriculum
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </AnimateOnView>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {displayPrograms.length === 0 && (
            <p className="text-body-lg text-on-surface-variant">No published programs are available right now.</p>
          )}
          {displayPrograms.map(({ id, number, level, age, tagline, description, features, icon, image, borderColor, accentText }) => (
            <StaggerItem key={id || level}>
              <div className={`bg-surface-container-lowest border-t-4 ${borderColor} flex flex-col overflow-hidden hover:-translate-y-2 transition-transform duration-300 h-full shadow-sm`}>
                {/* Photo */}
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                  <Image
                    src={image}
                    alt={`${level} students at Brainy Kings & Queens`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute top-md right-md text-label-sm font-bold uppercase tracking-widest text-white/90 bg-black/30 px-sm py-xs backdrop-blur-sm">
                    {age}
                  </span>
                </div>

                {/* Content */}
                <div className="p-lg flex flex-col flex-1 relative overflow-hidden">
                  <span
                    className="absolute -right-2 -top-4 text-[100px] font-bold leading-none select-none font-headline-xl text-on-surface"
                    style={{ opacity: 0.04 }}
                  >
                    {number}
                  </span>

                  <div className="flex items-center gap-sm mb-md">
                    <span
                      className={`material-symbols-outlined text-[28px] ${accentText}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {icon}
                    </span>
                    <p className={`text-label-sm font-bold uppercase tracking-[0.2em] ${accentText}`}>
                      {tagline}
                    </p>
                  </div>

                  <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">{level}</h3>
                  <p className="text-label-lg text-on-surface-variant leading-relaxed mb-md">{description}</p>

                  <ul className="space-y-xs flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-sm">
                        <span
                          className={`material-symbols-outlined text-[15px] ${accentText} flex-shrink-0`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span className="text-label-lg text-on-surface-variant">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-md pt-md border-t border-outline-variant">
                    <Link
                      href="/curriculum"
                      className={`flex items-center gap-sm text-label-lg font-bold ${accentText} hover:gap-md transition-all group`}
                    >
                      Learn more
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
