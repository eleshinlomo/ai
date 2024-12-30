'use client'
import { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";
import { Button } from "../ui/button";

interface Props  {
  handleStop: any;
};

export const RecordMessage = ({ handleStop }: Props) => {


  return (
     <div className="text-red-500 font-extrabold">
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div className="mt-2">
          
          {status === 'recording'? <p className="text-center font-extrabold
           mt-2 text-red-500">
          {status.toUpperCase()}</p>:

          <p className="text-center font-extrabold mt-2 pl-3">
          {status.toUpperCase()}</p>
          }
            
            
          
            
<div className="text-center flex justify-between items-center">
<Button className="rounded-2xl bg-gray-500 hover:bg-gray-500 text-white" 
onClick={startRecording}>Record</Button>


<RecordIcon
              classText={
                status === "recording"
                  ? "animate-pulse text-red-500"
                  : "text-gray-500"
              }
            />
            
<Button className=" rounded-2xl bg-gray-500 hover:bg-gray-500 text-white" 
onClick={stopRecording}>Stop</Button>

</div>

          
        </div>
      )}
    />
   </div>
  );
};

export default RecordMessage;