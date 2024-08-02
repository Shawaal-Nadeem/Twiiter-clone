'use client'
import Image from "next/image"
import { useContext, useState,useEffect } from "react"
import { context } from "@/contextAPI/contextApi"
const ShowComment = (data: any, index: any) => {
  const getContext = useContext(context);

  return (
    <div key={index}>
      <div className=" mt-3">
        <div className=" flex items-center gap-2">
          <img src={data.profile} alt="Loading..." width={30} height={30} className=" rounded-full" ></img>
          <p className=" font-bold text-sm font-SamsungSharpSansBold">{data?.username}</p>
          <p className=" text-grayLight text-sm font-[500] font-PoppinsMedium">{data.time}{data.unit}</p>
        </div>
        <div className=" ml-10 overflow-hidden w-56">
          <p className=" text-black dark:text-white text-[13px] font-[500] leading-[normal] font-PoppinsLight">{data.content}</p>
        </div>
      </div>
      <div className=" flex justify-center mt-3">
        <hr className=" w-[350px] mt-3 border-[1.5px] border-solid border-[#CACACA] dark:border-[#242424]" />
      </div>
    </div>

  )
}
export const CommentsPopup = (props: any) => {
  let data = props.data
  let newId=props.idNum
  
  
  const getContext = useContext(context);
  const mode = getContext.mode;
  const [show, setShow] = useState(false);
  const ToggleShowCommentPopup = () => {
    if (show === false) {
      setShow(true);
    }
    else {
      setShow(false);
    }
  }
  const tweet = getContext.tweet;
  const setTweet = getContext.setTweet;
  let newTweet=tweet;
 
  const [inputValue, setInputValue] = useState('');
 
  // Stop state to dom
  const handlePopupBackgroundClick = (event: any) => {
    event.stopPropagation();
  };
  
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const myProfile=tweet.find((item:any)=>{return item.email===email && item.password===password})
  const [handleUploadComment, setHandleUploadComment] = useState(false);
  // const [commentsNumber, setCommentsNumber] = useState(data.commentsNumber);
  const setTriggerGetApi = getContext.setTriggerGetApi;
  const [comments, setComments] = useState([{}]);
  //Show Comments
  useEffect(() => {
    if (show === true) {
      console.log(newId);
      
      const getApi = async () => {
        const api = await fetch(`http://localhost:8000/tweets/${newId}`);
        const json = await api.json();
        let oldArr = json.comments;
        console.log(oldArr);
        setComments(oldArr?.reverse());
        // Save Comment
        if (handleUploadComment === true) {
          let obj = {
            profile:myProfile.profile,
            username: myProfile.username,
            content:inputValue
          }
          console.log(inputValue);
          oldArr.push(obj);
          console.log('After');
          console.log(oldArr);
        
          let commentsNum = oldArr.length;
          console.log('Comments Quantity: '+ commentsNum);
          // console.log(data.commentsNumber);
          const putApi = async () => {
            console.log('Comments Number inside Put function : '+ commentsNum);
            const api = await fetch(`http://localhost:8000/tweets/${newId}`, {
              method: 'PUT',
              body: JSON.stringify({
                profile: json.profile,
                username: json.username,
                slug: `${json.slug}`,
                email: json.email,
                content: json.content,
                contentImage: json.contentImage,
                likesNumber: json.likesNumber,
                password: json.password,
                likeUserIds:json.likeUserIds,
                comments: oldArr,
                commentsNumber:commentsNum
              }),
              headers:{
                'Content-type': 'application/json; charset=UTF-8',
              }
            })
            // setCommentsNumber(commentsNum);
            setTriggerGetApi(true);
            setHandleUploadComment(false);
          }
          putApi();
        }
      }
      getApi();
    
  }
}, [show,handleUploadComment])
 
  return (
    <>
      {show === true ? <div onClick={() => { ToggleShowCommentPopup() }} className=" bg-[#FFFFFF80] dark:bg-[#00000080] h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center"></div> : null}

      {/* Comments popup */}

      <div onClick={() => { setShow(true) }} className=" flex">
        <Image src={"/images/message.png"} alt="" width={16} height={16} className="ml-[14px] cursor-pointer"></Image>
        <p className="ml-[5px]  text-grayLight text-[10px] font-[500] leading-[normal] tracking-[-0.04px] cursor-pointer font-PoppinsMedium">
          view all {data?.commentsNumber} comments
        </p>
      </div>
      {/* Comment Popup Card */}
      {show === true ?
        <div onClick={() => { ToggleShowCommentPopup() }} className=" flex items-center justify-center fixed z-30 top-[0%] left-[0%] w-full h-[100vh]">
          <div onClick={handlePopupBackgroundClick} className=" bg-white dark:bg-black rounded-3xl max-sm:w-[92%] flex justify-center" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <div className="w-[400px] h-[485px] max-sm:w-full">
              <div className=" flex justify-end">
                <Image onClick={() => { ToggleShowCommentPopup() }} className=" cursor-pointer mr-4 mt-5" src={'/images/Group 13.png'} alt="Loading..." width={17} height={17}></Image>
              </div>
              <div className="w-full">
               <h3 className="text-black dark:text-white font-bold text-xl font-SamsungSharpSansBold text-center">Comments</h3>
                <hr className=" border border-[#CACACA] dark:border-[#242424] mt-2" />
                <div className=" flex flex-col items-center h-[310px]  overflow-y-scroll mt-2">
                  <div className="  w-[85%] max-sm:w-[90%]">
                  {comments?.length > 0 ? comments.map(ShowComment) : null}
                  </div>
                </div>
                <hr className=" w-full mt-3 border-[1.5px] border-solid border-[#CACACA] dark:border-[#242424]" />
                <div className=" w-[80%] max-sm:w-[90%] flex max-sm:gap-0 gap-5 mt-3">  
                  <div className=" max-sm:w-[83%] flex items-center bg-[#CACACA] dark:bg-[#242424] w-[320px] h-12 rounded-xl ml-4">
                    <input value={inputValue}  onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Type your comment here..." className=" max-sm:w-[95%] focus:outline-none bg-[#CACACA] dark:bg-[#242424] w-[270px] ml-4 mr-4 text-[15px] placeholder:text-[#787878] font-PoppinsLight"></input>
                  </div>
                  <div className="max-sm:w-[5%] max-sm:ml-3">
                    <button onClick={() => { setHandleUploadComment(true) }} className=" bg-black dark:bg-white w-12 h-12 flex items-center justify-center rounded-xl">
                      <Image src={mode === false ? '/images/send.png' : '/images/sendB.png'} alt="Loading...." width={23} height={23}></Image>
                    </button>
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