'use client'
import Link from "next/link";
import { MorePopup } from "./morePopup";
import { CommentsPopup } from "./commentsPopup";
import Image from "next/image";
import { useContext, useEffect, useState,useRef } from "react";
import { context } from "@/contextAPI/contextApi";
import Cookies from "js-cookie";

export const TweetData = (data: any, index: any) => {
  const getContext = useContext(context);
  const mode = getContext.mode;
  const tweetLikes = getContext.like;
  const setTweetLikes = getContext.updateLike;
  const name = getContext.name;
  
  let props = {
    idNum: data.id,
    data: data
  }
  
  
  const likeTweet = getContext.likeTweet;
  const setLikeTweet = getContext.setLikeTweet;
  
  const temp = (paraId: any) => {
    const setTempValue = getContext.setTempValue;
    const handleValue = getContext.handleValue;
    const setHandleValue = getContext.setHandleValue;
    setTempValue(paraId);
  
    if (handleValue === false) {
      if (tweetLikes === true) {
        console.log('Red');
      } else {
        console.log('White');
      }
      setHandleValue(true);
    } else {
      setHandleValue(false);
    }
  };
  
    
  const email = Cookies.get("email");
  const password = Cookies.get("password");

  const childTemp = (data: any) => {
    console.log('Child Temp Data')
    console.log(data);
    // console.log(data.likeUserIds?.e_mail);
    // console.log(data.likeUserIds?.pass_word);
    const foundEmail = data.likeUserIds?.find((item: any) => { return item.e_mail === email })
    const foundPassword=data.likeUserIds?.find((item:any)=>{return item.pass_word===password})
    if (foundEmail && foundPassword ) {
      console.log('Red');
      return "/images/heartRed.png"
    }
    else
    {
      console.log('White');
        return "/images/heartWhite.png"
      }
  }
  // Tweet Data Return
  return (
    <div key={index}>
  {data.content!==null || data.contentImage!==null?
   <div className="flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg dark:bg-[#121212]">
   <div className=" flex justify-between">
     <div className="flex w-[80%] mt-[7px]">
       <div>
         <Link href={`/profiles/${data.slug}`}>
           <img className="ml-[17px] mt-[15px] w-[32px] h-[32px] rounded-[32px] flex-shrink-0" src={data.profile}  alt="" />
         </Link>
       </div>
       <div className=" flex items-center">
         <Link href={`/profiles/${data?.slug}`}>
           {data.slug==='my-profile'?<h1 className={mode === false ? "ml-[6px] mt-[2px] text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold" : "ml-[6px] mt-[2px] text-white text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold"}>
             {name}
           </h1>:<h1 className={mode === false ? "ml-[6px] mt-[2px] text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold" : "ml-[6px] mt-[2px] text-white text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold"}>
             {data.username}
           </h1>}
         </Link>
         {/* <p className="ml-[6px] mt-[2px]  text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] font-PoppinsMedium">
           {data.time}{data.unit} ago
         </p> */}
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
          <Image onClick={() => {temp(data?.id) }} src={childTemp(data)} alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
       ) :
              (
       <Image onClick={() => {temp(data?.id) }} src={childTemp(data)} alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
            )
      }
     <p className="ml-[5px] text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] font-PoppinsMedium">
       {data.likesNumber} Likes
     </p>
     <CommentsPopup {...props} />
   </div>
 </div>
  :null}
  </div>
   
  );

};




export const TweetDataCall = () => {
  const getContext = useContext(context);
  const tweet = getContext.tweet;
  const setTweet = getContext.setTweet;
  const triggerGetApi = getContext.triggerGetApi;
  const setTriggerGetApi = getContext.setTriggerGetApi;
  const triggerGetApiLikes = getContext.triggerGetApiLikes;

  useEffect(() => {
    if (triggerGetApiLikes === true) {
      console.log('True');
    }
    setTriggerGetApi(false);
    console.log('Get API')
    const getApi = async () => {
      try {
        const api = await fetch(`http://localhost:8000/tweets`);
        const json = await api.json();
        console.log(json);
        setTweet(json.reverse());
      }
      catch (error) {
        console.log(`Error in getApi are : ${error}`);
      }
      setTriggerGetApiLikes(false);
    }
    getApi();
  }, [triggerGetApi,triggerGetApiLikes]);
  

  const email = getContext.email;
  const password = getContext.password;
  const handleValue = getContext.handleValue;
  const setHandleValue = getContext.setHandleValue;
  const tempValue = getContext.tempValue;
  const setTriggerGetApiLikes = getContext.setTriggerGetApiLikes;
  const setLikeTweet = getContext.setLikeTweet;
  useEffect(() => {
    if (handleValue === true) {
      console.log('Liked');
      // Get Current Likes Value
      const currentObj = tweet.find((item: any) => item.id === tempValue);
      console.log('Current Object is : ');
      console.log(currentObj);
      let currentLikes = currentObj.likesNumber;
      // Who likes comment
      let liker = {
        e_mail: email,
        pass_word: password
      };
      let newArr = currentObj.likeUserIds;
      console.log('Array is : ' + newArr);
      // Condition if liker already Like Tweet
      const foundItem = newArr?.find((item: any) => item.e_mail === email && item.pass_word === password);
  
      let updateCurrentLikes: number;
      if (foundItem) {
        const findDeletingIndex = newArr.findIndex((item: any) => foundItem.e_mail === item.e_mail && foundItem.pass_word === item.pass_word);
        newArr.splice(findDeletingIndex, 1);
        console.log('Index is : ' + findDeletingIndex);
        updateCurrentLikes = currentLikes - 1;
        console.log('Negative');
        setLikeTweet(false);
      } else {
        newArr.push(liker);
        updateCurrentLikes = currentLikes + 1;
        console.log('Positive');
        setLikeTweet(true);
      }
  
      // Likes Upload
      const getPersonDetail = async () => {
        const api = await fetch(`http://localhost:8000/tweets/${tempValue}`);
        const json = await api.json();

        const putApi = async () => {
          const api = await fetch(`http://localhost:8000/tweets/${tempValue}`, {
            method: 'PUT',
            body: JSON.stringify({
              profile: "stringprofile.jpeg",
                username: json.username,
                slug: `${json.slug}`,
                email: json.email,
                content: json.content,
                contentImage: json.contentImage,
                commentsNumber: json.commentsNumber,
                password: json.password,
                comments: json.comments,
              likesNumber: updateCurrentLikes,
              likeUserIds: newArr
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
          });
        };
        putApi();
      };
      getPersonDetail();
      setTimeout(() => { setTriggerGetApiLikes(true) }, 1000);
    }
    setHandleValue(false);
  }, [handleValue]);
  

  return (
    <div>
      {tweet.map(TweetData)}
    </div>
  )
}
