import {FundedProject} from "../../interfaces";
import {PropsWithChildren} from "react";
import {css} from "../../helpers/css";
import Button from "../Button/Button";

interface BarkTankItemProps {
  project: FundedProject
}

const BarkTankItem: React.FC<PropsWithChildren<BarkTankItemProps>> = ({project}) => {
  return <Button block>
    <div className={css("text-left", "flex", "justify-between", "p-1")}>
      <div>
        <div>{project.projectName}</div>
        <div className={css("text-lg")}>description</div>
      </div>
      <div>status</div>
    </div>
  </Button>
}

export default BarkTankItem