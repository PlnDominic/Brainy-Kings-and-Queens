'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Sparkle } from './decor'

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1400, 1)
      setCount(Math.round(to * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, to])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { icon: 'emoji_events', value: 15, suffix: '+', label: 'Years of excellence' },
  { icon: 'groups', value: 250, suffix: '+', label: 'Happy students' },
  { icon: 'diversity_1', display: '1:8', label: 'Teacher to student ratio' },
  { icon: 'workspace_premium', value: 100, suffix: '%', label: 'Qualified staff' },
]

export default function Stats() {
  return (
    <section className="relative z-10 bg-[#FBF6EE] px-5 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto -mt-24 grid max-w-6xl items-center gap-8 rounded-[32px] bg-white p-6 shadow-[0_30px_80px_-30px_rgba(42,12,12,0.35)] ring-1 ring-[#2A0C0C]/5 sm:p-8 lg:grid-cols-[auto_1fr] lg:gap-12 lg:p-10"
      >
        <div className="flex items-center gap-5">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-[#FBEAD3] sm:h-28 sm:w-28">
            <Image src="/images/students-smiling-closeup.jpeg" alt="Smiling Brainy Kings & Queens students" fill sizes="112px" className="object-cover" />
          </div>
          <div>
            <Sparkle className="mb-2 h-4 w-4" />
            <p className="max-w-[220px] text-2xl font-extrabold leading-tight tracking-tight text-[#2A0C0C]">
              Every child is unique &amp; <span className="text-primary">royal</span>
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:border-l lg:border-[#F0E4E4] lg:pl-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBEAEA] text-primary">
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </span>
              <dd className="text-3xl font-extrabold tracking-tight text-[#2A0C0C]">
                {stat.display ?? <CountUp to={stat.value!} suffix={stat.suffix} />}
              </dd>
              <dt className="mt-1 text-[13px] font-medium leading-snug text-[#7A5C5C]">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
