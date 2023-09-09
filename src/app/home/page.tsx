"use client";
import tweets from "../utils/mock";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";
import { MorePopup } from "../components/morePopup";
import { CommentsPopup } from "../components/commentsPopup";
import { LogoutButton } from "../components/logoutButton";
import { ThemeSwitcher } from "../components/themeSwitcher";
import { MyProfileBox } from "../components/myProfileBox";
import { AddIconMobile } from "../components/addIconMobile";
import { RightSideHome } from "../components/rightSideHome";

export default function Home() {
  const getContext = useContext(context);
  const mode = getContext.mode;

  const tweetContent = tweets.filter((item: any) => {
    return item;
  });
  const myProfileData = tweetContent.find((item: any) => {
    if (item.slug === "my-profile") return item;
    else return null;
  });


  // const TweetData = (data: any, index:number) => {
  //   const [like, updateLike] = useState(false);
  //   let num = data.likesNumber;
  //   const [countLike, updateCountLike] = useState(num);
  //   const toggleLike = () => {
  //     if (like === false) {
  //       updateLike(true);
  //       if (countLike >= 0) updateCountLike(countLike + 1);
  //     } else if (like === true) {
  //       updateLike(false);
  //       if (countLike > 0) updateCountLike(countLike - 1);
  //     }
  //   };

  //   // Tweet Data Return
  //   return (
  //     <div key={index} className={mode === false ? "flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg " : "flex flex-col w-[100%] border-[.5px] border-gray bg-black"}>
  //       <div className=" flex justify-between">
  //         <div className="flex w-[80%] mt-[7px]">
  //           <div>
  //         <Link href={`/profiles/${data.slug}`}>
  //           <img className="ml-[17px] mt-[15px] w-[32px] h-[32px] rounded-[32px] flex-shrink-0" src={data.profile} alt=""/>
  //             </Link>
  //             </div>
  //           <div className=" flex items-center">
  //             <Link href={`/profiles/${data?.slug}`}>
  //           <h1 className={ mode === false ? "ml-[6px] mt-[2px] text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold" : "ml-[6px] mt-[2px] text-white text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold"}>
  //           {data.username}
  //               </h1>
  //             </Link>
  //         <p className="ml-[6px] mt-[2px]  text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] font-PoppinsMedium">
  //           {data.time} {data.unit} ago
  //             </p>
  //             </div>
  //       </div>
  //       <MorePopup/>
        
  //       </div>
  //       <div className={mode === false ? "ml-[55px] mt-[1px] w-[280px] text-[12px] font-PoppinsLight font-[500] text-black leading-[normal] tracking-[-0.04px] self-start" : "ml-[55px] mt-[1px] text-[#fff] w-[280px] text-[12px] font-PoppinsLight font-[500] leading-[normal] tracking-[-0.04px] self-start"}>
  //         {data.content}
  //       </div>
  //       {data.contentImage === null ? (
  //         <div className="hidden"></div>
  //       ) : (
  //         <div>
  //           <img src={data.contentImage} alt="Loading..." className="ml-[58px] mt-[17px] w-[240px] h-[240px] rounded-[13px] flex-shrink-0"/>
  //         </div>
  //       )}
  //       <div className="flex items-center w-[100%] mt-[25px]  mb-[22px] ">
  //         {mode === false ? (
  //           <Image onClick={() => {toggleLike();}} src={like === false ? "/images/heartWhite.png" : "/images/heartRed.png"} alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
  //         ) : (
  //           <Image onClick={() => {toggleLike();}} src={like === false ? "/images/heartWhite.png" : "/images/heartRed.png"} alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
  //         )}
  //         <p className="ml-[5px] text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] font-PoppinsMedium">
  //           {countLike} Likes
  //         </p>
  //         <CommentsPopup commentNum={data.commentsNumber} />
  //       </div>
  //     </div>
  //   );
  // };

  // Main Function Return
  return (
    <div
      className=" w-full bg-clip-content flex flex-col lmd:flex lmd:flex-row bg-white  dark:bg-black">
      <div className=" w-[100%] py-6 flex border-[.5px] mb-2 border-b-gray bg-mainBg lmd:hidden dark:bg-black">
        <div className="w-[90%] m-auto flex items-center justify-between">
          <img src={myProfileData?.profile} alt="" className="w-[44px] h-[44px] rounded-[36px]"/>
          <Image src={"/images/X.png"} alt="" width={55} height={55}></Image>
          <div className=" cursor-pointer rounded-[36px] ">
            <ThemeSwitcher/>
          </div>
        </div>
      </div>

      {/* Left Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh] relative">
     
       <div className= "w-[25vw] h-[100vh] flex flex-col items-center  fixed dark:bg-black">
          <MyProfileBox myProfileData={myProfileData} />
          <LogoutButton/>
        </div>
      </div>

      {/* Mid Side */}
      <div className="w-[100%] m-auto relative overflow-x-hidden lmd:w-[50vw]  ">
        <div className={ mode === false ? "w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px]  border-b-[1px] border-gray bg-mainBg" : "w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px] border-b-[1px] border-gray bg-black"}>
          <Image src={"/images/X.png"} alt="" width={34} height={34} className="mt-[15px] mb-[17px]"></Image>
        </div>
        {/* {tweetContent.map(TweetData)} */}
        <AddIconMobile/>
      </div>

      <RightSideHome/>
    
    </div>
  );
}
