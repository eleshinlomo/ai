
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"
import { string } from "zod"

export const UserAvatar = ()=>{
    
 
    return (
        
            <Avatar className="h-8 w-8" >
                <AvatarImage src='/avatar-1968236_1280.png' />
              
                <AvatarFallback>
                  <Button>Profile</Button>
                </AvatarFallback>
            </Avatar>
    )
}