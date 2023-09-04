"use client";
import tweets from "@/app/utils/mock";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";
import { useState } from "react";
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




function profilesData(data: any) {
  slug: data.slug;
}

export async function generateStaticParams() {
  return tweets.map(profilesData);
}

type ProfileData = {
  params: {
    slug: string;
  };
};

export default function ProfileDetails({ params }: ProfileData) {
  const profileData = tweets.find((temp) => {
    return temp.slug === params.slug;
  }) as any;

  let dataTweet = tweets.filter((temp) => { return profileData.username === temp.username })

  const getContext = useContext(context);
  const mode = getContext.mode;
  const setMode = getContext.setMode;

  const setTheme = () => {
    if (mode === false) setMode(true);
    else if (mode === true) setMode(false);
  };
  const [tweetAdd, updateAdd] = useState(false);
  const addTweet = () => {
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


  const TweetData = (data: any) => {
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
      <div
        className={
          mode === false
            ? "flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg "
            : "flex flex-col w-[100%] border-[.5px] border-gray bg-black"
        }
      >
        <div className=" flex justify-center w-full mt-7"> 
          <div className=" flex justify-center w-[95%]"> <Image src={data.profile} alt="Loading..." width={180} height={180} className={profileData.slug==='my-profile'?" rounded-full ml-5 ":" rounded-full"}></Image></div>
          {profileData.slug === 'my-profile' ? <div>
            {/* PopOver Component ShadCN */}
       <div className=" mt-5 mr-3">
        <Popover>
      <PopoverTrigger asChild onClick={()=>setShow(false)}>
      <Image src={mode === false ? '/images/setting-2.png' : '/images/setting-2w.png'} alt="Loading..." width={20} height={20} className="cursor-pointer"></Image>
      </PopoverTrigger>
     
      <PopoverContent className="w-30 h-24">
      <Dialog>
      <DialogTrigger asChild onClick={()=>setShow(true)}>
        <p className="text-sm text-muted-foreground cursor-pointer text-center font-PoppinsMedium">Edit Profile</p>
        </DialogTrigger>
        <hr className=" w-full border border-solid border-[#CACACA] mt-[10px]"/>
        <DialogTrigger asChild onClick={()=>setShow(false)}>
        <p className="text-sm text-muted-foreground cursor-pointer mt-[10px] text-center font-PoppinsMedium">Copy Link</p>
      </DialogTrigger>
      {show===true?<DialogContent className="sm:max-w-[375px]">
        <div className=" flex items-center flex-col">
      <h3 className=" text-black font-bold text-xl font-SamsungSharpSansBold">Edit Profile</h3>
      <hr className=" w-full border border-[#CACACA] mt-3" />
      <p className=" mt-7 flex justify-self-start font-semibold text-black font-SamsungSharpSansBold">Change Username</p>
      <input className=" pl-3 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-72 h-10 mt-5 font-PoppinsLight" placeholder={profileData.username} ></input>
      <button className=" bg-black text-white w-[105px] h-8 rounded-lg mt-5 font-SamsungSharpSansBold">Update</button>
      </div>
      </DialogContent>
      : null }
    </Dialog>
  </PopoverContent>
       
    </Popover>
          </div>
            </div> : null}
         </div>
        
        <div className=" flex flex-col items-center mt-5 mb-12">
          <p className={mode===false?" font-bold text-lg text-[black] font-SamsungSharpSansBold":" font-bold text-lg text-[white] font-SamsungSharpSansBold"}>{profileData.username}</p>
          <p className=" font-semibold text-[#787878] font-SamsungSharpSans text-sm">{profileData.email}</p>
        </div>
        {profileData.slug==='my-profile'?<h4 className={mode === false ? " text-[black] text-2xl ml-5 font-SamsungSharpSansBold" : " font-SamsungSharpSansBold text-[white] text-2xl ml-5"}>My Posts</h4>:<h4 className={mode === false ? " font-SamsungSharpSansBold text-[black] text-2xl ml-5" : " font-SamsungSharpSansBold text-[white] text-2xl ml-5"}>Posts</h4>}
        
        {dataTweet.map(function display(temp: any, index: number) {
          return (
            <div key={index} className=" flex border-t-[1px] border-t-[#CACACA] w-full mt-4">
              <div className="flex flex-col w-[95%]">
         <div className=" ml-5 mt-5 mb-5 flex gap-1 items-center">
         <Image src={temp.profile} alt="Loading..." width={30} height={30} className=" rounded-full"></Image>
        <p  className={
              mode === false
                ? "ml-[6px] mt-[2px] text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold"
                : "ml-[6px] mt-[2px] text-white text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold"
            }>{temp.username}</p>
        <p
            className="ml-[6px] mt-[3px]  text-grayLight text-[10px] font-[500] 
          leading-[normal] tracking-[-0.04px] font-PoppinsMedium"
          >
            {temp.time}
            {temp.unit} ago
              </p>
              </div>
              <p  className={
            mode === false
              ? "ml-[60px] mt-[1px] w-[280px] text-[12px] font-[400] leading-[normal] tracking-[-0.04px] self-start font-PoppinsLight"
              : "ml-[60px] mt-[1px] text-[#fff] w-[280px] text-[12px] font-[400] leading-[normal] tracking-[-0.04px] self-start font-PoppinsLight"
          }>{temp.content}</p>
          {data.contentImage === null ? (
          <div className="hidden"></div>
        ) : (
          <div>
            <img
              src={temp.contentImage}
              alt="Loading..."
              className="ml-[58px] mt-[17px] w-[240px] h-[240px] rounded-[13px] flex-shrink-0"
            />
          </div>
              )}
                 <div className="flex items-center w-[100%] mt-[25px]  mb-[22px] ">
          {mode === false ? (
            <Image
              onClick={() => {
                toggleLike();
              }}
              src={
                like === false
                  ? "/images/heartWhite.png"
                  : "/images/heartRed.png"
              }
              alt=""
              width={16}
              height={16}
              className="ml-[17px] cursor-pointer "
            ></Image>
          ) : (
            <Image
              onClick={() => {
                toggleLike();
              }}
              src={
                like === false
                  ? "/images/heartWhite.png"
                  : "/images/heartRed.png"
              }
              alt=""
              width={16}
              height={16}
              className="ml-[17px] cursor-pointer "
            ></Image>
          )}
          <p
            className="ml-[5px] text-grayLight text-[10px] font-[500] 
          leading-[normal] tracking-[-0.04px] font-PoppinsMedium"
          >
            {countLike} Likes
          </p>
          {/* Comments popup */}
          
      <Dialog>
      <DialogTrigger asChild className=" flex">
      <Image
            src={
              mode === false ? "/images/message.png" : "/images/message.png"
            }
            alt=""
            width={16}
            height={16}
            className="ml-[14px] cursor-pointer"
          ></Image>
        
        </DialogTrigger>
        <DialogTrigger asChild>
        <p
            className="ml-[5px]  text-grayLight text-[10px] font-[500] 
          leading-[normal] tracking-[-0.04px] cursor-pointer font-PoppinsMedium"
          >

            view all {temp.commentsNumber} comments
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
          <p className=" text-black text-[13px] font-[500] 
          leading-[normal] w-72 font-PoppinsLight">{myProfileData?.content}</p>
          </div>
          </div>
          <div className=" flex justify-center mt-3">
          <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA]"/>
          </div>
          <div className=" ml-4 mt-4">
          <div className=" flex items-center gap-2">
          <img src={myProfileData?.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
         <p className=" font-bold text-sm font-SamsungSharpSansBold">{myProfileData?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{myProfileData?.time}{myProfileData?.unit}</p>
          </div>
          <div className=" ml-10">
          <p className=" text-black text-[13px] font-[500] 
          leading-[normal] w-72 font-PoppinsLight">{myProfileData?.content}</p>
          </div>
          </div>
          <div className=" flex justify-center mt-3">
          <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA]"/>
          </div>
          <div className=" ml-4 mt-4">
          <div className=" flex items-center gap-2">
          <img src={myProfileData?.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
         <p className=" font-bold text-sm font-SamsungSharpSansBold">{myProfileData?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{myProfileData?.time}{myProfileData?.unit}</p>
          </div>
          <div className=" ml-10">
          <p className=" text-black text-[13px] font-[500] 
          leading-[normal] w-72 font-PoppinsLight">{myProfileData?.content}</p>
          </div>
          </div>
          <div className=" flex justify-center mt-3">
          <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA]"/>
          </div>
          <div className=" ml-4 mt-4">
          <div className=" flex items-center gap-2">
          <img src={myProfileData?.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
         <p className=" font-bold text-sm font-SamsungSharpSansBold">{myProfileData?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{myProfileData?.time}{myProfileData?.unit}</p>
          </div>
          <div className=" ml-10">
          <p className=" text-black text-[13px] font-[500] 
          leading-[normal] w-72 font-PoppinsLight">{myProfileData?.content}</p>
          </div>
          </div>
          <div className=" flex justify-center mt-3">
          <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA]"/>
          </div>
          <div className=" ml-4 mt-4">
          <div className=" flex items-center gap-2">
          <img src={myProfileData?.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
         <p className=" font-bold text-sm font-SamsungSharpSansBold">{myProfileData?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{myProfileData?.time}{myProfileData?.unit}</p>
          </div>
          <div className=" ml-10">
          <p className=" text-black text-[13px] font-[500] 
          leading-[normal] w-72 font-PoppinsLight">{myProfileData?.content}</p>
          </div>
          </div>
          <div className=" flex justify-center mt-3">
          <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA]"/>
          </div>
          <div className=" ml-4 mt-4">
          <div className=" flex items-center gap-2">
          <img src={myProfileData?.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
         <p className=" font-bold text-sm font-SamsungSharpSansBold">{myProfileData?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{myProfileData?.time}{myProfileData?.unit}</p>
          </div>
          <div className=" ml-10">
          <p className=" text-black text-[13px] font-[500] 
          leading-[normal] w-72 font-PoppinsLight">{myProfileData?.content}</p>
          </div>
          </div>
          <div className=" flex justify-center mt-3">
          <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA]"/>
          </div>
          <div className=" ml-4 mt-4">
          <div className=" flex items-center gap-2">
          <img src={myProfileData?.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
         <p className=" font-bold text-sm font-SamsungSharpSansBold">{myProfileData?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{myProfileData?.time}{myProfileData?.unit}</p>
          </div>
          <div className=" ml-10">
          <p className=" text-black text-[13px] font-[500] 
          leading-[normal] w-72 font-PoppinsLight">{myProfileData?.content}</p>
          </div>
          </div>
          <div className=" flex justify-center mt-3">
          <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA]"/>
          </div>
          <div className=" ml-4 mt-4">
          <div className=" flex items-center gap-2">
          <img src={myProfileData?.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
         <p className=" font-bold text-sm font-SamsungSharpSansBold">{myProfileData?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{myProfileData?.time}{myProfileData?.unit}</p>
          </div>
          <div className=" ml-10">
          <p className=" text-black text-[13px] font-[500] 
          leading-[normal] w-72 font-PoppinsLight">{myProfileData?.content}</p>
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
          {/* PopOver Component ShadCN */}
       <div className=" mt-5 mr-3">
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
          )
        })}

        </div>
    );
  };
  return (
    <div
      className={` w-full bg-clip-content flex flex-col lmd:flex lmd:flex-row ${
        mode === false ? `bg-white` : `bg-black`
      }`}
    >
      <div
        className={
          mode === false
            ? " w-[100%] py-6 flex border-[.5px] mb-2 border-b-gray  bg-mainBg  lmd:hidden"
            : " w-[100%] py-6 flex border-[.5px] mb-2 border-b-gray  bg-black  lmd:hidden"
        }
      >
        <div className="w-[90%] m-auto flex items-center justify-between">
          <img
            src={myProfileData?.profile}
            alt=""
            className="w-[44px] h-[44px] rounded-[36px]"
          />
          <Image src={"/images/X.png"} alt="" width={55} height={55}></Image>
          <Image
            onClick={() => {
              setTheme();
            }}
            src={
              mode === false
                ? "/images/light mode icon.png"
                : "/images/dark mode icon.png"
            }
            alt=""
            width={44}
            height={44}
            className=" cursor-pointer rounded-[36px] "
          ></Image>
        </div>
      </div>

      {/* Left Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh] relative">
     
        <div
          className={
            mode === false
              ? "w-[25vw] h-[100vh]  flex flex-col items-center  fixed"
              : "w-[25vw] h-[100vh] bg-black  flex flex-col items-center  fixed"
          }
        >
          <div
            className={
              mode === false
                ? "w-[90%] box-border cursor-pointer h-[136px] rounded-b-[10px] bg-[#EAEAEA]"
                : "w-[90%] box-border cursor-pointer h-[136px] rounded-b-[10px] bg-[#121212]"
            }
          >
           <Link href={'/home'}>
            <div
              className={
                mode === false
                  ? " h-[72px] mt-[57px]  mb-[0px] ml-[6px] mr-[6px] rounded-[10px] bg-white flex gap-3 items-center justify-center "
                  : " h-[72px] mt-[57px]  mb-[0px] ml-[6px] mr-[6px] rounded-[10px] bg-black flex gap-3 items-center justify-center"
              }
            >
              
           <Image src={mode===false?'/images/home-2.png':'/images/home-2w.png'} alt="Loading..." width={19} height={19}></Image> 
          <p className={mode===false?" text-black font-bold font-SamsungSharpSansBold":" text-white font-bold font-SamsungSharpSansBold"}>Home</p>
              </div>
              </Link>
          </div>
          <div
            className={
              mode === false
                ? " border-[5px] cursor-pointer mt-[60vh] border-mainBg rounded-[10px] w-[90%]"
                : " border-[5px] cursor-pointer mt-[60vh] border-[#121212] rounded-[10px] w-[90%]"
            }
          >
            <Link href={"/"}>
              <button
                className={
                  mode === false
                    ? "w-[100%] flex justify-center py-[13px]  text-[0.875rem] font-[700] leading-[normal] tracking-[-0.056px] font-SamsungSharpSansBold"
                    : "w-[100%] flex justify-center py-[13px] text-white  text-[0.875rem] font-[700] leading-[normal] tracking-[-0.056px] font-SamsungSharpSansBold"
                }
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mid Side */}
      <div className="w-[100%] h-[100vh] m-auto relative overflow-x-hidden lmd:w-[50vw]  ">
        <div
          className={
            mode === false
              ? "w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px]  border-b-[1px] border-gray bg-mainBg"
              : "w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px] border-b-[1px] border-gray bg-black"
          }
        >
          <Image
            src={"/images/X.png"}
            alt=""
            width={34}
            height={34}
            className="mt-[15px] mb-[17px]"
          ></Image>
        </div>
        {TweetData(profileData)}
        {tweetAdd === false ? (
          <div
            onClick={() => {
              addTweet();
            }}
            className={`fixed top-0 mt-[85vh] right-0 mr-[12px] ${
              mode === false
                ? `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex lmd:hidden justify-center items-center bg-black`
                : `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex lmd:hidden justify-center items-center bg-white fixed top-0 mt-[85vh] z-20`
            }`}
          >
            <Image
              src={
                mode === false ? "/images/Group 4.png" : "/images/Group 4w.png"
              }
              alt=""
              width={45}
              height={45}
            ></Image>
          </div>
        ) : (
          <div
            className={
              mode === false
                ? "bg-black w-[135px] flex lmd:hidden items-center h-[60px] fixed top-0 mt-[85vh] right-0 mr-[12px] rounded-[36px]"
                : "bg-white w-[135px] flex lmd:hidden items-center h-[60px] fixed top-0 mt-[85vh] right-0 mr-[12px] rounded-[36px] z-10"
            }
          >
            <div
              className={mode === false ? "flex w-[100%] " : "flex w-[100%] "}
            >
              <div
                className={
                  mode === false
                    ? "w-[50%] flex justify-center border-r-[1px] py-[0.5em] border-grayLight"
                    : "w-[50%] flex  justify-center border-r-[1px] py-[0.5em] border-grayLight"
                }
              >
                <Image
                  src={
                    mode === false
                      ? "/images/gallery-add1.png"
                      : "/images/gallery-add.png"
                  }
                  alt=""
                  width={24}
                  height={24}
                ></Image>
              </div>
              <div className="w-[50%] flex justify-center py-[0.5em]">
                <Image
                  src={
                    mode === false
                      ? "/images/edit-light.png"
                      : "/images/edit-dark.png"
                  }
                  alt=""
                  width={24}
                  height={24}
                ></Image>
              </div>
            </div>
            <div
              onClick={() => {
                addTweet();
              }}
              className="absolute left-[108px] cursor-pointer bottom-[45px]"
            >
              <Image
                src={"/images/close-circle.png"}
                alt=""
                width={22}
                height={22}
              ></Image>
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh]  ">
        <div
          className={
            mode === false
              ? "w-[25vw] h-[100vh] fixed flex  "
              : "w-[25vw] bg-black h-[100vh] fixed"
          }
        >
          <div className="flex flex-col w-[100%] relative z-0">
            <Image
              onClick={() => {
                setTheme();
              }}
              src={
                mode === false
                  ? "/images/light mode icon.png"
                  : "/images/dark mode icon.png"
              }
              alt=""
              width={44}
              height={44}
              className=" cursor-pointer absolute top-[23px] right-0 mr-[36px]"
            ></Image>

            {tweetAdd === false ? (
              <div
                onClick={() => {
                  addTweet();
                }}
                className={`absolute  top-0 mt-[80vh] right-0 mr-[28px] ${
                  mode === false
                    ? `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex justify-center items-center bg-black`
                    : `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex justify-center items-center bg-white absolute top-0 mt-[80vh] z-20`
                }`}
              >
                <Image
                  src={
                    mode === false
                      ? "/images/Group 4.png"
                      : "/images/Group 4w.png"
                  }
                  alt="Loading...."
                  width={55}
                  height={55}
                ></Image>
              </div>
            ) : (
              <div
                className={
                  mode === false
                    ? "bg-black w-[135px] flex items-center h-[60px] absolute top-0 mt-[80vh] right-0 mr-[28px] rounded-[36px]"
                    : "bg-white w-[135px] flex items-center h-[60px] absolute top-0 mt-[80vh] right-0 mr-[28px] rounded-[36px] z-10"
                }
              >
                <div
                  className={
                    mode === false ? "flex w-[100%] " : "flex w-[100%] "
                  }
                >
                  <div
                    className={
                      mode === false
                        ? "w-[50%] flex justify-center border-r-[1px] py-[0.5em] border-grayLight"
                        : "w-[50%] flex  justify-center border-r-[1px] py-[0.5em] border-grayLight"
                    }
                  >
                    <Image
                      src={
                        mode === false
                          ? "/images/gallery-add1.png"
                          : "/images/gallery-add.png"
                      }
                      alt="Loading ...."
                      width={24}
                      height={24}
                    ></Image>
                  </div>
                  <div className="w-[50%] flex justify-center py-[0.5em]">
                    <Image
                      src={
                        mode === false
                          ? "/images/edit-light.png"
                          : "/images/edit-dark.png"
                      }
                      alt=""
                      width={24}
                      height={24}
                    ></Image>
                  </div>
                </div>
                <div
                  onClick={() => {
                    addTweet();
                  }}
                  className="absolute left-[108px] cursor-pointer bottom-[45px]"
                >
                  <Image
                    src={"/images/close-circle.png"}
                    alt=""
                    width={22}
                    height={22}
                  ></Image>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    
    </div>
  )
}