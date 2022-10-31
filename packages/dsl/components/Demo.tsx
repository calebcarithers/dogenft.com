import { PropsWithChildren } from "react"
import { css } from "../helpers/css"

interface DemoProps {
    title?: string
}

const Demo: React.FC<PropsWithChildren<DemoProps>> = ({title, children}) => {
    return <div className={css("border-2", "border-pixels-yellow-200", "border-dashed", "p-3" ,"w-full")}>
        {title && <div className={css("text-xl", "font-bold")}>{title}</div>}
        <div>{children}</div>
  </div>
}

export default Demo
