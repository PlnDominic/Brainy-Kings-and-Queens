import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-primary">
      <div className="px-margin-mobile md:px-margin-desktop py-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-base mb-md">
              <span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
              <span className="text-headline-md font-headline-md font-bold text-primary">
                Brainy Kings &amp; Queens
              </span>
            </div>
            <p className="text-body-md text-on-surface-variant mb-lg leading-relaxed">
              The preferred Montessori school in Kumasi, empowering children to lead and innovate.
            </p>
            <div className="flex gap-sm">
              {[
                { icon: 'social_leaderboard', label: 'Facebook' },
                { icon: 'alternate_email', label: 'Email' },
                { icon: 'photo_camera', label: 'Instagram' },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-label-lg font-bold text-on-surface uppercase tracking-[0.15em] mb-lg">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-md">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/admissions', label: 'Admissions' },
                { href: '/curriculum', label: 'Curriculum' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-on-surface-variant hover:text-primary transition-colors font-label-lg flex items-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    chevron_right
                  </span>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-label-lg font-bold text-on-surface uppercase tracking-[0.15em] mb-lg">
              Get In Touch
            </h3>
            <div className="flex flex-col gap-md">
              <a href="tel:0591664392" className="flex items-center gap-md group">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </div>
                <span className="text-on-surface-variant group-hover:text-primary transition-colors font-label-lg">
                  0591664392
                </span>
              </a>
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 bg-secondary-container flex items-center justify-center text-secondary flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <span className="text-on-surface-variant font-label-lg">
                  Kumasi-Ahodwo, Ashanti Region, Ghana
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-surface-container-low border-t border-outline-variant/30 px-margin-mobile md:px-margin-desktop py-md flex flex-col sm:flex-row justify-between items-center gap-sm">
        <p className="text-label-sm text-on-surface-variant">
          &copy; 2026 Brainy Kings &amp; Queens Montessori. All rights reserved.
        </p>
        <a
          href="#"
          className="text-label-sm text-on-surface-variant hover:text-primary transition-colors underline"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  )
}
