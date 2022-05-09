import {css} from "../../helpers/css";
import {PropsWithChildren} from "react";
import React from "react"
import {Footer} from "../../components/Footer/Footer";

const PageLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
    return <div className={css("p-4", "grow", "flex", "flex-col")}>
      <div className={css("grow")}>
        {children}
      </div>
      <Footer/>
    </div>
}

export default PageLayout
