import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import type { Database } from '@/types/database'
import { Eyebrow, Sparkle } from './decor'

type PageSection = Database['public']['Tables']['page_sections']['Row']

const photos = [
  { src: '/images/students-montessori-classroom.jpeg', alt: 'Students learning in the Montessori classroom' },
  { src: '/images/students-playground-trampoline.jpeg', alt: 'Students playing outdoors' },
  { src: '/images/teacher-student-mentorship.jpeg', alt: 'A teacher guiding a student' },
]

export default function Philosophy({ section }: { section?: PageSection }) {
  return (
    <section className="relative overflow-hidden bg-[#FBF6EE] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <AnimateOnView variant="fadeLeft">
          <Eyebrow>{section?.eyebrow ?? 'Our Philosophy'}</Eyebrow>
          <h2 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
            {section?.heading ?? <>We don&apos;t just teach children. <span className="text-primary">We crown them.</span></>}
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#6B4A4A]">
            {section?.body ?? 'Children are natural learners. We prepare the environment and let them lead.'}
          </p>
          <Link href="/about" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#2A0C0C] py-2 pl-7 pr-2 text-[15px] font-bold text-white transition hover:bg-primary">
            Our story
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2B45A] text-[#2A0C0C] transition-transform group-hover:translate-x-0.5">
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </span>
          </Link>
        </AnimateOnView>

        {/* Three-photo collage */}
        <AnimateOnView variant="fadeRight" className="relative grid h-[420px] grid-cols-5 grid-rows-2 gap-4 sm:h-[520px]">
          <div className="relative col-span-3 row-span-2 overflow-hidden rounded-[32px] rounded-tl-[100px]">
            <Image src={photos[0].src} alt={photos[0].alt} fill sizes="(max-width: 1024px) 60vw, 420px" className="object-cover" />
          </div>
          <div className="relative col-span-2 overflow-hidden rounded-[28px]">
            <Image src={photos[1].src} alt={photos[1].alt} fill sizes="(max-width: 1024px) 40vw, 280px" className="object-cover" />
          </div>
          <div className="relative col-span-2 overflow-hidden rounded-[28px] rounded-br-[80px]">
            <Image src={photos[2].src} alt={photos[2].alt} fill sizes="(max-width: 1024px) 40vw, 280px" className="object-cover" />
          </div>
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2A0C0C] shadow-lg">
            <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            Montessori since 2010
          </div>
          <Sparkle className="absolute -right-2 -top-3 h-6 w-6" />
        </AnimateOnView>
      </div>
    </section>
  )
}
