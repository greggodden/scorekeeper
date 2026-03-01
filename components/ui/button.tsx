'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg border border-border bg-primary text-primary-foreground text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ghost: 'bg-transparent border-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
        positive: 'bg-tertiary border-tertiary text-foreground hover:bg-tertiary/90 hover:text-tertiary-foreground',
        positiveAlt: 'bg-transparent border-transparent text-foreground hover:bg-tertiary/90 hover:text-tertiary-foreground',
        outline: 'bg-transparent border-border text-foreground hover:outline-none hover:ring-2',
      },
      size: {
        default: 'h-10 min-w-[2.5rem]',
        icon: 'h-10 w-10 p-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export function Button(props: ButtonProps) {
  const { asChild, className, variant, size, ...rest } = props
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...rest} />
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'positive' | 'positiveAlt' | 'outline'
  size?: 'default' | 'icon'
  asChild?: boolean
}

