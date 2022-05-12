import {AirtableSubmissionProject} from "../../interfaces";
import {PropsWithChildren, useState} from "react";
import {css} from "../../helpers/css";
import {useRouter} from "next/router";

interface BarkTankItemProps {
  project: AirtableSubmissionProject;
}

const BarkTankItem: React.FC<PropsWithChildren<BarkTankItemProps>> = ({project}) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState(false)


  return <div className={css("relative", "inline-block", "z-10", "group")}
              onClick={() => router.push(`/barktank/${project.id}`)}>
    <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={css("active:translate-x-1", "active:translate-y-1", "border-2",
      "border-black", "border-solid", "bg-white", "cursor-pointer", "p-2", "bg-contain", "relative")}
         style={{backgroundImage: isHover ? (project.imageUrl ? `url(${project.imageUrl})` : `url(/images/doge_tiled.jpeg)`) : 'inherit'}}
    >
      {/*<img src={project.imageUrl ? project.imageUrl : "/images/doge_tiled.jpeg"} className={css("w-full", "h-full")} style={{objectFit: "cover"}}/>*/}
      <div className={css("text-left", "flex", "justify-between", "p-1")}>
        <div className={css("flex", "flex-col")}>
          <div className={css("mb-1", "group-hover:bg-doge-orange", "px-1", "break-all",
            "border-2", "border-solid", "border-transparent", "group-hover:border-black", "font-bold", "inline-block", "w-fit")}>
            {project.projectName}
          </div>
          <div className={css("text-lg", "group-hover:bg-doge-orange", "inline-block",
            "px-1","border-2", "border-solid", "border-transparent", "group-hover:border-black", "w-fit")}>
            {project.shortDescription}
          </div>
        </div>
        <div className={css("md:text-lg", "text-base", "border-2", "border-solid", "border-black",
          "bg-doge-orange", "self-start", "px-2")}>
          {project.status}
        </div>
      </div>
    </div>
    <div className={css("absolute", "bg-black", "w-full", "h-full")} style={{top: "6px", left: "6px", zIndex: -1}}/>
  </div>


}

export default BarkTankItem