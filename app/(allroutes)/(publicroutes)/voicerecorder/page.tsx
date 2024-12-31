"use client"
import { useState } from "react";
import dynamic from "next/dynamic";
const RecordMessage = dynamic(()=>import("@/components/(voicerecorder)/RecordMessage"), {ssr: false});
import Link from 'next/link'
import { SmileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { voiceToText } from "@/components/voicetotext";
import { SpinnerOne } from "@/components/spinner";
import Image from 'next/image'
import CopyButton from "@/components/copybutton";

const VoiceRecordePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<string | any>>([]);
  const [userMessage, setUserMessage] = useState<null | any>(null)
  const [message, setMessage] = useState<string | null>('')
  const [transcribedMessage, setTranscribedMessage] = useState<null | any>(null)

  // const data = "This is a fake blob"
  // const blob = new Blob([data], {type: "text/plain"})
  // const url = URL.createObjectURL(blob)
  // console.log(url)


  const loading = (<div className='relative h-6 w-6'>
    <Image src={SpinnerOne} alt='loader' fill/></div>)

const transcribing = (<div className='relative h-6 w-6'>
<Image src={SpinnerOne} alt='loader' fill/></div>)

//  Handle Start and Stop
  const handleStop = async (mediaBlobUrl: any) => {
    if(typeof window !=='undefined'){
    setIsLoading(true);
    console.log(mediaBlobUrl);

    // Append recorded message to messages
    const myMessage: any = { sender: "me", mediaBlobUrl };
    setMessages([myMessage])
    setIsLoading(false)
  
      // Play audio immediately
      // const userAudio = new Audio(mediaBlobUrl)
      // userAudio.play()
      // const audio = new Audio(mediaBlobUrl)
      // audio.play()
  
      // Fetch the content from the URL and convert it to a Blob
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      setUserMessage(blob)
    }
  
  
  };


  const handleTranscription = async (e: any)=>{
    setTranscribedMessage('')
    if(!userMessage) return
    setIsTranscribing(true)
    const response: any = await voiceToText(e, userMessage)
    if(!response) {
     
      setIsTranscribing(false)
      setMessage('No response from server')
      return
    }
    if (response.ok){
    setTranscribedMessage(response.data)
    setIsTranscribing(false)
    }else{
      console.log(response.error)
      setMessage(response.error)
      setIsTranscribing(false)
    }
  }
  
  
  
  

  return (
    <div className="py-8 bg-black text-white h-1/2">
      {/* Title */}
      {/* <Title setMessages={setMessages} /> */}

      {/* Controllers */}
      <div className="flex fex-col justify-center items-center mt-32">
            <RecordMessage handleStop={handleStop} />
        </div>

      <div className="flex flex-col justify-center items-center">
        {/* Conversation */}
        <div className="mt-5 px-5">
          {messages?.map((audio, index) => {
            return (
              <div
                key={index}
                className={
                  "flex flex-col "
                }
              >
                {/* Sender */}
                <div className="mt-4 ">
                  <p
                    className={
                      audio.sender === "me"
                        ? "text-center mr-2 italic text-green-500"
                        : "ml-2 italic text-blue-500"
                    }
                  >
                    {/* {audio.sender} */}
                  </p>
                  

    {messages.length > 0 ?
     <div className="flex  text-center font-light italic py-2 mb-6
      justify-center items-center">
       
       <div>
        <div className="animate-pulse text-blue font-extrabold">
        <p>Your recorded voice is ready.</p>
        <p>You can download after playing it.</p>
        </div>

        
        
        </div>
       <SmileIcon />
       
     </div>:null
    }
                  {/* Recorded Message with Transcription option */}
                  <div className="flex flex-col justify-center items-center">
                  <audio
                    src={audio.mediaBlobUrl}
                    className="appearance-none"
                    controls
                    
                  />

                  <Button className="bg-gray-500 rounded-full hover:bg-gray-500 mt-2" onClick={()=>setMessages([])}>Clear</Button>
            </div>
                  {/* Transcription */}
        {messages && messages.length > 0 ?
        <div className="text-center flex flex-col justify-center items-center py-4">
       
        <p className="font-extrabold py-4">
          Want to convert recorded voice to text?</p>
        <div className="flex flex-col gap-2">
        <Button onClick={handleTranscription} className="rounded-2xl bg-gray-500 hover:bg-gray-500 mb-2">
          Transcribe
        </Button>

        {isTranscribing?
        <div className='animate-pulse'>
          <p>Transcribing. Please wait...</p>
        </div>:null
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
        
        </div>:null
        }
        
                
              </div>
              </div>
            );
          })}

         

          {isLoading && messages && (
            <div className="flex text-center font-light italic mt-10 
            animate-pulse justify-center items-center">
              
              {loading}
              
            </div>
          )}

          


        </div>

        
      </div>
     
     {messages.length <= 0 ?
      <div className="text-center">
        <p className=''>No recorded file</p>
        </div>:null
    }
    </div>
  );
};

export default VoiceRecordePage