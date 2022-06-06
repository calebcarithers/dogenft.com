import {PropsWithChildren} from "react";
import {css} from "../../helpers/css";

interface PaneProps {
    title?: string;
}

const Pane: React.FC<PropsWithChildren<any>> = ({children, title}) => {
    return <div className={css("relative", "border-2", "border-black", "p-2", "bg-pixels-yellow-100")}>
        {title && <div className={css("text-2xl", "font-bold", "mb-4")}>{title}</div>}
        {children}
    </div>
}

export default Pane
