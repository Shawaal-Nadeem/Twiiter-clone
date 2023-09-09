'use client'
import Image from "next/image"
import { useState } from "react";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";

export const AddIcon = () => {
    const [tweetAdd, updateAdd] = useState(false);
    const AddTweet = () => {
        if (tweetAdd === false) updateAdd(true);
        else if (tweetAdd === true) updateAdd(false);
    };
    const getContext = useContext(context);
    const mode = getContext.mode;
    return (
        <>
        {tweetAdd === false ? (
            <div onClick={() => { AddTweet();}} className="absolute  top-0 mt-[80vh] right-0 mr-[28px] w-[60px] cursor-pointer h-[60px] rounded-[36px] flex justify-center items-center bg-black dark:bg-white">
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
        </>
    )
}