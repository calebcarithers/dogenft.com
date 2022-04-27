import {css} from "../helpers/css";
import {PropsWithChildren} from "react";
import Image from "next/image";

const AppLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return <div className={css("bg-white", "text-black", "grow", "flex", "flex-col", "p-4")}>
    {children}
    <footer className={css("grow-0", "flex", "justify-between", "mt-10")}>
      <Image alt={"pleasr logo"} src={"/pleasrlogo.svg"} height={40} width={100}/>
      <div className={css("text-red-600")}>the important links here!</div>
    </footer>
  </div>
}

export default AppLayout
