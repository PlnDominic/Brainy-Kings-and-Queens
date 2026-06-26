import type { Metadata } from 'next'
import AnimateOnView from '@/components/AnimateOnView'
import AdmissionsForm from '@/components/AdmissionsForm'

export const metadata: Metadata = {
  title: 'Admissions | Brainy Kings & Queens Montessori',
}

export default function AdmissionsPage() {
  return (
    <>
      {/* Hero Strip */}
      <div className="bg-primary pt-[100px] pb-lg px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1440px] mx-auto">
          <AnimateOnView>
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 text-label-sm font-bold uppercase tracking-wider mb-md">
              Begin the Journey
            </span>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-primary mb-xs mt-md">
              Admission Inquiry
            </h2>
            <p className="text-body-md text-on-primary/75">
              Complete the form below and our team will reach out within 24 hours.
            </p>
          </AnimateOnView>
        </div>
      </div>

      <main className="pb-xl px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        <AdmissionsForm />
      </main>
    </>
  )
}
