import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  import Image, { StaticImageData } from 'next/image'

  interface ImageCardProps {
    header: string;
    url: string | StaticImageData;
  }
  
  const ImageCard = ({header, url}: ImageCardProps)=> {
    return (
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[200px] max-w-md rounded-lg border"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">{header}</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="relative h-16 w-16 flex h-full items-center justify-center p-6">
            <Image src={url} alt='image' fill />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }

  export default ImageCard
  