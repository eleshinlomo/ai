import { Copy, KeyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface ContextExplanationProps {
    header: string;
    text: React.ReactNode
}

const ContextExplanation = ({header, text}: ContextExplanationProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <KeyIcon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black text-white">
        <DialogHeader>
          <DialogTitle>
            
            {header}

          </DialogTitle>
         
        </DialogHeader>
        <div className="flex items-center space-x-2">
         {text}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ContextExplanation
