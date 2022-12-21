import React, { PropsWithChildren } from "react";
import { Footer } from "../../components/Footer/Footer";
import { css } from "../../helpers/css";
import { Background } from "../Home/Home.layout";

const PageLayout: React.FC<
  PropsWithChildren<{ className?: string; style?: object }>
> = ({ className, children, style }) => {
  return (
    <>
      <div
        className={css("p-4", "grow", "flex", "flex-col", className)}
        style={style}
      >
        <Background />
        <div className={css("grow")}>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
