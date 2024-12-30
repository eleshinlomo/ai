"use client"
import {useState, useEffect} from 'react'
import * as z from 'zod'
import {Heading} from '@/components/heading'
import {  MessageSquare, SmilePlusIcon } from 'lucide-react'
import {  useForm } from 'react-hook-form'
import { formSchema } from './constants'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {Empty} from '@/components/empty'
import {Loader} from '@/components/loader'
import { cn } from '@/lib/utils'
import { UserAvatar } from '@/components/user-avater'
import Title from '@/components/(audiotospeech)/Title'
import { textToVoice } from '@/components/texttovoice'
import { SpinnerOne } from '@/components/spinner'
import Image from 'next/image'
import { creditFunction } from '@/components/creditfunction'
import { Textarea } from '@/components/ui/textarea'
import CopyButton from '@/components/copybutton'






const TextChatPage = () => {
    const [messages, setMessages] = useState<Array<{role: string; content: string, audio: null | any}>>([])
    const [message, setMessage] = useState<string | any>('')
    const [textMessage, setTextMessage] = useState<null | any>(null)
    const [audioUrl, setAudioURL] = useState<null | any>(null)
    const [editText, setEditText] = useState<string | any>('')
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isConvertingTextToAudio, setIsConvertingTextToAudio] = useState<boolean>(false)
    const [updated, setUpdated] = useState<boolean>(false)
    
   
    const router = useRouter()
    const form = useForm <z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            payload: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const loading = (<div className='relative h-16 w-16'>
<Image src={SpinnerOne} alt='loader' fill/></div>)

// Credit Handler
const creditHandler = ()=>{
    creditFunction()
}


    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        console.log(values)
        const sessionid = localStorage.getItem('sessionid')
        console.log({"sessionid chatbot": sessionid})
        if(!sessionid) return
        try {
         
         const userMessage = {
            role: "user",
            content: values.payload,
            audio: null
         }

        
         const newMessages = [...messages, userMessage]
         setMessages(newMessages)
         const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
         const API_URL = `${BASE_URL}/voiceover/`
         const res = await fetch(API_URL, {
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "sessionid": sessionid
            },
            body: JSON.stringify({payload: values.payload})
            
         })
           
         
           if (!res) throw new Error("No response from server")
           const data = await  res.json()
         
            if(data.message.ok) {
            // Use Response for Text To Voice
            setMessage('')
            setTextMessage(data.message.data)
            setEditText(data.message.data)
            creditHandler()
            
            // Continue with Chatbot
            const botMessage = {
                role: "bot",
                content: "",
                audio: null
            }

            
            botMessage.content = data.message.data
            newMessages.push(botMessage)
            setMessages(newMessages)
            form.reset()
        }else{
            console.log(data.message.error)
            setMessage(data.message.error)
            
            }
             
            
         }
        
        catch(error: any) {
            console.log(error)
        } finally {
            return
        }
    }

    useEffect(()=>{
        creditHandler()
    }, [])


    // Update TextMessage
    const updateTextMessage = (e: any)=>{
        setUpdated(false)
        e.preventDefault()
        setTextMessage(editText)
        const botResponse = {
            role: 'bot',
            content: textMessage,
            audio: ''
        }
        setMessages([...messages, botResponse])
        setUpdated(true)
    }
    

// Handle Voice to Text
    const handleTextToVoice = async (e: any)=>{
        e.preventDefault()
        const messageToConvert = textMessage
        try{
        setIsConvertingTextToAudio(true)
        setAudioURL(null)
        if(!messageToConvert) return {"error": "No textMessage found"}
        console.log({"userMesssage": messageToConvert})
        const blob: any = await textToVoice(messageToConvert)
        if(blob){
       
            const chatbotBlob = new Blob([blob], {type: 'audio/wav'})
            const chatbotBlobURL = URL.createObjectURL(chatbotBlob)

            const botResponse = {
                role: 'bot',
                content: textMessage,
                audio: chatbotBlobURL
            }
            
            setMessages([...messages, botResponse])
            
            // const ChatbotAudio = new Audio(chatbotBlobURL)
            // ChatbotAudio.play()
    
      setIsConvertingTextToAudio(false)
    
        }else{
            console.log(blob.error)
            setIsConvertingTextToAudio(false)
        }
    }
    catch(err){
        console.log(err)
    }finally{
        setIsConvertingTextToAudio(false)
    }
    }

    

  return (
    <div className='flex flex-col justify-center'>
     
     

     <p className="text-center font-extrabold text-2xl py-8 px-4">
        CONTENT CREATOR</p>
        
        <div className='bg-white text-black'>
    
        <Heading
        title='Generate text and audio content 10x faster'
        description = 'Content production on steroids'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
         />

         <div className='px-4 lg:px-8'>
          <div>
           
           {/* Announcements */}
           <p className='text-center text-blue-900 font-extrabold'>
            New ultra-real human voices coming soon...</p>


           {/* Message Form */}
            <div>
            {isEditing ?

// Editing Mode
<div className='flex flex-col justify-center items-center'>
<div className='text-center'>
<Button className=' bg-blue-500 hover:bg-blue-500 my-4 rounded-2xl' onClick={()=>setIsEditing(false)}>
    Close Editing</Button>
    <p>{updated? 'Updated': null}</p>
</div>
<Form {...form}>
<form onSubmit={(e)=>updateTextMessage(e)}
className='
rounded-lg border w-full p-4 px-3 md:px-6 
focus-within:shadow-sm grid grid-cols-12 gap-2
'
>
   <FormField 
   name="textMessage"
   render={()=>(
   
  <FormItem className="col-span-12 lg:col-span-10">
  <FormControl className='M-0 P-0'>
 <Textarea className='border-0 outline-none  text-md
 focus=visible:ring-transparent h-44
 focus-visible:ring-0'
 disabled={isLoading}
 value={editText}
 onChange={(e)=>setEditText(e.target.value)}
  />
  </FormControl>
  </FormItem>
  )}
  />
  <Button className=' bg-blue-500 hover:bg-blue-500 col-span-12 lg:col-span-2 w-full rounded-2xl' disabled={isLoading}>
   Update Text
  </Button>
</form>
</Form>
</div>
            :
            <div>

           {/* Writing Mode */}

           <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)}
           className='
           rounded-lg border w-full p-4 px-3 md:px-6 
           focus-within:shadow-sm grid grid-cols-12 gap-2
           '
           >
              <FormField 
              name="payload"
              render={({ field })=>(
              
             <FormItem className="col-span-12 lg:col-span-10">
             <FormControl className='M-0 P-0'>
            <Textarea className='border border-black 
            focus=visible:ring-transparent h-44
            focus-visible:ring-0'
            disabled={isLoading}
            placeholder="Write a naration for this topic 'Top 10 Businesses In Botswana'"
            {...field}
             />
             </FormControl>
             </FormItem>
             )}
             />
             <Button className='col-span-12 lg:col-span-2 w-full rounded-2xl bg-blue-500 hover:bg-blue-500 text-white ' disabled={isLoading}>
              GO
             </Button>
           </form>
          </Form>
          </div>
              }
              </div>
          </div>
           
           {/* Error Message */}
          <div className='text-center py-2 px-8 font-extrabold text-red-500'>
            {message}
          </div>

          {/* Chat Messages */}
          <div className='py-4 mt-4'>
            {isLoading && (
                <div className='p-8 rounded-lg w-full flex items-center
                justify-center bg-muted'>
                <Loader />
                </div>
            )}
            {messages.length == 0 && !isLoading && (
                <div>
                    <Empty label="No conversation started with Teema" />
                </div>
            )}
           <div className='flex  w-full
           flex-col-reverse items-start  gap-4 '>
            {messages.map((message: any, index)=>(
                <div
                 key={index}
                 className={cn('py-8 flex flex-col w-full flex-1 px-8 rounded-lg',
                 message.role == "user" ? "bg-blue border border-blue/10" :
                 "bg-muted"
                 )}
    
                 >

                
                {/* Avatars and header buttons */}
                {message.role == 'user' ? <UserAvatar /> : 
                <div>
                    {isEditing ?
                    <p className='text-blue-500'>Editing mode...</p>:null
                    }
                  <div className='flex md:flex-row justify-center'>
                    
                    <div className={`w-full grid grid-flow-row md:grid-cols-2 gap-1 text-white`}>
                
                {/* Convert to audio button */}
                <Button onClick={(e)=>handleTextToVoice(e)} 
                className='mt-2 rounded-2xl bg-blue-500 hover:bg-blue-500 '>
                    
                    Convert to Audio
                </Button>
                 

                <Button  
                className='mt-2 rounded-2xl bg-blue-500 hover:bg-blue-500 '
                onClick={()=>setIsEditing(true)}
                >
                    
                    Edit Text
                </Button>

               
                </div>
                </div>
                
                </div>
                }

                {/* Is Converting Text To Voice Blob */}
                <div className=' flex flex-col justify-center items-center'>
                {isConvertingTextToAudio ?
                <div>
                {loading}
                </div>:null
                }
                </div>

             {/* Audio Blob */}
            
                <div className='flex justify-center items-center'>
                {/* Blob Player */}
                {message.audio?
                
                <div>
                <audio
                    src={message.audio}
                    className="appearance-none"
                    controls     
                  />
                  </div>:null
                }
                </div>
                
                
                {/* Bot and User Messages */}
                
                 {message.role === 'user' ? 
                

                //   User Prompt
                 <p className=' text-md font-semibold'>
                    {message.content}
                </p> :
                // Bot response
                <div className=' font-semibold  '>
                    <div>
                
                {/* Bot Message */}

                {
                <div className='mt-3'>
                <CopyButton textToCopy={textMessage} />
                <p className='text-md py-4'>
                    {textMessage}
                </p>
                
          </div>
                
                }

               
                </div>
                
                </div>
                 }
                 
                 
                </div>
            ))}
           </div>
          </div>

          </div>

         </div>
    </div>
  )
}

export default TextChatPage