import ColoredText from "@/../dsl/components/ColoredText/ColoredText";
import { css } from "@/../dsl/helpers/css";
import { Comic_Neue } from "@next/font/google";
import { PropsWithChildren } from "react";

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
});

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      style={{ backgroundImage: "url('/images/cloud.png')" }}
      className={css(
        comicNeue.className,
        "grow",
        "text-bold",
        "p-4",
        "font-normal",
        "bg-[#5c96dd00]",
        "bg-no-repeat",
        "flex",
        "flex-col",
        "bg-bottom",
        "items-center",
        "bg-cover",
        "pb-12"
      )}
    >
      <div className={css("max-w-6xl", "w-full", "flex", "flex-col")}>
        <div className={css("flex", "justify-center", "relative", "mt-6")}>
          <Title />
          {/* {isMyDogeInstalled && isConnected && (
            <div
              className={css(
                "absolute",
                "right-0",
                "top-1/2",
                "-translate-y-[50%]"
              )}
            >
              <DisconnectButton />
            </div>
          )} */}
        </div>
        {children}
      </div>
    </main>
  );
};

const Title = () => {
  return (
    <div className={css("flex", "items-center", "gap-4")}>
      <span className={css("text-3xl", "md:text-5xl")}>🛋️</span>
      <ColoredText
        className={css("font-bold", "text-stroke", "text-4xl", "md:text-7xl")}
      >
        dogecouch.house
      </ColoredText>
      <span className={css("text-3xl", "md:text-5xl")}>🛋️</span>
    </div>
  );
};

export default AppLayout;
