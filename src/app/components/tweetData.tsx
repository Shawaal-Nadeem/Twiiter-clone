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
  const getContext = useContext(context);
  const mode = getContext.mode;
  const [like, updateLike] = useState(false);
  let num = data.likesNumber;
  const [countLike, updateCountLike] = useState(num);
  const toggleLike = () => {
    if (like === false) {
      updateLike(true);
      if (countLike >= 0) updateCountLike(countLike + 1);
    } else if (like === true) {
      updateLike(false);
      if (countLike > 0) updateCountLike(countLike - 1);
    }
  };

  // Tweet Data Return
  return (
    <div key={index} className={mode === false ? "flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg " : "flex flex-col w-[100%] border-[.5px] border-gray bg-black"}>
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
              {data.time} {data.unit} ago
            </p>
          </div>
        </div>
        <MorePopup />

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
  return (
    <div>
      {tweetContent.map(TweetData)}
    </div>
  )
}

