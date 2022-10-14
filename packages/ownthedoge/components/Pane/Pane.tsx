import {PropsWithChildren, ReactNode} from "react";
import {css} from "../../helpers/css";

interface PaneProps {
    title?: string | ReactNode;
}

const Pane: React.FC<PropsWithChildren<any>> = ({children, title}) => {
    return <div className={css("relative", "border-2", "border-black", "p-2", "bg-pixels-yellow-100", "flex", "flex-col")} style={{boxShadow: "8px 8px"}}>
        {title && <div className={css("text-2xl", "font-bold", "mb-6")}>{title}</div>}
        {children}
    </div>
}

export default Pane
