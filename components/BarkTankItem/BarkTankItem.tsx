import {FundedProject} from "../../interfaces";
import {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {css} from "../../helpers/css";
import Button from "../Button/Button";

interface BarkTankItemProps {
  project: FundedProject
}

const BarkTankItem: React.FC<PropsWithChildren<BarkTankItemProps>> = ({project}) => {
  return <div className={css("relative", "inline-block", "z-10", "group")}>
    <div className={css("active:translate-x-1", "active:translate-y-1", "border-2",
      "border-black", "border-solid", "bg-white", "cursor-pointer", "p-2", "bg-contain", "group-hover:bg-doge")}
    >
      <div className={css("text-left", "flex", "justify-between", "p-1")}>
        <div>
          <div className={css("mb-2", "group-hover:bg-doge-orange", "p-1")}>{project.projectName}</div>
          <div className={css("text-lg", "group-hover:bg-doge-orange", "inline-block")}>description</div>
        </div>
        <div>status</div>
      </div>
    </div>
    <div className={css("absolute", "bg-black", "w-full", "h-full")} style={{top: "6px", left: "6px", zIndex: -1}}/>
  </div>


}

export default BarkTankItem