'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSupabase } from '@/lib/supabase-context'
import { Icon, inputClass, cx } from '@/components/admin/ui'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = useSupabase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('error') === 'unauthorized') {
      setError('This account does not have admin access.')
    }
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // is_cms_admin() is a SECURITY DEFINER function, which avoids RLS recursion on the admins table.
    const { data: isCmsAdmin, error: adminError } = await supabase.rpc('is_cms_admin')
    if (adminError || !isCmsAdmin) {
      await supabase.auth.signOut()
      setError('This account does not have admin access.')
      setLoading(false)
      return
    }

    const requestedPath = new URLSearchParams(window.location.search).get('next')
    const nextPath = requestedPath?.startsWith('/admin/') && !requestedPath.startsWith('/admin/login')
      ? requestedPath
      : '/admin/dashboard'
    router.replace(nextPath)
    router.refresh()
  }

  return (
    <div className="grid min-h-screen bg-[#FCF9F9] lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden overflow-hidden bg-[#2A0C0C] lg:block">
        <Image src="/images/students-large-group-photo.jpeg" alt="" fill sizes="55vw" className="object-cover opacity-50" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0C0C] via-[#2A0C0C]/60 to-[#2A0C0C]/20" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#E04848] to-[#9E1515] shadow-lg shadow-black/30">
              <Icon name="crown" filled className="text-[24px]" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-extrabold">Brainy Kings &amp; Queens</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF9C9C]">Montessori · Kumasi</div>
            </div>
          </Link>
          <div className="max-w-md">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#FF9C9C]">Content Studio</div>
            <p className="text-4xl font-extrabold leading-tight tracking-tight">Tell the school’s story, one page at a time.</p>
            <ul className="mt-8 space-y-3 text-sm text-white/75">
              {[
                ['web', 'Edit every page section in the order visitors see it'],
                ['photo_library', 'Upload photos once, reuse them anywhere'],
                ['inbox', 'Follow up on admissions inquiries the same day'],
              ].map(([icon, text]) => (
                <li key={icon} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10"><Icon name={icon} className="text-[18px]" /></span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"><Icon name="crown" filled className="text-[22px]" /></div>
            <div className="text-base font-extrabold text-[#1F0808]">Brainy Kings &amp; Queens</div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#1F0808]">Welcome back</h1>
          <p className="mt-2 text-[15px] text-[#8C6F6F]">Sign in to manage the school website.</p>

          {error && (
            <div role="alert" className="mt-6 flex items-start gap-2 rounded-xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-3 text-sm text-[#B42318]">
              <Icon name="error" filled className="text-[18px]" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[13px] font-semibold text-[#1F0808]">Email</label>
              <div className="relative">
                <Icon name="mail" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#B39C9C]" />
                <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={cx(inputClass, 'h-11 pl-10')} placeholder="you@brainykings.edu" required disabled={loading} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-[13px] font-semibold text-[#1F0808]">Password</label>
              <div className="relative">
                <Icon name="lock" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#B39C9C]" />
                <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={cx(inputClass, 'h-11 pl-10 pr-10')} placeholder="••••••••" required disabled={loading} />
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#B39C9C] hover:text-[#5C2E2E]">
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[18px]" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-[#9a1717] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <><Icon name="progress_activity" className="animate-spin text-[18px]" />Signing in…</> : <>Sign in<Icon name="arrow_forward" className="text-[18px]" /></>}
            </button>
          </form>

          <Link href="/" className="mt-10 inline-flex items-center gap-1 text-sm font-medium text-[#8C6F6F] hover:text-primary">
            <Icon name="arrow_back" className="text-[16px]" /> Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
