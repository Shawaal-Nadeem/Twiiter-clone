'use client'
import Image from "next/image"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"
import { useState } from "react"
import { EditProfilePopup } from "./editProfilePopup"

export const Settings = ({profileData}:{profileData:any}) => {
    
  const getContext = useContext(context);
  const mode = getContext.mode;
    const show = getContext.showSettingBehind;
    const setShow = getContext.setShowSettingBehind;
    const Toggle = () => {
        if (show === false) return setShow(true);
        else return setShow(false);
    }
    const [option, setOption] = useState(false);
    const setShow1 = getContext.setShowEditTweet;
  return (
        <>
            {/* Setting Popover */}
            <div className=" mt-5 mr-3">
       <div className=" absolute z-10 right-2"> 
       <Image onClick={()=>{Toggle()}} src={mode === false ? '/images/setting-2.png' : '/images/setting-2w.png'} alt="Loading..." width={20} height={20} className="cursor-pointer"></Image>
       </div>
                {show === true ? <div className="z-[10] absolute top-36 -right-16">
                <div className="bg-white w-44 h-44 rounded-2xl" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
                <div className=" flex justify-end pt-3 pr-3"><Image onClick={()=>{setShow(false)}} src={'/images/Group 13.png'} alt="Loading..." width={15} height={15} className=" cursor-pointer"></Image></div>
                <div><h3 className="text-black font-bold text-lg font-SamsungSharpSansBold text-center">Settings</h3></div>
                <hr className=" border-1 border-[#CACACA] mt-3"/>
                <div className=" font-PoppinsMedium">
                <p onClick={()=>{setOption(true),Toggle(),setShow1(true)}} className=" mt-3 ml-3 cursor-pointer">Edit Profile</p>    
                <hr className=" border-1 border-[#CACACA] mt-3"/>
                <p className=" mt-3 ml-3">Copy Link</p>    
                </div>
                </div>
       </div>:null}
        {option === true ? <EditProfilePopup profileData={ profileData} />:null}
         </div>
        
        </>
    )
}