

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Content Creator',
  description: 'General Conversation with AI',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <div>
      
      <main className=' ">
'>
        {children}
        </main>
    
    </div>
     
    
    
  )
}
