"use client"
import {useState, useEffect} from 'react'
import * as z from 'zod'
import {Heading} from '@/components/heading'
import {  BotIcon, Download, MessageSquare, PhoneCallIcon} from 'lucide-react'
import {  useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormLabel, FormControl, FormField, FormItem} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {Loader} from '@/components/loader'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardFooter } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import ChatBotPage from '../imagechatbot/chatbotpage'







const ImagePage = () => {
    
    
    const [images, setImages] = useState<Array<string | any>>([])
    const [message, setMessage] = useState<string | any>('Write your text below')
    const [url, setUrl] = useState<null | any>(null)
    

    const router = useRouter()
    

    const FormSchema = z.object({

      payload: z.string().min(0, {
        message: "",
      }),
  
      resolution: z.string().min(1, {
        message: " Resolution field is required.",
      }),
      
    
    })


    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        payload: "",
        resolution: "1024x1024"
      },

  })

    const isLoading = form.formState.isSubmitting

    

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        
      
        try {

          const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
          const sessionid: any = localStorage.getItem('sessionid')
          if(!sessionid){
          setMessage('Please Sign in')
          return
          }
          const res: any = await fetch(`${BASE_URL}/imagegenerator/`, {
            mode: "cors",
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "sessionid": sessionid
            },
            body: JSON.stringify(data),
          });
          
          if (!res)throw new Error("Network problem")
            const image_url = await res.json();
        if (image_url.message.ok){
           setMessage('')
            console.log(image_url.message.data)
            setImages([...images, image_url.message.data])
            
        }else{
          setMessage(image_url.message.error)
          console.log(image_url.message.error)
          
        }
      
        } 
      catch (error: any) {
          console.log("Error:", error.error);
        } finally {
        form.reset()
        }
      };
      

  const headerText: any = 
  <div>
   <p className='font-black'>
    <span className='text-blue-600 px-1'>HD</span> Large Image Bot
    
    </p>
  </div>
    
  return (
    <div className='text-black bg-white mt-56'>

        <div className='flex pt-5'>
        <Heading
        title={headerText}
        description = 'Generate copyright free HD images for your business.'
        icon={BotIcon}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
         />

        

         </div>

         {isLoading && (
                <div className='absolute left-1/2'>
                <Loader />
                </div>
            )}

        {/* Error */}
        <p className='text-center text-red-500 py-4 px-2 font-extrabold text-2xl'>
          {message}</p>

         <div className='px-4 lg:px-8 mt-8 '>

      

          <div>
            <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)}
             className='
             rounded-lg border w-full p-4 px-3 md:px-6 
             focus-within:shadow-sm grid grid-cols-12 gap-2
             '
             >
                <FormField 
                name='payload'
                render={({ field })=>(
                
               <FormItem className="col-span-12 lg:col-span-6">
               <FormControl className='m-0 p-0'>
              <Textarea className='border outline-none 
              focus=visible:ring-transparent h-16
              focus-visible:ring-0'
              disabled={isLoading}
              placeholder='Type or paste prompt here...'
              {...field || message}
              required
               />
               </FormControl>
               </FormItem>
               )}
               />

               
          <FormField
          control={form.control}
          name="resolution"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-6">
              <FormLabel>Resolution</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resolution"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1024x1024">1024x1024</SelectItem>
                  <SelectItem value="1024x1792">1024x1792</SelectItem>
                  <SelectItem value="1792x1024">1792x1024</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
                

               
               <Button type='submit' className='col-span-12 lg:col-span-4 my-2 w-full bg-gray-600 hover:bg-gray-800 text-white
                rounded-2xl' disabled={isLoading}>
                Generate Image
               </Button>
               
               
             </form>
            </Form>
          </div>
         
         

          {/* Chat Messages */}
          <div className='space-y-4 mt-4'>
           
           

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            xl:grid-cols-4 gap-4 mt-6
            '>
              {images.slice().reverse().map((src, index)=>(
               <Card
               key={index}
               className='rounded-lg overflow-hidden'
               >
                 <a href={src} target='_blank'>
                <div className='relative aspect-square h-72 w-full  md:w-72 flex flex-row-reverse'>
                 <Image
                 src={src}
                 alt='Image'
                 fill
                  />
                </div>
                </a>

                <CardFooter>
                  
                  <Button 
                  onClick={()=>window.open(src)}
                  variant='secondary' className='w-full'>
                  
                   <Download className='h-4 w-4 mr-2' />
                  </Button>
                </CardFooter>
               </Card>
              ))}
            
            </div>
           {/* Chatbot */}
         <ChatBotPage />
          </div>
          
         </div>
          
    </div>
  )
}

export default ImagePage