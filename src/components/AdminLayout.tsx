'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { AuthChangeEvent } from '@supabase/supabase-js'
import { useSupabase } from '@/lib/supabase-context'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = useSupabase()
  const [authorized, setAuthorized] = useState(false)
  const [activeContentTab, setActiveContentTab] = useState('content')

  useEffect(() => {
    const updateActiveTab = () => {
      setActiveContentTab(new URLSearchParams(window.location.search).get('tab') || 'content')
    }
    updateActiveTab()
    window.addEventListener('popstate', updateActiveTab)
    return () => window.removeEventListener('popstate', updateActiveTab)
  }, [pathname])

  function openContentTab(tab: string) {
    setActiveContentTab(tab)
    router.push(tab === 'content' ? '/admin/content' : `/admin/content?tab=${tab}`)
  }

  useEffect(() => {
    // Skip auth check on the login page itself
    if (pathname === '/admin/login') {
      return
    }

    let mounted = true

    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
        return
      }

      const { data: isCmsAdmin, error } = await supabase.rpc('is_cms_admin')

      if (error || !isCmsAdmin) {
        await supabase.auth.signOut()
        router.push('/admin/login')
        return
      }

      if (mounted) {
        setAuthorized(true)
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === 'SIGNED_OUT') {
        router.push('/admin/login')
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [pathname, router, supabase])

  // Show loading state while checking auth
  if (pathname !== '/admin/login' && !authorized) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-md">
          <span className="material-symbols-outlined text-[48px] text-primary animate-spin">sync</span>
          <p className="text-body-lg text-on-surface-variant">Verifying access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full bg-secondary-container flex flex-col md:min-h-screen md:w-64 md:pt-16">
        <div className="px-4 py-3 border-b border-outline-variant/50">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 bg-secondary flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-secondary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-primary font-bold text-xs font-headline-md">
                Brainy Kings
              </span>
              <span className="text-secondary-container text-[9px] font-bold uppercase tracking-[0.2em]">
                & Queens
              </span>
            </div>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2 px-2 py-2 md:flex md:flex-1 md:flex-col md:py-0">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-colors ${
              pathname === '/admin/dashboard' ? 'bg-primary text-on-primary' : 'text-on-surface/60 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">dashboard</span>
            Dashboard
          </button>

          <button
            onClick={() => openContentTab('content')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-colors ${
              pathname?.startsWith('/admin/content') && activeContentTab === 'content' ? 'bg-primary text-on-primary' : 'text-on-surface/60 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">article</span>
            Content Management
          </button>

          <button
            onClick={() => openContentTab('inquiries')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-colors ${
              pathname?.startsWith('/admin/content') && activeContentTab === 'inquiries' ? 'bg-primary text-on-primary' : 'text-on-surface/60 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">inbox</span>
            Admissions Inquiries
          </button>

          <button
            onClick={() => openContentTab('media')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-colors ${
              pathname?.startsWith('/admin/content') && activeContentTab === 'media' ? 'bg-primary text-on-primary' : 'text-on-surface/60 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">image</span>
            Media Library
          </button>

          <button
            onClick={() => openContentTab('settings')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-colors ${
              pathname?.startsWith('/admin/content') && activeContentTab === 'settings' ? 'bg-primary text-on-primary' : 'text-on-surface/60 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">settings</span>
            Site Settings
          </button>

          <button
            onClick={() => {
              void supabase.auth.signOut()
              router.push('/admin/login')
              router.refresh()
            }}
            className="flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-500/10 md:mt-auto"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-md md:p-6 md:pt-20">
        {children}
      </main>
    </div>
  )
}