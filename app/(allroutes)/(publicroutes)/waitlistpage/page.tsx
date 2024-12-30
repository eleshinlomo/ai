"use client"
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Waitlist from '@/components/waitlist'
import React from 'react'

const WaitlistPage = () => {
  return (
    <>
    <Sheet>
        <SheetTrigger asChild>
            <Button className='bg-blue-500 rounded-2xl'>
                JOIN WAITLIST
            </Button>
        </SheetTrigger>

        <SheetContent side='right' className='bg-black'>
         <div>
            <Waitlist />
         </div>
        </SheetContent>
    </Sheet>
    </>
  )
}

export default WaitlistPage