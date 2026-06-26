'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function StaggerContainer({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px 0px' }}
    >
      {children}
    </motion.div>
  )
}
