'use client'
import Image from "next/image"
import { useContext,useEffect,useState } from "react"
import { context } from "@/contextAPI/contextApi"
import { useRouter } from "next/navigation";

export const DeleteTweetPopup = (props2: any) => {

  const AZURE_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const getContext = useContext(context);

  const show2 = props2.show2
  const setShow2 = props2.setShow2
  const tweet = getContext.tweet;
  const setTweet = getContext.setTweet;
  let newTweets = tweet;
  let newId = props2.idValue;
  const [handleDeleteTweet, setHandleDeleteTweet] = useState(false);
  const setTriggerGetApi = getContext.setTriggerGetApi;

  useEffect(() => {
    console.log('Outside condition');
    if (handleDeleteTweet === true) {
      console.log('Inside condition');
      console.log('Entering Delete')
      console.log(newId);
      const patchApi = async () => {
        try {
          const api = await fetch(`${AZURE_API_URL}/${newId}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
          });
          const json = await api.json();
          console.log(json);
          setTimeout(() => {
            setTriggerGetApi(true);
          }, 1000)
          setHandleDeleteTweet(false);
        }
        catch (error) {
          console.log(`Error in Patching are : ${error}`);
         } 
        }
      patchApi();
    }
  }, [handleDeleteTweet])

  let mainIndex=newTweets.findIndex(checkIndex);
  function checkIndex(obj: any) {
    return newId===obj.id
  }
  console.log(newId);
  const ToggleShowTweetPopup = () => {
    if (show2 === false) {
      setShow2(true);
    }
    else {
      setShow2(false);
    }
  }
  const router=useRouter()
  const tweetLikes = getContext.like;
  // const deleteTweet = () => {
  //   newTweets.splice(mainIndex, 1)
  //   tweetLikes.splice(mainIndex, 1)
  //   for(let i=0;i<newTweets.length;i++){
  //     newTweets[i].id=i;
  //   }
  //   setTweet(newTweets);
  //   router.refresh()
  // }

  const handleDeleteTweetFunction = () => {
    setHandleDeleteTweet(true);
    ToggleShowTweetPopup();
  }
  // Stop state to dom
  const handlePopupBackgroundClick = (event: any) => {
    event.stopPropagation();
  };
  
  return (
    <>
      {show2 === true ?
        // Popup Transpart BG
        <div onClick={() => { ToggleShowTweetPopup() }} className=" bg-[#FFFFFF80] dark:bg-[#00000080] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
          {/* Popup Card */}
          <div onClick={handlePopupBackgroundClick} className=" bg-white dark:bg-black rounded-3xl flex items-center justify-center max-lmd:w-[85%]" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <div className="w-[400px] h-[310px]">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleShowTweetPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
              </div>
              <div className="w-full">
                <div className=" flex items-center flex-col">
                  <div className=" flex items-center justify-center bg-[#F3DDDD] dark:bg-[#1B0505] w-20 h-20 rounded-full"><Image src={'/images/trash.png'} alt="Loading..." width={40} height={40}></Image></div>
                  <h2 className=" text-black dark:text-white text-2xl font-bold text-center w-72 mt-3 font-SamsungSharpSansBold">Do you want to delete this tweet?</h2>
                  <div className=" mt-9 mb-3 flex gap-12">
                    <button onClick={() => { ToggleShowTweetPopup() }} className=" bg-[#CACACA] dark:bg-[#383838] text-black dark:text-white w-[109px] h-10 rounded-lg flex items-center justify-center cursor-pointer font-SamsungSharpSansBold tracking-[.5px]">Cancel</button>
                    <button onClick={() => { handleDeleteTweetFunction() }} className=" bg-black dark:bg-white text-white dark:text-black w-[109px] h-10 rounded-lg font-SamsungSharpSansBold tracking-[.5px]">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
    </>
  )
}