import tweets from "../utils/mock";
import Image from "next/image";
import { LogoutButton } from "../components/logoutButton";
import { MobileNavbar } from "../components/mobileNavbar";
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
       <MobileNavbar/>

      {/* Left Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh] relative">

        <div className="w-[25vw] h-[100vh] flex flex-col items-center  fixed dark:bg-black">
          <MyProfileBox myProfileData={myProfileData} />
          <LogoutButton />
        </div>
      </div>

      {/* Mid Side */}
      <div className="w-[100%] m-auto relative overflow-x-hidden lmd:w-[50vw] ">
        <div className="w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px]  border-b-[1px] border-gray bg-mainBg dark:bg-[#121212]">
          <Image src={"/images/X.png"} alt="" width={34} height={34} className="mt-[15px] mb-[17px]"></Image>
        </div>
        <TweetDataCall/>
        <AddIconMobile />
      </div>

      <RightSideHome />

    </div>
  );
}
