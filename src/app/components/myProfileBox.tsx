'use client'
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"
export const MyProfileBox = ({myProfileData}:{myProfileData:any}) => {
    const getContext = useContext(context);
  const mode = getContext.mode;
  const name = getContext.name;
    return (
        <div className="w-[90%] box-border cursor-pointer h-[136px] rounded-b-[10px] bg-[#EAEAEA] dark:bg-[#121212]">
            <div className="flex items-center justify-center">
              <p className="text-[0.875rem] mt-[22px] font-[700] leading-[normal] tracking-[-0.056px] font-SamsungSharpSansBold  dark:text-white ">
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
                  {name}
                </p>
                <p className="text-grayLight slg:text-[0.625rem] lg:text-[0.57rem] lmd:text-[0.50rem]  font-[500] leading-[normal] tracking-[-0.04px] font-SamsungSharpSansMedium">
                  {myProfileData?.email}
                </p>
              </div>
              </Link>
            </div>
          </div>
    )
}