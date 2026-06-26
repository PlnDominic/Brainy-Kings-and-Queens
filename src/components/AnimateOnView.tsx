'use client'

import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, scaleIn } from '@/lib/animations'
import type { Variants } from 'framer-motion'

const variantMap: Record<string, Variants> = { fadeUp, fadeLeft, fadeRight, scaleIn }

interface Props {
  children: React.ReactNode
  className?: string
  variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleIn'
  delay?: number
  as?: keyof React.JSX.IntrinsicElements
}

export default function AnimateOnView({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  as: Tag = 'div',
}: Props) {
  const MotionTag = motion[Tag as 'div'] ?? motion.div

  return (
    <MotionTag
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px' }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
