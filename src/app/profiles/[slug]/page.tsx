import tweets from "@/app/utils/mock";
import Image from "next/image";
import { RightSideHome } from "@/app/components/rightSideHome";
import { ThemeSwitcher } from "@/app/components/themeSwitcher";
import { AddIconMobile } from "@/app/components/addIconMobile";
import { LogoutButton } from "@/app/components/logoutButton";
import { UniqueProfileData } from "@/app/components/uniqueProfileData";
import { HomeBox } from "@/app/components/homeBox";


function profilesData(data: any) {
  slug: data.slug;
}

export async function generateStaticParams() {
  return tweets.map(profilesData);
}

type ProfileData = {
  params: {
    slug: string;
  };
};

export default function ProfileDetails({ params }: ProfileData) {
   
  const tweetContent = tweets.filter((item: any) => {
    return item;
  });
  const myProfileData = tweetContent.find((item: any) => {
    if (item.slug === "my-profile") return item;
    else return null;
  });

  return (
    <div
      className="w-full bg-clip-content flex flex-col lmd:flex lmd:flex-row bg-white dark:bg-black"
    >
      <div
        className=" w-[100%] py-6 flex border-[.5px] mb-2 border-b-gray  bg-mainBg  lmd:hidden dark:bg-black">
        <div className="w-[90%] m-auto flex items-center justify-between">
          <img
            src={myProfileData?.profile}
            alt=""
            className="w-[44px] h-[44px] rounded-[36px]"
          />
          <Image src={"/images/X.png"} alt="" width={55} height={55}></Image>
          <ThemeSwitcher/>
        </div>
      </div>

      {/* Left Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh] relative">
     
        <div
          className="w-[25vw] h-[100vh]  flex flex-col items-center  fixed dark:bg-black">
          <HomeBox/>
          <LogoutButton/>
        </div>
      </div>

      {/* Mid Side */}
      <div className="w-[100%] h-[100vh] m-auto relative overflow-x-hidden lmd:w-[50vw]  ">
        <div
          className="w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px]  border-b-[1px] border-gray bg-mainBg dark:bg-black">
          <Image
            src={"/images/X.png"}
            alt=""
            width={34}
            height={34}
            className="mt-[15px] mb-[17px]"
          ></Image>
        </div>
        <UniqueProfileData props={params.slug} />
        <AddIconMobile />
      </div>

      <RightSideHome/>
    
    </div>
  )
}