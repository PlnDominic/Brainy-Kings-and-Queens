import Image from 'next/image'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import StatBar from '@/components/StatBar'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'

const bentoCards = [
  {
    span: 'col-span-12 md:col-span-7',
    bg: 'bg-primary-container text-on-primary-container',
    icon: 'psychology',
    title: 'Independent Learning',
    body: 'Our classrooms are meticulously prepared to encourage self-directed activity, hands-on learning, and collaborative play.',
    large: true,
  },
  {
    span: 'col-span-12 md:col-span-5',
    bg: 'bg-secondary-container text-on-secondary-container border border-secondary/10',
    icon: 'groups',
    title: 'Mixed-Age Classrooms',
    body: 'Older children share what they have learned with those who are younger, reinforcing their own knowledge and building leadership.',
  },
  {
    span: 'col-span-12 md:col-span-4',
    bg: 'bg-surface-container-high border border-outline-variant/30 hover:border-primary transition-all group',
    icon: 'brush',
    title: 'Creative Expression',
    body: 'Fostering imagination through art, music, and dramatic play every day.',
    iconClass: 'text-primary group-hover:scale-110 transition-transform inline-block',
  },
  {
    span: 'col-span-12 md:col-span-4',
    bg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    icon: 'nature_people',
    title: 'Nature Connection',
    body: 'Daily outdoor exploration and gardening to understand our environment.',
  },
  {
    span: 'col-span-12 md:col-span-4',
    bg: 'bg-surface-container-lowest shadow-sm border border-outline-variant/50 hover:shadow-md transition-all',
    icon: 'workspace_premium',
    title: 'Practical Life Skills',
    body: 'Developing fine motor skills and confidence through real-world tasks and responsibility.',
    iconClass: 'text-secondary',
  },
]

const gallery = [
  {
    src: '/images/students-group-pavilion.jpeg',
    alt: 'Students gathered at the school pavilion',
    caption: 'Students at the pavilion',
    span: 'sm:col-span-2 sm:row-span-2',
    minH: '300px',
  },
  {
    src: '/images/students-smiling-closeup.jpeg',
    alt: 'Happy students at Brainy Kings and Queens',
    caption: 'Happy learners',
    minH: '220px',
  },
  {
    src: '/images/students-field-trip-bench.jpeg',
    alt: 'Students on a field trip',
    caption: 'Learning beyond the classroom',
    minH: '220px',
  },
  {
    src: '/images/students-bench-outdoor.jpeg',
    alt: 'Students seated outdoors',
    caption: 'Outdoor learning time',
    span: 'sm:col-span-2',
    minH: '220px',
  },
  {
    src: '/images/students-large-group-photo.jpeg',
    alt: 'Large group of students and teachers gathered outdoors',
    caption: 'Our school family',
    span: 'sm:col-span-2',
    minH: '220px',
  },
  {
    src: '/images/students-cultural-day.jpeg',
    alt: 'Students celebrating cultural day in kente attire',
    caption: 'Cultural celebration day',
    minH: '220px',
  },
  {
    src: '/images/student-uniform-portrait.jpeg',
    alt: 'Young student in school uniform ready for class',
    caption: 'Ready to learn',
    minH: '220px',
  },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatBar />

      {/* Montessori Approach Bento Grid */}
      <section className="py-xl bg-surface overflow-hidden">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="mb-xl text-center">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              The Montessori Approach
            </h2>
          </AnimateOnView>

          <StaggerContainer className="bento-grid">
            {/* Large Feature Card */}
            <StaggerItem className="col-span-12 md:col-span-7 bg-primary-container text-on-primary-container p-xl relative overflow-hidden flex flex-col justify-end min-h-[450px] shadow-lg group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 -ml-10 -mb-10 blur-2xl" />
              <div className="relative z-10">
                <span
                  className="material-symbols-outlined text-5xl mb-md"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  psychology
                </span>
                <h4 className="text-headline-md font-headline-md mb-md">Independent Learning</h4>
                <p className="text-body-md opacity-90 max-w-md">
                  Our classrooms are meticulously prepared to encourage self-directed activity,
                  hands-on learning, and collaborative play.
                </p>
              </div>
            </StaggerItem>

            {/* Medium Feature Card */}
            <StaggerItem className="col-span-12 md:col-span-5 bg-secondary-container text-on-secondary-container p-xl shadow-sm flex flex-col justify-center border border-secondary/10">
              <span
                className="material-symbols-outlined text-4xl mb-md text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                groups
              </span>
              <h4 className="text-headline-md font-headline-md mb-md">Mixed-Age Classrooms</h4>
              <p className="text-body-md text-on-surface-variant">
                Older children share what they have learned with those who are younger, reinforcing
                their own knowledge and building leadership.
              </p>
            </StaggerItem>

            {/* Small Feature Card 1 */}
            <StaggerItem className="col-span-12 md:col-span-4 bg-surface-container-high p-lg border border-outline-variant/30 hover:border-primary transition-all group">
              <span
                className="material-symbols-outlined text-primary text-3xl mb-base group-hover:scale-110 transition-transform inline-block"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                brush
              </span>
              <h4 className="text-label-lg font-bold mb-xs">Creative Expression</h4>
              <p className="text-label-sm text-on-surface-variant">
                Fostering imagination through art, music, and dramatic play every day.
              </p>
            </StaggerItem>

            {/* Small Feature Card 2 */}
            <StaggerItem className="col-span-12 md:col-span-4 bg-tertiary-fixed text-on-tertiary-fixed-variant p-lg flex flex-col justify-between">
              <div>
                <span
                  className="material-symbols-outlined text-3xl mb-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  nature_people
                </span>
                <h4 className="text-label-lg font-bold mb-xs">Nature Connection</h4>
              </div>
              <p className="text-label-sm">
                Daily outdoor exploration and gardening to understand our environment.
              </p>
            </StaggerItem>

            {/* Small Feature Card 3 */}
            <StaggerItem className="col-span-12 md:col-span-4 bg-surface-container-lowest p-lg shadow-sm border border-outline-variant/50 hover:shadow-md transition-all">
              <span
                className="material-symbols-outlined text-secondary text-3xl mb-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
              <h4 className="text-label-lg font-bold mb-xs">Practical Life Skills</h4>
              <p className="text-label-sm text-on-surface-variant">
                Developing fine motor skills and confidence through real-world tasks and
                responsibility.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-xl bg-surface-container-low">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView className="mb-xl text-center">
            <h3 className="text-label-lg font-bold text-secondary uppercase tracking-[0.2em] mb-base">
              Campus Life
            </h3>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              Life at Brainy Kings &amp; Queens
            </h2>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-md">
            {gallery.map(({ src, alt, caption, span, minH }) => (
              <div
                key={src}
                className={`overflow-hidden shadow-md gallery-item relative ${span ?? ''}`}
                style={{ minHeight: minH }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="gallery-caption">
                  <span className="text-white font-label-lg">{caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission CTA */}
      <section className="py-xl bg-surface">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
          <AnimateOnView>
            <div className="bg-primary p-xl flex flex-col md:flex-row items-center gap-xl relative overflow-hidden shadow-2xl">
              <div className="absolute -right-24 -top-24 w-80 h-80 bg-white/5 blur-3xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-secondary-container/10 blur-2xl pointer-events-none" />
              <div className="flex-1 text-left relative z-10">
                <h2 className="text-headline-lg font-headline-lg text-on-primary mb-md">
                  Join the Brainy Family
                </h2>
                <p className="text-body-lg text-on-primary/80 mb-lg">
                  Admissions are open for the upcoming academic year. Secure your child&apos;s place
                  in a community that values their unique potential.
                </p>
                <div className="flex flex-wrap gap-md">
                  <Link
                    href="/admissions"
                    className="bg-secondary-container text-on-secondary-container px-8 py-3 font-label-lg font-bold hover:opacity-90 transition-all active:scale-95 inline-block shadow-lg"
                  >
                    Enroll Your Child
                  </Link>
                  <button className="bg-white/10 text-on-primary px-8 py-3 font-label-lg border border-white/30 hover:bg-white/20 transition-all">
                    Download Prospectus
                  </button>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col gap-base bg-white/10 backdrop-blur-sm p-lg relative z-10 min-w-[260px]">
                <div className="flex items-center gap-md border-b border-white/20 pb-md">
                  <div className="w-12 h-12 bg-secondary-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-secondary">call</span>
                  </div>
                  <div>
                    <p className="text-label-sm text-on-primary/60 uppercase tracking-wider">Call Us</p>
                    <a
                      href="tel:0591664392"
                      className="text-label-lg font-bold text-on-primary hover:text-secondary-container transition-colors"
                    >
                      0591664392
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-md pt-base">
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-on-primary">location_on</span>
                  </div>
                  <div>
                    <p className="text-label-sm text-on-primary/60 uppercase tracking-wider">Visit Us</p>
                    <p className="text-label-lg font-bold text-on-primary">Kumasi-Ahodwo</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnView>
        </div>
      </section>
    </>
  )
}
