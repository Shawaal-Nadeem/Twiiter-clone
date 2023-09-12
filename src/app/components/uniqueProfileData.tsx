'use client'
import { useState } from "react";
import { TweetData } from "./tweetData";
import Image from "next/image";
import tweets from "../utils/mock";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";
import { CommentsPopup } from "./commentsPopup";
import { MorePopup } from "./morePopup";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings } from "./settingIcon";
export const UniqueProfileData = ({ props }: { props: string }) => {
  const [like, updateLike] = useState(false);

  const profileData = tweets.find((temp) => {
    return temp.slug === props;
  }) as any;

  const [name, setName] = useState(profileData.username);
  const [update, setUpdate] = useState(false);
  const nameUpdate = (newName: string) => {
    setName(newName);
  }

  const [show, setShow] = useState(false);
  let dataTweet = tweets.filter((temp) => { return profileData.username === temp.username })
  console.log(dataTweet);
  const getContext = useContext(context);
  const mode = getContext.mode;

  const TweetDataProfile = (data: any) => {
    // Tweet Data Return
    return (
      <div
      className={
        mode === false
        ? "flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg "
        : "flex flex-col w-[100%] border-[.5px] border-gray bg-black"
      }
      >
        {show===true?<div onClick={()=>{setShow(false)}} className=" fixed w-full h-[100vh]"></div>:null}
        <div className=" flex justify-center w-full mt-7">
          <div className=" flex justify-center w-[full]"> <Image src={data.profile} alt="Loading..." width={180} height={180} className={profileData.slug === 'my-profile' ? " rounded-full " : " rounded-full"}></Image></div>
          {profileData.slug === 'my-profile' ? <>
               {/* Setting Popover */}
       <div className=" mt-5 mr-3">
       <div className=" absolute z-10 right-2"> 
       <Image onClick={()=>{setShow(true)}} src={mode === false ? '/images/setting-2.png' : '/images/setting-2w.png'} alt="Loading..." width={20} height={20} className="cursor-pointer"></Image>
       </div>
                {show === true ? <div className="z-[10] absolute top-36 -right-16">
                <div className="bg-white w-44 h-40 rounded-2xl" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
                <div className=" flex justify-end pt-3 pr-3"><Image onClick={()=>{setShow(false)}} src={'/images/Group 13.png'} alt="Loading..." width={15} height={15} className=" cursor-pointer"></Image></div>
                <div><h3 className="text-black font-bold text-lg font-SamsungSharpSansBold text-center">Settings</h3></div>
                <hr className=" border-1 border-[#CACACA] mt-3"/>
                <div className=" font-PoppinsMedium">
                <p className=" mt-3 ml-3">Edit Profile</p>    
                <hr className=" border-1 border-[#CACACA] mt-3"/>
                <p className=" mt-3 ml-3">Copy Link</p>    
                </div>
                </div>
       </div>:null}
      
         </div>
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