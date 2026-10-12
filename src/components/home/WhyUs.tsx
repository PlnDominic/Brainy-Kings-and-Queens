import Image from 'next/image'
import Link from 'next/link'
import AnimateOnView from '@/components/AnimateOnView'
import StaggerContainer from '@/components/StaggerContainer'
import StaggerItem from '@/components/StaggerItem'
import { Crown, Eyebrow, Sparkle, Wave } from './decor'

const reasons = [
  { icon: 'menu_book', title: 'Montessori curriculum', body: 'Hands-on materials and self-paced learning that build real understanding.' },
  { icon: 'diversity_1', title: 'Small classes', body: 'A 1:8 teacher to student ratio, so every child is seen and heard.' },
  { icon: 'verified_user', title: 'Safe & secure campus', body: 'A calm, caring environment where children feel at home.' },
  { icon: 'workspace_premium', title: 'Qualified teachers', body: 'Trained, passionate educators who guide rather than lecture.' },
  { icon: 'forest', title: 'Learning beyond walls', body: 'Field trips and outdoor play that turn curiosity into discovery.' },
  { icon: 'palette', title: 'Culture & creativity', body: 'Cultural days, arts and music that celebrate who our children are.' },
]

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-[#2A0C0C] text-white">
      <Wave fill="#FFFFFF" flip className="absolute left-0 top-0 h-16 w-full md:h-24" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_100%_50%,rgba(179,27,27,0.45),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-28 pt-36 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:pb-36 lg:pt-44">
        <div>
          <AnimateOnView>
            <Eyebrow light>Why families choose us</Eyebrow>
            <h2 className="max-w-xl text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[44px]">
              An education <span className="text-[#E2B45A]">fit for royalty</span>
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/65">
              Everything at Brainy Kings &amp; Queens is designed around one belief: children thrive when they are respected, challenged and loved.
            </p>
          </AnimateOnView>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <StaggerItem key={reason.title}>
                <div className="group h-full rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#E2B45A]/40 hover:bg-white/[0.07]">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E2B45A] text-[#2A0C0C] transition group-hover:scale-110">
                      <span className="material-symbols-outlined text-[22px]">{reason.icon}</span>
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold">{reason.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">{reason.body}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnView className="mt-10">
            <Link href="/admissions" className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-[15px] font-bold text-[#2A0C0C] transition hover:bg-[#E2B45A]">
              Book a school visit
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2A0C0C] text-[#E2B45A] transition-transform group-hover:translate-x-0.5">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </span>
            </Link>
          </AnimateOnView>
        </div>

        <AnimateOnView variant="fadeRight" className="relative mx-auto hidden w-full max-w-[400px] lg:block">
          <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-t-[999px] rounded-b-[40px] border-2 border-[#E2B45A]/50" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[40px]">
            <Image src="/images/student-uniform-portrait.jpeg" alt="A proud Brainy Kings & Queens student" fill sizes="400px" className="object-cover" />
          </div>
          <Crown className="absolute -top-14 left-1/2 h-10 w-14 -translate-x-1/2" />
          <Sparkle className="absolute -left-6 top-1/3 h-6 w-6" />
          <div className="absolute -left-10 bottom-14 rounded-2xl bg-white px-5 py-4 text-[#2A0C0C] shadow-2xl">
            <div className="text-2xl font-extrabold">1:8</div>
            <div className="text-xs font-semibold text-[#8C6F6F]">teacher to student ratio</div>
          </div>
        </AnimateOnView>
      </div>

      <Wave fill="#FBF6EE" className="absolute bottom-0 left-0 h-16 w-full md:h-24" />
    </section>
  )
}
