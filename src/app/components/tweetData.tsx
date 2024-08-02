import Link from "next/link";

export const TweetData = ({ data, index, mode }: { data: any, index: number, mode: boolean }) => {
  console.log("In Tweet Data Page")
  console.log(data)
  console.log(data.content)
    
  // Tweet Data Return
  return (
    <div key={index}>
      {(data.content !== null || data.contentImage !== null) ? (
        <div className="flex flex-col w-[100%] border-[.5px] border-gray bg-mainBg dark:bg-[#121212]">
          <div className=" flex justify-between">
            <div className="flex w-[80%] mt-[7px]">
              <div>
                <Link href={`/profiles/${data.slug}`}>
                  <img className="ml-[17px] mt-[15px] w-[32px] h-[32px] rounded-[32px] flex-shrink-0" src={data.profile} alt="" />
                </Link>
              </div>
              <div className=" flex items-center">
                <Link href={`/profiles/${data?.slug}`}>
                  {data.slug === 'my-profile' ? (
                    <h1 className={mode === false ? "ml-[6px] mt-[2px] text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold" : "ml-[6px] mt-[2px] text-white text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold"}>
                      Anonymous Name
                    </h1>
                  ) : (
                    <h1 className={mode === false ? "ml-[6px] mt-[2px] text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold" : "ml-[6px] mt-[2px] text-white text-[12px] text-s font-[700] leading-[normal] tracking-[-0.048px] font-SamsungSharpSansBold"}>
                      {data.username}
                    </h1>
                  )}
                </Link>
                <p className="ml-[6px] mt-[2px] text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] font-PoppinsMedium">
                  {data.time}{data.unit} ago
                </p>
              </div>
            </div>
            {/* <MorePopup {...props} /> */}
          </div>
          <div className={mode === false ? "ml-[55px] mt-[1px] w-[280px] text-[12px] font-PoppinsLight font-[500] text-black leading-[normal] tracking-[-0.04px] self-start" : "ml-[55px] mt-[1px] text-[#fff] w-[280px] text-[12px] font-PoppinsLight font-[500] leading-[normal] tracking-[-0.04px] self-start"}>
            {data.content}
          </div>
          {data.contentImage === null ? (
            <div className="hidden"></div>
          ) : (
            <div>
              <img src={data.contentImage} alt="Loading..." className="ml-[58px] mt-[17px] w-[240px] h-[240px] rounded-[13px] flex-shrink-0" />
            </div>
          )}
          <div className="flex items-center w-[100%] mt-[25px] mb-[22px] ">
            {/* {mode === false ? (
              <Image onClick={() => {temp(data?.id) }} src={childTemp(data)} alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
              ) : (
              <Image onClick={() => {temp(data?.id) }} src={childTemp(data)} alt="" width={16} height={16} className="ml-[17px] cursor-pointer "></Image>
              )
            } */}
            <p className="ml-[5px] text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] font-PoppinsMedium">
              {data.likesNumber} Likes
            </p>
            {/* <CommentsPopup {...props} /> */}
          </div>
        </div>
      ) : null}
    </div>
  );
};
