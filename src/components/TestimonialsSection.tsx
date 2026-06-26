'use client'

import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'

const testimonials = [
  {
    quote:
      "My daughter woke up one morning and said, 'Mum, I can't wait to get to school.' That told me everything I needed to know.",
    name: 'Abena K.',
    role: 'Parent · Pre-School',
  },
  {
    quote:
      "The Montessori approach here is unlike anything I've seen elsewhere in Kumasi. The children learn to think, not just memorize facts.",
    name: 'Dr. Emmanuel O.',
    role: 'Parent · Lower Primary',
  },
  {
    quote:
      'Watching our son grow into a confident, curious young man has been remarkable. Brainy Kings & Queens gave him that foundation.',
    name: 'Josephine M.',
    role: 'Parent · Upper Primary',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-xl bg-on-surface overflow-hidden">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <AnimateOnView className="mb-xl">
          <div className="flex items-center gap-md mb-md">
            <div className="h-px w-10 bg-secondary-container flex-shrink-0" />
            <span className="text-secondary-container text-label-sm font-bold tracking-[0.3em] uppercase">
              What Parents Say
            </span>
          </div>
          <h2 className="text-headline-lg font-headline-lg text-inverse-on-surface max-w-xl leading-tight">
            Stories from Our <br /> Royal Community
          </h2>
        </AnimateOnView>

        {/* Testimonials grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {testimonials.map(({ quote, name, role }) => (
            <StaggerItem key={name}>
              <div className="border-t border-white/15 pt-lg flex flex-col h-full">
                <span
                  className="material-symbols-outlined text-[40px] text-secondary-container mb-md"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  format_quote
                </span>
                <p className="text-body-lg text-inverse-on-surface/75 leading-relaxed flex-1 mb-lg">
                  &ldquo;{quote}&rdquo;
                </p>
                <div>
                  <p className="text-label-lg font-bold text-inverse-on-surface">{name}</p>
                  <p className="text-label-sm text-inverse-on-surface/45 mt-xs">{role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
