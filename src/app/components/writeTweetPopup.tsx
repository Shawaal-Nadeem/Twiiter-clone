'use client'
import Image from "next/image"
import { useState } from "react";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";
import tweets from "../utils/mock";
let getTweets = tweets;
export const WriteTweetPopup = () => {

  // When click on + icon and then we click on screen

  const getContext = useContext(context);
  const mode = getContext.mode;
  const showP = getContext.show;
  const setShowP = getContext.setShow;
  const tweetAdd = getContext.tweetAdd;
  const updateAdd = getContext.updateAdd;
  const tweet = getContext.tweet;
  const setTweet = getContext.setTweet;
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
  const handlePopupBackgroundClick = (event: any) => {
    event.stopPropagation();
  };
  // Tweet Adding 
  let tweetObj = {
    profile: "/images/myprofile.jpeg",
    username: "Codenest",
    slug: "my-profile",
    email: "codenest6@gmail.com",
    time: 1,
    unit: "m",
    content: "",
    contentImage: null,
    likesNumber: 0,
    commentsNumber: 0,
    password: 'cdn23',
    id: 0
  }
  const enterTweet = (tweet: any) => {
    tweetObj.content = tweet;
  }
  const addNewTweet = () => {
    getTweets.unshift(tweetObj)
    let newTweets = getTweets;
    for (let i = 0; i < getTweets.length; i++) {
      newTweets[i].id = i;
    }
    console.log(newTweets);
    setTweet(newTweets)
  }
  return (
    <>

      {/* Write Tweet Popup */}
      {showTweetPopup === true ?
        // Popup Transpart BG
        <div onClick={() => { ToggleShowTweetPopup() }} className=" bg-[#FFFFFF80] dark:bg-[#00000080] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
          {/* Popup Card */}
          <div onClick={handlePopupBackgroundClick} className=" bg-white dark:bg-black rounded-3xl flex items-center justify-center max-lmd:w-[80%]" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <div className="w-[400px] h-[300px] max-lmd:w-full">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleShowTweetPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
              </div>
              <div className="w-full">
                <h3 className="text-black dark:text-white ml-7 font-bold text-xl font-SamsungSharpSansBold">Whats on your mind?</h3>
                <div className=" flex flex-col items-center bg-white dark:bg-black">
                  <textarea onChange={(e) => { enterTweet(e.target.value) }} className=" mt-6 border border-solid border-[#CACACA] dark:border-[#242424] dark:bg-black focus:outline-none rounded-lg w-[340px] h-32 pt-3 pl-3 pr-3 font-PoppinsLight max-lmd:w-[80%]" ></textarea>
                  <button onClick={() => { ToggleShowTweetPopup(); addNewTweet() }} className=" bg-black dark:bg-white text-white dark:text-black w-[109px] h-10 rounded-lg mt-5 font-SamsungSharpSansBold">Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null}

      <div onClick={() => { ToggleShowTweetPopup() }} className=" w-[50%] flex justify-center py-[0.5em] cursor-pointer">
        <Image onClick={() => { AddTweet() }} src={mode === false ? "/images/edit-light.png" : "/images/edit-dark.png"} alt="" width={24} height={24}></Image>
      </div>
    </>
  )
}