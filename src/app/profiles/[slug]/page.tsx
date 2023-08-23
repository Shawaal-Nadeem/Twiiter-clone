"use client";
import tweets from "@/app/utils/mock";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";
import { useState } from "react";
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
  let data = tweets.filter((temp) => { return profileData.username === temp.username })
  const getContext = useContext(context);
  const mode = getContext.mode;
  const setMode = getContext.setMode;
  const setTheme = () => {
    if (mode === false) setMode(true);
    else if (mode === true) setMode(false);
  };
  const [tweetAdd, updateAdd] = useState(false);
  const addTweet = () => {
    if (tweetAdd === false) updateAdd(true);
    else if (tweetAdd === true) updateAdd(false);
  };
  return (
<div
      className={` w-full bg-clip-content flex flex-col lmd:flex lmd:flex-row ${
        mode === false ? `bg-white` : `bg-black`
      }`}
    >
      <div
        className={
          mode === false
            ? " w-[100%] py-6 flex border-[.5px] mb-2 border-b-gray  bg-mainBg  lmd:hidden"
            : " w-[100%] py-6 flex border-[.5px] mb-2 border-b-gray  bg-black  lmd:hidden"
        }
      >
        <div className="w-[90%] m-auto flex items-center justify-between">
          <img
            src={profileData?.profile}
            alt=""
            className="w-[44px] h-[44px] rounded-[36px]"
          />
          <Image src={"/images/X.png"} alt="" width={55} height={55}></Image>
          <Image
            onClick={() => {
              setTheme();
            }}
            src={
              mode === false
                ? "/images/light mode icon.png"
                : "/images/dark mode icon.png"
            }
            alt=""
            width={44}
            height={44}
            className=" cursor-pointer rounded-[36px] "
          ></Image>
        </div>
      </div>

      {/* Left Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh] relative">
     
        <div
          className={
            mode === false
              ? "w-[25vw] h-[100vh]  flex flex-col items-center  fixed"
              : "w-[25vw] h-[100vh] bg-black  flex flex-col items-center  fixed"
          }
        >
          <div
            className={
              mode === false
                ? "w-[90%] box-border cursor-pointer h-[136px] rounded-b-[10px] bg-[#EAEAEA]"
                : "w-[90%] box-border cursor-pointer h-[136px] rounded-b-[10px] bg-[#121212]"
            }
          >
            <div className="flex items-center justify-center">
              <p
                className={
                  mode === false
                    ? "text-[0.875rem] mt-[22px] font-[700] leading-[normal] tracking-[-0.056px]"
                    : "text-[0.875rem] mt-[22px] font-[700] leading-[normal] tracking-[-0.056px] text-white"
                }
              >
                My Profile
              </p>
              <Image
                src={
                  mode === false
                    ? "/images/profileIcon.png"
                    : "/images/profileIconDark.png"
                }
                alt=""
                width={14}
                height={14}
                className={"ml-[7px] mt-[22px] flex-shrink-0"}
              ></Image>
            </div>
            <div
              className={
                mode === false
                  ? "mt-[18px]  mb-[6px] ml-[6px] mr-[6px] rounded-[10px] bg-white flex items-center "
                  : "mt-[18px]  mb-[6px] ml-[6px] mr-[6px] rounded-[10px] bg-black flex items-center "
              }
            >
              <Link href={`/profiles/${profileData?.slug}`}><img
                src={profileData?.profile}
                alt=""
                className="slg:w-[56px] slg:h-[56px] lg:w-[50px] lg:h-[50px] lmd:w-[40px] lmd:h-[40px]  ml-[9px] my-[8px] flex-shrink-0 rounded-[56px]"
              />
            </Link>
            <Link href={`/profiles/${profileData?.slug}`}><div className="ml-[7px] box-content">
                <p
                  className={
                    mode === false
                      ? "slg:text-[0.875rem] lg:text-[0.78rem] lmd:text-[0.67rem] font-[700] leading-[normal] tracking-[-0.056px]"
                      : "slg:text-[0.875rem] lg:text-[0.78rem] lmd:text-[0.67rem]  text-white font-[700] leading-[normal] tracking-[-0.056px]"
                  }
                >
                  {profileData?.username}
                </p>
                <p className="text-grayLight slg:text-[0.625rem] lg:text-[0.57rem] lmd:text-[0.50rem]  font-[500] leading-[normal] tracking-[-0.04px]">
                  {profileData?.email}
                </p>
              </div>
              </Link>
            </div>
          </div>
          <div
            className={
              mode === false
                ? " border-[5px] cursor-pointer mt-[60vh] border-mainBg rounded-[10px] w-[90%]"
                : " border-[5px] cursor-pointer mt-[60vh] border-[#121212] rounded-[10px] w-[90%]"
            }
          >
            <Link href={"#"}>
              <button
                className={
                  mode === false
                    ? "w-[100%] flex justify-center py-[13px]  text-[0.875rem] font-[700] leading-[normal] tracking-[-0.056px]"
                    : "w-[100%] flex justify-center py-[13px] text-white  text-[0.875rem] font-[700] leading-[normal] tracking-[-0.056px]"
                }
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mid Side */}
      <div className="w-[100%] m-auto relative overflow-x-hidden lmd:w-[50vw]  ">
        <div
          className={
            mode === false
              ? "w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px]  border-b-[1px] border-gray bg-mainBg"
              : "w-[100%] hidden lmd:flex justify-center items-center border-l-[1px] border-r-[1px] border-b-[1px] border-gray bg-black"
          }
        >
          <Image
            src={"/images/X.png"}
            alt=""
            width={34}
            height={34}
            className="mt-[15px] mb-[17px]"
          ></Image>
        </div>
        {/* {tweetContent.map(tweetData)}
        {tweetAdd === false ? (
          <div
            onClick={() => {
              addTweet();
            }}
            className={`fixed top-0 mt-[85vh] right-0 mr-[12px] ${
              mode === false
                ? `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex lmd:hidden justify-center items-center bg-black`
                : `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex lmd:hidden justify-center items-center bg-white fixed top-0 mt-[85vh] z-20`
            }`}
          >
            <Image
              src={
                mode === false ? "/images/Group 4.png" : "/images/Group 4w.png"
              }
              alt=""
              width={45}
              height={45}
            ></Image>
          </div>
        ) : (
          <div
            className={
              mode === false
                ? "bg-black w-[135px] flex lmd:hidden items-center h-[60px] fixed top-0 mt-[85vh] right-0 mr-[12px] rounded-[36px]"
                : "bg-white w-[135px] flex lmd:hidden items-center h-[60px] fixed top-0 mt-[85vh] right-0 mr-[12px] rounded-[36px] z-10"
            }
          >
            <div
              className={mode === false ? "flex w-[100%] " : "flex w-[100%] "}
            >
              <div
                className={
                  mode === false
                    ? "w-[50%] flex justify-center border-r-[1px] py-[0.5em] border-grayLight"
                    : "w-[50%] flex  justify-center border-r-[1px] py-[0.5em] border-grayLight"
                }
              >
                <Image
                  src={
                    mode === false
                      ? "/images/gallery-add1.png"
                      : "/images/gallery-add.png"
                  }
                  alt=""
                  width={24}
                  height={24}
                ></Image>
              </div>
              <div className="w-[50%] flex justify-center py-[0.5em]">
                <Image
                  src={
                    mode === false
                      ? "/images/edit-light.png"
                      : "/images/edit-dark.png"
                  }
                  alt=""
                  width={24}
                  height={24}
                ></Image>
              </div>
            </div>
            <div
              onClick={() => {
                addTweet();
              }}
              className="absolute left-[108px] cursor-pointer bottom-[45px]"
            >
              <Image
                src={"/images/close-circle.png"}
                alt=""
                width={22}
                height={22}
              ></Image>
            </div>
          </div>
        )} */}
      </div>

      {/* Right Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh]  ">
        <div
          className={
            mode === false
              ? "w-[25vw] h-[100vh] fixed flex  "
              : "w-[25vw] bg-black h-[100vh] fixed"
          }
        >
          <div className="flex flex-col w-[100%] relative z-0">
            <Image
              onClick={() => {
                setTheme();
              }}
              src={
                mode === false
                  ? "/images/light mode icon.png"
                  : "/images/dark mode icon.png"
              }
              alt=""
              width={44}
              height={44}
              className=" cursor-pointer absolute top-[23px] right-0 mr-[36px]"
            ></Image>

            {/* {tweetAdd === false ? (
              <div
                onClick={() => {
                  addTweet();
                }}
                className={`absolute  top-0 mt-[80vh] right-0 mr-[28px] ${
                  mode === false
                    ? `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex justify-center items-center bg-black`
                    : `w-[60px] cursor-pointer h-[60px] rounded-[36px] flex justify-center items-center bg-white absolute top-0 mt-[80vh] z-20`
                }`}
              >
                <Image
                  src={
                    mode === false
                      ? "/images/Group 4.png"
                      : "/images/Group 4w.png"
                  }
                  alt="Loading...."
                  width={55}
                  height={55}
                ></Image>
              </div>
            ) : (
              <div
                className={
                  mode === false
                    ? "bg-black w-[135px] flex items-center h-[60px] absolute top-0 mt-[80vh] right-0 mr-[28px] rounded-[36px]"
                    : "bg-white w-[135px] flex items-center h-[60px] absolute top-0 mt-[80vh] right-0 mr-[28px] rounded-[36px] z-10"
                }
              >
                <div
                  className={
                    mode === false ? "flex w-[100%] " : "flex w-[100%] "
                  }
                >
                  <div
                    className={
                      mode === false
                        ? "w-[50%] flex justify-center border-r-[1px] py-[0.5em] border-grayLight"
                        : "w-[50%] flex  justify-center border-r-[1px] py-[0.5em] border-grayLight"
                    }
                  >
                    <Image
                      src={
                        mode === false
                          ? "/images/gallery-add1.png"
                          : "/images/gallery-add.png"
                      }
                      alt="Loading ...."
                      width={24}
                      height={24}
                    ></Image>
                  </div>
                  <div className="w-[50%] flex justify-center py-[0.5em]">
                    <Image
                      src={
                        mode === false
                          ? "/images/edit-light.png"
                          : "/images/edit-dark.png"
                      }
                      alt=""
                      width={24}
                      height={24}
                    ></Image>
                  </div>
                </div>
                <div
                  onClick={() => {
                    addTweet();
                  }}
                  className="absolute left-[108px] cursor-pointer bottom-[45px]"
                >
                  <Image
                    src={"/images/close-circle.png"}
                    alt=""
                    width={22}
                    height={22}
                  ></Image>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    
    </div>
  );
}
