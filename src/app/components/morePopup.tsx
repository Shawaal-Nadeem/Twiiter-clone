'use client'
import Image from "next/image"
import { useContext } from "react"
import { context } from "@/contextAPI/contextApi"
import { useState } from "react"
import { EditTweetPopup } from "./editTweetPopup"
import { DeleteTweetPopup } from "./deleteTwetPopup"

export const MorePopup = ({profileData}:{profileData:any}) => {
    
  const getContext = useContext(context);
  const mode = getContext.mode;
    const show = getContext.showEditTweet;
    const setShow = getContext.setShowEditTweet;
    const Toggle = () => {
        if (show === false) return setShow(true);
        else return setShow(false);
    }
  const [option, setOption] = useState(false);
  const [option1, setOption1] = useState(false);
  const setShow1 = getContext.setShowEditProfileBehind;
  const setShow2 = getContext.setShowDeleteTweet;
  return (
    <>
          {show===true?<div onClick={()=>{setShow(false)}} className=" h-[100vh] w-full right-0 left-0 top-0 bottom-0 z-10 fixed flex items-center justify-center"></div>:null}

            {/* Setting Popover */}
            <div className=" mt-5 mr-3">
       <div className=" absolute z-10 right-2"> 
       <Image onClick={()=>{Toggle()}} src={'/images/more.png'} alt="Loading...." width={18} height={18} className=" cursor-pointer"></Image>
       </div>
                {show === true ? <div className="z-[20] absolute -right-7">
                <div className="bg-white w-[120px] h-20 rounded-2xl" style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
                <div className=" font-PoppinsMedium mt-6">
                <p onClick={()=>{setOption(true),Toggle(),setShow1(true)}} className=" text-sm pt-3 ml-3 cursor-pointer text-[#787878]">Edit Tweet</p>    
                <hr className=" border-1 border-[#CACACA] mt-2"/>
                <p onClick={()=>{setOption1(true),Toggle(),setShow2(true)}} className=" mt-1 ml-3 text-[#787878] cursor-pointer text-sm">Delete</p>    
                </div>
                </div>
       </div>:null}
        {option === true ? <EditTweetPopup /> : null}
        {option1 === true ? <DeleteTweetPopup />:null}
         </div>
        
        </>
    )
}


// 'use client'
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import {
//     Dialog,
//     DialogContent,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
// import Image from "next/image"
// import { useState } from "react";
// export const MorePopup = () => {
//     const [show,setShow]=useState(false);
//     return (
//         <>
//         {/* PopOver Component ShadCN */}
//        <div className=" mt-6 mr-3">
//         <Popover>
//       <PopoverTrigger asChild onClick={()=>setShow(false)}>
//         <Image src={'/images/more.png'} alt="Loading...." width={18} height={18} className=" cursor-pointer"></Image>
//       </PopoverTrigger>
     
//       <PopoverContent className="w-30 h-24">
//       <Dialog>
//       <DialogTrigger asChild onClick={()=>setShow(true)}>
//         <p className="text-sm text-muted-foreground cursor-pointer text-center font-PoppinsMedium">Edit tweet</p>
//         </DialogTrigger>
//         <hr className=" w-full border border-solid border-[#CACACA] mt-[10px]"/>
//         <DialogTrigger asChild onClick={()=>setShow(false)}>
//         <p className="text-sm text-muted-foreground cursor-pointer mt-[10px] text-center font-PoppinsMedium">Delete</p>
//       </DialogTrigger>
//       {show===true?<DialogContent className="sm:max-w-[375px]">
//         <div className=" flex items-center flex-col">
//       <h3 className=" text-black font-bold text-xl font-SamsungSharpSansBold">Edit Tweet</h3>
//       <hr className=" w-full border border-[#CACACA] mt-3" />
//       <textarea className=" mt-8 border border-solid border-[#CACACA] focus:outline-none rounded-lg w-72 h-32 pt-3 pl-3 pr-3 font-PoppinsLight" placeholder="Type Tweet..." ></textarea>
//       <button className=" bg-black text-white w-[109px] h-10 rounded-lg mt-5 font-SamsungSharpSansBold">Update</button>
//       </div>
//       </DialogContent>
//       : <DialogContent className="sm:max-w-[425px]">
//        <div className=" flex items-center flex-col">
//       <div className=" flex items-center justify-center bg-[#F3DDDD] w-20 h-20 rounded-full"><Image src={'/images/trash.png'} alt="Loading..." width={40} height={40}></Image></div>
//       <h2 className=" text-black text-2xl font-bold text-center w-72 mt-3 font-SamsungSharpSansBold">Do you want to delete this tweet?</h2>
//       <div className=" mt-9 mb-3 flex gap-12">
//         <p className=" bg-[#CACACA] text-black w-[109px] h-10 rounded-lg flex items-center justify-center cursor-pointer font-SamsungSharpSansBold tracking-[.5px]">Cancel</p>
//         <button className=" bg-black text-white w-[109px] h-10 rounded-lg font-SamsungSharpSansBold tracking-[.5px]">Delete</button>
//       </div>
//       </div>
//       </DialogContent> }
//     </Dialog>
//   </PopoverContent>
       
//     </Popover>
//           </div>
//         </>
//     )
// }