'use client'
import tweets from "@/app/utils/mock"
import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react"
const myProfile = tweets.find((item: any) => { return item.slug === 'my-profile' });
const myName = myProfile?.username;
interface Theme {
    mode: boolean,
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
    tweet: any,
    setTweet: Dispatch<SetStateAction<any>>,
    like: any,
    updateLike: any,
    countLike: number,
    updateCountLike: Dispatch<SetStateAction<number>>
    option:boolean,
    setOption:Dispatch<SetStateAction<boolean>>,
    option1:boolean,
    setOption1: Dispatch<SetStateAction<boolean>>,
    name: any,
    setName: any,
    triggerGetApi: boolean,
    setTriggerGetApi: Dispatch<SetStateAction<boolean>>
}
export const context = createContext({} as Theme);

export default function ContextApp({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState(false)
    const [show, setShow] = useState(false);
    const [tweetAdd, updateAdd] = useState(false);
    const [showSettingBehind, setShowSettingBehind] = useState(false);
    const [showEditProfileBehind, setShowEditProfileBehind] = useState(false);
    const [showEditTweet, setShowEditTweet] = useState(false);
    const [showDeleteTweet, setShowDeleteTweet] = useState(false);
    const [tweet, setTweet] = useState([{}]);
    const [like, updateLike] = useState([]);
    const [countLike, updateCountLike] = useState(0);
    const [option, setOption] = useState(false);
    const [option1, setOption1] = useState(false);
    const [name, setName] = useState(myName);
    const [triggerGetApi, setTriggerGetApi] = useState(false);
    return <context.Provider value={{ mode, setMode, show, setShow, tweetAdd, updateAdd, showSettingBehind, setShowSettingBehind, showEditProfileBehind, setShowEditProfileBehind, showEditTweet, setShowEditTweet, showDeleteTweet, setShowDeleteTweet, like, updateLike, countLike, updateCountLike,option,setOption,option1,setOption1,name,setName,tweet,setTweet,triggerGetApi,setTriggerGetApi }}>
        {children}
    </context.Provider>
} 