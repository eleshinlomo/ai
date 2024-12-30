import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import imagePath from '/images/blossom-8182139_640.jpg'
import ImageCard from "@/components/imagecard"


const ImagePage = ()=>{
    return (
      <div className="flex flex-col justify-center items-center gap-3 py-8">
        <p>Compare picture quality of image models real-time</p>
       <Textarea 
       placeholder="Write a prompt for the image models"
       className="w-1/2"
       />

       <Button className="bg-blue-500 text-white rounded-2xl hover:bg-blue-500">Generate Image</Button>

       {/* <ImageCard header='Dall-e' url='' /> */}

      </div>
    )
}

export default ImagePage