'use client'
import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"

export const HomeBox=() => {
    const getContext = useContext(context);
    const mode = getContext.mode;
    return (
        <div
            className="w-[90%] box-border cursor-pointer h-[136px] rounded-b-[10px] bg-[#EAEAEA] dark:bg-[#121212]">
           <Link href={'/home'}>
            <div
              className=" h-[72px] mt-[57px]  mb-[0px] ml-[6px] mr-[6px] rounded-[10px] bg-white flex gap-3 items-center justify-center dark:bg-black">
              
           <Image src={mode===false?'/images/home-2.png':'/images/home-2w.png'} alt="Loading..." width={19} height={19}></Image> 
          <p className={mode===false?" text-black font-bold font-SamsungSharpSansBold":" text-white font-bold font-SamsungSharpSansBold"}>Home</p>
              </div>
              </Link>
          </div>
    )
}