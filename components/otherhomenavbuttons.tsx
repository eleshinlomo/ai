import Link from 'next/link'
import { Button } from './ui/button'

export const OtherHomeNavButtons = ()=>{
    return (
        <div className=''>

  <div className='grid grid-flow-row md:grid-cols-2 gap-3 pt-8'>
    

<Button className='w-full'>
<Link href='https://crm.myafros.com'
  className=''
>CRM</Link>
</Button>

<Button className='w-full'>
<Link href='https://crm.myafros.com'
  className=''
>GenAI</Link>
</Button>

<Button className='w-full'>
<Link href='https://imgbot.myafros.com'
  className=''
>ImageBot</Link>
</Button>

<Button className='w-full'>
<Link href='https://myafros.com'
className=''
>MyAfros</Link>
</Button>
                    

</div>
</div>
    )
}