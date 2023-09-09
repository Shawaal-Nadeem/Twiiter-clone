'use client'
import Image from "next/image";
import { ThemeSwitcher } from "./themeSwitcher";
export const MobileSizeIcon = () => {
  
    return (
        <div className=" flex items-center flex-col mr-2 mt-3 md:hidden absolute z-[1] right-0 top-0 bottom-0">
            <Image src={"/images/X.png"} alt="Loading....." width={55} height={55}></Image>
            <ThemeSwitcher/>
      </div>
    )
}
