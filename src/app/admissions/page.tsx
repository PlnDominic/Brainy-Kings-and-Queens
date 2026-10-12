import type { Metadata } from 'next'
import Image from 'next/image'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import AdmissionsForm from '@/components/AdmissionsForm'
import PageHero from '@/components/site/PageHero'
import { Eyebrow } from '@/components/home/decor'
import { PhotoPicker } from '@/lib/photos'
import { getAdmissionsSteps, getPageSections, getSiteSettings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Admissions | Brainy Kings & Queens Montessori',
}

export const dynamic = 'force-dynamic'

const steps = [
  { number: '01', icon: 'edit_note', title: 'Submit Inquiry', body: 'Fill in the short form below.' },
  { number: '02', icon: 'fact_check', title: 'Assessment Visit', body: 'A relaxed, play-based visit.' },
  { number: '03', icon: 'assignment', title: 'Application Review', body: 'We find the right classroom.' },
  { number: '04', icon: 'verified', title: 'Enrolment Confirmed', body: 'Your welcome pack arrives.' },
]

/** Preferred photos for the strip above the form, in order. */
const STRIP_PHOTOS = [
  '/images/students-preschool-standing.jpeg',
  '/images/students-uniform-badges.jpeg',
  '/images/students-outdoor-play-1.jpeg',
  '/images/students-smiling-closeup.jpeg',
  '/images/students-preschool-twins.jpeg',
]

export default async function AdmissionsPage() {
  const [cmsSteps, pageSections, siteSettings] = await Promise.all([
    getAdmissionsSteps(),
    getPageSections('admissions'),
    getSiteSettings(),
  ])
  const displaySteps = cmsSteps.length ? cmsSteps : steps.map((step) => ({ ...step, id: step.title }))
  const section = (key: string) => pageSections.find((item) => item.section_key === key)
  const heroSection = section('hero')
  const stepsSection = section('steps')

  // No photo appears twice on this page; the Content Studio hero photo takes priority.
  const picker = new PhotoPicker()
  const heroPhoto = heroSection?.image_url || '/images/student-uniform-portrait.jpeg'
  picker.claim(heroPhoto)
  const stripPhotos = picker.pickMany(STRIP_PHOTOS, 4)

  return (
    <main>
      <PageHero
        image={heroPhoto}
        imageAlt="Young student in school uniform ready for class"
        imagePosition="object-top"
        eyebrow={heroSection?.eyebrow ?? 'Admissions Open'}
        heading={heroSection?.heading ?? <>Begin Your Child&apos;s <span className="text-[#E2B45A]">Royal Journey</span></>}
        body={heroSection?.body ?? 'Send an inquiry and we will reply within 24 hours.'}
        cta={{ label: 'Start your inquiry', href: '#inquiry' }}
        highlights={[{ icon: 'schedule', label: 'Reply within 24 hours' }]}
      />

      {/* Steps */}
      <section className="bg-[#FBF6EE] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimateOnView className="mx-auto mb-16 max-w-2xl text-center">
            <div className="flex justify-center"><Eyebrow>{stepsSection?.eyebrow ?? 'How It Works'}</Eyebrow></div>
            <h2 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
              {stepsSection?.heading ?? 'Four Steps to Enrolment'}
            </h2>
          </AnimateOnView>

          <div className="relative">
            <div className="absolute left-[12%] right-[12%] top-8 hidden border-t-2 border-dashed border-[#E2B45A] lg:block" />
            <StaggerContainer className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displaySteps.map(({ id, number, icon, title, body }, index) => (
                <StaggerItem key={id}>
                  <article className="flex h-full flex-col items-center text-center">
                    <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-lg ring-8 ring-[#FBF6EE] ${index === 0 ? 'bg-primary text-white' : 'bg-[#2A0C0C] text-[#E2B45A]'}`}>
                      <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                    </div>
                    <div className="mt-6 flex h-full w-full flex-col rounded-[28px] bg-white p-6 shadow-[0_20px_50px_-35px_rgba(42,12,12,0.35)] ring-1 ring-[#2A0C0C]/5">
                      <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Step {number}</span>
                      <h3 className="mt-2 text-lg font-bold text-[#2A0C0C]">{title}</h3>
                      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[#6B4A4A]">{body}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="bg-[#FBF6EE] pb-24 lg:pb-32">
        <StaggerContainer className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 md:grid-cols-4 md:px-8">
          {stripPhotos.map((photo, index) => (
            <StaggerItem key={photo}>
              <div className={`relative aspect-[3/4] overflow-hidden rounded-[28px] ${index % 2 === 1 ? 'md:mt-10' : ''}`}>
                <Image src={photo} alt="Students at Brainy Kings & Queens" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-700 hover:scale-105" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Inquiry form */}
      <section id="inquiry" className="scroll-mt-24 overflow-hidden bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimateOnView className="mb-12">
            <Eyebrow>Step One</Eyebrow>
            <h2 className="max-w-xl text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#2A0C0C] sm:text-[44px]">
              Submit Your Inquiry
            </h2>
          </AnimateOnView>
          <AdmissionsForm
            phone={siteSettings?.phone || '0591664392'}
            email={siteSettings?.email || 'admissions@brainykings.edu'}
            address={siteSettings?.address || 'Anwomaso - Ankaa Junction, Kumasi, Ashanti Region, Ghana'}
            hours={siteSettings?.hours || 'Mon – Fri: 7:00 AM – 4:00 PM'}
          />
        </div>
      </section>
    </main>
  )
}
