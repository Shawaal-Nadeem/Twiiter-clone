'use client'
import { ThemeSwitcher } from "./themeSwitcher"
import Image from "next/image"
import { useState,useContext,useEffect } from "react"
import Link from "next/link"
import { context } from "@/contextAPI/contextApi"
import Cookies from "js-cookie"

export const MobileNavbar = () => {
    const [show, setShow] = useState(false);

    const togglePopup = () => {
        if (show === false) return setShow(true);
        else return setShow(false)
  }
  const getContext = useContext(context);
  const tweet = getContext.tweet;
  const setEmail = getContext.setEmail;
  const setPassword = getContext.setPassword;
  let getemail =Cookies.get('email');
  let getpassword =Cookies.get('password');

  console.log('Profile Box');

  let email = getemail;
  let password = getpassword;

  useEffect(() => {
    const getUserData =  () => {    

      if (email) {
        setEmail(email);
      }
      if (password) {
        setPassword(password);
      }

    }
    getUserData();
  },[])
  

  let myProfileObj = tweet.find((temp:any) => { return email === temp.email && password === temp.password })
  let myProfile = myProfileObj?.slug;
  let myPic = myProfileObj?.profile;
    return (
        <>
        <div
        className=" w-[100%] py-6 flex flex-col border-[.5px] mb-2 border-b-gray  bg-mainBg  lmd:hidden dark:bg-[#121212]">
        <div className="w-[90%] m-auto flex items-center justify-between">
            <div onClick={()=>{togglePopup()}} className=" cursor-pointer">
          <img
            src={myPic}
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
          <div className="w-28 h-32 bg-white dark:bg-black rounded-2xl flex flex-col justify-center font-PoppinsMedium" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <Link href={'/home'}><div className="ml-3 cursor-pointer">Home</div></Link>
            <hr className=" mt-2 mb-2 border-1 border-[#CACACA] dark:border-[#242424]" />
            <Link href={`/profiles/${myProfile}`}><div className="ml-3 cursor-pointer">My Profile</div></Link>
            <hr className=" mt-2 mb-2 border-1 border-[#CACACA] dark:border-[#242424]" />
            <Link href={'/'}><div className="ml-3 cursor-pointer">Logout</div></Link>
          </div>
          </div>
      </>
      :null}
        </>
    )
}