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
    bg: 'bg-secondary-container',
    text: 'text-on-secondary-container',
    accent: 'text-secondary',
    border: 'border-secondary/20',
    divider: 'bg-secondary/20',
  },
  {
    number: '02',
    level: 'Lower Primary',
    age: 'Grades 1 – 3',
    tagline: 'The Great Lessons',
    description:
      'Students explore the universe through the "Great Lessons," igniting a lifelong curiosity for history, science, and language arts.',
    features: ['Literacy & Writing', 'Cosmic Education', 'Computational Thinking'],
    icon: 'auto_stories',
    bg: 'bg-primary',
    text: 'text-on-primary',
    accent: 'text-secondary-container',
    border: 'border-white/15',
    divider: 'bg-white/15',
  },
  {
    number: '03',
    level: 'Upper Primary',
    age: 'Grades 4 – 6',
    tagline: 'Leadership & Legacy',
    description:
      'Complex projects, collaborative research, and advanced mathematics prepare our students to lead far beyond the classroom.',
    features: ['Public Speaking & Debate', 'Environmental Stewardship', 'Advanced Logic & Algebra'],
    icon: 'workspace_premium',
    bg: 'bg-on-surface',
    text: 'text-inverse-on-surface',
    accent: 'text-secondary-container',
    border: 'border-white/10',
    divider: 'bg-white/10',
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
          {programs.map(({ number, level, age, tagline, description, features, icon, bg, text, accent, border, divider }) => (
            <StaggerItem key={level}>
              <div
                className={`${bg} ${text} p-lg flex flex-col min-h-[440px] relative overflow-hidden hover:-translate-y-2 transition-transform duration-300 h-full`}
              >
                {/* Large decorative number */}
                <span
                  className="absolute -right-2 -top-4 text-[100px] font-bold leading-none select-none font-headline-xl"
                  style={{ opacity: 0.06 }}
                >
                  {number}
                </span>

                {/* Top row */}
                <div className="flex items-start justify-between mb-lg">
                  <span
                    className={`material-symbols-outlined text-[36px] ${accent}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                  <span className="text-label-sm font-bold uppercase tracking-widest opacity-50">
                    {age}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className={`text-label-sm font-bold uppercase tracking-[0.2em] ${accent} mb-sm`}>
                    {tagline}
                  </p>
                  <h3 className="text-headline-md font-headline-md mb-md">{level}</h3>
                  <p className="text-label-lg opacity-75 leading-relaxed mb-lg">{description}</p>
                  <ul className="space-y-sm">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-sm opacity-80">
                        <span
                          className={`material-symbols-outlined text-[15px] ${accent} flex-shrink-0`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span className="text-label-lg">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className={`mt-lg pt-md border-t ${border}`}>
                  <Link
                    href="/curriculum"
                    className={`flex items-center gap-sm text-label-lg font-bold ${accent} hover:gap-md transition-all group`}
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
