import tweets from "../utils/mock";
import Image from "next/image";
import { LogoutButton } from "../components/logoutButton";
import { ThemeSwitcher } from "../components/themeSwitcher";
import { MyProfileBox } from "../components/myProfileBox";
import { AddIconMobile } from "../components/addIconMobile";
import { RightSideHome } from "../components/rightSideHome";
import { TweetDataCall } from "../components/tweetData";

export default function Home() {
  const tweetContent = tweets.filter((item: any) => {
    return item;
  });
  const myProfileData = tweetContent.find((item: any) => {
    if (item.slug === "my-profile") return item;
    else return null;
  });

  // Main Function Return
  return (
    <div
      className=" w-full bg-clip-content flex flex-col lmd:flex lmd:flex-row bg-white  dark:bg-black">
      <div className=" w-[100%] py-6 flex border-[.5px] mb-2 border-b-gray bg-mainBg lmd:hidden dark:bg-black">
        <div className="w-[90%] m-auto flex items-center justify-between">
          <img src={myProfileData?.profile} alt="" className="w-[44px] h-[44px] rounded-[36px]" />
          <Image src={"/images/X.png"} alt="" width={55} height={55}></Image>
          <div className=" cursor-pointer rounded-[36px] ">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Left Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh] relative">

        <div className="w-[25vw] h-[100vh] flex flex-col items-center  fixed dark:bg-black">
          <MyProfileBox myProfileData={myProfileData} />
          <LogoutButton />
        </div>
      </div>

      {/* Mid Side */}
      <div className="w-[100%] m-auto relative overflow-x-hidden lmd:w-[50vw]  ">
        <div className="w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px]  border-b-[1px] border-gray bg-mainBg dark:bg-black">
          <Image src={"/images/X.png"} alt="" width={34} height={34} className="mt-[15px] mb-[17px]"></Image>
        </div>
        <TweetDataCall/>
        <AddIconMobile />
      </div>

      <RightSideHome />

    </div>
  );
}
