"use client"
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import NewsSubscriptionPage from './newsletterform'

const NewsLetterButton = () => {
  return (
    <>
    <Sheet>
        <SheetTrigger asChild>
            <Button className='text-white bg-gray-600 hover:bg-gray-700 rounded-2xl'>
                SUBSCRIBE
            </Button>
        </SheetTrigger>

        <SheetContent side='right' className='bg-black z-[9999]'>
         <div>
            <NewsSubscriptionPage />
         </div>
        </SheetContent>
    </Sheet>
    </>
  )
}

export default NewsLetterButton