'use client'
import Image from "next/image"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"
import { log } from "console"

export const DeleteTweetPopup = (props2: any) => {
  const getContext = useContext(context);
  const show2 = getContext.showDeleteTweet;
  const setShow2 = getContext.setShowDeleteTweet;
  const tweet = getContext.tweet;
  const setTweet = getContext.setTweet;
  let newTweets = tweet;
  let newIndex = props2.indexValue;
  let newId = props2.idValue;
  console.log(newId);
  
  let mainIndex=newTweets.findIndex(checkIndex);
  function checkIndex(obj: any) {
    return newId==obj.id
  }
  const ToggleShowTweetPopup = () => {
    if (show2 === false) {
      setShow2(true);
    }
    else {
      setShow2(false);
    }
  }
  let len: number
  const deleteTweet = () => {
    newTweets.splice(mainIndex, 1)
    for(let i=0;i<newTweets.length;i++){
      newTweets[i].id=i;
    }
    setTweet(newTweets);
  }
  // Stop state to dom
  const handlePopupBackgroundClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <>
      {show2 === true ?
        // Popup Transpart BG
        <div onClick={() => { ToggleShowTweetPopup() }} className=" bg-[#FFFFFF80] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
          {/* Popup Card */}
          <div onClick={handlePopupBackgroundClick} className=" bg-white rounded-3xl flex items-center justify-center" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <div className="w-[400px] h-[310px]">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleShowTweetPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
              </div>
              <div className="w-full">
                <div className=" flex items-center flex-col">
                  <div className=" flex items-center justify-center bg-[#F3DDDD] w-20 h-20 rounded-full"><Image src={'/images/trash.png'} alt="Loading..." width={40} height={40}></Image></div>
                  <h2 className=" text-black text-2xl font-bold text-center w-72 mt-3 font-SamsungSharpSansBold">Do you want to delete this tweet?</h2>
                  <div className=" mt-9 mb-3 flex gap-12">
                    <button onClick={() => { ToggleShowTweetPopup() }} className=" bg-[#CACACA] text-black w-[109px] h-10 rounded-lg flex items-center justify-center cursor-pointer font-SamsungSharpSansBold tracking-[.5px]">Cancel</button>
                    <button onClick={() => { ToggleShowTweetPopup(); deleteTweet() }} className=" bg-black text-white w-[109px] h-10 rounded-lg font-SamsungSharpSansBold tracking-[.5px]">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
    </>
  )
}