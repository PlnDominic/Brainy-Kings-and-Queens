'use client'

import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { AuthChangeEvent } from '@supabase/supabase-js'
import { useSupabase } from '@/lib/supabase-context'
import { collections, pages } from './config'
import { FeedbackProvider, Icon, cx } from './ui'

type NavItem = { href: string; label: string; icon: string; badge?: number; match?: (path: string) => boolean }

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || ''
  const router = useRouter()
  const supabase = useSupabase()
  const [email, setEmail] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [newInquiries, setNewInquiries] = useState(0)

  useEffect(() => {
    let mounted = true

    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/admin/login')
        return
      }
      const { data: isCmsAdmin, error } = await supabase.rpc('is_cms_admin')
      if (error || !isCmsAdmin) {
        await supabase.auth.signOut()
        router.replace('/admin/login?error=unauthorized')
        return
      }
      if (!mounted) return
      setEmail(user.email || '')
      setAuthorized(true)

      const since = new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
      const { count } = await supabase.from('admissions_inquiries').select('id', { count: 'exact', head: true }).gte('created_at', since)
      if (mounted) setNewInquiries(count || 0)
    }

    void checkAuth()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === 'SIGNED_OUT') router.replace('/admin/login')
    })
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router, supabase])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  async function signOut() {
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FCF9F9]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
            <Icon name="crown" filled className="text-[28px]" />
          </div>
          <div className="flex items-center gap-2 text-sm text-[#8C6F6F]">
            <Icon name="progress_activity" className="animate-spin text-[18px]" /> Verifying access…
          </div>
        </div>
      </div>
    )
  }

  const navItems: NavItem[] = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'space_dashboard' },
    { href: '/admin/pages', label: 'Website pages', icon: 'web', match: (path) => path.startsWith('/admin/pages') || path.startsWith('/admin/collections') },
    { href: '/admin/inquiries', label: 'Inquiries', icon: 'inbox', badge: newInquiries },
    { href: '/admin/media', label: 'Photos', icon: 'perm_media' },
    { href: '/admin/settings', label: 'Contact details', icon: 'tune' },
  ]

  const isActive = (item: NavItem) => item.match ? item.match(pathname) : pathname === item.href || pathname.startsWith(`${item.href}/`)

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link href="/admin/dashboard" className="flex items-center gap-3 px-5 pb-6 pt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E04848] to-[#9E1515] text-white shadow-md shadow-primary/30">
          <Icon name="crown" filled className="text-[22px]" />
        </div>
        <div className="leading-tight">
          <div className="text-[15px] font-extrabold text-[#1F0808]">Brainy Kings</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Content Studio</div>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 pb-6 [scrollbar-width:thin]">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cx(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition',
                    active ? 'bg-[#FBEAEA] text-primary' : 'text-[#5C2E2E] hover:bg-[#F7EFEF] hover:text-[#1F0808]',
                  )}
                >
                  <Icon name={item.icon} filled={active} className={cx('text-[20px]', active ? 'text-primary' : 'text-[#B39C9C] group-hover:text-[#5C2E2E]')} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge ? <span className="min-w-[20px] rounded-full bg-primary px-1.5 text-center text-[11px] font-bold text-white">{item.badge}</span> : null}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-[#F1E6E6] p-3">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2A0C0C] text-sm font-bold uppercase text-white">
            {email.slice(0, 1) || 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-[#1F0808]">{email || 'Administrator'}</div>
            <div className="text-[11px] text-[#A88B8B]">Administrator</div>
          </div>
          <button type="button" onClick={signOut} aria-label="Sign out" title="Sign out" className="rounded-lg p-2 text-[#A88B8B] transition hover:bg-[#F7EFEF] hover:text-primary">
            <Icon name="logout" className="text-[18px]" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <FeedbackProvider>
      <div className="min-h-screen bg-[#FCF9F9] font-body-md text-on-surface">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[#EFE3E3] bg-white lg:block">{sidebar}</aside>

        {menuOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
            <aside className="relative h-full w-72 max-w-[85vw] bg-white shadow-2xl animate-[cms-slide_.2s_ease-out]">{sidebar}</aside>
          </div>
        )}

        <div className="lg:pl-64">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[#EFE3E3] bg-[#FCF9F9]/85 px-4 backdrop-blur-md sm:px-8">
            <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="rounded-lg p-2 text-[#5C2E2E] hover:bg-[#F4ECEC] lg:hidden">
              <Icon name="menu" className="text-[22px]" />
            </button>
            <Breadcrumbs pathname={pathname} />
            <div className="ml-auto flex items-center gap-2">
              <Link href="/admin/inquiries" className="relative rounded-lg p-2 text-[#5C2E2E] hover:bg-[#F4ECEC]" aria-label="Inquiries">
                <Icon name="notifications" className="text-[22px]" />
                {newInquiries > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-[#FCF9F9]" />}
              </Link>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#2A0C0C] px-3 text-[13px] font-semibold text-white transition hover:bg-[#3A1414]"
              >
                <Icon name="language" className="text-[18px]" />
                <span className="hidden sm:inline">View website</span>
              </a>
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-10">{children}</main>
        </div>
      </div>
    </FeedbackProvider>
  )
}

function Breadcrumbs({ pathname }: { pathname: string }) {
  const parts = pathname.replace(/^\/admin\/?/, '').split('/').filter(Boolean)
  const labels: Record<string, string> = {
    dashboard: 'Dashboard', pages: 'Website pages', collections: 'Website pages', inquiries: 'Inquiries', media: 'Photos', settings: 'Contact details',
  }
  const leaf = (part: string) =>
    pages.find((page) => page.key === part)?.label || collections.find((item) => item.key === part)?.label || labels[part] || part
  return (
    <ol className="flex min-w-0 items-center gap-1.5 text-sm">
      <li className="hidden text-[#A88B8B] sm:block">Studio</li>
      {parts.map((part, index) => (
        <li key={part} className={cx('min-w-0 items-center gap-1.5', index < parts.length - 1 ? 'hidden sm:flex' : 'flex')}>
          <span className="hidden sm:inline-flex"><Icon name="chevron_right" className="text-[16px] text-[#C9B3B3]" /></span>
          <span className={cx('truncate', index === parts.length - 1 ? 'font-semibold text-[#1F0808]' : 'text-[#A88B8B]')}>{leaf(part)}</span>
        </li>
      ))}
    </ol>
  )
}
