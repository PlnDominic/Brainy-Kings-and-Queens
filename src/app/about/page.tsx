import type { Metadata } from 'next'
import Image from 'next/image'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import PageHero from '@/components/site/PageHero'
import AdmissionsCta from '@/components/home/AdmissionsCta'
import { Crown, DotGrid, Eyebrow, Wave } from '@/components/home/decor'
import { getGalleryItems, getPageSections, getSiteSettings, getTeamMembers, getValues } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About Us | Brainy Kings & Queens Montessori',
}

export const dynamic = 'force-dynamic'

const values = [
  {
    icon: 'workspace_premium',
    title: 'Dignity First',
    body: 'Every child is treated with the respect owed to a future leader. Discipline is built on self-mastery, never fear.',
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

const aboutGalleryDefaults = [
  { src: '/images/students-group-pavilion.jpeg', alt: 'Students at the school pavilion', caption: 'The Pavilion' },
  { src: '/images/students-preschool-cubbies.jpeg', alt: 'Pre-school students organising their belongings', caption: 'Practical Life' },
  { src: '/images/students-preschool-lunch-closeup.jpeg', alt: 'Pre-school children enjoying lunch at school', caption: 'Nourished & Cared For' },
  { src: '/images/teacher-student-mentorship.jpeg', alt: 'A teacher guiding a student', caption: 'Guided, Not Lectured' },
  { src: '/images/students-uniform-outdoor-group-2.jpeg', alt: 'Students in uniform outdoors', caption: 'Friends for Life' },
]

const milestones = [
  { value: '2010', label: 'Founded in Kumasi' },
  { value: '250+', label: 'Students today' },
  { value: '2.5 to JHS 3', label: 'Ages we serve' },
]

export default async function AboutPage() {
  const [cmsValues, galleryItems, teamMembers, pageSections, settings] = await Promise.all([
    getValues(),
    getGalleryItems('about'),
    getTeamMembers(),
    getPageSections('about'),
    getSiteSettings(),
  ])
  const displayValues = cmsValues.length ? cmsValues : values.map((value) => ({ ...value, id: value.title }))
  const section = (key: string) => pageSections.find((item) => item.section_key === key)
  const heroSection = section('hero')
  const storySection = section('story')
  const gallerySection = section('gallery')
  const photos = [
    ...aboutGalleryDefaults,
    ...galleryItems
      .filter((item) => !aboutGalleryDefaults.some((defaultItem) => defaultItem.src === item.image_url))
      .map((item) => ({ src: item.image_url, alt: item.alt_text, caption: item.caption })),
  ]

  return (
    <main>
      <PageHero
        image={heroSection?.image_url || '/images/students-large-group-photo.jpeg'}
        imageAlt="Brainy Kings and Queens school community"
        imagePosition="object-top"
        eyebrow={heroSection?.eyebrow ?? 'Est. 2010 · Kumasi, Ghana'}
        heading={heroSection?.heading ?? <>We Crown Children. <span className="text-[#E2B45A]">Not Just Educate Them.</span></>}
        body={heroSection?.body ?? 'For over 15 years, Brainy Kings & Queens Montessori has been Kumasi’s most trusted name in early childhood excellence, rooted in dignity, driven by curiosity.'}
        cta={{ label: heroSection?.cta_label ?? 'Enrol Your Child', href: heroSection?.cta_href ?? '/admissions' }}
      />

      {/* Our story */}
      <section className="overflow-hidden bg-[#FBF6EE] py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
          <AnimateOnView variant="fadeLeft" className="relative mx-auto w-full max-w-[540px]">
            <DotGrid className="absolute -right-6 -top-6 h-32 w-32 text-[#B31B1B]/20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] rounded-br-[120px] shadow-[0_30px_60px_-30px_rgba(42,12,12,0.45)]">
              <Image src={storySection?.image_url || '/images/students-cultural-day.jpeg'} alt="Students celebrating cultural day in kente attire" fill sizes="(max-width: 1024px) 90vw, 540px" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-3xl bg-[#2A0C0C] p-5 pr-7 text-white shadow-2xl">
              <Crown className="h-8 w-10" />
              <div className="leading-tight">
                <div className="text-lg font-extrabold">Founded in 2010</div>
                <div className="text-xs text-white/60">Kumasi&apos;s first dedicated Montessori primary</div>
              </div>
            </div>
          </AnimateOnView>

          <AnimateOnView variant="fadeRight">
            <Eyebrow>{storySection?.eyebrow ?? 'Our Story'}</Eyebrow>
            <h2 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
              {storySection?.heading ?? 'A School Built on a Simple Belief'}
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-[#6B4A4A]">
              {storySection?.body ?? 'Brainy Kings & Queens was founded on one conviction: that the children of Kumasi deserve an education worthy of their potential. The Montessori method gave us the framework; our community gave us the heart.'}
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-[#6B4A4A]">
              {storySection?.secondary_body ?? 'Over 15 years, we have grown from a small pre-school to a full primary school serving over 250 students, from ages 2.5 through JHS 3. But our promise remains unchanged: to see each child as the leader they already are.'}
            </p>
            <dl className="mt-10 grid grid-cols-3 divide-x divide-[#2A0C0C]/10 rounded-[24px] bg-white py-5 shadow-[0_20px_50px_-30px_rgba(42,12,12,0.3)] ring-1 ring-[#2A0C0C]/5">
              {milestones.map((item) => (
                <div key={item.label} className="px-4 text-center sm:px-6">
                  <dd className="text-xl font-extrabold tracking-tight text-primary sm:text-2xl">{item.value}</dd>
                  <dt className="mt-1 text-xs font-medium text-[#7A5C5C] sm:text-[13px]">{item.label}</dt>
                </div>
              ))}
            </dl>
          </AnimateOnView>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-[#2A0C0C] text-white">
        <Wave fill="#FBF6EE" flip className="absolute left-0 top-0 h-16 w-full md:h-24" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_0%_60%,rgba(179,27,27,0.4),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-36 md:px-8 lg:pb-36 lg:pt-44">
          <AnimateOnView className="mb-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <Eyebrow light>{section('values')?.eyebrow ?? 'Our Values'}</Eyebrow>
              <h2 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[44px]">
                {section('values')?.heading ?? 'What We Stand For'}
              </h2>
            </div>
            <p className="max-w-md text-[17px] leading-relaxed text-white/65 lg:justify-self-end">
              The principles that shape every classroom, every lesson and every conversation with our children.
            </p>
          </AnimateOnView>

          <StaggerContainer className="grid gap-5 md:grid-cols-3">
            {displayValues.map(({ id, icon, title, body }, index) => (
              <StaggerItem key={id}>
                <article className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-8 transition hover:border-[#E2B45A]/40 hover:bg-white/[0.07]">
                  <span className="absolute right-6 top-4 text-7xl font-extrabold leading-none text-white/[0.05]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2B45A] text-[#2A0C0C] transition group-hover:scale-110">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  </span>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">{body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        <Wave fill="#FBF6EE" className="absolute bottom-0 left-0 h-16 w-full md:h-24" />
      </section>

      {/* Campus gallery */}
      <section className="bg-[#FBF6EE] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimateOnView className="mb-12">
            <Eyebrow>{gallerySection?.eyebrow ?? 'Campus Life'}</Eyebrow>
            <h2 className="max-w-xl text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
              {gallerySection?.heading ?? 'Life at Brainy Kings & Queens'}
            </h2>
          </AnimateOnView>

          <StaggerContainer className="grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
            {photos.map((photo, index) => (
              <StaggerItem
                key={`${photo.src}-${index}`}
                className={index % 5 === 0 ? 'col-span-2 row-span-2' : ''}
              >
                <figure className="group relative h-full overflow-hidden rounded-[28px] bg-[#EFE3DA]">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  {photo.caption && (
                    <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 px-4 py-2.5 text-sm font-bold text-[#2A0C0C] opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      {teamMembers.length > 0 && (
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <AnimateOnView className="mb-12 text-center">
              <div className="flex justify-center"><Eyebrow>{section('team')?.eyebrow ?? 'Our People'}</Eyebrow></div>
              <h2 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
                {section('team')?.heading ?? 'Meet the team'}
              </h2>
            </AnimateOnView>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <StaggerItem key={member.id}>
                  <article className="group text-center">
                    <div className="relative mx-auto aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[32px] bg-[#FBF6EE]">
                      {member.image_url ? (
                        <Image src={member.image_url} alt={member.alt_text || member.name} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                      ) : (
                        <span className="flex h-full items-center justify-center text-5xl font-extrabold text-[#B31B1B]/30">{member.name.slice(0, 1)}</span>
                      )}
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-[#2A0C0C]">{member.name}</h3>
                    <p className="text-sm font-medium text-primary">{member.role}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <AdmissionsCta
        section={section('cta')}
        phone={settings?.phone}
        className={teamMembers.length > 0 ? 'bg-white' : 'bg-[#FBF6EE]'}
        image="/images/students-uniform-badges.jpeg"
        defaults={{
          eyebrow: 'Admissions Open',
          heading: 'Join Our Royal Community',
          body: 'Enrolment for the upcoming academic year is now open. Give your child the royal start they deserve.',
          label: 'Apply Now',
        }}
      />
    </main>
  )
}
