'use client'
import Link from "next/link"

export const LogoutButton = () => {
    
    return (
        <>
        <div className=" border-[5px] cursor-pointer mt-[60vh] border-mainBg rounded-[10px] w-[90%] dark:border-[#121212] dark:text-white">
            <Link href={"/"}>
              <button className="w-[100%] flex justify-center py-[13px]  text-[0.875rem] font-[700] leading-[normal] tracking-[-0.056px] font-SamsungSharpSansBold dark:text-white">
                Logout
              </button>
            </Link>
          </div>
        </>
    )
}