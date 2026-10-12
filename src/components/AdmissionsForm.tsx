'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import AnimateOnView from '@/components/AnimateOnView'
import { getSupabaseBrowserClient } from '@/lib/supabase-context'

const steps = [
  { icon: 'edit_note', label: 'Inquiry' },
  { icon: 'fact_check', label: 'Assessment' },
  { icon: 'assignment', label: 'Review' },
  { icon: 'verified', label: 'Enrollment' },
]

type Status = 'idle' | 'loading' | 'success'

export default function AdmissionsForm({ phone, email, address }: { phone: string; email: string; address: string }) {
  const supabase = getSupabaseBrowserClient()
  const [status, setStatus] = useState<Status>('idle')
  const [progressStep, setProgressStep] = useState(0)
  const [error, setError] = useState('')

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
      setStatus('success')
      setProgressStep(3)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'We could not send your inquiry. Please try again.')
      setStatus('idle')
    }
  }

  const progressPct = progressStep === 0 ? '33%' : progressStep === 1 ? '66%' : progressStep === 2 ? '85%' : '100%'

  return (
    <>
      {/* Progress Tracker */}
      <AnimateOnView className="py-lg">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-container-lowest p-lg shadow-sm border border-outline-variant/40">
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-md font-bold">
              Enrollment Steps
            </p>
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-0 w-full h-1 bg-surface-container-highest -translate-y-1/2 z-0" />
              <motion.div
                className="absolute top-5 left-0 h-1 bg-primary -translate-y-1/2 z-0"
                initial={{ width: '33%' }}
                animate={{ width: progressPct }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              {steps.map(({ icon, label }, i) => (
                <div key={label} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center shadow-md transition-colors duration-500 ${
                      i <= progressStep
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-highest text-on-surface-variant border-2 border-outline-variant'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={i <= progressStep ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {icon}
                    </span>
                  </div>
                  <span
                    className={`mt-2 font-label-lg text-center text-xs sm:text-sm ${i <= progressStep ? 'text-primary' : 'text-on-surface-variant'}`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimateOnView>

      {/* Main Content Split */}
      <div className="grid grid-cols-12 gap-gutter items-start">
        {/* Inquiry Form */}
        <AnimateOnView variant="fadeLeft" className="col-span-12 lg:col-span-7">
          <div className="bg-surface-container-lowest p-lg shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-surface-container-highest">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-sm">Inquiry Form</h2>
            <p className="text-body-lg text-on-surface-variant mb-lg">
              Take the first step toward a royal education for your child.
            </p>
            <motion.form
              className="space-y-md"
              onSubmit={handleSubmit}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-lg text-on-surface ml-1">Parent&apos;s Full Name</label>
                  <input
                    className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:outline-none px-4 py-3 transition-all"
                    placeholder="John Doe"
                    type="text"
                    name="parent_name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-lg text-on-surface ml-1">Phone Number</label>
                  <input
                    className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:outline-none px-4 py-3 transition-all"
                    placeholder="050 000 0000"
                    type="tel"
                    name="phone"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex flex-col gap-xs">
                <label className="font-label-lg text-on-surface ml-1">Email Address</label>
                <input
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:outline-none px-4 py-3 transition-all"
                  placeholder="example@email.com"
                  type="email"
                  name="email"
                  required
                />
              </motion.div>

              <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-lg text-on-surface ml-1">Child&apos;s Age</label>
                  <select name="child_age" required className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:outline-none px-4 py-3 transition-all">
                    <option value="">Select age range</option>
                    <option>2 - 3 Years (Pre-K)</option>
                    <option>4 - 5 Years (Primary)</option>
                    <option>6+ Years</option>
                  </select>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-lg text-on-surface ml-1">Preferred Start Date</label>
                  <input
                    className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:outline-none px-4 py-3 transition-all"
                    type="date"
                    name="preferred_start_date"
                  />
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex flex-col gap-xs">
                <label className="font-label-lg text-on-surface ml-1">How did you hear about us?</label>
                <div className="flex flex-wrap gap-sm pt-base">
                  {['Social Media', 'Referral', 'Signage'].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-base px-4 py-2 border-2 border-surface-container-high cursor-pointer hover:border-secondary transition-all"
                    >
                      <input
                        className="text-secondary focus:ring-secondary"
                        name="referral_source"
                        type="radio"
                        value={opt.toLowerCase().replace(' ', '_')}
                      />
                      <span className="text-label-lg">{opt}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {error && <p role="alert" className="border border-error/30 bg-error-container p-md text-on-error-container">{error}</p>}

              <motion.button
                variants={staggerItem}
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full font-headline-md py-lg shadow-lg flex items-center justify-center gap-base mt-lg transition-all ${
                  status === 'success'
                    ? 'bg-green-700 text-white'
                    : 'bg-primary text-on-primary hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1 active:scale-95'
                }`}
              >
                {status === 'idle' && (
                  <>
                    Submit Inquiry
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
                {status === 'loading' && (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    Processing...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    Sent Successfully!
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </AnimateOnView>

        {/* Right: Contact & Location */}
        <AnimateOnView variant="fadeRight" className="col-span-12 lg:col-span-5 flex flex-col gap-gutter">
          {/* Student Portrait */}
          <div className="overflow-hidden shadow-lg h-[320px] relative">
            <Image
              src="/images/student-uniform-portrait.jpeg"
              alt="Young student in school uniform ready for class"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-md">
              <p className="text-on-primary font-label-lg font-bold">
                Ready to learn, ready to lead.
              </p>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-primary p-lg shadow-md flex flex-col gap-md">
            <h3 className="font-headline-md text-headline-md text-on-primary">
              Direct Contact
            </h3>
            <div className="flex flex-col gap-sm">
              <div className="flex items-center gap-md p-sm bg-surface/50">
                <div className="w-12 h-12 bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    call
                  </span>
                </div>
                <div>
                  <p className="text-label-sm font-bold opacity-70">Phone</p>
                  <a
                    href={`tel:${phone}`}
                    className="font-headline-md text-on-primary hover:opacity-70 transition-opacity"
                  >
                    {phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-md p-sm bg-surface/50">
                <div className="w-12 h-12 bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mail
                  </span>
                </div>
                <div>
                  <p className="text-label-sm font-bold opacity-70">Email</p>
                  <a
                    href={`mailto:${email}`}
                    className="font-headline-md text-on-secondary-container hover:opacity-70 transition-opacity break-all"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Location / Map */}
          <div className="relative h-[280px] overflow-hidden shadow-md group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFuMS74OLcIjpgjpWqtpkVUDAU114M_32eH_9b1CCrb_KbFY7yXo4mZ1XCOS30kcA2gVXr6Okx0XZqejyYtKiap4RQ39fYEIdTTCa0LQJT1c3645A5fN_hx5FMpHjHvTVQb_spCQ7C72hHg5yXFS_SlqDvSEZ9ZH4W9VwsDZKDdOHWEMfjG7BUlF5TQ3PM7lgkLt8TKMC894UcClHLJiwzbf8IvbEpLerd3VU9qKMM-8VqVwqQoHjTw5P7lV951FUogdWjemZoYtQ"
              alt="School Location Map, Anwomaso, Kumasi"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-surface p-md shadow-xl border-l-4 border-primary transition-transform group-hover:-translate-y-2">
              <div className="flex items-start gap-sm">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
                <div>
                  <h4 className="font-headline-md text-on-surface">Anwomaso - Ankaa Junction</h4>
                  <p className="text-body-md text-on-surface-variant">
                    {address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnView>
      </div>
    </>
  )
}
