'use client'
import Image from "next/image"
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";
import { WriteTweetPopup } from "./writeTweetPopup";
import { UploadPicPopup } from "./uploadPicPopup";
export const AddIcon = () => {
  // When click on + icon and then we click on screen

  const getContext = useContext(context);
  const mode = getContext.mode;
  const tweetAdd = getContext.tweetAdd;
    const updateAdd = getContext.updateAdd;
  const showP = getContext.show;
  const setShowP = getContext.setShow;

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

    return (
      <>
        
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
                 <UploadPicPopup/>
                  <WriteTweetPopup />
              </div>
              <div onClick={() => { AddTweet() }} className="absolute left-[108px] cursor-pointer bottom-[45px]">
                <Image src={"/images/close-circle.png"} alt="" width={22} height={22} ></Image>
              </div>
            </div>
          )}
        </>
    )
}