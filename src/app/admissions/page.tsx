import type { Metadata } from 'next'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import AdmissionsForm from '@/components/AdmissionsForm'
import PageHero from '@/components/site/PageHero'
import { Eyebrow } from '@/components/home/decor'
import { getAdmissionsSteps, getPageSections, getSiteSettings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Admissions | Brainy Kings & Queens Montessori',
}

export const dynamic = 'force-dynamic'

const steps = [
  { number: '01', icon: 'edit_note', title: 'Submit Inquiry', body: 'Fill out the form below. Our admissions team reads every inquiry personally.' },
  { number: '02', icon: 'fact_check', title: 'Assessment Visit', body: 'We invite your child for a relaxed, play-based assessment: no pressure, just observation.' },
  { number: '03', icon: 'assignment', title: 'Application Review', body: "Our team reviews your child's profile and matches them with the right classroom environment." },
  { number: '04', icon: 'verified', title: 'Enrolment Confirmed', body: 'Receive your official acceptance letter and welcome pack from Brainy Kings & Queens.' },
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

  return (
    <main>
      <PageHero
        image={heroSection?.image_url || '/images/student-uniform-portrait.jpeg'}
        imageAlt="Young student in school uniform ready for class"
        imagePosition="object-top"
        eyebrow={heroSection?.eyebrow ?? 'Admissions Open'}
        heading={heroSection?.heading ?? <>Begin Your Child&apos;s <span className="text-[#E2B45A]">Royal Journey</span></>}
        body={heroSection?.body ?? 'A royal education starts with one step. Complete the inquiry form below and our team will reach out within 24 hours.'}
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
                      <p className="mt-2 text-[15px] leading-relaxed text-[#6B4A4A]">{body}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
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
