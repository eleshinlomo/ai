"use client"
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { voiceToText } from '@/components/voicetotext'
import { SpinnerOne } from '@/components/spinner'
import Image from 'next/image'
import CopyButton from '@/components/copybutton'

const VoiceToTextPage = () => {
  const [fileInput, setFileInput] = useState<null | any>(null)
  const [transcribedMessage, setTranscribedMessage] = useState<null | any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | any>('')

  const loading = (<div className='relative h-24 w-24'>
    <Image src={SpinnerOne} alt='loader' fill/></div>)


    const handleTranscription = async (e: any)=>{
        setIsLoading(true)
        const response: any = await voiceToText(e, fileInput)
        if (response.ok){
        setMessage('')
        setTranscribedMessage(response.data)
        setIsLoading(false)
        }else{
          console.log(response.error)
          setMessage(response.error)
          setIsLoading(false)
        }
    }
    return (
      <div className=" text-center flex flex-col justify-center items-center
        text-2xl gap-4 px-4 py-8 bg-white text-black">
          
           <p className='py-4 font-extrabold font-sans text-2xl'>TRANSCRIBER</p>
          <p className='py-8 font-extrabold text-sm'>File uploads are currently limited to 
          25 MB and the following input file types are supported: 
          mp3, mp4, mpeg, mpga, m4a, wav, and webm.</p>
          
          
          <form onSubmit={handleTranscription} className='flex flex-col 
          justify-center items-center text-center'>
            
        <input 
          name='audiofile'
          type='file'
          accept='audio/*'
          onChange={(e)=>setFileInput(e.target.files?.[0] || null)}
          className='px-4 mb-4 ml-24 text-sm md:text-lg'
          required
          />

          <Button type='submit' 
          className=' bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-2xl'>
          
          Transcribe</Button>
          </form>

           {/* Loading */}
         <div>
            {isLoading? 
            <p>{loading}</p>:null
            }
          </div>

          {/* Transcribed Message */}
          <div className='text-start w-full py-8 px-4 border  shadow-2xl overflow-y-scroll'>
            <p className='font-extrabold py-8 text-center'>Transcription</p>
           
            {typeof message === 'string'?message:null}
             
            {transcribedMessage? 
            <div>
            <CopyButton textToCopy={transcribedMessage} />
            {transcribedMessage}
          </div>: 
            <p className='text-center'>No text available</p>}
          </div>
           
           <div>
            <p className='py-4'>Don&apos;t have an Audio file?</p>
          <Link href='/voicerecorder'>
            <Button className='bg-gray-600 hover:bg-gray-500  text-white p-2 rounded-2xl'>
            Use Voice Recorder
          </Button>
          </Link>
          </div>
         
        

      </div>
    )
  }
  
  export default VoiceToTextPage