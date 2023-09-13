'use client'
import { ThemeSwitcher } from "./themeSwitcher"
import Image from "next/image"
import tweets from "../utils/mock"
import { useState } from "react"
import Link from "next/link"
export const MobileNavbar = () => {
    const [show, setShow] = useState(false);
    
    const tweetContent = tweets.filter((item: any) => {
        return item;
      });
    const myProfileData = tweetContent.find((item: any) => {
        if (item.slug === "my-profile") return item;
        else return null;
    });
    const togglePopup = () => {
        if (show === false) return setShow(true);
        else return setShow(false)
    }
    return (
        <>
        <div
        className=" w-[100%] py-6 flex flex-col border-[.5px] mb-2 border-b-gray  bg-mainBg  lmd:hidden dark:bg-black">
        <div className="w-[90%] m-auto flex items-center justify-between">
            <div onClick={()=>{togglePopup()}} className=" cursor-pointer">
          <img
            src={myProfileData?.profile}
            alt=""
            className="w-[44px] h-[44px] rounded-[36px]"
          />
          </div>
          <Image src={"/images/X.png"} alt="" width={55} height={55}></Image>
          <ThemeSwitcher />
            </div>

            </div>
            
            {show===true?<div onClick={()=>{setShow(false)}} className=" h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center"></div>:null}
           
            {show === true ?
            <>
        {/* Popup Card */}
        <div className=" z-10 absolute top-20 left-7">
          <div className="w-28 h-32 bg-white rounded-2xl flex flex-col justify-center font-PoppinsMedium" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <Link href={'/home'}><div className="ml-3 cursor-pointer">Home</div></Link>
            <hr className=" mt-2 mb-2 border-1 border-[#CACACA]" />
            <Link href={`/profiles/my-profile`}><div className="ml-3 cursor-pointer">My Profile</div></Link>
            <hr className=" mt-2 mb-2 border-1 border-[#CACACA]" />
            <Link href={'/'}><div className="ml-3 cursor-pointer">Logout</div></Link>
          </div>
          </div>
      </>
      :null}
        </>
    )
}