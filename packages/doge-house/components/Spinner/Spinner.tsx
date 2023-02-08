import { css } from "@/../dsl/helpers/css";
import MoonLoader from "react-spinners/MoonLoader";

const Spinner = () => {
  return (
    <div className={css("flex", "justify-center", "items-center")}>
      <MoonLoader size={20} />
    </div>
  );
};

export default Spinner;
