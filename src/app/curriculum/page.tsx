import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'

export const metadata: Metadata = {
  title: 'Curriculum | Brainy Kings & Queens Montessori',
}

const programs = [
  {
    number: '01',
    level: 'Pre-School',
    age: 'Ages 2.5 – 5',
    tagline: 'The Prepared Environment',
    description:
      'Children develop fine motor control, emotional self-regulation, and early literacy through purposeful work with Montessori materials.',
    subjects: [
      'Sensorial Learning',
      'Practical Life Skills',
      'Phonetic Reading',
      'Basic Mathematics',
      'Emotional Self-Regulation',
    ],
    icon: 'child_care',
    borderColor: 'border-secondary-container',
    accentText: 'text-secondary-container',
  },
  {
    number: '02',
    level: 'Lower Primary',
    age: 'Grades 1 – 3',
    tagline: 'The Great Lessons',
    description:
      'Students explore the universe through the "Great Lessons," igniting a lifelong curiosity for history, science, and language arts.',
    subjects: [
      'Literacy & Creative Writing',
      'Cosmic Education (Sciences)',
      'Computational Thinking',
      'Cultural Awareness',
      'Community Projects',
    ],
    icon: 'auto_stories',
    borderColor: 'border-secondary',
    accentText: 'text-secondary',
  },
  {
    number: '03',
    level: 'Upper Primary',
    age: 'Grades 4 – 6',
    tagline: 'Leadership & Legacy',
    description:
      'Complex projects, collaborative research, and advanced mathematics prepare our students to lead far beyond the classroom.',
    subjects: [
      'Public Speaking & Debate',
      'Environmental Stewardship',
      'Advanced Logic & Algebra',
      'Research Projects',
      'Leadership Seminars',
    ],
    icon: 'workspace_premium',
    borderColor: 'border-primary',
    accentText: 'text-primary',
  },
]

const principles = [
  {
    icon: 'psychology',
    title: 'Child-Led Discovery',
    body: 'Children choose their work, building intrinsic motivation and deep understanding.',
  },
  {
    icon: 'diversity_3',
    title: 'Mixed-Age Groups',
    body: 'Older students mentor younger ones — the most powerful form of learning.',
  },
  {
    icon: 'palette',
    title: 'Hands-On Materials',
    body: 'Montessori materials are self-correcting: children see their own errors and fix them.',
  },
  {
    icon: 'public',
    title: 'Cosmic Education',
    body: 'Every subject connects to a larger story — how humans and the universe are one.',
  },
]

export default function CurriculumPage() {
  return (
    <main>
      {/* ── 1. Hero ── */}
      <section
        className="relative min-h-[80vh] flex items-center overflow-hidden"
        style={{ background: '#1C0D06' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container z-20" />

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/school-building.jpeg"
            alt="Brainy Kings and Queens school campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        <div className="container mx-auto px-margin-mobile md:px-margin-desktop relative z-10 pt-28 pb-32">
          <AnimateOnView className="max-w-3xl">
            <div className="flex items-center gap-md mb-lg">
              <div className="h-px w-10 bg-secondary-container flex-shrink-0" />
              <span className="text-secondary-container text-label-sm font-bold tracking-[0.3em] uppercase">
                Academic Programs
              </span>
            </div>
            <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-white mb-lg leading-tight">
              A Royal Path{' '}
              <br className="hidden md:block" />
              <span className="text-secondary-container">Through Every Stage</span>
            </h1>
            <p className="text-body-lg text-white/70 max-w-xl leading-relaxed">
              Our Montessori-inspired curriculum blends rigorous academic standards with the dignity
              of self-paced exploration — from age 2.5 through Grade 6.
            </p>
          </AnimateOnView>
        </div>
      </section>

      {/* ── 2. Principles ── */}
      <section className="py-xl bg-surface-container-low overflow-hidden">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="mb-xl">
            <div className="flex items-center gap-md mb-md">
              <div className="h-px w-10 bg-primary flex-shrink-0" />
              <span className="text-primary text-label-sm font-bold tracking-[0.3em] uppercase">
                The Brainy Way
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-end">
              <h2 className="text-headline-lg font-headline-lg text-on-surface leading-tight">
                Four Principles That Guide Every Lesson
              </h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                The Montessori method is not a set of rules — it is a philosophy that respects the
                child as a natural learner. Every decision we make in the classroom flows from
                these four commitments.
              </p>
            </div>
          </AnimateOnView>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {principles.map(({ icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="bg-surface-container-lowest p-lg border-l-4 border-primary flex gap-lg shadow-sm">
                  <span
                    className="material-symbols-outlined text-[32px] text-primary flex-shrink-0 mt-xs"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                  <div>
                    <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">
                      {title}
                    </h3>
                    <p className="text-body-lg text-on-surface-variant leading-relaxed">{body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 3. Program Cards ── */}
      <section className="py-xl bg-surface overflow-hidden">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="mb-xl">
            <p className="text-label-sm font-bold text-secondary uppercase tracking-[0.25em] mb-sm">
              Curriculum Detail
            </p>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              What Your Child Will Learn
            </h2>
          </AnimateOnView>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {programs.map(({ number, level, age, tagline, description, subjects, icon, borderColor, accentText }) => (
              <StaggerItem key={level}>
                <div
                  className={`bg-surface-container-lowest border-t-4 ${borderColor} p-lg flex flex-col min-h-[520px] relative overflow-hidden hover:-translate-y-2 transition-transform duration-300 h-full shadow-sm`}
                >
                  <span
                    className="absolute -right-2 -top-4 text-[100px] font-bold leading-none select-none font-headline-xl text-on-surface"
                    style={{ opacity: 0.04 }}
                  >
                    {number}
                  </span>

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

                  <div className="flex-1">
                    <p className={`text-label-sm font-bold uppercase tracking-[0.2em] ${accentText} mb-sm`}>
                      {tagline}
                    </p>
                    <h3 className="text-headline-md font-headline-md text-on-surface mb-md">{level}</h3>
                    <p className="text-label-lg text-on-surface-variant leading-relaxed mb-lg">{description}</p>
                    <ul className="space-y-sm">
                      {subjects.map((s) => (
                        <li key={s} className="flex items-center gap-sm">
                          <span
                            className={`material-symbols-outlined text-[15px] ${accentText} flex-shrink-0`}
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                          <span className="text-label-lg text-on-surface-variant">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-lg pt-md border-t border-outline-variant">
                    <Link
                      href="/admissions"
                      className={`flex items-center gap-sm text-label-lg font-bold ${accentText} hover:gap-md transition-all group`}
                    >
                      Enrol for {level}
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

      {/* ── 4. Pullquote + Image ── */}
      <section className="py-xl bg-surface-container-low">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <AnimateOnView variant="fadeLeft">
              <div className="relative h-[460px] overflow-hidden">
                <Image
                  src="/images/students-smiling-closeup.jpeg"
                  alt="Smiling Brainy Kings and Queens students"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </AnimateOnView>

            <AnimateOnView variant="fadeRight">
              <div className="max-w-md">
                <span
                  className="material-symbols-outlined text-[56px] text-secondary mb-md block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  format_quote
                </span>
                <blockquote className="text-headline-md font-headline-md text-on-surface leading-relaxed mb-lg">
                  &ldquo;The child is both a hope and a promise for mankind.&rdquo;
                </blockquote>
                <cite className="text-label-sm font-bold text-secondary uppercase tracking-[0.2em] not-italic">
                  — Maria Montessori
                </cite>
                <p className="text-body-lg text-on-surface-variant leading-relaxed mt-xl">
                  This is the spirit that drives every lesson at Brainy Kings &amp; Queens. We do
                  not teach children what to think — we create the conditions for them to discover
                  how to think.
                </p>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="bg-primary py-xl">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="max-w-4xl mx-auto text-center">
            <p className="text-label-sm font-bold text-secondary-container uppercase tracking-[0.25em] mb-md">
              Start the Journey
            </p>
            <h2 className="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-on-primary mb-md leading-tight">
              Secure Your Child&apos;s <br className="hidden md:block" /> Place Today
            </h2>
            <p className="text-body-lg text-on-primary/75 mb-xl max-w-xl mx-auto">
              Enrolment for the upcoming academic year is now open. Join a community that
              believes every child deserves a royal education.
            </p>
            <div className="flex flex-wrap gap-md justify-center">
              <Link
                href="/admissions"
                className="bg-secondary-container text-on-secondary-container px-10 py-4 font-label-lg font-bold flex items-center gap-sm hover:opacity-90 transition-all active:scale-95 shadow-xl"
              >
                Apply Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <a
                href="tel:0591664392"
                className="border-2 border-white/30 text-on-primary px-10 py-4 font-label-lg hover:border-white hover:bg-white/10 transition-all flex items-center gap-sm"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                0591664392
              </a>
            </div>
          </AnimateOnView>
        </div>
      </section>
    </main>
  )
}
