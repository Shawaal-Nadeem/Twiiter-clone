'use client'
import { useState } from "react";
import { TweetData } from "./tweetData";
import Image from "next/image";
import tweets from "../utils/mock";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";
import { CommentsPopup } from "./commentsPopup";
import { MorePopup } from "./morePopup";
import { Settings } from "./settingIcon";
export const UniqueProfileData = ({ props }: { props: string }) => {

  const profileData = tweets.find((temp) => {
    return temp.slug === props;
  }) as any;

  const [name, setName] = useState(profileData.username);
  const [update, setUpdate] = useState(false);
  const nameUpdate = (newName: string) => {
    setName(newName);
  }

  const getContext = useContext(context);
  const mode = getContext.mode;
  const show = getContext.showSettingBehind;
  const setShow = getContext.setShowSettingBehind;
  const show1 = getContext.showEditProfileBehind;
  const setShow1 = getContext.setShowEditProfileBehind;

  let dataTweet = tweets.filter((temp) => { return profileData.username === temp.username })

  const TweetDataProfile = (data: any) => {
    // Tweet Data Return
    return (
      <div
      className="flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg dark:bg-[#121212]"
      >
        {show===true?<div onClick={()=>{setShow(false)}} className="  h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center"></div>:null}
        <div className=" flex justify-center w-full mt-7">
          <div className=" flex justify-center w-[full]"> <Image src={data.profile} alt="Loading..." width={180} height={180} className={profileData.slug === 'my-profile' ? " rounded-full " : " rounded-full"}></Image></div>
          {profileData.slug === 'my-profile' ? <>
               {/* Setting Popover */}
       <Settings profileData={profileData}/>
          </> : null}
        </div>

        <div className=" flex flex-col items-center mt-5 mb-12">
          <p className={mode === false ? " font-bold text-lg text-[black] font-SamsungSharpSansBold" : " font-bold text-lg text-[white] font-SamsungSharpSansBold"}>{name}</p>
          <p className=" font-semibold text-[#787878] font-SamsungSharpSans text-sm">{profileData.email}</p>
        </div>
        {profileData.slug === 'my-profile' ? <h4 className={mode === false ? " text-[black] text-2xl ml-5 font-SamsungSharpSansBold mb-2" : " font-SamsungSharpSansBold text-[white] text-2xl ml-5 mb-2"}>My Posts</h4> : <h4 className={mode === false ? " font-SamsungSharpSansBold text-[black] text-2xl ml-5" : " font-SamsungSharpSansBold text-[white] text-2xl ml-5"}>Posts</h4>}

        {dataTweet.map(TweetData)}
      </div>
    );
  };
  // Main Function Return
  return (
    <>
      {TweetDataProfile(profileData)}
    </>
  )
}