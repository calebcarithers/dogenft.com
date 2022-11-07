import { css } from "../../helpers/css";
//@ts-ignore
import { ReactNode, useMemo, useRef } from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  max: number;
  min: number;
  now: number;
  thumb?: any;
  renderMinLabel?: () => ReactNode;
  renderMaxLabel?: () => ReactNode;
  renderNowLabel?: () => ReactNode;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({min, max, now, thumb, renderMinLabel, renderMaxLabel, renderNowLabel}) => {
  const conatinerRef = useRef<HTMLDivElement | null>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const percentage = useMemo(() => {
    return (now / (max - min)) * 100
  }, [now, min, max])

  return <div className={css("relative", "my-14")}>
    <div ref={conatinerRef}
      className={css("h-[15px]", "bg-pixels-yellow-100", "w-full", "rounded-full", "border-[1px]", "border-black", "relative")}>
      <div className={css("h-full", "bg-meme-yellow", "rounded-full", styles.rainbow)} style={{width: `${percentage}%`}}/>
      <div
        ref={thumbRef}
        style={{
          left: `${percentage}%`
        }}
        className={css("absolute", "z-20", "w-[60px]", "h-[60px]", "top-1/2", "-translate-y-[50%]", "-translate-x-[50%]", "flex", "justify-center", "items-center")}>
        {thumb ? thumb : <div className={css("text-3xl")}>🐕</div>}
      </div>
    </div>
    <div className={css("absolute", "top-24", "-translate-x-[50%]", "font-bold",)} style={{
      left: `${percentage}%`
    }}>{renderNowLabel ? renderNowLabel() : now}</div>
    <div className={css("absolute", "left-0", "top-14")}>{renderMinLabel ? renderMinLabel() : min}</div>
    <div className={css("absolute", "right-0", "top-14")}>{renderMaxLabel ? renderMaxLabel() : max}</div>
  </div>
}