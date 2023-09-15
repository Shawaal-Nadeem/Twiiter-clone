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
  
  const copyProfile = async (linkProfile:string) => {
    await navigator.clipboard.writeText(linkProfile)
  }
  return (
        <>
            {/* Setting Popover */}
            <div className=" mt-5 mr-3">
       <div className=" absolute z-10 right-2"> 
       <Image onClick={()=>{Toggle()}} src={mode === false ? '/images/setting-2.png' : '/images/setting-2w.png'} alt="Loading..." width={20} height={20} className="cursor-pointer"></Image>
       </div>
                {show === true ? <div className="z-[10] absolute top-36 -right-16">
                <div className="bg-white dark:bg-black w-44 h-44 rounded-2xl dark:border-[0.1px] dark:border-[#242424]" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
                <div className=" flex justify-end pt-3 pr-3"><Image onClick={()=>{setShow(false)}} src={'/images/Group 13.png'} alt="Loading..." width={15} height={15} className=" cursor-pointer"></Image></div>
                <div><h3 className="text-black dark:text-white font-bold text-lg font-SamsungSharpSansBold text-center">Settings</h3></div>
                <hr className=" border-1 border-[#CACACA] dark:border-[#242424] mt-3"/>
                <div className=" font-PoppinsMedium">
                <p onClick={()=>{setOption(true),Toggle(),setShow1(true)}} className=" mt-3 ml-3 cursor-pointer">Edit Profile</p>    
                <hr className=" border-1 border-[#CACACA] dark:border-[#242424] mt-3"/>
                <p onClick={()=>{copyProfile('twitter-clone-seven-rosy.vercel.app/profiles/my-profile'),Toggle()}} className=" mt-3 ml-3 cursor-pointer">Copy Link</p>    
                </div>
                </div>
       </div>:null}
        {option === true ? <EditProfilePopup profileData={ profileData} />:null}
         </div>
        
        </>
    )
}