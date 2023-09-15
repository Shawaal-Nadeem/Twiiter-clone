'use client'
import Image from "next/image"
import { useContext, useState } from "react"
import { context } from "@/contextAPI/contextApi"
import tweets from "../utils/mock"
export const CommentsPopup = ({ commentNum }: { commentNum: number }) => {
    const getContext = useContext(context);
    const mode = getContext.mode;
    const myProfileData = tweets.find((item: any) => {
        if (item.slug === "my-profile") return item;
        else return null;
    });
  const [show, setShow] = useState(false);
  const ToggleShowCommentPopup = () => {
    if (show === false) {     
        setShow(true);
    }
    else {
        setShow(false);
  }
}
// Stop state to dom
const handlePopupBackgroundClick = (event:any) => {
   event.stopPropagation();
};
    return (
        <>
        {show===true?<div onClick={()=>{ToggleShowCommentPopup()}} className=" bg-[#FFFFFF80] dark:bg-[#00000080] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center"></div>:null}

        {/* Comments popup */}
          
      <div onClick={()=>{setShow(true)}} className=" flex">
      <Image src={"/images/message.png"} alt="" width={16} height={16} className="ml-[14px] cursor-pointer"></Image>
        <p className="ml-[5px]  text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] cursor-pointer font-PoppinsMedium">
          view all {commentNum} comments
        </p>
        </div>
         {/* Comment Popup Card */}
        {show === true ?
        <div onClick={()=>{ToggleShowCommentPopup()}} className=" flex items-center justify-center fixed z-30 top-[0%] left-[0%] w-full h-[100vh]">
        <div onClick={handlePopupBackgroundClick} className=" bg-white dark:bg-black rounded-3xl max-lmd:w-[85%] flex justify-center" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
          <div className="w-[400px] h-[485px] max-lmd:w-full">
          <div className=" flex justify-end">
            <Image onClick={() => { ToggleShowCommentPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
      </div>
      <div className="w-full">
      <h3 className="text-black dark:text-white font-bold text-xl font-SamsungSharpSansBold text-center">Comments</h3>
      <hr className=" border border-[#CACACA] dark:border-[#242424] mt-2"/>
      <div className=" flex flex-col items-center h-[310px]  overflow-y-scroll mt-2">
        <div className="  w-[85%] max-lmd:w-[70%]">
        {/* Static Data */}
          <div className=" mt-3">
          <div className=" flex items-center gap-2">
          <img src={myProfileData?.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
         <p className=" font-bold text-sm font-SamsungSharpSansBold">{myProfileData?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{myProfileData?.time}{myProfileData?.unit}</p>
          </div>
          <div className=" ml-10">
          <p className=" text-black dark:text-white text-[13px] font-[500] leading-[normal] w-64 font-PoppinsLight">{myProfileData?.content}</p>
          </div>
          </div>
          <div className=" flex justify-center mt-3">
          <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA] dark:border-[#242424]"/>
          </div>

        </div>
      </div>
      <hr className=" w-full mt-3 border-[1.5px] border-solid border-[#CACACA] dark:border-[#242424]"/>
        <div className=" w-[80%] flex gap-5 mt-3">
        <div className=" flex items-center bg-[#CACACA] dark:bg-[#242424] w-[320px] h-12 rounded-xl ml-4 max-lmd:w-[85%]">
          <input  placeholder="Type your comment here..." className=" focus:outline-none bg-[#CACACA] dark:bg-[#242424] w-[270px] ml-4 mr-4 text-[15px] placeholder:text-[#787878] font-PoppinsLight"></input>
         </div>
         <div>
         <button onClick={()=>{ToggleShowCommentPopup()}} className=" bg-black dark:bg-white w-12 h-12 flex items-center justify-center rounded-xl">
          <Image src={mode===false?'/images/send.png':'/images/sendB.png'} alt="Loading...." width={23} height={23}></Image>
         </button>
         </div>
        </div>
      </div>
        </div>
            </div>
            </div>
        :null}
       
      
    
        </>
    )
}