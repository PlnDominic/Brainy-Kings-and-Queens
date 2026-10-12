import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import PageHero from '@/components/site/PageHero'
import AdmissionsCta from '@/components/home/AdmissionsCta'
import { Crown, Eyebrow, Sparkle, Wave } from '@/components/home/decor'
import { getPageSections, getPrinciples, getPrograms, getSiteSettings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Curriculum | Brainy Kings & Queens Montessori',
}

export const dynamic = 'force-dynamic'

const programs = [
  {
    number: '01', level: 'Pre-School', age: 'Ages 2.5 – 5', tagline: 'The Prepared Environment',
    description: 'Montessori materials build fine motor skills, self-regulation, and early literacy.',
    subjects: ['Sensorial Learning', 'Practical Life Skills', 'Phonetic Reading', 'Basic Mathematics', 'Emotional Self-Regulation'],
    icon: 'child_care', image: '/images/students-preschool-standing.jpeg',
  },
  {
    number: '02', level: 'Primary', age: 'Grades 1 – 6', tagline: 'Growing Minds',
    description: 'From the Great Lessons to leadership projects, raising confident, curious thinkers.',
    subjects: ['Literacy & Creative Writing', 'Mathematics & Sciences', 'Computational Thinking', 'Public Speaking & Debate', 'Research & Leadership Projects'],
    icon: 'auto_stories', image: '/images/students-classroom-fun.jpeg',
  },
  {
    number: '03', level: 'Junior High', age: 'JHS 1 – 3', tagline: 'Excellence & Achievement',
    description: 'Core subjects, critical thinking, and BECE preparation for secondary success.',
    subjects: ['English Language & Literature', 'Mathematics & Integrated Science', 'ICT & Computing', 'Social & Civic Studies', 'BECE Examination Preparation'],
    icon: 'military_tech', image: '/images/students-teacher-outdoor.jpeg',
  },
]

const principles = [
  { icon: 'psychology', title: 'Child-Led Discovery', body: 'Children choose their work, building intrinsic motivation and deep understanding.' },
  { icon: 'diversity_3', title: 'Mixed-Age Groups', body: 'Older students mentor younger ones: the most powerful form of learning.' },
  { icon: 'palette', title: 'Hands-On Materials', body: 'Montessori materials are self-correcting: children see their own errors and fix them.' },
  { icon: 'public', title: 'Cosmic Education', body: 'Every subject connects to a larger story: how humans and the universe are one.' },
]

export default async function CurriculumPage() {
  const [cmsPrograms, cmsPrinciples, pageSections, settings] = await Promise.all([
    getPrograms(),
    getPrinciples(),
    getPageSections('curriculum'),
    getSiteSettings(),
  ])
  const displayPrograms = cmsPrograms.length
    ? cmsPrograms.map((program) => ({
        id: program.id, number: program.number, level: program.level, age: program.age_range, tagline: program.tagline,
        description: program.description, subjects: program.features, icon: program.icon, image: program.image_url,
      }))
    : programs.map((program) => ({ ...program, id: program.level }))
  const displayPrinciples = cmsPrinciples.length
    ? cmsPrinciples
    : principles.map((principle) => ({ ...principle, id: principle.title }))
  const section = (key: string) => pageSections.find((item) => item.section_key === key)
  const heroSection = section('hero')
  const principlesSection = section('principles')
  const programsSection = section('programs')
  const quoteSection = section('quote')

  return (
    <main>
      <PageHero
        image={heroSection?.image_url || '/images/school-building.jpeg'}
        imageAlt="Brainy Kings and Queens school campus"
        eyebrow={heroSection?.eyebrow ?? 'Academic Programs'}
        heading={heroSection?.heading ?? <>A Royal Path <span className="text-[#E2B45A]">Through Every Stage</span></>}
        body={heroSection?.body ?? 'Our Montessori-inspired curriculum blends rigorous academic standards with the dignity of self-paced exploration, from age 2.5 through JHS 3.'}
        highlights={displayPrograms.slice(0, 4).map((program) => ({ icon: program.icon, label: program.level }))}
      />

      {/* Principles */}
      <section className="bg-[#FBF6EE] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimateOnView className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow>{principlesSection?.eyebrow ?? 'The Brainy Way'}</Eyebrow>
              <h2 className="max-w-xl text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
                {principlesSection?.heading ?? 'Four Principles That Guide Every Lesson'}
              </h2>
            </div>
            <p className="max-w-md text-[17px] leading-relaxed text-[#6B4A4A] lg:justify-self-end">
              {principlesSection?.body ?? 'A philosophy that respects the child as a natural learner. Every classroom decision flows from these four commitments.'}
            </p>
          </AnimateOnView>

          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {displayPrinciples.map(({ id, icon, title, body }, index) => (
              <StaggerItem key={id}>
                <article className="group relative h-full overflow-hidden rounded-[28px] bg-white p-7 shadow-[0_20px_50px_-35px_rgba(42,12,12,0.35)] ring-1 ring-[#2A0C0C]/5 transition hover:-translate-y-1.5">
                  <div className="mb-10 flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBEAEA] text-primary transition group-hover:bg-primary group-hover:text-white">
                      <span className="material-symbols-outlined text-[28px]">{icon}</span>
                    </span>
                    <span className="text-sm font-extrabold text-[#D4BFBF]">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2A0C0C]">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6B4A4A]">{body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Programme journey */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimateOnView className="mx-auto mb-16 max-w-2xl text-center">
            <div className="flex justify-center"><Eyebrow>{programsSection?.eyebrow ?? 'Curriculum Detail'}</Eyebrow></div>
            <h2 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
              {programsSection?.heading ?? 'What Your Child Will Learn'}
            </h2>
          </AnimateOnView>

          <div className="space-y-20 lg:space-y-28">
            {displayPrograms.map((program, index) => {
              const flip = index % 2 === 1
              return (
                <div key={program.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                  <AnimateOnView variant={flip ? 'fadeRight' : 'fadeLeft'} className={`relative ${flip ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[40px] shadow-[0_30px_60px_-30px_rgba(42,12,12,0.45)]">
                      <Image src={program.image} alt={`${program.level} students at Brainy Kings & Queens`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <span className="absolute bottom-5 left-6 text-[96px] font-extrabold leading-none text-white/30">{program.number}</span>
                    </div>
                    <div className={`absolute -top-5 ${flip ? 'left-6' : 'right-6'} rounded-full bg-[#E2B45A] px-5 py-2.5 text-sm font-bold text-[#2A0C0C] shadow-lg`}>
                      {program.age}
                    </div>
                  </AnimateOnView>

                  <AnimateOnView variant={flip ? 'fadeLeft' : 'fadeRight'}>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2A0C0C] text-[#E2B45A]">
                        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{program.icon}</span>
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{program.tagline}</span>
                    </div>
                    <h3 className="text-[32px] font-extrabold tracking-tight text-[#2A0C0C] sm:text-[40px]">{program.level}</h3>
                    <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-[#6B4A4A]">{program.description}</p>
                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {program.subjects.map((subject) => (
                        <li key={subject} className="flex items-center gap-3 rounded-2xl bg-[#FBF6EE] px-4 py-3 text-[15px] font-medium text-[#4A2A2A]">
                          <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          {subject}
                        </li>
                      ))}
                    </ul>
                    <Link href="/admissions" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#2A0C0C] py-2 pl-7 pr-2 text-[15px] font-bold text-white transition hover:bg-primary">
                      Enrol for {program.level}
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2B45A] text-[#2A0C0C] transition-transform group-hover:translate-x-0.5">
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </span>
                    </Link>
                  </AnimateOnView>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative overflow-hidden bg-[#2A0C0C] text-white">
        <Wave fill="#FFFFFF" flip className="absolute left-0 top-0 h-16 w-full md:h-24" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_100%_50%,rgba(179,27,27,0.45),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-28 pt-36 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:pb-36 lg:pt-44">
          <AnimateOnView>
            <span className="material-symbols-outlined text-[64px] text-[#E2B45A]" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <blockquote className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[44px]">
              {quoteSection?.heading ?? 'The child is both a hope and a promise for mankind.'}
            </blockquote>
            <cite className="mt-6 flex items-center gap-3 text-sm font-bold uppercase not-italic tracking-[0.24em] text-[#E2B45A]">
              <span className="h-px w-10 bg-[#E2B45A]" />
              {quoteSection?.eyebrow ?? 'Maria Montessori'}
            </cite>
            <p className="mt-10 max-w-xl text-[17px] leading-relaxed text-white/65">
              {quoteSection?.body ?? 'This is the spirit that drives every lesson at Brainy Kings & Queens. We do not teach children what to think. We create the conditions for them to discover how to think.'}
            </p>
          </AnimateOnView>
          <AnimateOnView variant="fadeRight" className="relative mx-auto hidden w-full max-w-[380px] lg:block">
            <Crown className="absolute -top-14 left-1/2 h-10 w-14 -translate-x-1/2" />
            <div className="absolute inset-0 -translate-x-5 translate-y-5 rounded-t-[999px] rounded-b-[40px] border-2 border-[#E2B45A]/50" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[40px]">
              <Image src={quoteSection?.image_url || '/images/students-classroom-primary.jpeg'} alt="Primary students learning in the classroom" fill sizes="380px" className="object-cover" />
            </div>
            <Sparkle className="absolute -right-4 top-1/3 h-6 w-6" />
          </AnimateOnView>
        </div>
        <Wave fill="#FFFFFF" className="absolute bottom-0 left-0 h-16 w-full md:h-24" />
      </section>

      <AdmissionsCta
        section={section('cta')}
        phone={settings?.phone}
        className="bg-white pt-10"
        image="/images/students-classroom-fun-2.jpeg"
        defaults={{
          eyebrow: 'Start the Journey',
          heading: "Secure Your Child's Place Today",
          body: 'Enrolment for the upcoming academic year is now open. Join a community that believes every child deserves a royal education.',
          label: 'Apply Now',
        }}
      />
    </main>
  )
}
