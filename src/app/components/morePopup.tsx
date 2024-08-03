'use client'
import Image from "next/image"
import { useContext,useEffect } from "react"
import { context } from "@/contextAPI/contextApi"
import { useState } from "react"
import { EditTweetPopup } from "./editTweetPopup"
import { DeleteTweetPopup } from "./deleteTwetPopup"
import Cookies from "js-cookie"

export const MorePopup = (props: any) => {

  let id = props.idNum
  let data = props.data
  
  const getContext = useContext(context);
  const mode = getContext.mode;
  const [show, setShow] = useState(false)

  const Toggle = () => {
    if (show === false) return setShow(true);
    else return setShow(false);
  }
  const [option, setOption] = useState(false);
  const [option1, setOption1] = useState(false);
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [text, setText] = useState('');
  //Copy Tweet
  const copyTweet = async (tweet: string) => {
    setText(tweet);
    await navigator.clipboard.writeText(tweet)
  }
  let props2 = {
    idValue: id,
    show1:show1,
    setShow1:setShow1,
    show2:show2,
    setShow2:setShow2
  }

  const email = Cookies.get("email");
  const setEmail = getContext.setEmail;
  const password = Cookies.get("password");
  const setPassword = getContext.setPassword;
  // useEffect(() => {
  //   const getUserData = async () => {
  //     console.log('More Popup');
  //     const api = await fetch(`https://65054b57ef808d3c66efe2ce.mockapi.io/todos/api/users/1`);
  //     const json = await api.json();
  //     let email = json.email;
  //     let password = json.password;
  //     if (email) {
  //       setEmail(email);
  //     }
  //     if (password) {
  //       setPassword(password);
  //     }

  //   }
  //   getUserData();
  // },[])
  return (
    <>
      {data.email === email && data.password===password ? <div>

        {show === true ? <div onClick={() => { setShow(false) }} className=" h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center"></div> : null}

        {/* More Popover */}
        <div className=" mt-5 mr-3">
          <div>
            <Image onClick={() => { Toggle() }} src={'/images/more.png'} alt="Loading...." width={18} height={18} className=" cursor-pointer"></Image>
          </div>
          {show === true ? <div className="z-[10] absolute ">
            <div className=" ml-[-105px] mt-[-20px] w-[120px] h-20 rounded-2xl bg-white dark:bg-[#060606]" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
              <div className=" font-PoppinsMedium mt-6">
                <p onClick={() => { setOption(true), Toggle(), setShow1(true) }} className=" text-sm pt-3 ml-3 cursor-pointer text-[#787878]">Edit Tweet</p>
                <hr className=" border-1 border-[#CACACA] dark:border-[#242424] mt-2" />
                <p onClick={() => { setOption1(true), Toggle(), setShow2(true) }} className=" mt-2 ml-3 text-[#787878] cursor-pointer text-sm">Delete</p>
              </div>
            </div>
          </div> : null}
          {option === true ?  <EditTweetPopup {...props2} /> : null}
          {option1 === true ? <DeleteTweetPopup {...props2} /> : null}
        </div>
      </div> :

        <div>
          {show === true ? <div onClick={() => { setShow(false) }} className=" h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center"></div> : null}

          {/* More Popover */}
          <div className=" mt-5 mr-3">
            <div>
              <Image onClick={() => { Toggle() }} src={'/images/more.png'} alt="Loading...." width={18} height={18} className=" cursor-pointer"></Image>
            </div>
            {show === true ? <div className="z-[10] absolute right-5 ">
              <div className="bg-white w-[120px] h-10 rounded-xl flex items-center justify-center mt-2 dark:bg-black" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
                <div className=" font-PoppinsMedium ">
                  <button onClick={() => { copyTweet(data.content), Toggle() }} className=" text-sm cursor-pointer text-[#787878] bg-white dark:bg-black">Copy Tweet</button>
                </div>
              </div>
            </div> : null}
            {/* {option === true ? <EditTweetPopup /> : null}
      {option1 === true ? <DeleteTweetPopup />:null} */}
          </div>
        </div>}

    </>
  )
}