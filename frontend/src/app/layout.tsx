import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`max-w-[100vw]`}>
        <Header />
        <div className='mx-8'>
          {children}
        </div>
      </body>
    </html>
  )
}
