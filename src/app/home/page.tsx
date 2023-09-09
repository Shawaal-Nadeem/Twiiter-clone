"use client";
import tweets from "../utils/mock";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { ScrollArea } from "@/components/ui/scroll-area"

import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";


export default function Home() {
  const getContext = useContext(context);
  const mode = getContext.mode;
  const setMode = getContext.setMode;

  const setTheme = () => {
    if (mode === false) setMode(true);
    else if (mode === true) setMode(false);
  };
  const [tweetAdd, updateAdd] = useState(false);
  const AddTweet = () => {
    if (tweetAdd === false) updateAdd(true);
    else if (tweetAdd === true) updateAdd(false);
  };
  const tweetContent = tweets.filter((item: any) => {
    return item;
  });
  const myProfileData = tweetContent.find((item: any) => {
    if (item.slug === "my-profile") return item;
    else return null;
  });


  const TweetData = (data: any, index:number) => {
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

    const [show,setShow]=useState(false);
    // Tweet Data Return
    return (
      <div key={index} className={mode === false ? "flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg " : "flex flex-col w-[100%] border-[.5px] border-gray bg-black"}>
        <div className=" flex justify-between">
          <div className="flex w-[80%] mt-[7px]">
            <div>
          <Link href={`/profiles/${data.slug}`}>
            <img className="ml-[17px] mt-[15px] w-[32px] h-[32px] rounded-[32px] flex-shrink-0" src={data.profile} alt=""/>
              </Link>
              </div>
            <div className=" flex items-center">
              <Link href={`/profiles/${data?.slug}`}>
            <h1 className={ mode === false ? "ml-[6px] mt-[2px] text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold" : "ml-[6px] mt-[2px] text-white text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold"}>
            {data.username}
                </h1>
              </Link>
          <p className="ml-[6px] mt-[2px]  text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] font-PoppinsMedium">
            {data.time} {data.unit} ago
              </p>
              </div>
        </div>
        {/* PopOver Component ShadCN */}
       <div className=" mt-6 mr-3">
        <Popover>
      <PopoverTrigger asChild onClick={()=>setShow(false)}>
        <Image src={'/images/more.png'} alt="Loading...." width={18} height={18} className=" cursor-pointer"></Image>
      </PopoverTrigger>
     
      <PopoverContent className="w-30 h-24">
      <Dialog>
      <DialogTrigger asChild onClick={()=>setShow(true)}>
        <p className="text-sm text-muted-foreground cursor-pointer text-center font-PoppinsMedium">Edit tweet</p>
        </DialogTrigger>
        <hr className=" w-full border border-solid border-[#CACACA] mt-[10px]"/>
        <DialogTrigger asChild onClick={()=>setShow(false)}>
        <p className="text-sm text-muted-foreground cursor-pointer mt-[10px] text-center font-PoppinsMedium">Delete</p>
      </DialogTrigger>
      {show===true?<DialogContent className="sm:max-w-[375px]">
        <div className=" flex items-center flex-col">
      <h3 className=" text-black font-bold text-xl font-SamsungSharpSansBold">Edit Tweet</h3>
      <hr className=" w-full border border-[#CACACA] mt-3" />
      <textarea className=" mt-8 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-72 h-32 pt-3 pl-3 pr-3 font-PoppinsLight" placeholder="Type Tweet..." ></textarea>
      <button className=" bg-black text-white w-[109px] h-10 rounded-lg mt-5 font-SamsungSharpSansBold">Update</button>
      </div>
      </DialogContent>
      : <DialogContent className="sm:max-w-[425px]">
       <div className=" flex items-center flex-col">
      <div className=" flex items-center justify-center bg-[#F3DDDD] w-20 h-20 rounded-full"><Image src={'/images/trash.png'} alt="Loading..." width={40} height={40}></Image></div>
      <h2 className=" text-black text-2xl font-bold text-center w-72 mt-3 font-SamsungSharpSansBold">Do you want to delete this tweet?</h2>
      <div className=" mt-9 mb-3 flex gap-12">
        <p className=" bg-[#CACACA] text-black w-[109px] h-10 rounded-lg flex items-center justify-center cursor-pointer font-SamsungSharpSansBold tracking-[.5px]">Cancel</p>
        <button className=" bg-black text-white w-[109px] h-10 rounded-lg font-SamsungSharpSansBold tracking-[.5px]">Delete</button>
      </div>
      </div>
      </DialogContent> }
    </Dialog>
  </PopoverContent>
       
    </Popover>
          </div>
        
        </div>
        <div className={mode === false ? "ml-[55px] mt-[1px] w-[280px] text-[12px] font-PoppinsLight font-[500] text-black leading-[normal] tracking-[-0.04px] self-start" : "ml-[55px] mt-[1px] text-[#fff] w-[280px] text-[12px] font-PoppinsLight font-[500] leading-[normal] tracking-[-0.04px] self-start"}>
          {data.content}
        </div>
        {data.contentImage === null ? (
          <div className="hidden"></div>
        ) : (
          <div>
            <img src={data.contentImage} alt="Loading..." className="ml-[58px] mt-[17px] w-[240px] h-[240px] rounded-[13px] flex-shrink-0"/>
          </div>
        )}
        <div className="flex items-center w-[100%] mt-[25px]  mb-[22px] ">
          {mode === false ? (
            <Image onClick={() => {toggleLike();}} src={like === false ? "/images/heartWhite.png" : "/images/heartRed.png"} alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
          ) : (
            <Image onClick={() => {toggleLike();}} src={like === false ? "/images/heartWhite.png" : "/images/heartRed.png"} alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
          )}
          <p className="ml-[5px] text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] font-PoppinsMedium">
            {countLike} Likes
          </p>
          {/* Comments popup */}
          
      <Dialog>
      <DialogTrigger asChild className=" flex">
      <Image src={mode === false ? "/images/message.png" : "/images/message.png"} alt="" width={16} height={16} className="ml-[14px] cursor-pointer"></Image>
        
        </DialogTrigger>
        <DialogTrigger asChild>
        <p className="ml-[5px]  text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] cursor-pointer font-PoppinsMedium">
          view all {data.commentsNumber} comments
        </p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] h-[508px]">
       <div className=" flex items-center flex-col">
         <h3 className="text-black font-bold text-xl font-SamsungSharpSansBold">Comments</h3>
         <hr className=" w-full border border-solid border-[#CACACA] mt-[10px]"/>
         <div className=" w-full">
         <ScrollArea className="h-[370px] w-full border-solid border-r-[2px] border-b-[2px] border-l-[2px] border-[#CACACA]">
          {/* Static Data */}
          <div className=" ml-4 mt-4">
          <div className=" flex items-center gap-2">
          <img src={myProfileData?.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
         <p className=" font-bold text-sm font-SamsungSharpSansBold">{myProfileData?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{myProfileData?.time}{myProfileData?.unit}</p>
          </div>
          <div className=" ml-10">
          <p className=" text-black text-[13px] font-[500] leading-[normal] w-72 font-PoppinsLight">{myProfileData?.content}</p>
          </div>
          </div>
          <div className=" flex justify-center mt-3">
          <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA]"/>
          </div>
         </ScrollArea>
         </div>
         <div className=" flex gap-9 mt-3 mb-3  w-full">
          <div className=" flex items-center bg-[#CACACA] w-[300px] h-12 rounded-xl ml-4">
          <input  placeholder="Type your comment here..." className=" focus:outline-none bg-[#CACACA] w-64 ml-4 text-[15px] placeholder:text-[#787878] font-PoppinsLight"></input>
         </div>
         <button className=" bg-black w-12 h-12 flex items-center justify-center rounded-xl">
          <Image src={'/images/send.png'} alt="Loading...." width={23} height={23}></Image>
         </button>
         </div>
       </div>
      </DialogContent>
     </Dialog>  
        </div>
      </div>
    );
  };

  // Main Function Return
  return (
    <div
      className={` w-full bg-clip-content flex flex-col lmd:flex lmd:flex-row ${mode === false ? `bg-white` : `bg-black`}`}>
      <div className={mode === false ? " w-[100%] py-6 flex border-[.5px] mb-2 border-b-gray  bg-mainBg  lmd:hidden" : " w-[100%] py-6 flex border-[.5px] mb-2 border-b-gray  bg-black  lmd:hidden"}>
        <div className="w-[90%] m-auto flex items-center justify-between">
          <img src={myProfileData?.profile} alt="" className="w-[44px] h-[44px] rounded-[36px]"/>
          <Image src={"/images/X.png"} alt="" width={55} height={55}></Image>
          <Image onClick={() => {setTheme();}} src={mode === false ? "/images/light mode icon.png" : "/images/dark mode icon.png"} alt="" width={44} height={44} className=" cursor-pointer rounded-[36px] "></Image>
        </div>
      </div>

      {/* Left Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh] relative">
     
        <div className={mode === false ? "w-[25vw] h-[100vh]  flex flex-col items-center  fixed" : "w-[25vw] h-[100vh] bg-black  flex flex-col items-center  fixed"}>
          <div className={ mode === false ? "w-[90%] box-border cursor-pointer h-[136px] rounded-b-[10px] bg-[#EAEAEA]" : "w-[90%] box-border cursor-pointer h-[136px] rounded-b-[10px] bg-[#121212]"}>
            <div className="flex items-center justify-center">
              <p className={mode === false ? "text-[0.875rem] mt-[22px] font-[700] leading-[normal] tracking-[-0.056px] font-SamsungSharpSansBold" : "text-[0.875rem] mt-[22px] font-[700] leading-[normal] tracking-[-0.056px] text-white font-SamsungSharpSansBold"}>
                My Profile
              </p>
              <Image src={mode === false ? "/images/profileIcon.png" : "/images/profileIconDark.png"} alt="" width={14} height={14} className={"ml-[7px] mt-[22px] flex-shrink-0"}></Image>
            </div>
            <div className={mode === false ? "mt-[18px]  mb-[6px] ml-[6px] mr-[6px] rounded-[10px] bg-white flex items-center " : "mt-[18px]  mb-[6px] ml-[6px] mr-[6px] rounded-[10px] bg-black flex items-center "}>
              <Link href={`/profiles/${myProfileData?.slug}`}>
                <img src={myProfileData?.profile} alt="" className="slg:w-[56px] slg:h-[56px] lg:w-[50px] lg:h-[50px] lmd:w-[40px] lmd:h-[40px]  ml-[9px] my-[8px] flex-shrink-0 rounded-[56px]"/>
            </Link>
            <Link href={`/profiles/${myProfileData?.slug}`}><div className="ml-[7px] box-content">
                <p className={mode === false ? "slg:text-[0.875rem] lg:text-[0.78rem] lmd:text-[0.67rem] font-[700] leading-[normal] tracking-[-0.056px] font-SamsungSharpSansBold" : "slg:text-[0.875rem] lg:text-[0.78rem] lmd:text-[0.67rem]  text-white font-[700] leading-[normal] tracking-[-0.056px] font-SamsungSharpSansBold"}>
                  {myProfileData?.username}
                </p>
                <p className="text-grayLight slg:text-[0.625rem] lg:text-[0.57rem] lmd:text-[0.50rem]  font-[500] leading-[normal] tracking-[-0.04px] font-SamsungSharpSansMedium">
                  {myProfileData?.email}
                </p>
              </div>
              </Link>
            </div>
          </div>
          <div className={ mode === false ? " border-[5px] cursor-pointer mt-[60vh] border-mainBg rounded-[10px] w-[90%]" : " border-[5px] cursor-pointer mt-[60vh] border-[#121212] rounded-[10px] w-[90%]"}>
            <Link href={"/"}>
              <button className={mode === false ? "w-[100%] flex justify-center py-[13px]  text-[0.875rem] font-[700] leading-[normal] tracking-[-0.056px] font-SamsungSharpSansBold" : "w-[100%] flex justify-center py-[13px] text-white  text-[0.875rem] font-[700] leading-[normal] tracking-[-0.056px] font-SamsungSharpSansBold"}>
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mid Side */}
      <div className="w-[100%] m-auto relative overflow-x-hidden lmd:w-[50vw]  ">
        <div className={ mode === false ? "w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px]  border-b-[1px] border-gray bg-mainBg" : "w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px] border-b-[1px] border-gray bg-black"}>
          <Image src={"/images/X.png"} alt="" width={34} height={34} className="mt-[15px] mb-[17px]"></Image>
        </div>
        {tweetContent.map(TweetData)}
        {tweetAdd === false ? (
          <div onClick={() => {AddTweet();}} className={`fixed top-0 mt-[85vh] right-0 mr-[12px] ${mode === false ? `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex lmd:hidden justify-center items-center bg-black` : `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex lmd:hidden justify-center items-center bg-white fixed top-0 mt-[85vh] z-20`}`}>
            <Image src={ mode === false ? "/images/Group 4.png" : "/images/Group 4w.png"} alt="" width={45} height={45}></Image>
          </div>
        ) : (
          <div className={mode === false ? "bg-black w-[135px] flex lmd:hidden items-center h-[60px] fixed top-0 mt-[85vh] right-0 mr-[12px] rounded-[36px]" : "bg-white w-[135px] flex lmd:hidden items-center h-[60px] fixed top-0 mt-[85vh] right-0 mr-[12px] rounded-[36px] z-10"}>
            <div className={mode === false ? "flex w-[100%] " : "flex w-[100%] "}>
              <div className={ mode === false ? "w-[50%] flex justify-center border-r-[1px] py-[0.5em] border-grayLight" : "w-[50%] flex  justify-center border-r-[1px] py-[0.5em] border-grayLight"}>
                <Image src={ mode === false ? "/images/gallery-add1.png" : "/images/gallery-add.png"} alt="" width={24} height={24}></Image>
              </div>
              <div className="w-[50%] flex justify-center py-[0.5em]">
                <Image src={ mode === false ? "/images/edit-light.png" : "/images/edit-dark.png" } alt="" width={24} height={24}></Image>
              </div>
            </div>
            <div onClick={() => {AddTweet();}} className="absolute left-[108px] cursor-pointer bottom-[45px]">
              <Image src={"/images/close-circle.png"} alt="" width={22} height={22}></Image>
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh]  ">
        <div className={ mode === false ? "w-[25vw] h-[100vh] fixed flex  " : "w-[25vw] bg-black h-[100vh] fixed"}>
          <div className="flex flex-col w-[100%] relative z-0">
            <Image onClick={() => {setTheme();}} src={ mode === false ? "/images/light mode icon.png" : "/images/dark mode icon.png" } alt="" width={44} height={44} className=" cursor-pointer absolute top-[23px] right-0 mr-[36px]"></Image>

            {tweetAdd === false ? (
              <div onClick={() => { AddTweet();}} className={`absolute  top-0 mt-[80vh] right-0 mr-[28px] ${ mode === false ? `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex justify-center items-center bg-black` : `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex justify-center items-center bg-white absolute top-0 mt-[80vh] z-20`}`}>
                <Image src={ mode === false ? "/images/Group 4.png" : "/images/Group 4w.png"} alt="Loading...." width={55} height={55}></Image>
              </div>
            ) : (
              <div className={ mode === false ? "bg-black w-[135px] flex items-center h-[60px] absolute top-0 mt-[80vh] right-0 mr-[28px] rounded-[36px]" : "bg-white w-[135px] flex items-center h-[60px] absolute top-0 mt-[80vh] right-0 mr-[28px] rounded-[36px] z-10"}>
                <div className={ mode === false ? "flex w-[100%] " : "flex w-[100%] "}>
                  <div className={mode === false ? "w-[50%] flex justify-center border-r-[1px] py-[0.5em] border-grayLight" : "w-[50%] flex  justify-center border-r-[1px] py-[0.5em] border-grayLight"}>
                    <Image src={ mode === false ? "/images/gallery-add1.png" : "/images/gallery-add.png"} alt="Loading ...." width={24} height={24}></Image>
                  </div>
                  <div className="w-[50%] flex justify-center py-[0.5em]">
                    <Image src={ mode === false ? "/images/edit-light.png" : "/images/edit-dark.png"} alt="" width={24} height={24}></Image>
                  </div>
                </div>
                <div onClick={() => { AddTweet() }} className="absolute left-[108px] cursor-pointer bottom-[45px]">
                  <Image src={"/images/close-circle.png"} alt="" width={22} height={22} ></Image>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    
    </div>
  );
}
