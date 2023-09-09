'use client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"
import { useState } from "react"

export const Settings = ({profileData}:{profileData:any}) => {
    const getContext = useContext(context);
    const mode = getContext.mode;
    const [show,setShow]=useState(false);

    return (
        <>
          {/* PopOver Component ShadCN */}
       <div className=" mt-5 mr-3">
        <Popover>
      <PopoverTrigger asChild onClick={()=>setShow(false)}>
      <Image src={mode === false ? '/images/setting-2.png' : '/images/setting-2w.png'} alt="Loading..." width={20} height={20} className="cursor-pointer"></Image>
      </PopoverTrigger>
     
      <PopoverContent className="w-30 h-24">
      <Dialog>
      <DialogTrigger asChild onClick={()=>setShow(true)}>
        <p className="text-sm text-muted-foreground cursor-pointer text-center font-PoppinsMedium">Edit Profile</p>
        </DialogTrigger>
        <hr className=" w-full border border-solid border-[#CACACA] mt-[10px]"/>
        <DialogTrigger asChild onClick={()=>setShow(false)}>
        <p className="text-sm text-muted-foreground cursor-pointer mt-[10px] text-center font-PoppinsMedium">Copy Link</p>
      </DialogTrigger>
      {show===true?<DialogContent className="sm:max-w-[375px]">
        <div className=" flex items-center flex-col">
      <h3 className=" text-black font-bold text-xl font-SamsungSharpSansBold">Edit Profile</h3>
      <hr className=" w-full border border-[#CACACA] mt-3" />
      <p className=" mt-7 flex justify-self-start font-semibold text-black font-SamsungSharpSansBold">Change Username</p>
      <input className=" pl-3 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-72 h-10 mt-5 font-PoppinsLight" placeholder={profileData.username} ></input>
      <button className=" bg-black text-white w-[105px] h-8 rounded-lg mt-5 font-SamsungSharpSansBold">Update</button>
      </div>
      </DialogContent>
      : null }
    </Dialog>
  </PopoverContent>
       
    </Popover>
          </div>
        </>
    )
}