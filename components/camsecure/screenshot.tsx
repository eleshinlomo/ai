import Webcam from 'react-webcam'
import {useState, useEffect} from 'react'
import { DeleteIcon, DownloadIcon, VideoIcon } from 'lucide-react'



const ScreenShotPage = ({webcamRef}: any)=>{
  const [imageLoaded, setImageLoaded] = useState(false)
  const [images, setImages] = useState<string[] | any>([])
  const [imageId, setImageId] = useState(1)
   
  console.log(images)

  useEffect(()=>{

  }, [images])

  const takeScreenShot = ()=>{
    
    if(Webcam && webcamRef.current){
    const src = webcamRef.current.getScreenshot()
    // if(images.length === 0){
    //   setImageId(0)
    //   const image = {
    //     ...images,
    //     imageId: imageId
    //   }
    //   setImages((prev)=>[...prev, image])
    // }
    setImageId(imageId + 1)
    const image = {
       imageId,
       src
    }
    setImages((prev: any)=>[...prev, image])
    setImageLoaded(true)
    }
  }
  
  const removeScreenShot = (imageId: any)=>{
    const filtedImages = images.filter((image: any)=>image.imageId !== imageId)
    setImages(filtedImages)
  }
    return (
      <div>
    
  
    <button className='bg-blue-500 py-1 px-2 rounded-2xl' onClick={takeScreenShot}>Take Screenshot</button>
    
    <div className=' w-full'>
    {imageLoaded ?
    <div className=' mt-2 py-6'>
     
    {([...images].reverse()).map((src, index)=>
    <div key={index}>
      <div>
        
      <div className='flex gap-3'>
      <p>Image {src.imageId}</p>
      <DownloadIcon />
      <DeleteIcon />
      <VideoIcon />
      </div>
      <img src={src.src} className='h-[520px] w-[720px]' />
      </div>

      <div className='flex gap-3 py-2'>
      
      <button className='bg-blue-500 py-1 px-2 rounded-2xl' onClick={()=>removeScreenShot(src.imageId)}>Remove Screenshot</button>
      <button className=' bg-blue-500 py-1 px-2 rounded-2xl' onClick={takeScreenShot}>Download Screenshot</button>
      </div>

    </div>
    )
     }
    {/* <button className='absolute right-0 bg-blue-500 py-1 px-2 rounded-2xl' onClick={removeScreenShot}>Remove</button> */}
    
    </div>:null
     }
     </div>

     </div>
  
    )
  
}

export default ScreenShotPage