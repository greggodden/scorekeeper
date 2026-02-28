import type { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

interface RootLayoutProps {
  children: ReactNode
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  title: 'ScoreKeeper',
  description: 'A scorekeeping web application for tracking game scores.'
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="en">
      <body
        className={`${poppins.className} min-h-screen border-border bg-background text-foreground antialiased`}
      >
        <Toaster>{children}</Toaster>
      </body>
    </html>
  )
}
