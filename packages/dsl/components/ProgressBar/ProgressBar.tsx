import { css } from "../../helpers/css";
//@ts-ignore
import { useRef } from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  max: number;
  min: number;
  now: number;
  thumb?: any;
  minLabel?: string;
  maxLabel?: string;
  nowLabel?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({min, max, now, thumb, minLabel, maxLabel, nowLabel}) => {
  const conatinerRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement>()
  const thumbRef = useRef<HTMLDivElement>()
  return <div className={css("relative", "my-14")}>
    <div ref={conatinerRef}
      className={css("h-[15px]", "bg-transparent", "w-full", "rounded-full", "border-[1px]", "border-black", "relative")}>
      <div className={css("h-full", "w-1/2", "bg-meme-yellow", "rounded-full", styles.rainbow)}/>
      <div
        className={css("absolute", "w-[60px]", "h-[60px]", "top-1/2", "-translate-y-[50%]", "left-1/2", "-translate-x-[50%]", "flex", "justify-center", "items-center")}>
        {thumb ? thumb : <div className={css("text-3xl")}>🐕</div>}
      </div>
    </div>
    <div className={css("absolute", "left-1/2", "top-10", "-translate-x-1/2")}>{nowLabel ? nowLabel : now}</div>
    <div className={css("absolute", "left-0", "top-10")}>{minLabel ? minLabel : min}</div>
    <div className={css("absolute", "right-0", "top-10")}>{maxLabel ? maxLabel : max}</div>
  </div>
}