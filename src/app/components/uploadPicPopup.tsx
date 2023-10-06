'use client'
import Image from "next/image"
import { useState } from "react";
import { useContext,useEffect } from "react";
import { context } from "@/contextAPI/contextApi";
import tweets from "../utils/mock";
let getTweets = tweets;
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
  const handlePopupBackgroundClick = (event: any) => {
    event.stopPropagation();
  };
  // const setTweet = getContext.setTweet;
  const tweetLikes = getContext.like;
  // let tweetObj = {
  //   profile: "/images/myprofile.jpeg",
  //   username: "Codenest",
  //   slug: "my-profile",
  //   email: "codenest6@gmail.com",
  //   time: 1,
  //   unit: "m",
  //   content: "",
  //   contentImage: "",
  //   likesNumber: 0,
  //   commentsNumber: 0,
  //   password: 'cdn23',
  //   comments: [],
  //   id: 0
  // }
  // const enterTweet = (tweet: any) => {
  //   tweetObj.content = tweet;
  // }
  // const enterURL = (url: any) => {
  //   tweetObj.contentImage = url;
  // }
  // const addNewTweet = () => {
   
  //   getTweets.unshift(tweetObj)
  //   tweetLikes.unshift(false)
  //   let newTweets = getTweets;
  //   for (let i = 0; i < getTweets.length; i++) {
  //     newTweets[i].id = i;
  //   }   
  //   setTweet(newTweets)
  // }

  const tweet = getContext.tweet;
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const myProfileData = tweet.find((para: any) => { return para.email === email && para.password === password });
  const [handleWriteTweet, setHandleWriteTweet] = useState(false);
  const [tweetContent, setTweetContent] = useState('');
  const [tweetPic, setTweetPic] = useState('');

  useEffect(() => {
    console.log(tweetPic); 
    if (handleWriteTweet === true) {
      const postApi = async () => {
        console.log('Entering');
        console.log(tweetPic);
        let slugName = myProfileData.username.replace(/\s/g, '')
        try {
          const api = await fetch(`https://65054b57ef808d3c66efe2ce.mockapi.io/todos/api/Twitter`, {
            method: 'POST',
            body: JSON.stringify({
              profile: myProfileData.profile,
              username: myProfileData.username,
              slug: `${slugName}-profile`,
              email: myProfileData.email,
              time: 1,
              unit: "m",
              content: tweetContent,
              contentImage: tweetPic,
              likesNumber: 0,
              commentsNumber: 0,
              password: myProfileData.password,
              comments: []
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
        })  
         
        }
        catch (error) {
          console.log(`Error in Post Api are : ${error}`);
        }
      }
      postApi();
    }
  }, [handleWriteTweet, tweetPic])
  
  const handlePopupandWriteTweet = () => {
    console.log('Hello');
    setHandleWriteTweet(true);
    // ToggleGalleyPopup();
  }
  const setTriggerGetApi = getContext.setTriggerGetApi;
  if (handleWriteTweet === true) {
    setTimeout(() => {
      setTriggerGetApi(true);
    }, 1000)
    updateAdd(false);
  }

  return (
    <>

      {/* Gallery Popup */}
      {galleryPopup === true ?
        // Popup Transpart BG
        <div onClick={() => { ToggleGalleyPopup() }} className=" bg-[#FFFFFF80] dark:bg-[#00000080] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
          {/* Popup Card */}
          <div onClick={handlePopupBackgroundClick} className=" bg-white dark:bg-black rounded-3xl flex items-center justify-center max-lmd:w-[85%]" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <div className="w-[400px] h-[400px]">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleGalleyPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
              </div>
              <div className="w-full">
                <h3 className="text-black dark:text-white ml-7 font-bold text-lg font-SamsungSharpSansBold">Upload Image</h3>
                <div className=" flex flex-col items-center bg-white dark:bg-black">
                  <div className=" mt-3"><input type="image" src={'/images/Group 14.png'} alt="Loading...." width={80} height={80}></input></div>
                  <div className=" mt-3 max-md:w-[80%]">
                    <label className=" text-black dark:text-[white] font-SamsungSharpSansBold text-lg">Add URL</label>
                    <input onChange={(e)=>{setTweetPic(e.target.value)}} className="flex items-center border-[1.9px] border-solid border-grayLight h-10 rounded-lg outline-none w-[350px] pl-4 placeholder-grayLight max-md:w-[100%] font-SamsungSharpSansMedium text-sm  dark:bg-black text-grayLight "></input>
                  </div>
                  <div className=" mt-3 max-md:w-[80%]">
                    <label className=" text-black dark:text-[white] font-SamsungSharpSansBold text-lg">Add Caption</label>
                    <input onChange={(e)=>{setTweetContent(e.target.value)}} className="flex items-center border-[1.9px] border-solid border-grayLight h-10 rounded-lg outline-none w-[350px] pl-4 placeholder-grayLight max-md:w-[100%] font-SamsungSharpSansMedium text-sm  dark:bg-black text-grayLight "></input>
                  </div>
                  <button onClick={() => {handlePopupandWriteTweet()}} className=" bg-black dark:bg-white text-white dark:text-black w-[109px] h-10 rounded-lg mt-5 font-SamsungSharpSansBold">Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null}

      <div onClick={() => { ToggleGalleyPopup() }} className="cursor-pointer w-[50%] flex justify-center border-r-[1px] py-[0.5em] border-grayLight">
        <Image onClick={() => { AddTweet() }} src={mode === false ? "/images/gallery-add1.png" : "/images/gallery-add.png"} alt="Loading ...." width={24} height={24}></Image>
      </div>
    </>
  )
}