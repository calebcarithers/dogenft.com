import { css } from "@/../dsl/helpers/css";
import MoonLoader from "react-spinners/MoonLoader";

const Spinner = ({ size = 22 }: { size?: number }) => {
  return (
    <div className={css("flex", "justify-center", "items-center")}>
      <MoonLoader size={size} loading={true} color={"black"} />
    </div>
  );
};

export default Spinner;
