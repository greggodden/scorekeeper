'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Alert(props: AlertProps) {
  const { children, className, icon } = props

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border border-destructive bg-card px-3 py-2 text-sm text-card-foreground shadow-sm',
        className
      )}
    >
      {icon ? <span className="text-destructive">{icon}</span> : null}
      <p>{children}</p>
    </div>
  )
}

interface AlertProps {
  children: ReactNode
  className?: string
  icon?: ReactNode
}

