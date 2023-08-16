'use client'
import tweets from "../utils/mock"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
    const [mode, setMode] = useState(false)
    const tweetContent = tweets.filter((item: any) => { return item })
    const myProfileData = tweetContent.find((item: any) => {
        if (item.slug === "my profile") return item
        else return null
    })
    const tweetData = (data: any) => {
        const [like, updateLike] = useState(false)
        let num = data.likesNumber;
        const [countLike, updateCountLike] = useState(num)
        const toggleLike = () => {
            if (like === false) {
                updateLike(true)
                if (countLike >= 0)
                    updateCountLike(countLike + 1)
            }
            else if (like === true) {
                updateLike(false)
                if (countLike > 0)
                    updateCountLike(countLike - 1)
            }
        }
        return (
            <div className="flex flex-col w-[100%] border-[1px] border-gray bg-mainBg">
                <div className="flex w-[100%] mt-[17px]">
                    <img className="ml-[17px] w-[32px] h-[32px] rounded-[32px] flex-shrink-0" src={data.profile} alt="" />
                    <h1 className="ml-[6px] mt-[2px] text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px]">{data.username}</h1>
                    <p className="ml-[6px] mt-[3px]  text-grayLight text-[10px] font-[500] 
          leading-[normal] tracking-[-0.04px]">{data.time}{data.unit} ago</p>
                </div>
                <div className="ml-[55px] mt-[-2px] w-[280px] text-[12px] font-[400] leading-[normal] tracking-[-0.04px] self-start">
                    {data.content}
                </div>
                {data.contentImage === null ? <div className="hidden"></div> :
                    <div>
                        <img src={data.contentImage} alt="Loading..." className="ml-[58px] mt-[17px] w-[240px] h-[240px] rounded-[13px] flex-shrink-0" />
                    </div>}
                <div className="flex items-center w-[100%] mt-[25px]  mb-[22px] ">
                    <Image onClick={() => { toggleLike() }} src={like === false ? "/images/heartWhite.jpg" : "/images/heartRed.jpg"}
                        alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
                    <p className="ml-[5px] text-grayLight text-[10px] font-[500] 
          leading-[normal] tracking-[-0.04px]">{countLike} Likes</p>

                    <Image src={"/images/message.jpg"} alt="" width={16} height={16} className="ml-[14px] cursor-pointer"></Image>
                    <p className="ml-[5px]  text-grayLight text-[10px] font-[500] 
          leading-[normal] tracking-[-0.04px]">view all {data.commentsNumber} comments</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-[100vw] bg-clip-content flex">
            <div className="w-[25vw] h-[100vh] relative">
                <div className="w-[25vw] h-[100vh]  flex flex-col items-center  fixed">
                    <div className="w-[90%] box-border cursor-pointer h-[136px] rounded-b-[10px] bg-mainBg">
                        <div className="flex items-center justify-center">
                            <p className="text-[0.875rem] mt-[22px] font-[700] leading-[normal] tracking-[-0.056px]">My Profile</p>
                            <Image src={"/images/profileIcon.jpg"} alt="" width={14} height={14} className="ml-[7px] mt-[22px] flex-shrink-0"></Image>
                        </div>
                        <div className="mt-[18px]  mb-[6px] ml-[6px] mr-[6px] rounded-b-[10px] bg-white flex items-center ">
                            <img src={myProfileData?.profile} alt="" className="w-[56px] h-[56px] ml-[9px] my-[8px] flex-shrink-0 rounded-[56px]" />
                            <div className="ml-[7px] box-content">
                                <p className="text-[0.875rem] font-[700] leading-[normal] tracking-[-0.056px]">{myProfileData?.username}</p>
                                <p className="text-grayLight text-[0.625rem] font-[500] leading-[normal] tracking-[-0.04px]">{myProfileData?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" border-[5px] cursor-pointer mt-[370px] border-mainBg rounded-[10px] w-[70%]">
                        <Link href={'#'}><button className="w-[100%] flex justify-center py-[13px]  text-[0.875rem] font-[700] leading-[normal] tracking-[-0.056px]">Logout</button></Link>
                    </div>

                </div>
            </div>
            <div className="w-[50vw] overflow-x-hidden ">
                <div className="w-[100%] flex justify-center items-center border-l-[1px] border-r-[1px] 
          border-b-[1px] border-gray bg-mainBg">
                    <Image src={"/images/X.png"} alt="" width={34} height={34}
                        className="mt-[15px] mb-[17px]"></Image>
                </div>
                {tweetContent.map(tweetData)}
            </div>
            <div className="w-[25vw] h-[100vh] relative">
                <div className="w-[25vw] h-[100vh] fixed">
                    <Image src={"/images/light mode icon.png"} alt="" width={44} height={44} className="ml-[231px] mt-[23px] cursor-pointer"></Image>
                </div>
            </div>
        </div>
    )
}
