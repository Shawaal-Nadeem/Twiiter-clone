'use client'
import Image from "next/image"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"
import { useState } from "react"

export const EditProfilePopup = ({profileData}:{profileData:any}) => {
    const getContext = useContext(context);
    const show1 = getContext.showEditProfileBehind;
    const setShow1 = getContext.setShowEditProfileBehind;
    const ToggleShowTweetPopup = () => {
        if (show1 === false) {     
            setShow1(true);
        }
        else {
            setShow1(false);
      }
    }
    // Stop state to dom
    const handlePopupBackgroundClick = (event:any) => {
       event.stopPropagation();
    };
    const [name, setName] = useState(profileData.username);
    const updateName = (newName: string) => {
      setName(newName);
      }
    return (
        <>
             {show1 === true ?
      // Popup Transpart BG
          <div onClick={() => { ToggleShowTweetPopup() }} className=" bg-[#FFFFFF80] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
             {/* Popup Card */}
            <div onClick={handlePopupBackgroundClick} className=" bg-white rounded-3xl flex items-center justify-center" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
              <div className="w-[400px] h-[270px]">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleShowTweetPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
          </div>
          <div className="w-full">
          <h3 className="text-black ml-7 font-bold text-xl font-SamsungSharpSansBold text-center">Edit Profile</h3>
          <hr className=" border border-[#242424] mt-2"/>
          <div className=" flex flex-col items-center bg-white">
          <div className="mt-7 w-72"><label className=" font-SamsungSharpSansBold text-black text-md ml-1">Change Username</label></div>
         <input onChange={(e)=>{updateName(e.target.value)}} className=" pl-3 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-72 h-10 mt-3 font-PoppinsLight" placeholder={profileData.username} ></input>
         <button onClick={()=>{ToggleShowTweetPopup()}} className=" bg-black text-white w-[109px] h-10 rounded-lg mt-6 font-SamsungSharpSansBold">Update</button>
          </div>
          </div>
            </div>
      </div>
  </div>
                : null}
        </>
          
    )
}