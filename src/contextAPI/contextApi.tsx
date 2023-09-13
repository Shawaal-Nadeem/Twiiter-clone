'use client'

import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react"

interface Theme
{
    mode:boolean,
    setMode: Dispatch<SetStateAction<boolean>>,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    tweetAdd: boolean,
    updateAdd: Dispatch<SetStateAction<boolean>>
    showSettingBehind: boolean,
    setShowSettingBehind: Dispatch<SetStateAction<boolean>>,
    showEditProfileBehind: boolean,
    setShowEditProfileBehind: Dispatch<SetStateAction<boolean>>,
    showEditTweet: boolean,
    setShowEditTweet: Dispatch<SetStateAction<boolean>>,
    showDeleteTweet: boolean,
    setShowDeleteTweet: Dispatch<SetStateAction<boolean>>,
}
export const context=createContext({} as Theme);

export default function ContextApp({children}:{children:ReactNode})
{
    const [mode, setMode] = useState(false)
    const [show, setShow] = useState(false);
    const [tweetAdd, updateAdd] = useState(false);
    const [showSettingBehind, setShowSettingBehind] = useState(false);
    const [showEditProfileBehind, setShowEditProfileBehind] = useState(false);
    const [showEditTweet, setShowEditTweet] = useState(false);
    const [showDeleteTweet, setShowDeleteTweet] = useState(false);
    return <context.Provider value={{mode,setMode,show,setShow,tweetAdd,updateAdd,showSettingBehind,setShowSettingBehind,showEditProfileBehind,setShowEditProfileBehind,showEditTweet,setShowEditTweet,showDeleteTweet,setShowDeleteTweet}}>
        {children}
    </context.Provider>
} 