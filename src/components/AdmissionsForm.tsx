'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimateOnView from '@/components/AnimateOnView'
import { getSupabaseBrowserClient } from '@/lib/supabase-context'

type Status = 'idle' | 'loading' | 'success'

const ageOptions = ['2.5 – 5 years (Pre-School)', '6 – 11 years (Primary)', '12 – 15 years (Junior High)']
const referralOptions = [
  { value: 'social_media', label: 'Social Media', icon: 'share' },
  { value: 'referral', label: 'Referral', icon: 'group' },
  { value: 'signage', label: 'Signage', icon: 'signpost' },
]

const inputClass =
  'w-full rounded-2xl border border-[#EADADA] bg-[#FFFCFA] px-4 py-3.5 text-[15px] text-[#2A0C0C] placeholder:text-[#B39C9C] transition focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold text-[#2A0C0C]">{label}</span>
      {children}
    </label>
  )
}

export default function AdmissionsForm({ phone, email, address, hours }: { phone: string; email: string; address: string; hours?: string }) {
  const supabase = getSupabaseBrowserClient()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [parentName, setParentName] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('loading')
    setError('')
    const formData = new FormData(e.currentTarget)

    try {
      const { error: submitError } = await supabase.from('admissions_inquiries').insert({
        parent_name: String(formData.get('parent_name') || ''),
        phone: String(formData.get('phone') || ''),
        email: String(formData.get('email') || ''),
        child_age: String(formData.get('child_age') || ''),
        preferred_start_date: String(formData.get('preferred_start_date') || '') || null,
        referral_source: String(formData.get('referral_source') || '') || null,
      })
      if (submitError) throw submitError
      setParentName(String(formData.get('parent_name') || '').split(' ')[0])
      setStatus('success')
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'We could not send your inquiry. Please try again.')
      setStatus('idle')
    }
  }

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.35fr_1fr]">
      {/* Form */}
      <AnimateOnView variant="fadeLeft">
        <div className="relative overflow-hidden rounded-[32px] bg-white p-6 shadow-[0_30px_80px_-40px_rgba(42,12,12,0.4)] ring-1 ring-[#2A0C0C]/5 sm:p-10">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[480px] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ECFDF3] text-[#16A34A]"
                >
                  <span className="material-symbols-outlined text-[44px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </motion.span>
                <h3 className="mt-6 text-2xl font-extrabold text-[#2A0C0C]">Thank you{parentName ? `, ${parentName}` : ''}!</h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#6B4A4A]">
                  Your inquiry has reached our admissions team. We&apos;ll contact you within 24 hours to arrange your child&apos;s assessment visit.
                </p>
                <a href={`tel:${phone}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2A0C0C] px-6 py-3 text-sm font-bold text-white transition hover:bg-primary">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Can&apos;t wait? Call {phone}
                </a>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0, y: -16 }} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#2A0C0C]">Inquiry form</h3>
                  <p className="mt-1 text-[15px] text-[#7A5C5C]">Take the first step toward a royal education for your child.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Parent's full name">
                    <input className={inputClass} placeholder="e.g. Akosua Mensah" type="text" name="parent_name" autoComplete="name" required />
                  </Field>
                  <Field label="Phone number">
                    <input className={inputClass} placeholder="050 000 0000" type="tel" name="phone" autoComplete="tel" required />
                  </Field>
                </div>

                <Field label="Email address">
                  <input className={inputClass} placeholder="you@example.com" type="email" name="email" autoComplete="email" required />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Child's age">
                    <select name="child_age" required defaultValue="" className={inputClass}>
                      <option value="" disabled>Select age range</option>
                      {ageOptions.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </Field>
                  <Field label="Preferred start date">
                    <input className={inputClass} type="date" name="preferred_start_date" />
                  </Field>
                </div>

                <fieldset>
                  <legend className="mb-2 text-[13px] font-semibold text-[#2A0C0C]">How did you hear about us?</legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {referralOptions.map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input type="radio" name="referral_source" value={option.value} className="peer sr-only" />
                        <span className="flex items-center gap-2 rounded-2xl border border-[#EADADA] px-4 py-3 text-sm font-semibold text-[#5C2E2E] transition peer-checked:border-primary peer-checked:bg-[#FFF3F3] peer-checked:text-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary/15 hover:border-primary/40">
                          <span className="material-symbols-outlined text-[18px]">{option.icon}</span>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {error && (
                  <p role="alert" className="flex items-start gap-2 rounded-2xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-3 text-sm text-[#B42318]">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary text-[15px] font-bold text-white shadow-[0_15px_40px_-15px_rgba(179,27,27,0.8)] transition hover:bg-[#9a1717] disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                      Sending…
                    </>
                  ) : (
                    <>
                      Submit inquiry
                      <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-[#A88B8B]">We only use your details to respond to your inquiry.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </AnimateOnView>

      {/* Contact + map */}
      <AnimateOnView variant="fadeRight" className="flex flex-col gap-6">
        <div className="relative overflow-hidden rounded-[32px] bg-[#2A0C0C] p-7 text-white sm:p-8">
          <div className="relative">
            <h3 className="text-xl font-extrabold">Prefer to talk?</h3>
            <p className="mt-1 text-sm text-white/60">Our admissions team is happy to help.</p>
            <ul className="mt-6 space-y-3">
              {[
                { icon: 'call', label: 'Phone', value: phone, href: `tel:${phone}` },
                { icon: 'mail', label: 'Email', value: email, href: `mailto:${email}` },
                ...(hours ? [{ icon: 'schedule', label: 'Office hours', value: hours, href: undefined }] : []),
              ].map((item) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E2B45A] text-[#2A0C0C]">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-white/50">{item.label}</span>
                      <span className="block break-words font-semibold">{item.value}</span>
                    </span>
                  </>
                )
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} className="flex items-center gap-4 rounded-2xl bg-white/[0.06] p-3 transition hover:bg-white/[0.12]">{content}</a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl bg-white/[0.06] p-3">{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_-40px_rgba(42,12,12,0.4)] ring-1 ring-[#2A0C0C]/5">
          <iframe
            title="Map showing Brainy Kings & Queens Montessori"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full border-0 grayscale-[30%]"
          />
          <div className="flex items-start gap-3 p-5">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
            <div className="min-w-0">
              <p className="font-bold text-[#2A0C0C]">Visit our campus</p>
              <p className="text-sm text-[#7A5C5C]">{address}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
              >
                Get directions
                <span className="material-symbols-outlined text-[16px]">north_east</span>
              </a>
            </div>
          </div>
        </div>
      </AnimateOnView>
    </div>
  )
}
