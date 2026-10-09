'use client'

import { ComponentProps, ReactNode } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'outline' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1'
  
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-on-primary',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
