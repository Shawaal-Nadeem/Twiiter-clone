'use client'
import Image from "next/image"
import { useState } from "react"
export default function LognSign() {
  const [state,setState]=useState(false);
  const [mode,setMode]=useState(false);
  const [show,setShow]=useState(false);
  const [password,setPassword]=useState('Type Password');
function ToggleMode()
{
if(mode===false){
  setMode(true);
}
else if(mode===true){
  setMode(false);
}
}
function ToggleIcon()
{
if(show===false){
  setShow(true);
}
else if(show===true){
  setShow(false);
}
}
  return (
    <>
    <div className={mode===false?" flex items-center justify-between w-full h-[100vh] max-sm:flex-col":" flex items-center justify-between bg-black w-full h-[100vh] max-sm:flex-col max-xsm:h-auto"}>

   <div>
    <Image src={'/images/Mask group.png'} alt="Loading...." width={325} height={325} className={mode===true?'grayscale h-[100vh] w-full max-md:hidden':'grayscale-0 h-[100vh] w-full max-md:hidden'}></Image>
    <Image src={'/images/bg 1.png'} alt="Loading...." width={200} height={200} className={mode===false?" sm:hidden w-[100vh] relative grayscale-0":" sm:hidden w-[100vh] relative grayscale"}></Image>
    <div className=" flex items-center flex-col mr-2 mt-3 sm:hidden absolute z-[1] right-0 top-0 bottom-0">
    <Image src={'/images/X.png'} alt="Loading....." width={55} height={55}></Image>
    <Image onClick={()=>{ToggleMode()}} src={mode===false?'/images/light mode icon.png':'/images/dark mode icon.png'} alt="Loading....." width={45} height={45} className=" mt-2 cursor-pointer"></Image>
   </div>
   </div>

   <div>
     
    <div className=" max-xsm:flex max-xsm:items-center max-xsm:justify-center max-xsm:flex-col max-sm:mt-10 max-sm:mb-16">
    <div className={mode===false?" flex items-center justify-center bg-gray-box w-96 h-14 rounded-xl max-xsm:w-[80%] ":" flex items-center justify-center bg-black-box w-96 h-14 rounded-xl max-xsm:w-[80%]"} >
      <div className=" flex items-center justify-center w-full h-full ">
      <button onClick={()=>setState(false)} className={state===false? mode===false?" w-2/4 h-12 bg-white ml-1 rounded-lg font-bold":" w-2/4 h-12 bg-black ml-1 rounded-lg font-bold text-white":mode===false?" w-2/4 h-12 ml-1 rounded-lg font-bold":" w-2/4 h-12 ml-1 rounded-lg font-bold text-white"}>Login</button>
      <button onClick={()=>setState(true)} className={state===true? mode===false?" w-2/4 h-12 mr-1 rounded-lg font-bold bg-white":" w-2/4 h-12 mr-1 rounded-lg font-bold text-white bg-black":mode===false?" w-2/4 h-12 mr-1 rounded-lg font-bold":" w-2/4 h-12 mr-1 rounded-lg font-bold text-white "}>Signup</button>
      </div>
    </div>
    <div className=" flex items-center justify-center border-2 border-solid border-grayLight h-12 rounded-lg w-96 mt-8 max-xsm:w-[80%]">
    <button className={mode===false?" flex items-center gap-2 justify-center w-96 h-12":" flex items-center gap-2 justify-center w-96 h-12 text-white"}><span><Image src={'/images/Google.png'} alt="Loading...." width={20} height={20}></Image></span>Continue with Google</button>
    </div>
    <div className=" flex items-center gap-1 w-96 mt-8 max-xsm:w-[80%]">
<hr className=" border border-solid border-grayLight w-48"/>
<p className={mode===false?" text-black":" text-white"}>or</p>
<hr className=" border border-solid border-grayLight w-48"/>
    </div>
    <div className=" mt-6 max-xsm:w-[80%]">
      <label className=" text-grayLight">Email Address</label>
      <input className={mode===false?"flex items-center border-2 border-solid border-grayLight h-12 rounded-lg outline-none w-96 pl-4 placeholder-grayLight max-xsm:w-[100%]":"flex items-center border-2 border-solid border-grayLight h-12 rounded-lg outline-none w-96 pl-4 placeholder-grayLight bg-black text-grayLight max-xsm:w-[100%]"} placeholder="Codenest@gmail.com" type="email"></input>
    </div>
    <div className={state===true?" mt-4 max-xsm:w-[80%]":"hidden"}>
      <label className=" text-grayLight">Create Username</label>
      <input className={mode===false?"flex items-center border-2 border-solid border-grayLight h-12 rounded-lg outline-none w-96 pl-4 placeholder-grayLight max-xsm:w-[100%]":"flex items-center border-2 border-solid border-grayLight h-12 rounded-lg outline-none w-96 pl-4 placeholder-grayLight bg-black text-grayLight max-xsm:w-[100%]"} placeholder="Codenest2023" type="text"></input>
    </div>
    <div className=" mt-6 max-xsm:w-[80%]">
      <label className={mode===false?" text-black":" text-white"}>Password</label>
      <div className={mode===false?" flex items-center border-2 border-solid border-black h-12 rounded-lg w-96 max-xsm:w-[100%]":" flex items-center border-2 border-solid border-white h-12 rounded-lg w-96 max-xsm:w-[100%]"}>
      <input className={mode===false?" outline-none w-96 pl-4":" outline-none w-96 pl-4 bg-black text-white"} type={show===false?'password':'text'} value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
      <Image src={mode===false?show===false?'/images/notEye.png':'/images/openEye1.png':show===false?'/images/notEye1.png':'/images/openEye.png'} onClick={()=>{ToggleIcon()}} alt="Loading..." width={19} height={19} className=" cursor-pointer mr-3"></Image>
      </div>
    </div>
    <div className={mode===false?" flex items-center justify-center bg-black text-white h-12 rounded-lg w-96 mt-8 max-xsm:w-[80%]":" flex items-center justify-center bg-white text-black h-12 rounded-lg w-96 mt-8 max-xsm:w-[80%]"}>
    <button className=" flex items-center justify-center font-medium w-96 h-12">Login</button>
    </div>
    </div>
    
   </div>
   

   <div className=" flex items-center flex-col self-start mr-2 mt-3 max-sm:hidden">
    <Image src={'/images/X.png'} alt="Loading....." width={55} height={55}></Image>
    <Image onClick={()=>{ToggleMode()}} src={mode===false?'/images/light mode icon.png':'/images/dark mode icon.png'} alt="Loading....." width={45} height={45} className=" mt-2 cursor-pointer"></Image>
   </div>
    </div>
    </>
  )
}
