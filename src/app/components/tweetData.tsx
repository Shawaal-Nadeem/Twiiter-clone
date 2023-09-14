'use client'
import { useState } from "react";
import Link from "next/link";
import tweets from "../utils/mock";
import { MorePopup } from "./morePopup";
import { CommentsPopup } from "./commentsPopup";
import Image from "next/image";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";
const tweetContent = tweets.filter((item: any) => {
  return item;
});

export const TweetData = (data: any, index: number) => {
  const profileData = tweets.find((item: any) => {
    if (item.slug === "my-profile") return item;
    else return null;
  });
  const getContext = useContext(context);
  const mode = getContext.mode;
  const like = getContext.like;
  const updateLike = getContext.updateLike;
  let num = data.likesNumber;
  const countLike = getContext.countLike;
  const updateCountLike = getContext.updateCountLike;
  const option = getContext.option;
  const setOption = getContext.setOption
  const option1 = getContext.option1;
  const setOption1 = getContext.setOption1;
  const setShow1 = getContext.setShowEditProfileBehind;
  const setShow2 = getContext.setShowDeleteTweet;
  const toggleLike = () => {
    if (like === false) {
      updateLike(true);
      if (countLike >= 0) updateCountLike(countLike + 1);
    } else if (like === true) {
      updateLike(false);
      if (countLike > 0) updateCountLike(countLike - 1);
    }
  };
  const [show, setShow] = useState(false)
  const Toggle = () => {
    if (show === false) return setShow(true);
    else return setShow(false);
  }
  // Tweet Data Return
  return (
    <div key={index} className="flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg dark:bg-[#121212]">
      {show === true ? <div onClick={() => { setShow(false) }} className=" h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center"></div> : null}
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
        <div className=" absolute z-10 right-2">
          <Image onClick={() => { Toggle() }} src={'/images/more.png'} alt="Loading...." width={18} height={18} className=" mt-5 mr-3 cursor-pointer"></Image>
        </div>
        {show === true ? <div className="z-[50] mt-5 mr-3 absolute -right-7">
          <div className="bg-white w-[120px] h-20 rounded-2xl" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <div className=" font-PoppinsMedium mt-6">
              <p onClick={() => { setOption(true), Toggle(), setShow1(true) }} className=" text-sm pt-3 ml-3 cursor-pointer text-[#787878]">Edit Tweet</p>
              <hr className=" border-1 border-[#CACACA] mt-2" />
              <p onClick={() => { setOption1(true), Toggle(), setShow2(true) }} className=" mt-1 ml-3 text-[#787878] cursor-pointer text-sm">Delete</p>
            </div>
          </div>
        </div> : null}
        <MorePopup profileData={profileData} />

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
          {countLike} Likes
        </p>
        <CommentsPopup commentNum={data.commentsNumber} />
      </div>
    </div>
  );

};
export const TweetDataCall = () => {
  const getContext = useContext(context);
  const tweet = getContext.tweet;
  const setTweet = getContext.setTweet;
  let newArray = tweet;
  return (
    <div>
      {newArray.map(TweetData)}
    </div>
  )
}

