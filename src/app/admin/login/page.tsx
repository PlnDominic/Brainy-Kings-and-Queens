'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSupabase } from '@/lib/supabase-context'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = useSupabase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('error') === 'unauthorized') {
      setError('Admin access is required.')
    }
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Check if user is admin using is_cms_admin function (avoids RLS recursion)
    const { data: isCmsAdmin, error: adminError } = await supabase.rpc('is_cms_admin')

    if (adminError || !isCmsAdmin) {
      await supabase.auth.signOut()
      setError('Unauthorized: Admin access required')
      setLoading(false)
      return
    }

    const requestedPath = new URLSearchParams(window.location.search).get('next')
    const nextPath = requestedPath?.startsWith('/admin/') && requestedPath !== '/admin/login'
      ? requestedPath
      : '/admin/dashboard'
    router.replace(nextPath)
    router.refresh()
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#1A0505' }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/school-building.jpeg"
          alt="Brainy Kings and Queens campus"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-xl">
        <div className="text-center mb-xl">
          <Link href="/" className="flex items-center justify-center gap-sm mb-lg">
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
                & Queens Montessori
              </span>
            </div>
          </Link>
          <h1 className="text-headline-lg font-headline-lg text-white mb-sm">
            Admin Sign In
          </h1>
          <p className="text-white/50 text-body-lg">
            Access the Content Management System
          </p>
        </div>

        <div className="bg-surface-container-lowest p-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-surface-container-highest">
          {error && (
            <div
              className="bg-red-500/20 border border-red-500/50 text-red-300 p-md rounded-md mb-lg text-label-lg flex items-center gap-sm"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                error
              </span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-lg text-on-surface">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:outline-none px-4 py-3 transition-all"
                placeholder="admin@brainykings.edu"
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-lg text-on-surface">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:outline-none px-4 py-3 transition-all"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-headline-md py-lg shadow-lg flex items-center justify-center gap-base mt-lg transition-all bg-primary text-on-primary hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">sync</span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-lg text-white/40 text-label-lg">
          <Link href="/" className="hover:text-white transition-colors">
            ← Back to Website
          </Link>
        </p>
      </div>
    </div>
  )
}
