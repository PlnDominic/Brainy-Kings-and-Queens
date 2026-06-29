'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/admissions', label: 'Admissions' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'py-3 shadow-2xl' : 'py-5'
        }`}
        style={{ background: scrolled ? '#1A0505' : 'transparent' }}
      >
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-sm">
            <div className="w-8 h-8 bg-secondary-container flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-secondary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-label-lg tracking-wide font-headline-md">
                Brainy Kings
              </span>
              <span className="text-secondary-container text-[10px] font-bold uppercase tracking-[0.2em]">
                &amp; Queens
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-xl">
            {links.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative text-label-lg font-bold tracking-wide transition-colors py-1 ${
                    active ? 'text-secondary-container' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary-container" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-md">
            <Link
              href="/admissions"
              className="hidden md:flex bg-secondary-container text-on-secondary-container px-6 py-2 font-label-lg font-bold hover:opacity-90 transition-all active:scale-95 items-center gap-sm"
            >
              Apply Now
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[28px]">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 flex flex-col"
            style={{ background: '#1A0505' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header row */}
            <div className="flex justify-between items-center px-margin-mobile py-5">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 bg-secondary-container flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-secondary text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    school
                  </span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-white font-bold text-label-lg font-headline-md">Brainy Kings</span>
                  <span className="text-secondary-container text-[10px] font-bold uppercase tracking-[0.2em]">&amp; Queens</span>
                </div>
              </div>
              <button
                className="text-white p-1"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-[28px]">close</span>
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col flex-1 justify-center px-margin-mobile gap-lg">
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-md text-headline-lg font-headline-lg transition-colors ${
                      pathname === href ? 'text-secondary-container' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <span className="w-px h-8 bg-white/10" />
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="px-margin-mobile pb-xl">
              <Link
                href="/admissions"
                onClick={() => setMenuOpen(false)}
                className="bg-secondary-container text-on-secondary-container w-full py-4 font-label-lg font-bold flex items-center justify-center gap-sm hover:opacity-90 transition-all"
              >
                Apply for Admission
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
