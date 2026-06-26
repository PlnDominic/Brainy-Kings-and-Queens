import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'

export const metadata: Metadata = {
  title: 'Curriculum | Brainy Kings & Queens Montessori',
}

const philosophyFeatures = [
  { icon: 'psychology', title: 'Critical Thinking', body: 'Encouraging "why" over "what" in every lesson.' },
  { icon: 'diversity_3', title: 'Global Perspective', body: 'Fostering empathy and cultural awareness.' },
  { icon: 'palette', title: 'Creative Sovereignty', body: 'Self-expression through arts and crafts.' },
  { icon: 'diamond', title: 'Character Dignity', body: 'Building leadership and moral integrity.' },
]

const timelineStages = [
  {
    label: 'Pre-School',
    ages: 'Ages 2.5 — 5 Years',
    labelBg: 'bg-primary text-on-primary',
    sectionTitle: 'The Prepared Environment',
    description:
      'Focusing on sensorial education and practical life skills. Children develop fine motor control and concentration through purposeful work with specialized Montessori materials.',
    milestonesLabel: 'Key Milestones:',
    milestones: ['Phonetic Reading', 'Basic Mathematical Concepts', 'Emotional Self-Regulation'],
    reverse: false,
  },
  {
    label: 'Lower Primary',
    ages: 'Grades 1 — 3',
    labelBg: 'bg-secondary text-on-secondary',
    sectionTitle: 'The Great Lessons',
    description:
      'Transitioning into abstract thinking. Students explore the "Great Lessons" that tell the story of the universe, sparking a lifelong interest in history and science.',
    milestonesLabel: 'Featured Subjects:',
    milestones: ['Creative Writing & Literacy', 'Cosmic Education (Sciences)', 'Computational Thinking'],
    reverse: true,
  },
  {
    label: 'Upper Primary',
    ages: 'Grades 4 — 6',
    labelBg: 'bg-tertiary text-on-tertiary',
    sectionTitle: 'Leadership & Legacy',
    description:
      'Preparing for the world beyond. Emphasis on complex project management, collaborative research, and advanced mathematical applications.',
    milestonesLabel: 'Advanced Focus:',
    milestones: ['Public Speaking & Debate', 'Environmental Stewardship', 'Advanced Logic & Algebra'],
    reverse: false,
  },
]

export default function CurriculumPage() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/school-building.jpeg"
            alt="Brainy Kings and Queens school campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-surface" />
        </div>
        <div className="absolute right-12 top-12 w-32 h-32 border-4 border-white/10 hidden md:block" />
        <div className="absolute right-20 top-20 w-16 h-16 border-2 border-secondary-container/30 hidden md:block" />

        <div className="relative z-10 text-center max-w-4xl px-margin-mobile md:px-margin-desktop">
          <AnimateOnView>
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 text-label-sm font-bold uppercase tracking-wider mb-md">
              Our Curriculum
            </span>
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-primary-container mt-md mb-md">
              Empowering Minds, Shaping Future Royalty
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container/85">
              Our Montessori-inspired curriculum blends rigorous academic standards with the dignity
              of self-paced exploration.
            </p>
          </AnimateOnView>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-xl">
          <AnimateOnView variant="fadeLeft" className="flex-1">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-lg">
              The &quot;Brainy&quot; Way
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg leading-relaxed">
              At Brainy Kings &amp; Queens, we believe every child is born with innate nobility and
              curiosity. Our teaching philosophy is built upon the Montessori method, emphasizing
              independence, respect for a child&apos;s natural psychological development, and
              technological literacy.
            </p>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              {philosophyFeatures.map(({ icon, title, body }) => (
                <StaggerItem
                  key={title}
                  className="flex gap-base items-start p-md bg-surface-container-low border-l-4 border-secondary"
                >
                  <span
                    className="material-symbols-outlined text-secondary text-headline-md"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                  <div>
                    <h4 className="font-headline-md text-label-lg text-on-surface">{title}</h4>
                    <p className="text-label-sm text-on-surface-variant">{body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimateOnView>

          <AnimateOnView variant="fadeRight" className="flex-1 w-full relative">
            <div className="aspect-square overflow-hidden border-8 border-surface-container-highest shadow-2xl">
              <Image
                src="/images/students-smiling-closeup.jpeg"
                alt="Smiling Brainy Kings and Queens students"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary-container p-lg shadow-xl max-w-[200px] border-t-4 border-secondary">
              <span
                className="material-symbols-outlined text-headline-xl text-on-secondary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
              <p className="font-headline-md text-on-secondary-container text-label-lg italic">
                The child is both a hope and a promise for mankind.
              </p>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* Academic Journey Timeline */}
      <section className="bg-surface-container-low py-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="text-center mb-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary">Academic Journey</h2>
            <p className="text-body-lg text-on-surface-variant mt-base">
              A structured path from discovery to mastery.
            </p>
          </AnimateOnView>

          <div className="relative border-l-2 border-primary/30 ml-8 md:ml-0 md:border-l-0 flex flex-col gap-xl">
            {timelineStages.map(
              ({ label, ages, labelBg, sectionTitle, description, milestonesLabel, milestones, reverse }, i) => (
                <AnimateOnView key={label} delay={i * 0.1}>
                  <div
                    className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-lg relative`}
                  >
                    {/* Label column */}
                    <div
                      className={`hidden md:flex flex-col ${reverse ? 'items-start' : 'items-end'} w-1/3 ${reverse ? 'pl-lg text-left' : 'pr-lg text-right'}`}
                    >
                      <div className={`${labelBg} px-md py-xs inline-block mb-xs`}>
                        <h3 className="font-headline-md">{label}</h3>
                      </div>
                      <p className="text-label-lg text-on-surface-variant">{ages}</p>
                    </div>

                    {/* Card */}
                    <div className="md:w-2/3 bg-surface p-lg shadow-md border border-outline-variant/50 curriculum-dot">
                      <div className="md:hidden mb-base">
                        <h3 className="font-headline-md text-primary">{label}</h3>
                        <p className="text-label-sm text-on-surface-variant font-bold">{ages}</p>
                      </div>
                      <div className={`grid md:grid-cols-2 gap-md ${reverse ? 'direction-rtl' : ''}`}>
                        <div className={reverse ? 'order-2 md:order-1' : ''}>
                          <h4 className="font-label-lg text-secondary mb-base uppercase tracking-wide">
                            {sectionTitle}
                          </h4>
                          <p className="text-body-md text-on-surface-variant">{description}</p>
                        </div>
                        <div
                          className={`bg-surface-container p-md ${reverse ? 'order-1 md:order-2' : ''}`}
                        >
                          <p className="font-label-lg text-primary mb-xs">{milestonesLabel}</p>
                          <ul className="text-label-sm space-y-1 text-on-surface-variant">
                            {milestones.map((m) => (
                              <li key={m} className="flex items-center gap-base">
                                <span
                                  className="material-symbols-outlined text-[14px] text-primary"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  check_circle
                                </span>
                                {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnView>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop">
        <AnimateOnView className="max-w-3xl mx-auto">
          <div className="bg-primary p-xl shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 pointer-events-none" />
            <div className="text-center relative z-10">
              <h2 className="font-headline-lg text-headline-lg text-on-primary mb-base">
                Start the Journey Today
              </h2>
              <p className="text-body-md text-on-primary/80 mb-lg">
                Enroll your child and watch them flourish in our carefully prepared Montessori
                environment.
              </p>
              <div className="flex gap-md justify-center flex-wrap">
                <Link
                  href="/admissions"
                  className="bg-secondary-container text-on-secondary-container px-lg py-md font-label-lg font-bold hover:opacity-90 transition-all shadow-lg inline-block"
                >
                  Apply Now
                </Link>
                <button className="border-2 border-on-primary/40 text-on-primary px-lg py-md font-label-lg hover:border-on-primary hover:bg-white/10 transition-all">
                  Download Prospectus
                </button>
              </div>
            </div>
          </div>
        </AnimateOnView>
      </section>
    </main>
  )
}
