import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"

interface ScrollableTextAreaProps {
  text: string
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const ScrollableTextArea = ({text}: ScrollableTextAreaProps) => {
  return (
    <div className="flex justify-center bg-blue-500 w-full">
    <ScrollArea className="h-72 w-1/2 rounded-md border border-blue-500">
     <div>
       {text}
      </div>
    </ScrollArea>
    </div>
  )
}

export default ScrollableTextArea
