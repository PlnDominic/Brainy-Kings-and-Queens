import type { Metadata } from 'next'
import Image from 'next/image'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import AdmissionsForm from '@/components/AdmissionsForm'

export const metadata: Metadata = {
  title: 'Admissions | Brainy Kings & Queens Montessori',
}

const steps = [
  {
    number: '01',
    icon: 'edit_note',
    title: 'Submit Inquiry',
    body: 'Fill out the form below. Our admissions team reads every inquiry personally.',
  },
  {
    number: '02',
    icon: 'fact_check',
    title: 'Assessment Visit',
    body: "We invite your child for a relaxed, play-based assessment — no pressure, just observation.",
  },
  {
    number: '03',
    icon: 'assignment',
    title: 'Application Review',
    body: "Our team reviews your child's profile and matches them with the right classroom environment.",
  },
  {
    number: '04',
    icon: 'verified',
    title: 'Enrolment Confirmed',
    body: 'Receive your official acceptance letter and welcome pack from Brainy Kings & Queens.',
  },
]

export default function AdmissionsPage() {
  return (
    <main>
      {/* ── 1. Hero ── */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden"
        style={{ background: '#0d0d0b' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container z-20" />

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/student-uniform-portrait.jpeg"
            alt="Young student in school uniform ready for class"
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
                Admissions Open
              </span>
            </div>
            <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-white mb-lg leading-tight">
              Begin Your Child&apos;s{' '}
              <br className="hidden md:block" />
              <span className="text-secondary-container">Royal Journey</span>
            </h1>
            <p className="text-body-lg text-white/70 max-w-xl leading-relaxed">
              A royal education starts with one step. Complete the inquiry form below and our team
              will reach out within 24 hours.
            </p>
          </AnimateOnView>
        </div>
      </section>

      {/* ── 2. Process Steps ── */}
      <section className="py-xl bg-surface">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="mb-xl">
            <p className="text-label-sm font-bold text-secondary uppercase tracking-[0.25em] mb-sm">
              How It Works
            </p>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              Four Steps to Enrolment
            </h2>
          </AnimateOnView>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
            {steps.map(({ number, icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="relative">
                  <span className="text-[80px] font-bold text-on-surface/5 font-headline-xl leading-none absolute -top-4 -left-2 select-none">
                    {number}
                  </span>
                  <div className="relative pt-lg">
                    <span
                      className="material-symbols-outlined text-[32px] text-primary mb-md block"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {icon}
                    </span>
                    <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">{title}</h3>
                    <p className="text-body-lg text-on-surface-variant leading-relaxed">{body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 3. Inquiry Form ── */}
      <section className="py-xl bg-surface-container-low">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="mb-xl">
            <p className="text-label-sm font-bold text-secondary uppercase tracking-[0.25em] mb-sm">
              Step One
            </p>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              Submit Your Inquiry
            </h2>
          </AnimateOnView>
          <AdmissionsForm />
        </div>
      </section>
    </main>
  )
}
