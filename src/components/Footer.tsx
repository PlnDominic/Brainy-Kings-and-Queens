import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/admissions', label: 'Admissions' },
]

const socials = [
  { icon: 'social_leaderboard', label: 'Facebook' },
  { icon: 'photo_camera', label: 'Instagram' },
  { icon: 'alternate_email', label: 'Email' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#1A0505' }}>
      {/* Gold top accent */}
      <div className="h-[3px] bg-secondary-container" />

      <div className="container mx-auto px-margin-mobile md:px-margin-desktop pt-xl pb-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">

          {/* Brand — 5 cols */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-sm mb-lg">
              <div className="w-10 h-10 bg-secondary-container flex items-center justify-center flex-shrink-0">
                <span
                  className="material-symbols-outlined text-secondary text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  school
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-headline-md font-headline-md">
                  Brainy Kings
                </span>
                <span className="text-secondary-container text-[11px] font-bold uppercase tracking-[0.25em]">
                  &amp; Queens Montessori
                </span>
              </div>
            </div>

            <p className="text-white/50 text-body-lg leading-relaxed mb-lg max-w-sm">
              Kumasi&apos;s most trusted Montessori school. Empowering children to think, lead,
              and leave their mark since 2010.
            </p>

            <div className="flex gap-sm">
              {socials.map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:border-secondary-container hover:text-secondary-container transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Navigate — 2 cols */}
          <div className="md:col-span-2">
            <h4 className="text-label-sm font-bold text-white uppercase tracking-[0.25em] mb-lg">
              Navigate
            </h4>
            <nav className="flex flex-col gap-md">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-white/50 hover:text-secondary-container transition-colors text-label-lg flex items-center gap-sm group"
                >
                  <span className="w-4 h-px bg-white/15 group-hover:w-6 group-hover:bg-secondary-container transition-all duration-200" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact — 4 cols */}
          <div className="md:col-span-4">
            <h4 className="text-label-sm font-bold text-white uppercase tracking-[0.25em] mb-lg">
              Contact Us
            </h4>
            <div className="flex flex-col gap-md">
              <a href="tel:0591664392" className="group flex items-start gap-md">
                <span
                  className="material-symbols-outlined text-[18px] text-secondary-container mt-px flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  call
                </span>
                <span className="text-white/50 group-hover:text-white transition-colors text-label-lg">
                  0591664392
                </span>
              </a>
              <div className="flex items-start gap-md">
                <span
                  className="material-symbols-outlined text-[18px] text-secondary-container mt-px flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
                <span className="text-white/50 text-label-lg leading-relaxed">
                  Kumasi-Ahodwo, Adjacent the Royal Golf Course,
                  <br />
                  Ashanti Region, Ghana
                </span>
              </div>
              <div className="flex items-start gap-md">
                <span
                  className="material-symbols-outlined text-[18px] text-secondary-container mt-px flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  schedule
                </span>
                <span className="text-white/50 text-label-lg">
                  Mon – Fri: 7:00 AM – 4:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-xl pt-lg flex flex-col sm:flex-row justify-between items-center gap-sm">
          <p className="text-label-sm text-white/25">
            &copy; 2026 Brainy Kings &amp; Queens Montessori. All rights reserved.
          </p>
          <a href="#" className="text-label-sm text-white/25 hover:text-white/50 transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
