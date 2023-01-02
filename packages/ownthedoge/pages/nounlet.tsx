import { BackOrHomeButton, ButtonType } from "dsl/components/Button/Button";
import Link, { LinkType } from "dsl/components/Link/Link";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import Image from "next/image";
import React, { PropsWithChildren } from "react";
import FractionManager from "../components/FractionManager/FractionManager";
import { isProduction } from "../environment";
import { vars } from "../environment/vars";
import { css } from "../helpers/css";
import PageLayout from "../layouts/Page/Page.layout";

const Nounlet = observer(() => {
  return (
    <>
      <Head>
        <title>The Doge NFT | Nounlet #69</title>
      </Head>
      <PageLayout className={css("bg-[#116082]", "text-white")}>
        <BackOrHomeButton />
        <div
          className={css(
            "flex",
            "justify-center",
            "mt-16",
            "flex-col",
            "items-center",
            "h-full",
            "px-4",
            "gap-y-8"
          )}
        >
          <div
            className={css(
              "relative",
              "lg:max-w-xl",
              "sm:max-w-full",
              "w-full"
            )}
          >
            <Image
              src={"/images/nounlet-perk.png"}
              layout={"responsive"}
              width={3000}
              height={3400}
              priority
            />
          </div>
          {isProduction() && (
            <div
              className={css(
                "text-white",
                "text-lg",
                "font-PressStart",
                "drop-shadow-[5px_5px_0px_rgba(0,0,0,0.95)]",
                "w-full"
              )}
            >
              <FractionManager
                contractAddress={vars.NEXT_PUBLIC_NOUNLET_ADDRESS}
                tokenId={1267}
                buttonType={ButtonType.Pixel}
              />
            </div>
          )}
          {/* {isProduction() && (
            <div className={css("text-lg", "font-bold")}>Claim not open</div>
          )} */}
          {!isProduction() && (
            <div className={css("text-lg", "font-bold")}>
              Nounlet claim only available on Mainnet
            </div>
          )}

          <ParentPane>
            <div>Henlo Dogens 🐶</div>
            <div className={css("mt-6")}>
              We did to the Nounlet #69 what we did to the Doge! Fractionalized
              for community ownership and wow✨
            </div>
            <div className={css("mt-6")}>
              Each Nounlet represents 1% of the vaulted Noun and has a vote in
              delegating the Noun{"'"}s governance rights. It brings the
              ownership of Nouns a step closer to the public and we now take it
              a step further; just because nounlets are cool and you want it 👀
            </div>
          </ParentPane>
          <ParentPane>
            <div>
              Claim 1:1 fractions of dis nounlet for every Pixel held and remain
              forever a fractional owner of the Noun 315 NFT 🟨
            </div>
            <div className={css("mt-6")}>Merry dogemas🎊</div>
          </ParentPane>
          <div className={css("flex", "flex-row", "gap-4", "text-xl")}>
            <Link
              bold
              type={LinkType.Black}
              isExternal
              href={"https://fractional.art/vaults/nounlet-69-noun-315"}
            >
              Tessera
            </Link>
            <Link
              bold
              type={LinkType.Black}
              isExternal
              href={
                "https://opensea.io/assets/ethereum/0xb2469a7dd9e154c97b99b33e88196f7024f2979e/1267"
              }
            >
              OpenSea
            </Link>
            <Link
              bold
              type={LinkType.Black}
              isExternal
              href={"https://nounlets.wtf/"}
            >
              Nounlets
            </Link>
            <Link
              bold
              type={LinkType.Black}
              isExternal
              href={
                "https://medium.com/tessera-nft/wtf-are-nounlets-ec4d6e324910"
              }
            >
              wtf?
            </Link>
          </div>
          <div
            className={css("w-full", "flex", "relative", "pt-60", "sm:pt-72")}
          >
            <div
              className={css(
                "max-w-[60%]",
                "sm:max-w-xs",
                "w-full",
                "absolute",
                "-left-[90px]",
                "sm:-left-[120px]",
                "sm:-top-8",
                "-top-2",
                "rotate-[90deg]"
              )}
            >
              <Image
                src={"/images/doge-nouns.png"}
                layout={"responsive"}
                width={2000}
                height={2000}
                priority
              />
            </div>
            <div
              className={css(
                "max-w-[60%]",
                "sm:max-w-xs",
                "w-full",
                "absolute",
                "-right-[90px]",
                "-top-2",
                "sm:-right-[120px]",
                "sm:-top-8",
                "-rotate-[90deg]"
              )}
            >
              <Image
                className={"-scale-x-100"}
                src={"/images/doge-nouns.png"}
                layout={"responsive"}
                width={2000}
                height={2000}
                priority
              />
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
});

const ParentPane: React.FC<PropsWithChildren<{ withBorder?: boolean }>> = ({
  children,
  withBorder = true,
}) => {
  const borderStyles = css("border-2", "border-black", "rounded-lg");
  return (
    <div
      className={css(
        "text-black",
        "lg:max-w-xl",
        "sm:max-w-full",
        "w-full",
        "font-bold",
        "text-2xl",
        "p-3",
        {
          "rounded-lg": withBorder,
          "bg-[#dc0d21]": withBorder,
          [borderStyles]: withBorder,
        }
      )}
    >
      <div
        className={css("p-4", "text-center", {
          [borderStyles]: withBorder,
          "bg-[#f18301]": withBorder,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Nounlet;
