import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'

export const metadata: Metadata = {
  title: 'About Us | Brainy Kings & Queens Montessori',
}

const values = [
  {
    icon: 'workspace_premium',
    title: 'Dignity First',
    body: "Every child is treated with the respect owed to a future leader. Discipline is built on self-mastery, never fear.",
  },
  {
    icon: 'psychology',
    title: 'Curiosity Over Compliance',
    body: 'We ask "why?" before "what." The Montessori method honours the child\'s natural drive to understand the world.',
  },
  {
    icon: 'groups',
    title: 'Community as Classroom',
    body: 'Mixed-age groups and collaborative projects teach our students that leadership is always in service of others.',
  },
]

export default function AboutPage() {
  return (
    <main>
      {/* ── 1. Hero ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: '#1C0D06' }}
      >

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/students-large-group-photo.jpeg"
            alt="Brainy Kings and Queens school community"
            fill
            className="object-cover object-top"
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
                Est. 2010 · Kumasi, Ghana
              </span>
            </div>
            <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-white mb-lg leading-tight">
              We Crown Children.{' '}
              <br className="hidden md:block" />
              <span className="text-secondary-container">Not Just Educate Them.</span>
            </h1>
            <p className="text-body-lg text-white/70 max-w-xl leading-relaxed mb-xl">
              For over 15 years, Brainy Kings &amp; Queens Montessori has been Kumasi&apos;s most
              trusted name in early childhood excellence — rooted in dignity, driven by curiosity.
            </p>
            <Link
              href="/admissions"
              className="bg-secondary-container text-on-secondary-container px-8 py-4 font-label-lg font-bold flex items-center gap-sm hover:opacity-90 transition-all active:scale-95 shadow-xl w-fit"
            >
              Enrol Your Child
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </AnimateOnView>
        </div>
      </section>

      {/* ── 2. Our Story ── */}
      <section className="py-xl bg-surface">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <AnimateOnView variant="fadeLeft">
              <div className="relative">
                <div className="relative h-[500px] overflow-hidden">
                  <Image
                    src="/images/students-cultural-day.jpeg"
                    alt="Students celebrating cultural day in kente attire"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary p-md shadow-xl max-w-[220px]">
                  <p className="text-label-sm font-bold text-on-primary uppercase tracking-wide mb-xs">
                    Founded in 2010
                  </p>
                  <p className="text-label-sm text-on-primary/70">
                    Kumasi&apos;s first dedicated Montessori primary school
                  </p>
                </div>
              </div>
            </AnimateOnView>

            <AnimateOnView variant="fadeRight" className="space-y-lg">
              <div>
                <p className="text-label-sm font-bold text-secondary uppercase tracking-[0.25em] mb-lg">
                  Our Story
                </p>
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-lg leading-tight">
                  A School Built on a Simple Belief
                </h2>
                <p className="text-body-lg text-on-surface-variant leading-relaxed mb-md">
                  Brainy Kings &amp; Queens was founded on one conviction: that the children of
                  Kumasi deserve an education worthy of their potential. The Montessori method
                  gave us the framework — our community gave us the heart.
                </p>
                <p className="text-body-lg text-on-surface-variant leading-relaxed">
                  Over 15 years, we have grown from a small pre-school to a full primary school
                  serving over 250 students, from ages 2.5 through Grade 6. But our promise
                  remains unchanged: to see each child as the leader they already are.
                </p>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* ── 4. Values ── */}
      <section className="py-xl bg-surface overflow-hidden">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="mb-xl">
            <div className="flex items-center gap-md mb-md">
              <div className="h-px w-10 bg-primary flex-shrink-0" />
              <span className="text-primary text-label-sm font-bold tracking-[0.3em] uppercase">
                Our Values
              </span>
            </div>
            <h2 className="text-headline-lg font-headline-lg text-on-surface max-w-xl leading-tight">
              What We Stand For
            </h2>
          </AnimateOnView>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {values.map(({ icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="bg-surface-container-lowest border-t-4 border-primary p-lg flex flex-col h-full shadow-sm">
                  <span
                    className="material-symbols-outlined text-[40px] text-primary mb-md"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                  <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">
                    {title}
                  </h3>
                  <p className="text-body-lg text-on-surface-variant leading-relaxed">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 5. Campus Gallery ── */}
      <section className="py-xl bg-surface-container-low">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="mb-xl">
            <p className="text-label-sm font-bold text-secondary uppercase tracking-[0.25em] mb-sm">
              Campus Life
            </p>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              Life at Brainy Kings &amp; Queens
            </h2>
          </AnimateOnView>

          <AnimateOnView>
            <div className="flex flex-col md:flex-row gap-md">
              <div className="md:w-1/2 relative gallery-item overflow-hidden h-[400px]">
                <Image
                  src="/images/students-group-pavilion.jpeg"
                  alt="Students at the school pavilion"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="gallery-caption">
                  <span className="text-white font-label-lg">The Pavilion</span>
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col gap-md">
                <div className="relative gallery-item overflow-hidden h-[192px] md:h-auto md:flex-1">
                  <Image
                    src="/images/students-bench-outdoor.jpeg"
                    alt="Students learning outdoors"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="gallery-caption">
                    <span className="text-white font-label-lg">Outdoor Learning</span>
                  </div>
                </div>
                <div className="relative gallery-item overflow-hidden h-[192px] md:h-auto md:flex-1">
                  <Image
                    src="/images/students-smiling-closeup.jpeg"
                    alt="Happy students at Brainy Kings and Queens"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="gallery-caption">
                    <span className="text-white font-label-lg">Happy Learners</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section className="bg-primary py-xl">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="max-w-4xl mx-auto text-center">
            <p className="text-label-sm font-bold text-secondary-container uppercase tracking-[0.25em] mb-md">
              Admissions Open
            </p>
            <h2 className="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-on-primary mb-md leading-tight">
              Join Our Royal <br className="hidden md:block" /> Community
            </h2>
            <p className="text-body-lg text-on-primary/75 mb-xl max-w-xl mx-auto">
              Enrolment for the upcoming academic year is now open. Give your child
              the royal start they deserve.
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
