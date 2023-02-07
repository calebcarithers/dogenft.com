import { css } from "ownthedoge/helpers/css";
import { PropsWithChildren } from "react";

interface DividerProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

const verticalStyles = css("h-full", "w-1", "border-l-2");
const horizontalStyles = css("w-full");

export const Divider: React.FC<PropsWithChildren<DividerProps>> = ({
  orientation = "horizontal",
  className,
}) => {
  return (
    <div
      className={css(
        "border-pixels-yellow-300",
        "border-dashed",
        "border-t-2",
        className,
        {
          [verticalStyles]: orientation === "vertical",
          [horizontalStyles]: orientation === "horizontal",
        }
      )}
    />
  );
};
