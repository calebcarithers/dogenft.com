import React, {PropsWithChildren} from "react";
import {css} from "../../helpers/css";
import {objectKeys} from "../../helpers/arrays";
import NoSsr from "../../environment/NoSsr";
const tailwindconfig = require("../../tailwind.config")

const dogeColors = tailwindconfig.theme.extend.colors.doge
const dogeColorNames = objectKeys(dogeColors)

interface NavItemProps {
  isSelected?: boolean;
  onClick?: () => void;
  children: string;
}

const NavItem: React.FC<PropsWithChildren<NavItemProps>> = ({
                                                              isSelected = false,
                                                              onClick,
                                                              children}) => {
  // next will complain if this component gets rendered on the server as the style prop is randomly generated
  // and will not equal the client generated prop
  return <NoSsr>
    <div
      className={css("hover:cursor-pointer", "hover:underline", "inline-block")}
      onClick={onClick && onClick}>
      {[...children].map((char, index) => {
        let color = "inherit"
        if (isSelected) {
          const colorName = dogeColorNames[Math.floor(Math.random() * dogeColorNames.length)]
          color = dogeColors[colorName]
        }
        return <span
          style={{color: color}}>
          {char}
        </span>
      })}
    </div>
  </NoSsr>
}

export default NavItem
