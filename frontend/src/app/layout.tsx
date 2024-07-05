"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import React, { useState } from 'react'
import SideNav from '@/components/SideNav'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isSideNavOpen, setIsSideNavOpen] = useState(false)

  return (
    <html lang="en">

      <body className={`max-w-[100vw]`}>
        <Header setIsSideNavOpen={setIsSideNavOpen} />

        <div className={`${isSideNavOpen && "hidden"} md:mx-8`}>
          {children}
        </div>
        <SideNav isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
      </body>

    </html>
  )
}
