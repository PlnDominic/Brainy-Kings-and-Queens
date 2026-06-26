'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let current = 0
    const increment = to / (1500 / 16)
    const timer = setInterval(() => {
      current += increment
      if (current >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience', color: 'text-white', border: true },
  { display: '1:8', label: 'Teacher-Student Ratio', color: 'text-secondary-container', border: true },
  { value: 100, suffix: '%', label: 'Qualified Staff', color: 'text-secondary-container', border: true },
  { value: 250, suffix: '+', label: 'Happy Students', color: 'text-white', border: false },
] as const

export default function StatBar() {
  return (
    <section className="bg-primary relative z-20 py-lg">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className={`text-center py-lg px-md ${stat.border ? 'md:border-r border-white/20' : ''}`}
            >
              <p className={`text-headline-lg font-headline-lg ${stat.color}`}>
                {'display' in stat ? (
                  stat.display
                ) : (
                  <CountUp to={stat.value} suffix={stat.suffix} />
                )}
              </p>
              <p className="text-label-lg text-white/70 uppercase tracking-wider mt-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
