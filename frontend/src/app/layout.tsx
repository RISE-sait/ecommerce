"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">

      <body className={`max-w-[100vw]`}>
        <SessionProvider>
          <Header />

          <div className='mx-8'>
            {children}
          </div>
        </SessionProvider>

      </body>

    </html>
  )
}
