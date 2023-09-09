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
import { useState } from "react";
export const MorePopup = () => {
    const [show,setShow]=useState(false);
    return (
        <>
        {/* PopOver Component ShadCN */}
       <div className=" mt-6 mr-3">
        <Popover>
      <PopoverTrigger asChild onClick={()=>setShow(false)}>
        <Image src={'/images/more.png'} alt="Loading...." width={18} height={18} className=" cursor-pointer"></Image>
      </PopoverTrigger>
     
      <PopoverContent className="w-30 h-24">
      <Dialog>
      <DialogTrigger asChild onClick={()=>setShow(true)}>
        <p className="text-sm text-muted-foreground cursor-pointer text-center font-PoppinsMedium">Edit tweet</p>
        </DialogTrigger>
        <hr className=" w-full border border-solid border-[#CACACA] mt-[10px]"/>
        <DialogTrigger asChild onClick={()=>setShow(false)}>
        <p className="text-sm text-muted-foreground cursor-pointer mt-[10px] text-center font-PoppinsMedium">Delete</p>
      </DialogTrigger>
      {show===true?<DialogContent className="sm:max-w-[375px]">
        <div className=" flex items-center flex-col">
      <h3 className=" text-black font-bold text-xl font-SamsungSharpSansBold">Edit Tweet</h3>
      <hr className=" w-full border border-[#CACACA] mt-3" />
      <textarea className=" mt-8 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-72 h-32 pt-3 pl-3 pr-3 font-PoppinsLight" placeholder="Type Tweet..." ></textarea>
      <button className=" bg-black text-white w-[109px] h-10 rounded-lg mt-5 font-SamsungSharpSansBold">Update</button>
      </div>
      </DialogContent>
      : <DialogContent className="sm:max-w-[425px]">
       <div className=" flex items-center flex-col">
      <div className=" flex items-center justify-center bg-[#F3DDDD] w-20 h-20 rounded-full"><Image src={'/images/trash.png'} alt="Loading..." width={40} height={40}></Image></div>
      <h2 className=" text-black text-2xl font-bold text-center w-72 mt-3 font-SamsungSharpSansBold">Do you want to delete this tweet?</h2>
      <div className=" mt-9 mb-3 flex gap-12">
        <p className=" bg-[#CACACA] text-black w-[109px] h-10 rounded-lg flex items-center justify-center cursor-pointer font-SamsungSharpSansBold tracking-[.5px]">Cancel</p>
        <button className=" bg-black text-white w-[109px] h-10 rounded-lg font-SamsungSharpSansBold tracking-[.5px]">Delete</button>
      </div>
      </div>
      </DialogContent> }
    </Dialog>
  </PopoverContent>
       
    </Popover>
          </div>
        </>
    )
}