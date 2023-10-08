'use client'
import { TweetData } from "./tweetData";
import Image from "next/image";
import { useContext,useEffect } from "react";
import { context } from "@/contextAPI/contextApi";
import { Settings } from "./settingIcon";
export const UniqueProfileData = ({ props }: { props: string }) => {
  const getContext = useContext(context);
  const tweet = getContext.tweet;
  const setTweet = getContext.setTweet;
  const triggerGetApi = getContext.triggerGetApi;
  const setTriggerGetApi = getContext.setTriggerGetApi;
  useEffect(() => {
    setTriggerGetApi(false);
    console.log('Get API')
    const getApi = async () => {
      try {
        const api = await fetch(`https://65054b57ef808d3c66efe2ce.mockapi.io/todos/api/Twitter`);
        const json = await api.json();
        console.log(json);
        setTweet(json.reverse());
      }
      catch (error) {
        console.log(`Error in getApi are : ${error}`);
      }
    }
    getApi();
  }, [triggerGetApi]);

  const email = getContext.email;
  const setEmail = getContext.setEmail;
  const password = getContext.password;
  const setPassword = getContext.setPassword;
  useEffect(() => {
    const getUserData = async () => {
      console.log('Profile Box');
      const api = await fetch(`https://65054b57ef808d3c66efe2ce.mockapi.io/todos/api/users/1`);
      const json = await api.json();
      let email = json.email;
      let password = json.password;
      if (email) {
        setEmail(email);
      }
      if (password) {
        setPassword(password);
      }

    }
    getUserData();
  },[])
  const profileData = tweet.find((temp: any) => {
  return temp.slug === props;
  }) as any;
  const name = getContext.name;
  const mode = getContext.mode;
  const show = getContext.showSettingBehind;
  const setShow = getContext.setShowSettingBehind;
  const show1 = getContext.showEditProfileBehind;
  const setShow1 = getContext.setShowEditProfileBehind;

  let dataTweet = tweet.filter((temp:any) => { return profileData?.email === temp.email && profileData?.password === temp.password })
  let dataTweetLength = dataTweet.length;
  const TweetDataProfile = (data: any) => {
    // Tweet Data Return
    return (
      <div
        className="flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg dark:bg-[#121212]"
      >
        {show === true ? <div onClick={() => { setShow(false) }} className="  h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center"></div> : null}
        <div className=" flex justify-center w-full mt-7">
          <div className=" flex justify-center w-[full]"> <Image src={data?.profile} alt="Loading..." width={180} height={180} className={profileData?.slug === 'my-profile' ? " rounded-full " : " rounded-full"}></Image></div>
          {profileData?.email === email && profileData?.password===password ? <>
            {/* Setting Popover */}
            <Settings profileData={profileData} />
          </> : null}
        </div>
        
        <div className=" flex flex-col items-center mt-5 mb-12">
        {profileData?.slug==='my-profile'?<p className={mode === false ? " font-bold text-lg text-[black] font-SamsungSharpSansBold" : " font-bold text-lg text-[white] font-SamsungSharpSansBold"}>{name}</p>
:<p className={mode === false ? " font-bold text-lg text-[black] font-SamsungSharpSansBold" : " font-bold text-lg text-[white] font-SamsungSharpSansBold"}>{data?.username}</p>
}
          <p className=" font-semibold text-[#787878] font-SamsungSharpSans text-sm">{profileData?.email}</p>
        </div>
        {profileData?.email === email && profileData?.password===password ? <h4 className={mode === false ? " text-[black] text-2xl ml-5 font-SamsungSharpSansBold mb-2" : " font-SamsungSharpSansBold text-[white] text-2xl ml-5 mb-2"}>My Posts</h4> : <h4 className={mode === false ? " font-SamsungSharpSansBold text-[black] text-2xl ml-5" : " font-SamsungSharpSansBold text-[white] text-2xl ml-5"}>Posts</h4>}

        {dataTweetLength > 0 ? dataTweet.map(TweetData) : null}
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