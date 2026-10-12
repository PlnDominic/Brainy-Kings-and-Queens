'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import type { Database } from '@/types/database'
import { Eyebrow } from './decor'

type GalleryItem = Database['public']['Tables']['gallery_items']['Row']
type PageSection = Database['public']['Tables']['page_sections']['Row']

const fallback = [
  { src: '/images/students-large-group-photo.jpeg', alt: 'Our entire school community', caption: 'Our school family' },
  { src: '/images/students-uniform-badges.jpeg', alt: 'Students proudly showing school badges', caption: 'Royal pride' },
  { src: '/images/students-cultural-day.jpeg', alt: 'Cultural celebration day', caption: 'Cultural day' },
  { src: '/images/students-teacher-outdoor.jpeg', alt: 'Teacher with students outdoors', caption: 'Mentorship' },
  { src: '/images/students-preschool-twins-2.jpeg', alt: 'Two pre-school girls in uniform', caption: 'Our youngest royals' },
  { src: '/images/student-field-trip-tree.jpeg', alt: 'Student at field trip by large tree', caption: 'Beyond the classroom' },
  { src: '/images/students-classroom-fun.jpeg', alt: 'Students enjoying classroom learning', caption: 'Classroom joy' },
  { src: '/images/students-preschool-lunch-group.jpeg', alt: 'Pre-school students sharing lunch', caption: 'Shared meals' },
  { src: '/images/students-school-building-front.jpeg', alt: 'Students in front of the school building', caption: 'Our campus' },
]

export default function Gallery({ items, section }: { items?: GalleryItem[]; section?: PageSection }) {
  const track = useRef<HTMLDivElement>(null)
  const photos = items?.length
    ? items.map((item) => ({ src: item.image_url, alt: item.alt_text, caption: item.caption }))
    : fallback

  function scroll(direction: 1 | -1) {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.8, 640), behavior: 'smooth' })
  }

  return (
    <section className="overflow-hidden bg-[#FBF6EE] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateOnView className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{section?.eyebrow ?? 'Campus Life'}</Eyebrow>
            <h2 className="max-w-xl text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
              {section?.heading ?? 'Life at Brainy Kings & Queens'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link href={section?.cta_href ?? '/about'} className="mr-2 text-sm font-bold text-primary hover:underline">
              {section?.cta_label ?? 'See more'}
            </Link>
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => scroll(direction)}
                aria-label={direction < 0 ? 'Previous photos' : 'Next photos'}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2A0C0C]/15 text-[#2A0C0C] transition hover:border-[#2A0C0C] hover:bg-[#2A0C0C] hover:text-white"
              >
                <span className="material-symbols-outlined text-[22px]">{direction < 0 ? 'arrow_back' : 'arrow_forward'}</span>
              </button>
            ))}
          </div>
        </AnimateOnView>
      </div>

      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] md:px-8 xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, index) => (
          <figure
            key={`${photo.src}-${index}`}
            className={`group relative shrink-0 snap-start overflow-hidden rounded-[28px] bg-[#EFE3DA] ${
              index % 3 === 0 ? 'h-[380px] w-[300px] sm:h-[440px] sm:w-[360px]' : 'mt-10 h-[340px] w-[250px] sm:h-[400px] sm:w-[290px]'
            }`}
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="360px" className="object-cover transition duration-700 group-hover:scale-105" />
            {photo.caption && (
              <figcaption className="absolute inset-x-3 bottom-3 translate-y-2 rounded-2xl bg-white/90 px-4 py-3 text-sm font-bold text-[#2A0C0C] opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  )
}
