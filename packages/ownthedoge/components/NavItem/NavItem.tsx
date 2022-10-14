import React, {PropsWithChildren} from "react";
import {css} from "../../helpers/css";
import {objectKeys} from "../../helpers/arrays";
import NoSsr from "../../environment/NoSsr";
import ColoredText from "../ColoredText/ColoredText";
import tailwindconfig from "../../tailwind.config"

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
                                                              children
}) => {
  // next will complain if this component gets rendered on the server as the style prop is randomly generated
  // and will not equal the client generated prop
  return <NoSsr>
    <div
      className={css("md:hover:cursor-pointer", "md:hover:underline", "hover:no-underline", "inline-block", "whitespace-nowrap", {"font-bold": isSelected})}
      onClick={onClick && onClick}>
        {isSelected ? <ColoredText>{children}</ColoredText> : <span>{children}</span>}
    </div>
  </NoSsr>
}

export default NavItem
