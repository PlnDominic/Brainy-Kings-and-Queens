'use client'

import { motion } from 'framer-motion'
import { staggerItem } from '@/lib/animations'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function StaggerItem({ children, className }: Props) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}
