'use client'
import Image from "next/image"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"
// let mainIndex = 0;
export const EditTweetPopup = (props2: any) => {
  const getContext = useContext(context);
  const show1 = getContext.showEditProfileBehind;
  const setShow1 = getContext.setShowEditProfileBehind;
  const tweet = getContext.tweet;
  const setTweet = getContext.setTweet;
  let newTweets = tweet;
  let newIndex = props2.indexValue;
  let newId = props2.idValue;
  // console.log(newId);
  
  // mainIndex = newTweets.findIndex(checkIndex);
  

  function checkIndex(obj: any) {
    return newId === obj.id
  }
  const ToggleShowTweetPopup = () => {
    if (show1 === false) {
      setShow1(true);
    }
    else {
      setShow1(false);
    }
  }
  // Stop state to dom
  const handlePopupBackgroundClick = (event: any) => {
    event.stopPropagation();
  };
  let updatedTweet: string;
  const editTweet = (tweet: any) => {
    updatedTweet = tweet;
  }
  const updateTweet = () => {
    for (let i = 0; i < newTweets.length; i++) {
      if (newId === newTweets[i].id) {
        newTweets[i].content = updatedTweet
        setTweet(newTweets)
        break;
      }
    }
    
  }
  return (
    <>
      {show1 === true ?
        // Popup Transpart BG
        <div onClick={() => { ToggleShowTweetPopup() }} className=" bg-[#FFFFFF80] dark:bg-[#00000080] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
          {/* Popup Card */}
          <div onClick={handlePopupBackgroundClick} className=" bg-white dark:bg-black rounded-3xl flex items-center justify-center max-lmd:w-[85%]" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <div className="w-[400px] h-[350px]">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleShowTweetPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
              </div>
              <div className="w-full">
                <h3 className="text-black dark:text-white font-bold text-xl font-SamsungSharpSansBold text-center">Edit Tweet</h3>
                <hr className=" border border-[#CACACA] dark:border-[#242424] mt-2" />
                <div className=" flex flex-col items-center bg-white dark:bg-black">
                  <textarea onChange={(e) => { editTweet(e.target.value) }} className=" mt-8 border border-solid border-[#CACACA] focus:outline-none rounded-2xl w-80 h-36 pt-3 pl-3 pr-3 font-PoppinsLight text-base dark:bg-black placeholder:text-[#787878] max-lmd:w-[85%]" placeholder="There is no such thing as “Sad” You are either happy where you are OR You are furiously motivated to change something." ></textarea>
                  <button onClick={() => { ToggleShowTweetPopup(); updateTweet() }} className=" bg-black dark:bg-white text-white dark:text-black w-[112px] h-10 rounded-lg mt-6 font-SamsungSharpSansBold">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
    </>
  )
}