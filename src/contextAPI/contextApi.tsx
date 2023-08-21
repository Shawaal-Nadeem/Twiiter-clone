'use client'

import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react"

interface Theme
{
    mode:boolean
    setMode:Dispatch<SetStateAction<boolean>>
}
export const context=createContext({} as Theme);

export default function ContextApp({children}:{children:ReactNode})
{
    const [mode,setMode]=useState(false)
    return <context.Provider value={{mode,setMode}}>
        {children}
    </context.Provider>
} 