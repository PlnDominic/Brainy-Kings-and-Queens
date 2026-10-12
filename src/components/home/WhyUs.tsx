import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import { Eyebrow, Wave } from './decor'

export const WHY_US_REASONS = [
  { icon: 'menu_book', title: 'Montessori curriculum', photos: ['/images/students-classroom-primary.jpeg', '/images/students-montessori-classroom.jpeg', '/images/students-preschool-cubbies.jpeg'] },
  { icon: 'diversity_1', title: 'Small classes, 1:8', photos: ['/images/students-classroom-fun.jpeg', '/images/students-preschool-lunch-closeup.jpeg', '/images/students-preschool-twins.jpeg'] },
  { icon: 'verified_user', title: 'Safe, caring campus', photos: ['/images/students-school-building-front.jpeg', '/images/school-building.jpeg', '/images/students-group-pavilion.jpeg'] },
  { icon: 'workspace_premium', title: 'Qualified teachers', photos: ['/images/teacher-student-mentorship.jpeg', '/images/students-teacher-outdoor.jpeg'] },
  { icon: 'forest', title: 'Learning beyond walls', photos: ['/images/students-field-trip-bench.jpeg', '/images/student-field-trip-tree.jpeg', '/images/students-bench-outdoor.jpeg'] },
  { icon: 'palette', title: 'Culture & creativity', photos: ['/images/students-cultural-day.jpeg', '/images/students-group-celebration.jpeg', '/images/students-uniform-badges.jpeg'] },
]

export default function WhyUs({ images }: { images: string[] }) {
  return (
    <section className="relative overflow-hidden bg-[#2A0C0C] text-white">
      <Wave fill="#FFFFFF" flip className="absolute left-0 top-0 h-16 w-full md:h-24" />

      <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-36 md:px-8 lg:pb-36 lg:pt-44">
        <AnimateOnView className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow light>Why families choose us</Eyebrow>
            <h2 className="max-w-xl text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[44px]">
              An education <span className="text-[#E2B45A]">fit for royalty</span>
            </h2>
          </div>
          <Link href="/admissions" className="group inline-flex items-center gap-3 self-start rounded-full bg-white py-2 pl-7 pr-2 text-[15px] font-bold text-[#2A0C0C] transition hover:bg-[#E2B45A] sm:self-auto">
            Book a visit
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2A0C0C] text-[#E2B45A] transition-transform group-hover:translate-x-0.5">
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </span>
          </Link>
        </AnimateOnView>

        <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {WHY_US_REASONS.map((reason, index) => (
            <StaggerItem key={reason.title}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[4/3]">
                <Image src={images[index]} alt={reason.title} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl bg-[#2A0C0C] px-3 py-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E2B45A] text-[#2A0C0C]">
                    <span className="material-symbols-outlined text-[20px]">{reason.icon}</span>
                  </span>
                  <span className="text-sm font-bold leading-tight sm:text-[15px]">{reason.title}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <Wave fill="#FBF6EE" className="absolute bottom-0 left-0 h-16 w-full md:h-24" />
    </section>
  )
}
