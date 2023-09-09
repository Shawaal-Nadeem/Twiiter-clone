import { ThemeSwitcher } from "./themeSwitcher"
import { AddIcon } from "./addIcon"
export const RightSideHome = () => {
    return (
        <>
        {/* Right Side */}
      <div className="w-[25vw] hidden lmd:block h-[100vh]  ">
        <div className="w-[25vw] h-[100vh] fixed flex dark:bg-black">
          <div className="flex flex-col w-[100%] relative z-0">
            <div className=" cursor-pointer absolute top-[23px] right-0 mr-[36px]">
              <ThemeSwitcher/>
          </div>
            <AddIcon/>
          </div>
        </div>
      </div>
        </>
    )
}