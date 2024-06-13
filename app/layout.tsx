
import React from 'react'
import '../styles/globals.css'

interface RootLayotProps {
    children: React.ReactNode
}

export const metadata = {
    title: 'GenAI Page',
    description: 'MyAfros',
  }

const RootLayout = ({children}: RootLayotProps) => {
  return (
    <html lang='en'>
    <body>{children}</body>
    </html>
  )
}

export default RootLayout