'use client'
import {useState, useEffect} from 'react'
import { BASE_URL } from '@/components/urls'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'



const NewsLetterForm = ()=>{

    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('Subscribe to Newsletter')

const HandleEmailWaitlist = async (e:any)=>{
    
    try{
    setMessage('Saving email...')
    e.preventDefault()
    const payload = {
      email
    }
     console.log(BASE_URL)
    const response: any = await fetch(`${BASE_URL}/waitlist/`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(!response.ok) throw new Error("Problem with waitlist server")
    const data = await response.json()
    if (!data){
      setMessage('No response from server')
    }else{
      setMessage('Your email has been received')
    }
    setEmail('')
  }
  catch(err: any){
     setMessage(`"Error": ${err.message}`)
  }
  }
  
  
    return (

    <div className='w-full'>
      <div className='py-4  text-white font-extrabold '>
  
            <p className=' py-2  '>{message}</p>
        <form className=' md:flex gap-3' onSubmit={HandleEmailWaitlist}>
          <Input
          className='border border-white px-1  text-white rounded-2xl px-2'
          value={email}
          name='email'
          placeholder='Enter your email'
          onChange={(e)=>setEmail(e.target.value)}
          type='email'
           required /><br/>
           <Button type='submit' className=' bg-gray-600 hover:bg-gray-700 mt-2 md:m-0 rounded-2xl text-white' variant='default'>
            Subscribe
           </Button>
        </form>
      </div>
      </div>
    )
  

}

  export default NewsLetterForm