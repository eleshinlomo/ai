
import { LogOutIcon } from 'lucide-react'
import Image from 'next/image'

const LogoutLandingPage = ()=>{
  
  return (
    <div className=" h-96 flex flex-col justify-center items-center">
    <div className=''>
    <p className="my-10"> You have successfully logged out.</p>

    <div className='relative h-32 w-full'>
      <LogOutIcon />
    </div>
    </div>
    </div>
  )
}

export default LogoutLandingPage