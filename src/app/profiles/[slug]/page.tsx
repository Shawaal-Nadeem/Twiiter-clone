import tweets from "@/app/utils/mock";
import Image from "next/image";
import { RightSideHome } from "@/app/components/rightSideHome";
import { AddIconMobile } from "@/app/components/addIconMobile";
import { LogoutButton } from "@/app/components/logoutButton";
import { UniqueProfileData } from "@/app/components/uniqueProfileData";
import { HomeBox } from "@/app/components/homeBox";
import { MobileNavbar } from "@/app/components/mobileNavbar";


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

  return (
    <div
      className="w-full bg-clip-content flex flex-col lmd:flex lmd:flex-row bg-white dark:bg-black"
    > 
     <MobileNavbar/>
      {/* Left Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh] relative">
     
        <div
          className="w-[25vw] h-[100vh]  flex flex-col items-center  fixed dark:bg-black">
          <HomeBox/>
          <LogoutButton/>
        </div>
      </div>

      {/* Mid Side */}
      <div className="w-[100%] h-[100vh] m-auto relative lmd:w-[50vw]  ">
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