'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

export function Input(props: InputProps) {
  const { className, ...rest } = props

  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
      {...rest}
    />
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

