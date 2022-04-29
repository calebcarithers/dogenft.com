import {css} from "../../helpers/css";
import {PropsWithChildren} from "react";
import React from "react"

const PageLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
    return <div className={css("p-2")}>
        {children}
    </div>
}

export default PageLayout
