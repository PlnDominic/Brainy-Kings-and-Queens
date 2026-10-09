'use client'

import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import type { Database } from '@/types/database'

type Testimonial = Database['public']['Tables']['testimonials']['Row']
type PageSection = Database['public']['Tables']['page_sections']['Row']

const fallbackTestimonials = [
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

export default function TestimonialsSection({ testimonials, section }: { testimonials?: Testimonial[]; section?: PageSection }) {
  const displayedTestimonials = testimonials === undefined
    ? fallbackTestimonials.map((item) => ({ ...item, key: item.name }))
    : testimonials.map((item) => ({ ...item, key: item.id }))

  return (
    <section className="py-xl bg-surface-container-low overflow-hidden">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <AnimateOnView className="mb-xl">
          <div className="flex items-center gap-md mb-md">
            <div className="h-px w-10 bg-primary flex-shrink-0" />
            <span className="text-primary text-label-sm font-bold tracking-[0.3em] uppercase">
              {section?.eyebrow ?? 'What Parents Say'}
            </span>
          </div>
          <h2 className="text-headline-lg font-headline-lg text-on-surface max-w-xl leading-tight">
            {section?.heading ?? <>Stories from Our <br /> Royal Community</>}
          </h2>
        </AnimateOnView>

        {/* Testimonials grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {displayedTestimonials.length === 0 && (
            <p className="text-body-lg text-on-surface-variant">No published testimonials yet.</p>
          )}
          {displayedTestimonials.map(({ key, quote, name, role }) => (
            <StaggerItem key={key}>
              <div className="bg-surface-container-lowest p-lg border-t-4 border-primary flex flex-col h-full shadow-sm">
                <span
                  className="material-symbols-outlined text-[40px] text-primary mb-md"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  format_quote
                </span>
                <p className="text-body-lg text-on-surface-variant leading-relaxed flex-1 mb-lg">
                  &ldquo;{quote}&rdquo;
                </p>
                <div>
                  <p className="text-label-lg font-bold text-on-surface">{name}</p>
                  <p className="text-label-sm text-on-surface-variant/60 mt-xs">{role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
