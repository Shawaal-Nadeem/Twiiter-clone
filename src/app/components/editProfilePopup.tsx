'use client'
import Image from "next/image"
import { useContext,useState,useEffect } from "react"
import { context } from "@/contextAPI/contextApi"
import Cookies from "js-cookie"

export const EditProfilePopup = ({profileData}:{profileData:any}) => {

  const AZURE_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

    const getContext = useContext(context);
    const show1 = getContext.showEditTweet;
    const setShow1 = getContext.setShowEditTweet;
    const ToggleShowTweetPopup = () => {
        if (show1 === false) {     
            setShow1(true);
        }
        else {
            setShow1(false);
      }
  }
  
  const tweet = getContext.tweet;
  const email = Cookies.get('email');
  const password = Cookies.get('password');
  const searchCurrentNameIds = tweet.filter((temp: any) => {return temp?.email === email && temp?.password === password });
  console.log(searchCurrentNameIds);
  let name: string = searchCurrentNameIds[0].username;
  let pic: string = searchCurrentNameIds[0].profile;
  const [currentName, editName] = useState(name);
  const [currentPic, editPic] = useState(pic);
  const [handleEditProfile, setHandleEditProfile] = useState(false);
  useEffect(() => {
    console.log('Outside condition');
    if (handleEditProfile === true) {
      console.log('Inside condition');
      console.log('Entering Edit')
     
      const getUserData=async(paraRecv: any)=>{
        const api = await fetch(`${AZURE_API_URL}/${paraRecv.id}`);
        const json = await api.json();

        const patchApi = async () => {
          console.log(paraRecv.id);
          console.log(`Current Pic URL: ${currentPic}`);
          try {
            console.log(`Current Pic inside patch API URL: ${currentPic}`);
            const api = await fetch(`${AZURE_API_URL}/${paraRecv.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                  slug: `${json.slug}`,
                  email: json.email,
                  content: json.content,
                  contentImage: json.contentImage,
                  likesNumber: json.likesNumber,
                  commentsNumber: json.commentsNumber,
                  password: json.password,
                  comments: json.comments,
                  likeUserIds: json.likeUserIds,
                  profile: currentPic,
                  username: currentName
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
            setHandleEditProfile(false);
          }
          catch (error) {
            console.log(`Error in Patching are : ${error}`);
           }
          }
        patchApi()
      }
       searchCurrentNameIds.map((para:any)=>{return getUserData(para)});
    }
  }, [currentName,handleEditProfile])
  
  const handleEditProfileFunction = () => {
    setHandleEditProfile(true);
    ToggleShowTweetPopup();
  }
  const setTriggerGetApi = getContext.setTriggerGetApi;
    // Stop state to dom
    const handlePopupBackgroundClick = (event:any) => {
       event.stopPropagation();
    };
    return (
        <>
             {show1 === true ?
      // Popup Transpart BG
          <div onClick={() => { ToggleShowTweetPopup() }} className=" bg-[#FFFFFF80] dark:bg-[#00000080] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center">
             {/* Popup Card */}
            <div onClick={handlePopupBackgroundClick} className=" bg-white dark:bg-black rounded-3xl flex items-center justify-center max-lmd:w-[85%]" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
              <div className="w-[400px] h-[380px]">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleShowTweetPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
          </div>
          <div className="w-full">
          <h3 className="text-black dark:text-white ml-7 font-bold text-xl font-SamsungSharpSansBold text-center">Edit Profile</h3>
          <hr className=" border border-[#242424] mt-2"/>
          <div className=" flex flex-col items-center bg-white dark:bg-black">
          <div className="mt-7 w-72"><label className=" font-SamsungSharpSansBold text-black dark:text-white text-md ml-1">Change Username</label></div>
         <input onChange={(e)=>{editName(e.target.value)}} className=" bg-white dark:bg-black pl-3 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-72 h-10 mt-3 font-PoppinsLight" value={currentName} ></input>
         <div className="mt-7 w-72"><label className=" font-SamsungSharpSansBold text-black dark:text-white text-md ml-1">Upload Image</label></div>
         <input onChange={(e)=>{editPic(e.target.value)}} className=" bg-white dark:bg-black pl-3 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-72 h-10 mt-3 font-PoppinsLight" placeholder='Paste URL...' ></input>
         <button onClick={()=>{handleEditProfileFunction()}} className=" bg-black dark:bg-white text-white dark:text-black w-[109px] h-10 rounded-lg mt-6 font-SamsungSharpSansBold">Update</button>
          </div>
          </div>
            </div>
      </div>
  </div>
                : null}
        </>
          
    )
}