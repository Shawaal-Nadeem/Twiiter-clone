import Image from "next/image";
import { MobileSizeIcon } from "../components/mobileSizeIcon";
import { LoginForm } from "../components/loginForm";
import { ThemeSwitcher } from "../components/themeSwitcher";
export default function LognSignPage() {

  
  return (
    <div className=" max-md: flex justify-center max-xsm:overflow-x-hidden font-SamsungSharpSansBold">
      <div className=" flex items-center justify-between w-full h-[100vh] max-md:flex-col max-md:w-[100%] max-md:[100vh] max-md:h-auto dark:bg-black ">
        <div>
          <Image src={"/images/Mask group.png"} alt="Loading...." width={325} height={325} className="dark:grayscale h-[100vh] w-full max-md:hidden grayscale-0"></Image>
          <Image src={"/images/bg 1.png"} alt="Loading...." width={200} height={200} className=" md:hidden w-[100vw] relative grayscale-0 dark:grayscale"></Image>
          <MobileSizeIcon/>
        </div>
        <LoginForm/>

        <div className=" flex items-center flex-col self-start mr-2 mt-3 max-md:hidden">
          <Image
            src={"/images/X.png"}
            alt="Loading....."
            width={55}
            height={55}
          ></Image>
         <ThemeSwitcher/>
        </div>
      </div>
    </div>
  );
}
