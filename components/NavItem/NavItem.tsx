import {PropsWithChildren} from "react";
import {css} from "../../helpers/css";

interface NavItemProps {
  isSelected?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<PropsWithChildren<NavItemProps>> = ({
                                                              isSelected = false,
                                                              onClick,
                                                              children}) => {
  return <div className={css("hover:cursor-pointer", "hover:underline")} onClick={onClick && onClick}>
    {isSelected && `❇ ${children} ❇`}
    {!isSelected && children}
  </div>
}

export default NavItem
