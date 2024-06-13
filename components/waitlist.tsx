'use client'
import {useState, useEffect} from 'react'
import { BASE_URL } from './urls'
import { Button } from './ui/button'


const Waitlist = ()=>{

    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')

const HandleEmailWaitlist = async (e:any)=>{
    
    try{
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

    <div>
      <div className='py-4  
       text-black
       font-extrabold'>
  
  <p className='  py-2 text-muted-foreground '>Thanks for checking this project out. 
  Please join my waitlist to stay informed about this project.</p>
            <p className='text-blue-500  '>{message}</p>
        <form className=' md:flex gap-3' onSubmit={HandleEmailWaitlist}>
          <input 
          className='border border-black px-1 text-center'
          value={email}
          name='email'
          placeholder='Enter your email'
          onChange={(e)=>setEmail(e.target.value)}
          type='email'
           required /><br/>
           <Button type='submit' className=' bg-blue-500 mt-2 md:m-0 ' variant='default'>
            Submit</Button>
        </form>
      </div>
      </div>
    )
  

}

  export default Waitlist