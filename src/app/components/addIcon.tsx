'use client'
import Image from "next/image"
import { useState } from "react";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";

export const AddIcon = () => {
  const [tweetAdd, updateAdd] = useState(false);
  // When click on + icon and then we click on screen
  const [showP, setShowP] = useState(false);

  const AddTweet = () => {
    if (tweetAdd === false) {
      updateAdd(true);
      //handle transparent div 
      setShowP(true);
    }
    else if (tweetAdd === true) {
      updateAdd(false);
       //handle transparent div 
      setShowP(false);
    };
  }
    const getContext = useContext(context);
  const mode = getContext.mode;
  // show write Tweet popup 
  const [showTweetPopup, setShowTweetPopup] = useState(false);
  const ToggleShowTweetPopup = () => {
    if (showTweetPopup === false) {
      setShowTweetPopup(true);
    }
    else {
      setShowTweetPopup(false);
    }
  }
  // show gallery popup
  const [galleryPopup, setGalleryPopup] = useState(false);
  const ToggleGalleyPopup = () => {
    if (galleryPopup === false) {
      setGalleryPopup(true);
    }
    else {
      setGalleryPopup(false);
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
          <div onClick={() => { setShowTweetPopup(false) }} className=" bg-[#FFFFFF80] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
             {/* Popup Card */}
            <div onClick={handlePopupBackgroundClick} className=" bg-white rounded-3xl flex items-center justify-center">
              <div className="w-[400px] h-[300px]">
              <div className=" flex justify-end">
                <Image onClick={() => { setShowTweetPopup(false) }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
          </div>
          <div className="w-full">
          <h3 className="text-black ml-7 font-bold text-xl font-SamsungSharpSansBold">What's on your mind?</h3>
          <div className=" flex flex-col items-center bg-white">
          <textarea className=" mt-6 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-[340px] h-32 pt-3 pl-3 pr-3 font-PoppinsLight" ></textarea>
          <button onClick={()=>{setShowTweetPopup(false)}} className=" bg-black text-white w-[109px] h-10 rounded-lg mt-5 font-SamsungSharpSansBold">Post</button>
          </div>
          </div>
                </div>
      </div>
  </div>
          : null}
        
        {/* Gallery Popup */}
        {galleryPopup === true ?
      // Popup Transpart BG
         <div onClick={() => { setGalleryPopup(false) }} className=" bg-[#FFFFFF80] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
             {/* Popup Card */}
            <div onClick={handlePopupBackgroundClick} className=" bg-white rounded-3xl flex items-center justify-center">
              <div className="w-[400px] h-[330px]">
              <div className=" flex justify-end">
                <Image onClick={() => { setGalleryPopup(false) }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
          </div>
          <div className="w-full">
          <h3 className="text-black ml-7 font-bold text-lg font-SamsungSharpSansBold">Upload Image</h3>
          <div className=" flex flex-col items-center bg-white">
          <div className=" mt-3"><input type="image" src={'/images/Group 14.png'} alt="Loading...." width={80} height={80}></input></div>
          <div className=" mt-3 max-md:w-[80%]">
              <label className=" text-black font-SamsungSharpSansBold text-lg">Add Caption</label>
              <input className= "flex items-center border-[1.9px] border-solid border-grayLight h-10 rounded-lg outline-none w-[350px] pl-4 placeholder-grayLight max-md:w-[100%] font-SamsungSharpSansMedium text-sm  dark:bg-black text-grayLight "></input>
            </div>
          <button onClick={()=>{setGalleryPopup(false)}} className=" bg-black text-white w-[109px] h-10 rounded-lg mt-5 font-SamsungSharpSansBold">Post</button>
          </div>
          </div>
                </div>
      </div>
  </div>
          : null}
        {/* + Icon Code */}
       
        {/* When Click on + icon then this tranparent div will open, Purpose -> To click on any side of screen to close + icon  */}
        {
          showP===true?<div onClick={()=>{AddTweet()}} className=" -z[1] w-full h-[100vh] fixed left-0 right-0 bottom-0 top-0"></div>:null
        }
        {tweetAdd === false ? (
            <div onClick={() => { AddTweet()}} className="absolute  top-0 mt-[80vh] right-0 mr-[28px] w-[60px] cursor-pointer h-[60px] rounded-[36px] flex justify-center items-center bg-black dark:bg-white">
              <Image src={ mode === false ? "/images/Group 4.png" : "/images/Group 4w.png"} alt="Loading...." width={55} height={55}></Image>
            </div>
          ) : (
            <div className={ mode === false ? "bg-black w-[135px] flex items-center h-[60px] absolute top-0 mt-[80vh] right-0 mr-[28px] rounded-[36px]" : "bg-white w-[135px] flex items-center h-[60px] absolute top-0 mt-[80vh] right-0 mr-[28px] rounded-[36px] z-10"}>
              <div className={ mode === false ? "flex w-[100%] " : "flex w-[100%] "}>
                <div onClick={()=>{ToggleGalleyPopup()}} className={mode === false ? "cursor-pointer w-[50%] flex justify-center border-r-[1px] py-[0.5em] border-grayLight" : "w-[50%] flex  justify-center border-r-[1px] py-[0.5em] border-grayLight"}>
                  <Image onClick={()=>{AddTweet()}} src={ mode === false ? "/images/gallery-add1.png" : "/images/gallery-add.png"} alt="Loading ...." width={24} height={24}></Image>
                </div>
                <div  onClick={() => { ToggleShowTweetPopup()}} className=" w-[50%] flex justify-center py-[0.5em] cursor-pointer">
                  <Image onClick={()=>{AddTweet()}} src={ mode === false ? "/images/edit-light.png" : "/images/edit-dark.png"} alt="" width={24} height={24}></Image>
                </div>
              </div>
              <div onClick={() => { AddTweet() }} className="absolute left-[108px] cursor-pointer bottom-[45px]">
                <Image src={"/images/close-circle.png"} alt="" width={22} height={22} ></Image>
              </div>
            </div>
          )}
        </>
    )
}