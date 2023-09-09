'use client'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"
import tweets from "../utils/mock"
export const CommentsPopup = ({ commentNum }: { commentNum: number }) => {
    const getContext = useContext(context);
    const mode = getContext.mode;
    const myProfileData = tweets.find((item: any) => {
        if (item.slug === "my-profile") return item;
        else return null;
      });
    return (
        <>
        {/* Comments popup */}
          
      <Dialog>
      <DialogTrigger asChild className=" flex">
      <Image src={mode === false ? "/images/message.png" : "/images/message.png"} alt="" width={16} height={16} className="ml-[14px] cursor-pointer"></Image>
        
        </DialogTrigger>
        <DialogTrigger asChild>
        <p className="ml-[5px]  text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] cursor-pointer font-PoppinsMedium">
          view all {commentNum} comments
        </p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] h-[508px]">
       <div className=" flex items-center flex-col">
         <h3 className="text-black font-bold text-xl font-SamsungSharpSansBold">Comments</h3>
         <hr className=" w-full border border-solid border-[#CACACA] mt-[10px]"/>
         <div className=" w-full">
         <ScrollArea className="h-[370px] w-full border-solid border-r-[2px] border-b-[2px] border-l-[2px] border-[#CACACA]">
          {/* Static Data */}
          <div className=" ml-4 mt-4">
          <div className=" flex items-center gap-2">
          <img src={myProfileData?.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
         <p className=" font-bold text-sm font-SamsungSharpSansBold">{myProfileData?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{myProfileData?.time}{myProfileData?.unit}</p>
          </div>
          <div className=" ml-10">
          <p className=" text-black text-[13px] font-[500] leading-[normal] w-72 font-PoppinsLight">{myProfileData?.content}</p>
          </div>
          </div>
          <div className=" flex justify-center mt-3">
          <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA]"/>
          </div>
         </ScrollArea>
         </div>
         <div className=" flex gap-9 mt-3 mb-3  w-full">
          <div className=" flex items-center bg-[#CACACA] w-[300px] h-12 rounded-xl ml-4">
          <input  placeholder="Type your comment here..." className=" focus:outline-none bg-[#CACACA] w-64 ml-4 text-[15px] placeholder:text-[#787878] font-PoppinsLight"></input>
         </div>
         <button className=" bg-black w-12 h-12 flex items-center justify-center rounded-xl">
          <Image src={'/images/send.png'} alt="Loading...." width={23} height={23}></Image>
         </button>
         </div>
       </div>
      </DialogContent>
     </Dialog>  
        </>
    )
}