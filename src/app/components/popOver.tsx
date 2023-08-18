'use client'
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className=" rounded-full" >Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-30 h-24">
        
            <p className="text-sm text-muted-foreground ">
              Edit tweet
            </p>
            <hr className=" w-full border border-solid border-[#CACACA] mt-2"/>
            <p className="text-sm text-muted-foreground mt-2">
              Delete
            </p>
        
      </PopoverContent>
    </Popover>
  )
}
