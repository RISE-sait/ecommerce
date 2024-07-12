import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import React from 'react'
import { getServerSession } from 'next-auth'
import SessionProviderClientComponent from '@/components/SessionProviderClientComponent'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession()

  return (
    <html lang="en">

      <body className={`max-w-[100vw]`} id='body'>
        <SessionProviderClientComponent session={session}>
          <Header />

          <main className="md:mx-8">
            {children}
          </main>
        </SessionProviderClientComponent>

      </body>

    </html>
  )
}
