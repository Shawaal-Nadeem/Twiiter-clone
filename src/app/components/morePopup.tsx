'use client'
import Image from "next/image"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"
import { useState } from "react"
import { EditTweetPopup } from "./editTweetPopup"
import { DeleteTweetPopup } from "./deleteTwetPopup"

export const MorePopup = ({profileData}:{profileData:any}) => {
    
  const getContext = useContext(context);
  const mode = getContext.mode;
    const [show, setShow] = useState(false)
    const Toggle = () => {
        if (show === false) return setShow(true);
        else return setShow(false);
    }
  const option=getContext.option;
  const setOption=getContext.setOption
  const option1=getContext.option1;
  const setOption1=getContext.setOption1;
  const setShow1 = getContext.setShowEditProfileBehind;
  const setShow2 = getContext.setShowDeleteTweet;

  return (
    <>
          {show===true?<div onClick={()=>{setShow(false)}} className=" h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center"></div>:null}

            {/* Setting Popover */}
            <div className=" mt-5 mr-3">
       <div className=" absolute z-10 right-2"> 
       <Image onClick={()=>{Toggle()}} src={'/images/more.png'} alt="Loading...." width={18} height={18} className=" cursor-pointer"></Image>
       </div>
                {show === true ? <div className="z-[20] absolute -right-7">
                <div className="bg-white w-[120px] h-20 rounded-2xl" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
                <div className=" font-PoppinsMedium mt-6">
                <p onClick={()=>{setOption(true),Toggle(),setShow1(true)}} className=" text-sm pt-3 ml-3 cursor-pointer text-[#787878]">Edit Tweet</p>    
                <hr className=" border-1 border-[#CACACA] mt-2"/>
                <p onClick={()=>{setOption1(true),Toggle(),setShow2(true)}} className=" mt-1 ml-3 text-[#787878] cursor-pointer text-sm">Delete</p>    
                </div>
                </div>
       </div>:null}
        {option === true ? <EditTweetPopup /> : null}
        {option1 === true ? <DeleteTweetPopup />:null}
         </div>
        
        </>
    )
}