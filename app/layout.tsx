
import React from 'react'
import '../styles/globals.css'

interface RootLayotProps {
    children: React.ReactNode
}

export const metadata = {
    title: 'MAFROS AI',
    description: 'MyAfros',
  }

const RootLayout = ({children}: RootLayotProps) => {
  return (
    <html lang='en'>
    <body className={`bg-[#FCFCFC] dark:bg-black`}>{children}</body>
    </html>
  )
}

export default RootLayout