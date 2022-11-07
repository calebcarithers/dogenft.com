import { css } from "dsl/helpers/css";
import { PropsWithChildren } from "react";

const donationStyle = css("bg-doge-orange");
const swapStyle = css("bg-doge-blue");

const Pill: React.FC<PropsWithChildren<{ type: "donation" | "swap" }>> = ({
  type,
}) => {
  return (
    <span
      style={{ borderWidth: "1px" }}
      className={css(
        "inline-block",
        "font-normal",
        "text-sm",
        "border-black",
        "rounded-full",
        "px-2",
        "py-0.5",
        {
          [donationStyle]: type === "donation",
          [swapStyle]: type === "swap",
        }
      )}
    >
      {type === "donation" ? "donation" : "🌈 swap"}
    </span>
  );
};

export default Pill;
