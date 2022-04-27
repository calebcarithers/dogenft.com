import {PropsWithChildren} from "react";
import {css} from "../../helpers/css";


const HelperContent: React.FC<PropsWithChildren<{ }>> = ({children}) => {
  return <div className={css("border-2", "border-dashed", "border-grey-400", "inline-block", "text-base", "p-1", "mt-6")}>
    {children}
  </div>
}

export default HelperContent
