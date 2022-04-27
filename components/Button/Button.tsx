import {css} from "../../helpers/css";
import {PropsWithChildren} from "react";

const buttonStyles = css("p-2", "bg-white", "text-black", "font-bold")

interface ButtonProps {
  onClick?: () => void;
  block?: boolean
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({onClick, block, children}) => {
  return <div className={css("relative", "inline-block", "z-10", {"w-full": block})}>
    <button onClick={onClick && onClick} className={css(buttonStyles, "active:translate-x-1", "active:translate-y-1", "border-2", "border-black", "border-solid", {"w-full": block})}>
      {children}
    </button>
    <div className={css("absolute", "bg-black", "w-full", "h-full")} style={{top: "6px", left: "6px", zIndex: -1}}/>
  </div>
}

export default Button
