'use client'

import * as React from 'react'
import { ToastProvider, ToastViewport, Toast, ToastDescription, type ToastVariant } from '@/components/ui/toast'

export type { ToastVariant }

export interface ToastMessage {
  id: string
  description: string
  variant?: ToastVariant
}

const ToastContext = React.createContext<{
  toasts: ToastMessage[]
  addToast: (description: string, variant?: ToastVariant) => void
} | null>(null)

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a Toaster')
  return ctx
}

export function Toaster({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([])

  const addToast = React.useCallback((description: string, variant: ToastVariant = 'default') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, description, variant }])
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      <ToastProvider>
        {children}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant ?? 'default'}
            onOpenChange={(open) => {
              if (!open) removeToast(toast.id)
            }}
          >
            <ToastDescription>{toast.description}</ToastDescription>
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}
