'use client'
import Link from "next/link";
import tweets from "../utils/mock";
import { MorePopup } from "./morePopup";
import { CommentsPopup } from "./commentsPopup";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { context } from "@/contextAPI/contextApi";

const tweetContent = tweets.filter((item: any) => {
  return item;
});
let indexNum: any;
let idNum: any;
export const TweetData = (data: any, index: any) => {
  const profileData = tweets.find((item: any) => {
    if (item.slug === "my-profile") return item;
    else return null;
  });
  const getContext = useContext(context);
  const mode = getContext.mode;
  // const like = getContext.like;
  // const updateLike = getContext.updateLike;
  // const [like,updateLike]=useState(false);
  const tweetLikes = getContext.like;
  const setTweetLikes = getContext.updateLike;
  // const countLike = getContext.countLike;
  // const updateCountLike = getContext.updateCountLike;
  const tweet = getContext.tweet;
  const setTweet=getContext.setTweet;

  let mainIndex = tweet.findIndex(checkIndex);
  function checkIndex(obj: any) {
    return data.id === obj.id
  }
  const like = tweetLikes[mainIndex] || false;


  const toggleLike = () => {
    const newLikes = [...tweetLikes]; // Create a copy of the likes array
    newLikes[mainIndex] = !like; // Toggle the like state for this tweet
    let arr = tweet
    if (like === true) {
      if (arr[mainIndex].likesNumber == 0) {
        arr[mainIndex].likesNumber = 0
        setTweet(arr)
      }
      else
      {
        arr[mainIndex].likesNumber -= 1
        setTweet(arr)
      }
    }
    else if (like === false) {
      arr[mainIndex].likesNumber += 1
      setTweet(arr)
    }
    setTweetLikes(newLikes); // Update the likes array in the context
  };
  let num = data.likesNumber;


  let props = {
    idNum: data.id,
    data: data
  }

  // Tweet Data Return
  return (
    <div key={index} className="flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg dark:bg-[#121212]">
      <div className=" flex justify-between">
        <div className="flex w-[80%] mt-[7px]">
          <div>
            <Link href={`/profiles/${data.slug}`}>
              <img className="ml-[17px] mt-[15px] w-[32px] h-[32px] rounded-[32px] flex-shrink-0" src={data.profile} alt="" />
            </Link>
          </div>
          <div className=" flex items-center">
            <Link href={`/profiles/${data?.slug}`}>
              <h1 className={mode === false ? "ml-[6px] mt-[2px] text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold" : "ml-[6px] mt-[2px] text-white text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold"}>
                {data.username}
              </h1>
            </Link>
            <p className="ml-[6px] mt-[2px]  text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] font-PoppinsMedium">
              {data.time}{data.unit} ago
            </p>
          </div>
        </div>
        <MorePopup {...props} />

      </div>
      <div className={mode === false ? "ml-[55px] mt-[1px] w-[280px] text-[12px] font-PoppinsLight font-[500] text-black leading-[normal] tracking-[-0.04px] self-start" : "ml-[55px] mt-[1px] text-[#fff] w-[280px] text-[12px] font-PoppinsLight font-[500] leading-[normal] tracking-[-0.04px] self-start"}>
        {data.content}
      </div>
      {data.contentImage === null ? (
        <div className="hidden"></div>
      ) : (
        <div>
          <img src={data.contentImage} alt="Loading..." className="ml-[58px] mt-[17px] w-[240px] h-[240px] rounded-[13px] flex-shrink-0" />
        </div>
      )}
      <div className="flex items-center w-[100%] mt-[25px]  mb-[22px] ">
        {mode === false ? (
          <Image onClick={() => { toggleLike(); }} src={like === false ? "/images/heartWhite.png" : "/images/heartRed.png"} alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
        ) : (
          <Image onClick={() => { toggleLike(); }} src={like === false ? "/images/heartWhite.png" : "/images/heartRed.png"} alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
        )}
        <p className="ml-[5px] text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] font-PoppinsMedium">
          {data.likesNumber} Likes
        </p>
        <CommentsPopup {...props} />
      </div>
    </div>
  );

};
export const TweetDataCall = () => {
  const getContext = useContext(context);
  const tweet = getContext.tweet;
  const setTweet = getContext.setTweet;
  return (
    <div>
      {tweet.map(TweetData)}
    </div>
  )
}

