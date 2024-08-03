'use client'
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { context } from "@/contextAPI/contextApi";
import Cookies from 'js-cookie';


export const LoginForm=()=> {

  const AZURE_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [state, setState] = useState(false);
  const [show, setShow] = useState(false);
  const getContext = useContext(context);
  const mode = getContext.mode;
  
  const password = getContext.password;
  const setPassword = getContext.setPassword;
  
  
  function ToggleIcon() {
    if (show === false) {
        setShow(true);
      } else if (show === true) {
        setShow(false);
      }
    }
  
  const email = getContext.email;
  const setEmail = getContext.setEmail;
  const [move, setMove] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [handleApi, setHandleApi] = useState(false);
  const [username, setUsername] = useState('');
  const [handleAgainFetch, setHandleAgainFetch] = useState(false);
  
  


  let localData:any =useRef();    // useRef store my old value when re-renders component. Why i use ? -> bcz when useEffect calls localData again initialize.
  
  useEffect(() => {
    // Set email and password from cookies if they exist
    const storedEmail = Cookies.get('email');
    const storedPassword = Cookies.get('password');
    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
    //Login Side
    if (state === false) {
      const getApi = async () => {
          try {

            if (handleApi === false || handleAgainFetch===true) {
              const api = await fetch(`${AZURE_API_URL}`);
              const json = await api.json();
              localData.current = json;
              console.log(localData.current);
              setHandleApi(true);
            }
            
            const foundItem = localData.current.find((parameter: any) => {
              if (parameter.email === email && parameter.password === password) {
                return parameter
              }
            })
          
            if (foundItem) {
              console.log('Enter');
              console.log(email);
              console.log(password);
              setMove(true);
            
              
            }
            else {
              console.log(email);
              console.log(password);
              console.log('No Enter');
              setMove(false);
              if (submit === true) {
                setShowSuggest(true);
              }
            }

          } catch (error) {
            console.error(`Error in GetApi are : ${error}`);
          }
          
        }
        
        getApi();  
    };
    //Signup Side
    if (state === true) {
      if (submit === true) {
        let slugName = username.replace(/\s/g, '');
        console.log(`Slug Name is : ${slugName}`)
        const postApi = async () => {
          try {
            const api = await fetch(`${AZURE_API_URL}`, {
              method: 'POST',
              body: JSON.stringify({
                profile: "/images/myprofile1.jpeg",
                username: username,
                slug: `${slugName}-profile`,
                email: email,
                content: null,
                contentImage: null,
                likesNumber: 0,
                commentsNumber: 0,
                password: password,
                comments: [],
                likeUserIds:[]
              }),
              
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
            })
            
            
          }
          catch (error) {
            console.log(`Error in Post Api are : ${error}`)
          }
        }
        postApi();
        alert('Account has been Created')
        setSubmit(false);
        setHandleAgainFetch(true);
        setState(false);

       
      }
    }
    }, [submit,email,password])
    // Cookies Code
    useEffect(() => {
      const handleBeforeUnload = () => {
        Cookies.remove('email');
        Cookies.remove('password');
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
      Cookies.set('email', newEmail);
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      Cookies.set('password', newPassword);
    };
  
    return (
      <>
        <div>
          <div className=" max-md:flex max-md:items-center max-md:flex-col max-md:mt-10 max-md:mb-16">
            <div className=" flex items-center justify-center bg-gray-box w-96 h-14 rounded-xl max-md:w-[80%] dark:bg-black-box ">
              <div className=" flex items-center justify-center w-full h-full max-md:w-full ">
          <button onClick={() => setState(false)} className={ state === false ? " w-2/4 h-12 bg-white ml-1 rounded-lg dark:bg-black font-SamsungSharpSansBold " : " w-2/4 h-12 ml-1 rounded-lg font-SamsungSharpSansBold dark:text-white"}>
            Login
          </button>
            <button onClick={() => setState(true)} className={ state === true ? " w-2/4 h-12 mr-1 rounded-lg font-SamsungSharpSansBold bg-white  dark:text-white dark:bg-black" : " w-2/4 h-12 mr-1 rounded-lg font-SamsungSharpSansBold dark:text-white "}>
            Signup
          </button>
              </div>
            </div>
            <div className=" flex items-center justify-center border-2 border-solid border-grayLight h-12 rounded-lg w-96 mt-8 max-md:w-[80%]">
              <button className=" flex items-center gap-2 justify-center w-96 h-12 text-sm font-SamsungSharpSansMedium  dark:text-white ">
                <span>
                  <Image src={"/images/Google.png"} alt="Loading...." width={20} height={20}></Image>
                </span>
                Continue with Google
              </button>
            </div>
            <div className=" flex items-center gap-1 w-96 mt-8 max-md:w-[80%]">
              <hr className=" border border-solid border-grayLight w-48" />
              <p className=" text-black font-SamsungSharpSansMedium dark:text-white ">
                or
              </p>
              <hr className=" border border-solid border-grayLight w-48" />
            </div>
            <div className=" mt-6 max-md:w-[80%]">
              <label className=" text-grayLight font-SamsungSharpSansMedium">Email Address</label>
              <input className= "flex items-center border-2 border-solid border-grayLight h-12 rounded-lg outline-none w-96 pl-4 placeholder-grayLight max-md:w-[100%] font-SamsungSharpSansMedium text-sm  dark:bg-black text-grayLight " placeholder={email} onChange={handleEmailChange} type="email"></input>
            </div>
            <div className={state === true ? " mt-4 max-md:w-[80%]" : "hidden"}>
              <label className=" text-grayLight font-SamsungSharpSansMedium">Create Username</label>
              <input onChange={(e)=>{setUsername(e.target.value)}} className= "flex items-center border-2 border-solid border-grayLight h-12 rounded-lg outline-none w-96 pl-4 placeholder-grayLight max-md:w-[100%] font-SamsungSharpSansMedium text-sm dark:bg-black text-grayLight " placeholder="Codenest2023" type="text"></input>
            </div>
            <div className=" mt-6 max-md:w-[80%]">
              {state === false?
            <label className=" text-black dark:text-white">
            Password
                </label>
                :
                <label className=" text-black dark:text-white">
                Create Password
              </label>      
            }
              <div className=" flex items-center border-2 border-solid border-black h-12 rounded-lg w-96 max-md:w-[100%] dark:border-white">
                <input className={ show===false? " outline-none w-96 max-md:w-72 pl-4 font-SamsungSharpSansBold text-2xl dark:bg-black " : " outline-none w-96 max-md:w-72 pl-4 dark:bg-black dark:text-white font-SamsungSharpSansMedium"} type={show === false ? "password" : "text"} value={password} onChange={handlePasswordChange}></input>
                <Image src={ mode === false ? show === false ? "/images/notEye.png" : "/images/openEye1.png" : show === false ? "/images/notEye1.png" : "/images/openEye.png"}onClick={() => {ToggleIcon();}} alt="Loading..." width={19} height={19} className=" cursor-pointer ml-2 md:mr-3"></Image>
              </div>
            </div>
            <div
              className={
                state === false
                  ? 
                     " flex items-center justify-center bg-black text-white h-12 rounded-lg w-96 mt-8 max-md:w-[80%] dark:bg-white dark:text-black"
                  : "hidden"
              }
            >
              <Link href={move===true?'/home':'/'}>
                <button onClick={() => { setSubmit(true) }} className=" flex items-center justify-center font-medium w-96 h-12">
                  Login
                </button>
              </Link>
            </div>
            <div
               className={
                state === true
                  ? 
                     " flex items-center justify-center bg-black text-white h-12 rounded-lg w-96 mt-8 max-md:w-[80%] dark:bg-white dark:text-black"
                  : "hidden"
              }
            >
            
                <button onClick={() => { setSubmit(true) }} className=" flex items-center justify-center font-medium w-96 h-12">
                  Signup
                </button>
              
            </div>
           {showSuggest===true && state===false?<p className=" text-xs text-[red] mt-3">This Email ID or Password is Incorrect. <span className=" text-[blue]">Create Aaccount?</span> <span onClick={()=>{setState(true)}} className=" text-[purple] cursor-pointer underline">Signup</span></p>:null} 
          </div>
        </div>
        </>
    )
}