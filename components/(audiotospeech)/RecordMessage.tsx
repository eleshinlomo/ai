import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";
import { Button } from "../ui/button";

type Props = {
  handleStop: any;
};

export const RecordMessage = ({ handleStop }: Props) => {
  return (
     <div className="w-full flex flex-col justify-center items-center ">
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div className="">
          
            
            
          
            
<div className="flex flex-col   justify-center items-center md:mr-72">
<p className=" text-white font-light">{status}</p>
<div className="flex   justify-center items-center">
<Button className="bg-black text-white rounded-2xl" 
onClick={startRecording}>Speak</Button>
<RecordIcon
              classText={
                status == "recording"
                  ? "animate-pulse text-red-500"
                  : "text-sky-500"
              }
            />
            
<Button className="bg-black text-white rounded-2xl" 
onClick={stopRecording}>Stop</Button>
</div>

</div>

          
        </div>
      )}
    />
   </div>
  );
};

export default RecordMessage;