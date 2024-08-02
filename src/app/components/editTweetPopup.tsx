'use client'
import Image from "next/image"
import { useContext,useEffect, useState } from "react"
import { context } from "@/contextAPI/contextApi"
import { useRouter } from "next/navigation"
// let mainIndex = 0;
export const EditTweetPopup = (props2: any) => {
  const getContext = useContext(context);
  const show1 = props2.show1
  const setShow1 = props2.setShow1
  const tweet = getContext.tweet;
  const setTweet = getContext.setTweet;

  let newTweets = tweet;
  let newId = props2.idValue;
  console.log(newId);
  
  const searchCurrentTweet = tweet.find((temp: any) => { return temp.id === newId });
  console.log(searchCurrentTweet.content);
  const [currentTweet, editTweet] = useState(searchCurrentTweet.content);
  const [handleEditTweet, setHandleEditTweet] = useState(false);
  useEffect(() => {
    console.log('Outside condition');
    if (handleEditTweet === true) {
      console.log('Inside condition');
      console.log('Entering Edit')
      console.log(newId);
      console.log(currentTweet);
      const getPersonDetail = async() => {
        const api = await fetch(`http://localhost:8000/tweets/${newId}`);
        const json1 = await api.json();
        console.log(json1);

        const api2 = await fetch(`http://localhost:8000/tweets/${newId}`, {
              method: 'PUT',
              body: JSON.stringify({
                profile: json1.profile,
                username: json1.username,
                slug: json1.slug,
                email: json1.email,
                contentImage: json1.contentImage,
                likesNumber: json1.likesNumber,
                commentsNumber: json1.commentsNumber,
                password: json1.password,
                comments: json1.comments,
                likeUserIds:json1.likeUserIds,
                content: currentTweet
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
            });
            // const json = await api.json();
            // console.log(json);
            setTimeout(() => {
              setTriggerGetApi(true);
            }, 1000)
            setHandleEditTweet(false);
         
      }
      getPersonDetail();
    }
  }, [currentTweet,handleEditTweet])
  const handleEditTweetFunction = () => {
    setHandleEditTweet(true);
    ToggleShowTweetPopup();
  }
  const setTriggerGetApi = getContext.setTriggerGetApi;
  // if (handleEditTweet === true) {
  //   setTimeout(() => {
  //     setTriggerGetApi(true);
  //   }, 1000)
  //   setHandleEditTweet(false);
  // }
  
  // function checkIndex(obj: any) {
  //   return newId === obj.id
  // }
  const ToggleShowTweetPopup = () => {
    if (show1 === false) {
      setShow1(true);
    }
    else {
      setShow1(false);
    }
  }
  // Stop state to dom
  const handlePopupBackgroundClick = (event: any) => {
    event.stopPropagation();
  };
  // let updatedTweet: string;
  // const editTweet = (tweet: any) => {
  //   updatedTweet = tweet;
  // }
  // const router=useRouter()
  // const updateTweet = () => {
  //   for (let i = 0; i < newTweets.length; i++) {
  //     if (newId === newTweets[i].id) {
  //       newTweets[i].content = updatedTweet
  //       setTweet(newTweets)
  //       router.refresh()
  //       break;
  //     }
  //   }
    
  // }
  return (
    <>
      {show1 === true ?
        // Popup Transpart BG
        <div onClick={() => { ToggleShowTweetPopup() }} className=" bg-[#FFFFFF80] dark:bg-[#00000080] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
          {/* Popup Card */}
          <div onClick={handlePopupBackgroundClick} className=" bg-white dark:bg-black rounded-3xl flex items-center justify-center max-lmd:w-[85%]" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <div className="w-[400px] h-[350px]">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleShowTweetPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
              </div>
              <div className="w-full">
                <h3 className="text-black dark:text-white font-bold text-xl font-SamsungSharpSansBold text-center">Edit Tweet</h3>
                <hr className=" border border-[#CACACA] dark:border-[#242424] mt-2" />
                <div className=" flex flex-col items-center bg-white dark:bg-black">
                  <textarea onChange={(e) => { editTweet(e.target.value) }} className=" mt-8 border border-solid border-[#CACACA] focus:outline-none rounded-2xl w-80 h-36 pt-3 pl-3 pr-3 font-PoppinsLight text-base dark:bg-black placeholder:text-[#787878] max-lmd:w-[85%]" value={currentTweet} ></textarea>
                  <button onClick={() => {handleEditTweetFunction()}} className=" bg-black dark:bg-white text-white dark:text-black w-[112px] h-10 rounded-lg mt-6 font-SamsungSharpSansBold">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
    </>
  )
}