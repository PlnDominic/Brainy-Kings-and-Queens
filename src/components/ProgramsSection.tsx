'use client'

import Link from 'next/link'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import AnimateOnView from '@/components/AnimateOnView'

const programs = [
  {
    number: '01',
    level: 'Pre-School',
    age: 'Ages 2.5 – 5',
    tagline: 'The Prepared Environment',
    description:
      'Children develop fine motor control, emotional self-regulation, and early literacy through purposeful work with Montessori materials.',
    features: ['Sensorial Learning', 'Practical Life Skills', 'Phonetic Reading'],
    icon: 'child_care',
    borderColor: 'border-secondary-container',
    accentText: 'text-secondary-container',
  },
  {
    number: '02',
    level: 'Primary',
    age: 'Grades 1 – 6',
    tagline: 'Growing Minds',
    description:
      'From the Great Lessons of early primary to complex research and leadership projects, students grow into confident, curious thinkers.',
    features: ['Literacy & Mathematics', 'Sciences & Computing', 'Public Speaking & Leadership'],
    icon: 'auto_stories',
    borderColor: 'border-secondary',
    accentText: 'text-secondary',
  },
  {
    number: '03',
    level: 'Junior High',
    age: 'JHS 1 – 3',
    tagline: 'Excellence & Achievement',
    description:
      'Students sharpen critical thinking and academic rigour across core subjects, preparing thoroughly for the BECE and their next great chapter.',
    features: ['English & Literature', 'Mathematics & Sciences', 'ICT & Computing'],
    icon: 'military_tech',
    borderColor: 'border-primary',
    accentText: 'text-primary',
  },
]

export default function ProgramsSection() {
  return (
    <section className="py-xl bg-surface overflow-hidden">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <AnimateOnView className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div>
            <p className="text-label-sm font-bold text-secondary uppercase tracking-[0.25em] mb-sm">
              Academic Programs
            </p>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              A Royal Path <br className="hidden sm:block" />
              Through Every Stage
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
          {programs.map(({ number, level, age, tagline, description, features, icon, borderColor, accentText }) => (
            <StaggerItem key={level}>
              <div
                className={`bg-surface-container-lowest border-t-4 ${borderColor} p-lg flex flex-col min-h-[440px] relative overflow-hidden hover:-translate-y-2 transition-transform duration-300 h-full shadow-sm`}
              >
                {/* Decorative number */}
                <span
                  className="absolute -right-2 -top-4 text-[100px] font-bold leading-none select-none font-headline-xl text-on-surface"
                  style={{ opacity: 0.04 }}
                >
                  {number}
                </span>

                {/* Top row */}
                <div className="flex items-start justify-between mb-lg">
                  <span
                    className={`material-symbols-outlined text-[36px] ${accentText}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                  <span className="text-label-sm font-bold uppercase tracking-widest text-on-surface-variant">
                    {age}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className={`text-label-sm font-bold uppercase tracking-[0.2em] ${accentText} mb-sm`}>
                    {tagline}
                  </p>
                  <h3 className="text-headline-md font-headline-md text-on-surface mb-md">{level}</h3>
                  <p className="text-label-lg text-on-surface-variant leading-relaxed mb-lg">{description}</p>
                  <ul className="space-y-sm">
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
                </div>

                {/* Footer */}
                <div className="mt-lg pt-md border-t border-outline-variant">
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
