
import React from 'react'


interface ProtectedRoutesProps {
    children: React.ReactNode
}

export const metadata = {
    title: 'protectedroutes',
    description: 'MyAfros',
  }

const ProtectedRoutesLayout = ({children}: ProtectedRoutesProps) => {
  return (
    <div>
    {children}
    </div>
  )
}

export default ProtectedRoutesLayout