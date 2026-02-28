'use client'

import * as React from 'react'
import { ToastProvider, ToastViewport, Toast, ToastDescription } from '@/components/ui/toast'

export interface ToastMessage {
  id: string
  description: string
}

const ToastContext = React.createContext<{
  toasts: ToastMessage[]
  addToast: (description: string) => void
} | null>(null)

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a Toaster')
  return ctx
}

export function Toaster({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([])

  const addToast = React.useCallback((description: string) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, description }])
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
