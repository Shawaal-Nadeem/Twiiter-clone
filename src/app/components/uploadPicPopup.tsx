'use client'
import Image from "next/image"
import { useState } from "react";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";

export const UploadPicPopup = () => {
  
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
    // show gallery popup
    const [galleryPopup, setGalleryPopup] = useState(false);
    const ToggleGalleyPopup = () => {
      if (galleryPopup === false) {
        setGalleryPopup(true);
      }
      else {
          setGalleryPopup(false);
          updateAdd(false);
      }
    }
    // Stop state to dom
    const handlePopupBackgroundClick = (event:any) => {
       event.stopPropagation();
    };
  
    return (
        <>
            
         {/* Gallery Popup */}
         {galleryPopup === true ?
      // Popup Transpart BG
         <div onClick={() => { ToggleGalleyPopup() }} className=" bg-[#FFFFFF80] dark:bg-[#00000080] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
             {/* Popup Card */}
            <div onClick={handlePopupBackgroundClick} className=" bg-white dark:bg-black rounded-3xl flex items-center justify-center max-lmd:w-[85%]" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
              <div className="w-[400px] h-[330px]">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleGalleyPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
          </div>
          <div className="w-full">
          <h3 className="text-black dark:text-white ml-7 font-bold text-lg font-SamsungSharpSansBold">Upload Image</h3>
          <div className=" flex flex-col items-center bg-white dark:bg-black">
          <div className=" mt-3"><input type="image" src={'/images/Group 14.png'} alt="Loading...." width={80} height={80}></input></div>
          <div className=" mt-3 max-md:w-[80%]">
              <label className=" text-black dark:text-[white] font-SamsungSharpSansBold text-lg">Add Caption</label>
              <input className= "flex items-center border-[1.9px] border-solid border-grayLight h-10 rounded-lg outline-none w-[350px] pl-4 placeholder-grayLight max-md:w-[100%] font-SamsungSharpSansMedium text-sm  dark:bg-black text-grayLight "></input>
            </div>
          <button onClick={()=>{ToggleGalleyPopup()}} className=" bg-black dark:bg-white text-white dark:text-black w-[109px] h-10 rounded-lg mt-5 font-SamsungSharpSansBold">Post</button>
          </div>
          </div>
                </div>
      </div>
  </div>
          : null}
            
            <div onClick={()=>{ToggleGalleyPopup()}} className="cursor-pointer w-[50%] flex justify-center border-r-[1px] py-[0.5em] border-grayLight">
                  <Image onClick={()=>{AddTweet()}} src={ mode === false ? "/images/gallery-add1.png" : "/images/gallery-add.png"} alt="Loading ...." width={24} height={24}></Image>
                </div>
        </>
    )
}