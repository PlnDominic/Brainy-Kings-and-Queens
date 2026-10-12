'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Footer from './Footer'
import { getSupabaseBrowserClient } from '@/lib/supabase-context'
import type { Database } from '@/types/database'

type SiteSettings = Database['public']['Tables']['site_settings']['Row']

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    let active = true
    const supabase = getSupabaseBrowserClient()

    void supabase.from('site_settings').select('*').limit(1).maybeSingle().then(({ data }) => {
      if (active) setSiteSettings(data)
    })

    return () => { active = false }
  }, [pathname])

  // Don't render public website navigation/footer on admin pages
  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer settings={siteSettings} />
    </>
  )
}