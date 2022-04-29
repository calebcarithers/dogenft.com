import {css} from "../../helpers/css";
import {PropsWithChildren, useContext, useState} from "react";
import React from "react"
import Nav, {NavProvider} from "./Nav";

const HomeLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
  const [navSelection, setNavSelection] = useState("doge")
  return <div className={css("bg-white", "text-black", "grow", "flex", "flex-col", "p-4")}>
    <NavProvider value={[navSelection, setNavSelection]}>
      <main className={css("grow", "flex", "flex-col", "md:grid", "grid-cols-12")}>
        <Nav/>
        <Divider/>
        {children}
      </main>
    </NavProvider>
  </div>
}

const Divider = () => {
  return <div className={css("hidden", "md:flex", "justify-center")}>
    <div className={css("border-grey", "border-dashed", "col-span-1")} style={{width: "1px", borderWidth: "1px"}}/>
  </div>
}

export default HomeLayout
