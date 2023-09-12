'use client'
import Image from "next/image"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"
import { useState } from "react"

export const Settings = ({profileData}:{profileData:any}) => {
    
  const getContext = useContext(context);
  const mode = getContext.mode;
  const [show, setShow] = useState(false);
  const [name, setName] = useState(profileData.username);
  const updateName = (newName: string) => {
    setName(newName);
  }
  return (
        <>
          {/* PopOver Component ShadCN */}
       <div className=" mt-5 mr-3">
       
      <Image onClick={()=>{setShow(true)}} src={mode === false ? '/images/setting-2.png' : '/images/setting-2w.png'} alt="Loading..." width={20} height={20} className="cursor-pointer"></Image>
      {show===true?<div className="fixed bg-[yellow] w-full h-[100vh]"></div>:null}

     
        </div>
        </>
    )
    {/* <input onChange={(e)=>{updateName(e.target.value)}} className=" pl-3 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-72 h-10 mt-5 font-PoppinsLight" placeholder={profileData.username} ></input> */}
}