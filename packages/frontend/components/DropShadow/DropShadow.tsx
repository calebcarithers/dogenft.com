import React, {PropsWithChildren} from "react";
import {css} from "../../helpers/css";

interface DropShadowProps {
  onClick?: () => void,
  className?: string,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
  style?: any
}

const DropShadow: React.FC<PropsWithChildren<DropShadowProps>> = ({
          children,
          onClick ,
          className,
          ...rest
}) => {
  return <div className={css("relative")} onClick={onClick}>
    <div className={css("w-full", "flex-1", "border-2", "border-solid", "border-black", css(className), {
      "hover:cursor-pointer": onClick,
      "active:translate-x-1": onClick,
      "active:translate-y-1": onClick
    })} {...rest}>
      {children}
    </div>
    <div className={css("bg-black", "absolute", "w-full", "h-full", "group-hover:bg-transparent")} style={{top: 5, left: 5, zIndex: -1}}/>
  </div>
}

export default DropShadow
