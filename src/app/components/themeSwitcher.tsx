'use client'
import Image from "next/image";
import { useContext, useState } from "react";
import { context } from "@/contextAPI/contextApi";


export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light')
  const getContext = useContext(context);
  const mode = getContext.mode;
  const setMode = getContext.setMode;
    function ToggleMode() {
        if (theme === 'light') {
          setTheme('dark');
          document.documentElement.classList.add('dark');
          setMode(true);
        } else  {
          setTheme('light');
          document.documentElement.classList.remove('dark');
          setMode(false);
        }
    }
 
    return (
        <>
        <Image
            onClick={() => {
              ToggleMode();
            }}
            src={
              mode === false
                ? "/images/light mode icon.png"
                : "/images/dark mode icon.png"
            }
            alt="Loading....."
            width={45}
            height={45}
            className=" mt-2 cursor-pointer"
            ></Image>
        </>
    )
}
