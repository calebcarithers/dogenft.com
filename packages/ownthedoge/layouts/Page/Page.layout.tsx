import {css} from "../../helpers/css";
import {PropsWithChildren} from "react";
import React from "react"
import {Footer} from "../../components/Footer/Footer";

const PageLayout: React.FC<PropsWithChildren<{className?: string, style?: object}>> = ({className, children, style}) => {
    return <div className={css("p-4", "grow", "flex", "flex-col", className)} style={style}>
        <div className={css("grow")}>
            {children}
        </div>
        <Footer/>
    </div>
}

export default PageLayout
