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
import { Textarea } from '@/components/ui/textarea'




const TextChatPage = () => {
    const [messages, setMessages] = useState<Array<{role: string; content: string, audio: null | any}>>([])
    const [message, setMessage] = useState<string | any>('')
    const [textMessage, setTextMessage] = useState<null | any>(null)
    const [audioUrl, setAudioURL] = useState<null | any>(null)
    const [editText, setEditText] = useState<string | any>('')
    const [isEditing, setIsEditing] = useState<boolean>(true)
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


    const handleVoiceToText = async (e: any)=>{
    
       e.preventDefault()
        try{
        
        setIsConvertingTextToAudio(true)
        setAudioURL(null)
        if(!editText) return {"error": "No textMessage found"}
        const blob: any = await textToVoice(editText)
        if(blob){
       
            const chatbotBlob = new Blob([blob], {type: 'audio/wav'})
            const chatbotBlobURL = URL.createObjectURL(chatbotBlob)

            const botResponse = {
                role: 'bot',
                content: editText,
                audio: chatbotBlobURL
            }
            
            setMessages([botResponse])
            
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
     
     
     <p className="text-center font-extrabold text-2xl  py-8 px-4">
        TEXT READER</p>
        
        <div className='bg-white text-black'>
    
        <Heading
        title='Reads text while you focus on other things'
        description = 'Increase productivity'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
         />

         <div className='px-4 lg:px-8'>
          <div>
           
           {/* Announcements */}
           <p className='text-center text-blue-900 font-extrabold'>
            New ultra-real human voices coming soon...</p>


          </div>
           
           {/* Message */}
          <div className='text-center py-2 px-8'>
            {message}
          </div>

           

           {/* Message Form */}
           <div>
            

            <div className='flex flex-col justify-center items-center'>
                     
                     
            
                     <Form {...form}>
                       <form onSubmit={(e)=>handleVoiceToText(e)}
                       className='
                       rounded-lg border w-full p-4 px-3 md:px-6 
                       focus-within:shadow-sm grid grid-cols-12 gap-2
                       '
                       >
                          <FormField 
                          name="editText"
                          render={()=>(
               
                            <FormItem className="col-span-12 lg:col-span-10">
                            <FormControl className='M-0 P-0'>
                           <Textarea className='border border-black outline-none  text-md
                           focus=visible:ring-transparent h-72
                           focus-visible:ring-0' 
                           disabled={isLoading}
                           value={editText}
                           onChange={(e)=>setEditText(e.target.value)}
                           placeholder="Paste your text here"
                         />
                         </FormControl>
                         </FormItem>
                         )}
                         />
                         <Button type='submit' className='col-span-12 lg:col-span-2 w-full rounded-2xl bg-gray-600 hover:bg-gray-600 text-white'
                         disabled={isLoading}>
                          READ TEXT
                         </Button>
                       </form>
                      </Form>
            </div>
            
          {/* Is Converting Text To Voice Blob */}
          <div className=' flex flex-col justify-center items-center'>
                            {isConvertingTextToAudio ?
                            <div>
                            {loading}
                            </div>:null
                            }
                            </div>


            {/* {messages.length == 0 && !isLoading && (
                <div>
                    <Empty label="No conversation started with Teema" />
                </div>
            )} */}
           <div className='flex  w-full
           flex-col-reverse items-start  gap-4  fixed z-[9999]'>
            {messages.map((message: any, index)=>(
                <div
                 key={index}
                 className={cn('py-8 flex flex-col w-full flex-1 px-8 rounded-lg',
                 message.role == "user" ? "bg-blue border border-blue/10" :
                 "bg-muted"
                 )}
    
                 >

                 

             {/* Audio Blob */}
            
                <div className='flex justify-center items-center'>
                {/* Blob Player */}
                {message.audio?
                
                <div>
                <audio
                    src={message.audio}
                    className="appearance-none"
                    autoPlay
                    controls     
                  />
                  </div>:null
                }
                </div>
                
            
                 
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