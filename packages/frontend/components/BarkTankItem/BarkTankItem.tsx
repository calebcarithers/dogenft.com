import {AirtableSubmissionProject} from "../../interfaces";
import {PropsWithChildren, useState} from "react";
import {css} from "../../helpers/css";
import {useRouter} from "next/router";
import DropShadow from "../DropShadow/DropShadow";

interface BarkTankItemProps {
    project: AirtableSubmissionProject;
}

const BarkTankItem: React.FC<PropsWithChildren<BarkTankItemProps>> = ({project}) => {
    const router = useRouter()
    const [isHover, setIsHover] = useState(false)


    return <>
      <div className={css("relative", "inline-block", "z-10", "group")}
           onClick={() => router.push(`/barktank/${project.id}`)}>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={css("active:translate-x-1", "active:translate-y-1", "border-2",
            "border-black", "border-solid", "bg-pixels-yellow-100", "cursor-pointer", "p-2", "bg-contain", "relative")}
          style={{backgroundImage: (project.imageUrl ? `url(${project.imageUrl})` : `url(/images/doge_tiled.jpeg)`)}}>
          <div className={css("text-left", "flex", "justify-between", "p-1")}>
            <div className={css("flex", "flex-col")}>
              <div className={css("mb-1", "bg-doge-orange", "md:bg-transparent", "border-black", "group-hover:bg-doge-orange", "px-1", "break-all",
                "border-2", "border-solid", "md:border-transparent", "group-hover:border-black", "font-bold", "inline-block", "w-fit", "z-10")}>
                {project.projectName}
              </div>
              <div className={css("text-lg", "bg-doge-orange", "md:bg-transparent", "border-black", "group-hover:bg-doge-orange", "inline-block",
                "px-1", "border-2", "border-solid", "md:border-transparent", "group-hover:border-black", "w-fit", "z-10")}>
                {project.shortDescription}
              </div>
            </div>
            <div className={css("md:text-lg", "text-base", "border-2", "border-solid", "border-black",
              "bg-doge-orange", "self-start", "px-2", "z-10")}>
              {project.status}
            </div>
          </div>
          <div className={css("absolute", "w-full", "h-full", "md:bg-pixels-yellow-100", "left-0", "top-0", "group-hover:bg-transparent", "z-0")}/>
        </div>
        <div className={css("absolute", "bg-black", "w-full", "h-full")} style={{top: "6px", left: "6px", zIndex: -1}}/>
      </div>
    </>
}

export default BarkTankItem