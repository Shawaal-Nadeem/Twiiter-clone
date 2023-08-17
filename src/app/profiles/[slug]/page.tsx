"use client";
import tweets from "@/app/utils/mock";
import Image from "next/image";
import Link from "next/link";
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
  const profileData = tweets.find((temp) => {
    return temp.slug === params.slug;
  }) as any;
  console.log(profileData);
  return (

    <div className=" flex justify-around w-full">
        <div className=" flex justify-end gap-10 w-[70%]">
      <div className=" flex flex-col justify-between sticky top-0 h-[80vh]">
        <div className=" bg-gray-box w-[225px] h-[140px] flex items-end justify-center rounded-b-lg">
        <Link href={'/home'}><div className=" flex items-center justify-center gap-2 bg-white w-52 h-16 mb-2 rounded-lg">
            <Image
              src={"/images/home-2.png"}
              alt="Loading...."
              width={15}
              height={15}
            ></Image>
            <button className=" font-bold">Home</button>
          </div></Link>
        </div>
        <div className=" bg-gray-box w-[222px] h-[53px] flex items-center justify-center rounded-xl ">
        <Link href={'/'}><button className=" bg-white w-52 h-10 rounded-lg font-bold">Logout</button></Link>
        </div>
        </div>

        <div className=" border-r border-b border-l border-solid border-[#CACACA] w-[600px]">
        <div className=" flex items-center justify-center w-full h-[70px] border-b border-solid border-[#CACACA] "><Image src={'/images/X.png'} alt="Loading...." width={35} height={35}></Image></div>
        <div className=" bg-[yellow]">
          <div className=" flex justify-center">
          <div className=" relative"><Image src={profileData.profile} alt="Loading...." width={150} height={150} className=" rounded-full"></Image></div>
          <div className=" absolute z-[1] ml-20 w-5 h-5 rounded-full flex items-center justify-center bg-white"><input type="file" className=" w-4 h-4 rounded-full"></input></div>
          </div>
        </div>
        </div>
      </div>
      
      <div className=" w-[5%] h-[80vh] flex flex-col items-center justify-between sticky top-0">
      <div className=" mt-7 "><Image src={'/images/light mode icon.png'} alt="Loading...." width={45} height={45} ></Image></div>
      <div><Image src={'/images/Group 4.png'} alt="Loading...." width={55} height={55} ></Image></div>
      </div>

    </div>
  );
}
