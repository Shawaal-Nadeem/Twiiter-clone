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
        <div className=" flex justify-center w-full mt-7">
          <div className=" flex justify-center w-[95%]"> <Image src={data.profile} alt="Loading..." width={180} height={180} className={profileData.slug === 'my-profile' ? " rounded-full ml-5 " : " rounded-full"}></Image></div>
          {profileData.slug === 'my-profile' ? <>
            {/* PopOver Component ShadCN */}
            <div className=" mt-5 mr-3">
              <Popover>
                <PopoverTrigger asChild onClick={() => setShow(false)}>
                  <Image src={mode === false ? '/images/setting-2.png' : '/images/setting-2w.png'} alt="Loading..." width={20} height={20} className="cursor-pointer"></Image>
                </PopoverTrigger>

                <PopoverContent className="w-30 h-24">
                  <Dialog>
                    <DialogTrigger asChild onClick={() => setShow(true)}>
                      <p className="text-sm text-muted-foreground cursor-pointer text-center font-PoppinsMedium">Edit Profile</p>
                    </DialogTrigger>
                    <hr className=" w-full border border-solid border-[#CACACA] mt-[10px]" />
                    <DialogTrigger asChild onClick={() => setShow(false)}>
                      <p className="text-sm text-muted-foreground cursor-pointer mt-[10px] text-center font-PoppinsMedium">Copy Link</p>
                    </DialogTrigger>
                    {show === true ? <DialogContent className="sm:max-w-[375px]">
                      <div className=" flex items-center flex-col">
                        <h3 className=" text-black font-bold text-xl font-SamsungSharpSansBold">Edit Profile</h3>
                        <hr className=" w-full border border-[#CACACA] mt-3" />
                        <p className=" mt-7 flex justify-self-start font-semibold text-black font-SamsungSharpSansBold">Change Username</p>
                        <input onChange={(e) => { nameUpdate(e.target.value) }} className=" pl-3 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-72 h-10 mt-5 font-PoppinsLight" placeholder={name} ></input>
                        <button className=" bg-black text-white w-[105px] h-8 rounded-lg mt-5 font-SamsungSharpSansBold" onClick={(() => { setShow(false) })}>Update</button>
                      </div>
                    </DialogContent>
                      : null}
                  </Dialog>
                </PopoverContent>

              </Popover>
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