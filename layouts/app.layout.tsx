import {css} from "../helpers/css";
import {PropsWithChildren} from "react";

const AppLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return <div className={css("bg-white", "text-black", "grow", "flex", "flex-col", "p-3")}>
    {children}
  </div>
}

export default AppLayout
