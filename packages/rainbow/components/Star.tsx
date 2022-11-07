import { css } from "dsl/helpers/css";
import Image from "next/image";
import { PropsWithChildren } from "react";

const Star: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={css("relative")}>
      <Image
        src={"/images/star.svg"}
        width={175}
        height={175}
        alt={"bday start"}
      />
      <div
        className={css(
          "absolute",
          "w-full",
          "h-full",
          "flex",
          "justify-center",
          "items-center",
          "-top-[7px]",
          "-right-[6px]"
        )}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Star;
