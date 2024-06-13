"use client"

import {useState, useEffect} from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from 'next/link'
import { UserAvatar } from "./user-avater"
import { Button } from './ui/button'
import { BotIcon, FileIcon, HomeIcon, Menu} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { HomeMobileNavBar } from './homemobilenavbar'



import { OtherHomeNavButtons } from './otherhomenavbuttons'


const HomeNavBar = ()=>{

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false) 
  const [username, setUsername] = useState<string | null>(null)
  const [sessionid, setSessionid] = useState<null | any>(null)
  const [isChecking, setIsChecking] = useState<boolean>(false)

  // URLs
  const ALLAUTH_BASE_URL = process.env.NEXT_PUBLIC_ALLAUTH_BASE_URL
 

 

    return(
       <div className='py-4 bg-black text-white w-full'>
        
        <div className='    
        md:flex flex-1 justify-between  px-2 shadow-2xl  '>


{/* Col 1 */}
{/* Mobile & Logo MD */}

<div className='flex'>
<div className='md:flex  w-full flex-1'>
        <Link href='https://myafros.com'>
          <div className='relative w-16 h-12 my-2'>
        <HomeIcon className='h-8 w-8' />
        </div>
        </Link>
      </div>

{/* Col2 */}
<div className='md:hidden'>
<Sheet>
<SheetTrigger>
  <div className='md:hidden'>
 

{/* <Button size='icon'  className=' mt-2 w-10 h-8 bg-white hover:bg-white text-black '  asChild>
  <Menu  />
</Button> */}
</div>
</SheetTrigger>

<SheetContent side= 'top' className=' bg-black'>
  <div className=''>
  <HomeMobileNavBar />
  </div>
</SheetContent>
</Sheet>
</div>

</div>



{/* Col3 */}
<div className="hidden md:flex  mt-2 gap-3">

<div className='text-white'>
{username?
        <p className='mt-2 font-extrabold '>
          Hi {username[0].toUpperCase() + username.slice(1)}</p>:
        <p className='mt-2 font-extrabold'>Hi {'Guest'}</p>
        }
</div>



<div className='mr-2 text-white text-black'>
<Menubar className=" gap-3">
  <MenubarMenu>
    <MenubarTrigger><Link href='/'>Home</Link></MenubarTrigger>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger>Services</MenubarTrigger>
    <MenubarContent className='flex flex-col mr-4'>
      <MenubarItem>
        <OtherHomeNavButtons />
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger><Link href='https://blog.myafros.com'>Blog</Link></MenubarTrigger>
  </MenubarMenu>

    <MenubarMenu>
    <MenubarTrigger><Link href='https://myafros.com'>MyAfros</Link></MenubarTrigger>
  </MenubarMenu>

  
 
  </Menubar>
        
    </div>
     
    

    </div>
     </div>

    

     </div>

    )
}

export default HomeNavBar