'use client'
import Image from "next/image"
import { useState } from "react";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";

export const WriteTweetPopup = () => {
  
    // When click on + icon and then we click on screen
  
    const getContext = useContext(context);
    const mode = getContext.mode;
    const showP = getContext.show;
    const setShowP = getContext.setShow;
    const tweetAdd = getContext.tweetAdd;
    const updateAdd = getContext.updateAdd;
    const AddTweet = () => {
        if (tweetAdd === false) {
          updateAdd(true);
          //handle transparent div 
          setShowP(true);
        }
        else if (tweetAdd === true) {
          updateAdd(true);
           //handle transparent div 
           setShowP(false);
        };
      }
    // show write Tweet popup 
    const [showTweetPopup, setShowTweetPopup] = useState(false)
    const ToggleShowTweetPopup = () => {
        if (showTweetPopup === false) {     
            setShowTweetPopup(true);
        }
        else {
            setShowTweetPopup(false);
            updateAdd(false);
      }
    }
    // Stop state to dom
    const handlePopupBackgroundClick = (event:any) => {
       event.stopPropagation();
    };
  
    return (
        <>
            
        {/* Write Tweet Popup */}
        {showTweetPopup === true ?
      // Popup Transpart BG
          <div onClick={() => { ToggleShowTweetPopup() }} className=" bg-[#FFFFFF80] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
             {/* Popup Card */}
            <div onClick={handlePopupBackgroundClick} className=" bg-white rounded-3xl flex items-center justify-center" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
              <div className="w-[400px] h-[300px]">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleShowTweetPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
          </div>
          <div className="w-full">
          <h3 className="text-black ml-7 font-bold text-xl font-SamsungSharpSansBold">Whats on your mind?</h3>
          <div className=" flex flex-col items-center bg-white">
          <textarea className=" mt-6 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-[340px] h-32 pt-3 pl-3 pr-3 font-PoppinsLight" ></textarea>
          <button onClick={()=>{ToggleShowTweetPopup()}} className=" bg-black text-white w-[109px] h-10 rounded-lg mt-5 font-SamsungSharpSansBold">Post</button>
          </div>
          </div>
                </div>
      </div>
  </div>
                : null}
            
            <div  onClick={() => { ToggleShowTweetPopup()}} className=" w-[50%] flex justify-center py-[0.5em] cursor-pointer">
                  <Image onClick={()=>{AddTweet()}} src={ mode === false ? "/images/edit-light.png" : "/images/edit-dark.png"} alt="" width={24} height={24}></Image>
                </div>
        </>
    )
}