'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/curriculum', label: 'Curriculum' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop transition-all duration-300 ${
          scrolled
            ? 'py-2 shadow-lg backdrop-blur-md'
            : 'py-4 shadow-sm bg-surface'
        }`}
        style={scrolled ? { background: 'rgba(251,250,238,0.93)' } : undefined}
      >
        <Link href="/" className="flex items-center gap-base">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            school
          </span>
          <span className="text-label-lg font-headline-md font-bold text-primary">
            Brainy Kings &amp; Queens
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-lg">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`py-1 px-2 text-label-lg transition-colors ${
                  active
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-md">
          <Link
            href="/admissions"
            className="bg-primary text-on-primary px-6 py-2 font-label-lg hover:bg-primary-container transition-all active:scale-95"
          >
            Apply Now
          </Link>
          <button
            className="md:hidden text-primary"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed top-[72px] left-0 w-full z-40 bg-surface shadow-lg"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col px-margin-mobile py-md gap-sm border-t border-outline-variant">
              {links.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 px-4 text-label-lg transition-colors ${
                      active
                        ? 'text-primary font-bold bg-surface-container'
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
