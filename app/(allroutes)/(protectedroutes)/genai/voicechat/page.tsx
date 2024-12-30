"use client"
import { useState, useEffect } from "react";
import {RecordMessage} from "@/components/(audiotospeech)/RecordMessage";
import Link from 'next/link'


const VoiceChatPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0)

  // const data = "This is a fake blob"
  // const blob = new Blob([data], {type: "text/plain"})
  // const url = URL.createObjectURL(blob)
  // console.log(url)

 const getUserRecordedMessage = (mediaBlobUrl: any) =>{
  if(mediaBlobUrl === '') return
  const myMessage = { sender: "you", mediaBlobUrl };
  return myMessage

 }
  const handleStop = async (mediaBlobUrl: any) => {
    setIsLoading(true);
  
    // Append recorded message to messages
    const userRecordedMessage = getUserRecordedMessage(mediaBlobUrl)
    const messagesArr = [...messages, userRecordedMessage];
  
    try {
      // Play audio immediately
      // const userAudio = new Audio(mediaBlobUrl)
      // userAudio.play()
  
      // Fetch the content from the URL and convert it to a Blob
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
  
      // Send blob to the server 
      const formData = new FormData();
      formData.append("file", blob, "myFile.wav");
  
      const BASE_URL = process.env.NEXT_PUBLIC_FAST_API_BASE_URL;
      const blobResponse = await fetch(`${BASE_URL}/post-audio`, {
        method: 'POST',
        mode: 'cors',
        body: formData,
      });
      console.log(blobResponse)
      const chatbotData = await blobResponse.blob();
     
      console.log({"botblobresponse": chatbotData})
      
      if(!blobResponse.ok){throw new Error("Unable to get Blob response")}
      console.log(chatbotData);
      
      const chatbotBlob = new Blob([chatbotData], {type: 'audio/wav'})
      const chatbotBlobURL = URL.createObjectURL(chatbotBlob)
      const ChatbotAudio = new Audio(chatbotBlobURL)
      ChatbotAudio.play()

      // Create a new message for the chatbot response
      const chatbotMessage = { sender: "bola", mediaBlobUrl: chatbotBlobURL };
      const updatedMessagesArr = [...messagesArr, chatbotMessage];
  
      setMessages(updatedMessagesArr);
      
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    };
  };
  
  
  
  

  return (
    <div className="relative w-full flex flex-col justify-center">
       
       <div className='className="text-center flex flex-col justify-center items-center font-extrabold py-4"'>
     <p className="text-center font-extrabold text-xl py-4 px-8">USE CASES</p>
     <ul className="text-center px-8 text-xs ">
        <li>Gives Visually impaired people access to GPT</li>
        <li>Allows multi-tasking while using GPT</li>
        <li>Voice Chat is Faster than Text Chat</li>
     </ul>
     </div>

     <p className="text-center font-extrabold text-3xl text-blue-700 py-8">
        VOICE CHAT</p>
        
     

      <div className="text-center bg-white text-black flex flex-col justify-between h-full overflow-y-scroll 
      pb-96">

      
      
        {/* Conversation */}
        <div className=" px-5">
          {messages?.map((audio, index) => {
            return (
              <div
                key={index}
                className={
                  "flex flex-col " +
                  (audio.sender == "bola" && "flex items-end")
                }
              >
                {
                  audio.sender === "bola" ? 
                  <div>
                    <p className="py-2 text-muted-foreground">
                  Download audio response</p>
                    </div>
                    : 
                    <div>
                      </div>
                      
                }
                {/* Sender */}
                <div className=" ">
                <p className="py-2 text-muted-foreground">
                  Download audio prompt</p>
                  <p
                    className={
                      audio.sender == "bola"
                        ? "text-right mr-2 italic text-green-500"
                        : "ml-2 italic text-blue-500"
                    }
                  >
                    {audio.sender.toUpperCase()}
                  </p>
                  

                  {/* Message */}
                  <audio
                    src={audio.mediaBlobUrl}
                    className="appearance-none"
                    controls
                    
                  />
                
                </div>
              </div>
              
            );
          })}

          {messages.length == 0 && !isLoading && (
            <div className="text-center font-light italic mt-10">
              You are chatting with Bola...
            </div>
          )}

          {isLoading && (
            <div className="text-center font-light italic mt-10 animate-pulse">
              Waiting for Bola response...
            </div>
          )}
        </div>

        {/* Recorder */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center 
        bg-gradient-to-r from-black to-black/50">
          <div className="flex justify-center items-center w-full">
            <div>
              
              <RecordMessage handleStop={handleStop} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatPage;