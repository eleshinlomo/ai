import { useState, useEffect } from 'react'
import  Link  from 'next/link'
import { Button } from "./ui/button"
import  Image  from 'next/image'
import { OtherHomeNavButtons } from './otherhomenavbuttons'
import { useRouter } from 'next/navigation'







// URLs
 // URLs
 const ALLAUTH_BASE_URL = process.env.NEXT_PUBLIC_ALLAUTH_BASE_URL




export const HomeMobileNavBar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false)
  const [username, setUsername] = useState<string | null>(null)
  const [sessionid, setSessionid] = useState<null | any>(null)
  const router = useRouter()
    




  return (
    <div className='md:hidden'>
      <div className='flex flex-col flex-1 gap-4'>
        
        <Button size='icon' variant='outline' 
        onClick={()=>router.push('/')}>
        <div className='relative w-24 h-12'>
          <Image src='/logos/fixupe_logo.png' alt='logo' fill />
        </div>
        </Button>
        

        <OtherHomeNavButtons />


        </div>
        :
        <div className=' flex flex-col flex-1 gap-3 mt-5'>
        <Button className=' w-full'>
          <Link href='signuppage'>Sign up</Link></Button>

        <Button className=''>
            <Link href='/signinpage'>Sign In</Link>
        </Button>
         
      </div>
    </div>
  )
}