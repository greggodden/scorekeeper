'use client'

import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { CircleX, BadgeAlert, BadgeMinus, BadgeInfo, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/button'

export type ToastVariant = 'error' | 'info' | 'default' | 'success'

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-0 left-0 flex max-h-screen w-full flex-col-reverse p-2 items-center',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const toastVariants: Record<ToastVariant, string> = {
  default:
    'border-border bg-card/50 text-card-foreground',
  error:
    'border-destructive bg-destructive/80 text-card-foreground',
  info:
    'border-info bg-info/60 text-card-foreground',
  success:
    'border-tertiary bg-tertiary/80 text-card-foreground'
}

const toastIconColor: Record<ToastVariant, string> = {
  default: 'text-card-foreground',
  error: 'text-card-foreground',
  info: 'text-card-foreground',
  success: 'text-card-foreground'
}

const toastIcons: Record<ToastVariant, React.ComponentType<{ size?: number }>> = {
  default: BadgeAlert,
  error: BadgeMinus,
  info: BadgeInfo,
  success: BadgeCheck
}

interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: ToastVariant
  onClose?: () => void
}

const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant = 'default', onClose, children, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(
      'group pointer-events-auto relative flex w-full max-w-[400px] z-[100] items-start gap-2 overflow-hidden rounded-lg border p-2 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full',
      toastVariants[variant],
      className
    )}
    {...props}
  >
    <div className={cn('flex shrink-0 items-start justify-center w-5', toastIconColor[variant])} aria-hidden>
      {React.createElement(toastIcons[variant], { size: 20 })}
    </div>
    <div className="flex min-w-0 flex-1 items-start text-left">
      {children}
    </div>
    <div className="flex shrink-0 items-start justify-center">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        aria-label="Close"
        className="h-auto w-auto p-0 hover:bg-transparent hover:text-inherit focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <CircleX size={20} />
      </Button>
    </div>
  </ToastPrimitive.Root>
))
Toast.displayName = ToastPrimitive.Root.displayName

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    data-slot="toast-description"
    className={cn('text-sm', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

export { ToastProvider, ToastViewport, Toast, ToastDescription }
