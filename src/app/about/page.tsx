import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'

export const metadata: Metadata = {
  title: 'About Us | Brainy Kings & Queens Montessori',
}

export default function AboutPage() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-primary-container">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/students-group-pavilion.jpeg"
            alt="Brainy Kings and Queens students at the pavilion"
            fill
            className="object-cover"
            style={{ opacity: 0.25, mixBlendMode: 'overlay' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
        </div>
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 -mr-24 -mt-24 pointer-events-none" />
        <div className="absolute right-24 bottom-0 w-48 h-48 bg-secondary-container/10 mb-8 pointer-events-none" />

        <div className="container mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="max-w-2xl">
            <AnimateOnView>
              <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 text-label-lg font-bold mb-md uppercase tracking-wider">
                Our Heritage
              </span>
              <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-on-primary-container mb-md leading-tight mt-md">
                Nurturing Tomorrow&apos;s <br />
                <span className="text-secondary-fixed">Kings and Queens</span>
              </h1>
              <p className="text-body-lg text-on-primary-container/90 max-w-xl">
                Founded on the principles of dignity, intellectual curiosity, and community, Brainy
                Kings &amp; Queens Montessori provides a royal start to your child&apos;s journey of
                discovery.
              </p>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* Two-Column Heritage & Philosophy */}
      <section className="py-xl bg-surface">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            {/* Left: Heritage Image Cluster */}
            <AnimateOnView variant="fadeLeft" className="relative grid grid-cols-2 gap-md">
              <div className="pt-lg">
                <Image
                  src="/images/students-large-group-photo.jpeg"
                  alt="Students and teachers large group photo"
                  width={400}
                  height={500}
                  className="shadow-xl w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="space-y-md">
                <Image
                  src="/images/students-cultural-day.jpeg"
                  alt="Students celebrating cultural day in kente attire"
                  width={300}
                  height={300}
                  className="shadow-xl w-full aspect-square object-cover"
                />
                <div className="bg-primary p-md shadow-xl text-on-primary">
                  <h3 className="text-headline-md font-headline-md mb-xs">15+ Years</h3>
                  <p className="text-label-sm">Of Academic Excellence &amp; Royal Nurturing</p>
                </div>
              </div>
            </AnimateOnView>

            {/* Right: Philosophy Text */}
            <AnimateOnView variant="fadeRight" className="space-y-lg">
              <div>
                <h2 className="text-headline-lg font-headline-lg text-primary mb-md">
                  Our Royal Philosophy
                </h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  At Brainy Kings &amp; Queens, we believe that every child is born with the innate
                  dignity of a leader and the curiosity of a scientist. Our Montessori-led approach
                  honors this potential by creating an environment where choice is the bridge to
                  mastery.
                </p>
              </div>
              <div className="space-y-md">
                <AnimateOnView delay={0.1}>
                  <div className="flex gap-md items-start p-md bg-surface-container-low border-l-4 border-secondary-container">
                    <div className="bg-secondary-container p-3 flex-shrink-0">
                      <span
                        className="material-symbols-outlined text-secondary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        workspace_premium
                      </span>
                    </div>
                    <div>
                      <h4 className="text-label-lg font-bold text-on-surface">The Crown of Character</h4>
                      <p className="text-body-md text-on-surface-variant">
                        We prioritize emotional intelligence and ethical leadership, ensuring children
                        grow to be compassionate citizens.
                      </p>
                    </div>
                  </div>
                </AnimateOnView>
                <AnimateOnView delay={0.2}>
                  <div className="flex gap-md items-start p-md bg-surface-container-low border-l-4 border-primary-fixed">
                    <div className="bg-primary-fixed p-3 flex-shrink-0">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        auto_awesome
                      </span>
                    </div>
                    <div>
                      <h4 className="text-label-lg font-bold text-on-surface">The Spark of Intellect</h4>
                      <p className="text-body-md text-on-surface-variant">
                        Our curriculum stimulates critical thinking through self-directed exploration
                        and hands-on discovery.
                      </p>
                    </div>
                  </div>
                </AnimateOnView>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* Dual Pillars of Excellence */}
      <section className="py-xl bg-surface-container-low overflow-hidden">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="text-center mb-lg">
            <h2 className="text-headline-lg font-headline-lg text-primary mb-xs">
              Dual Pillars of Excellence
            </h2>
            <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
              The foundation upon which our educational sanctuary is built.
            </p>
          </AnimateOnView>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Pillar 1 */}
            <StaggerItem className="group relative bg-surface-container-lowest p-lg shadow-sm border border-outline-variant">
              <div className="absolute top-0 right-0 w-32 h-32 royal-gradient opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="flex flex-col items-center text-center space-y-md">
                <div className="w-16 h-16 royal-gradient flex items-center justify-center text-on-primary shadow-lg">
                  <span
                    className="material-symbols-outlined text-[32px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    menu_book
                  </span>
                </div>
                <h3 className="text-headline-md font-headline-md text-primary">
                  Academic Distinction
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  Our students consistently outperform national benchmarks, mastering complex concepts
                  in mathematics, linguistics, and the sciences through the refined Montessori method.
                </p>
                <div className="pt-md w-full grid grid-cols-2 gap-sm">
                  <div className="bg-surface-container p-sm">
                    <span className="block text-primary font-bold text-headline-md">1:8</span>
                    <span className="text-label-sm uppercase opacity-70">Teacher Ratio</span>
                  </div>
                  <div className="bg-surface-container p-sm">
                    <span className="block text-primary font-bold text-headline-md">100%</span>
                    <span className="text-label-sm uppercase opacity-70">Literacy Rate</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Pillar 2 */}
            <StaggerItem className="group relative bg-surface-container-lowest p-lg shadow-sm border border-outline-variant">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="flex flex-col items-center text-center space-y-md">
                <div className="w-16 h-16 bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-lg">
                  <span
                    className="material-symbols-outlined text-[32px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
                <h3 className="text-headline-md font-headline-md text-secondary">
                  Holistic Development
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  We cultivate the physical and spiritual well-being of every child through arts,
                  outdoor play, and mindfulness, creating well-rounded kings and queens.
                </p>
                <div className="pt-md w-full grid grid-cols-2 gap-sm">
                  <div className="bg-surface-container p-sm">
                    <span className="block text-secondary font-bold text-headline-md">Daily</span>
                    <span className="text-label-sm uppercase opacity-70">Creative Arts</span>
                  </div>
                  <div className="bg-surface-container p-sm">
                    <span className="block text-secondary font-bold text-headline-md">Nature</span>
                    <span className="text-label-sm uppercase opacity-70">Immersive Study</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-xl">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView>
            <div className="royal-gradient p-xl flex flex-col md:flex-row items-center justify-between gap-lg relative overflow-hidden shadow-2xl">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 pointer-events-none" />
              <div className="absolute left-0 bottom-0 w-64 h-64 bg-white/5 -ml-16 -mb-16 blur-2xl pointer-events-none" />
              <div className="relative z-10 text-center md:text-left space-y-md">
                <h2 className="text-headline-lg font-headline-xl text-on-primary-container">
                  Join Our Royal Community
                </h2>
                <p className="text-body-lg text-on-primary-container/80 max-w-lg">
                  Admissions are open for the upcoming academic year. Secure your child&apos;s place
                  in a community that values their unique potential.
                </p>
                <div className="flex flex-wrap gap-md justify-center md:justify-start pt-md">
                  <Link
                    href="/admissions"
                    className="bg-secondary-container text-on-secondary-container px-8 py-3 font-bold text-label-lg shadow-lg hover:opacity-90 active:scale-95 transition-all inline-block"
                  >
                    Enroll Your Child
                  </Link>
                  <button className="border-2 border-on-primary-container text-on-primary-container px-8 py-3 font-bold text-label-lg hover:bg-on-primary-container/10 transition-all">
                    Download Prospectus
                  </button>
                </div>
              </div>
              <div className="relative z-10 hidden lg:block">
                <div className="w-64 h-64 border-4 border-on-primary-container/20 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[100px] text-on-primary-container/30"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    groups
                  </span>
                </div>
              </div>
            </div>
          </AnimateOnView>
        </div>
      </section>
    </main>
  )
}
