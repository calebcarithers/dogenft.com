import {PropsWithChildren} from "react";
import {css} from "../../helpers/css";


const HelperContent: React.FC<PropsWithChildren<{ }>> = ({children}) => {
  return <div className={css("border-2", "border-dashed", "border-pixels-yellow-200", "inline-block", "text-base", "p-1", "mt-6", "bg-pixels-yellow-100")}>
    {children}
  </div>
}

export default HelperContent
