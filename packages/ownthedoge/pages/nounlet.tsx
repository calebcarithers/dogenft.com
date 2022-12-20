import { observer } from "mobx-react-lite";
import Head from "next/head";
import Image from "next/image";
import React, { PropsWithChildren } from "react";
import { BackOrHomeButton } from "../../dsl/components/Button/Button";
import Link from "../../dsl/components/Link/Link";
import FractionManager from "../components/FractionManager/FractionManager";
import { isProduction } from "../environment";
import { vars } from "../environment/vars";
import { css } from "../helpers/css";
import PageLayout from "../layouts/Page/Page.layout";

const Nounlet = observer(() => {
  return (
    <>
      <Head>
        <title>The Doge NFT | Nounlet</title>
      </Head>
      <PageLayout
      // className={css("bg-repeat")}
      // style={{ backgroundImage: `url(images/constellation.gif)` }}
      >
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
          <div className={css("text-4xl", "font-bold")}>Nounlet #69</div>
          <ParentPane>
            <div className={css("relative")}>
              <Image
                src={"/images/nounlet.svg"}
                layout={"responsive"}
                width={640}
                height={640}
              />
            </div>
            <div className={css("font-bold", "text-sm", "text-center", "mt-3")}>
              Nounlet #69
            </div>
          </ParentPane>

          {isProduction() && (
            <div className={css("text-black", "text-lg")}>
              <FractionManager
                contractAddress={vars.NEXT_PUBLIC_NOUNLET_ADDRESS}
                tokenId={1267}
              />
            </div>
          )}
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
            <div className={css("mt-6")}>
              Claim 1:1 fractions of dis nounlet for every Pixel held and remain
              forever a fractional owner of the Noun 315 NFT🟨
            </div>
            <div className={css("mt-6")}>Merry dogemas🎊</div>
          </ParentPane>
          <ParentPane>
            <div className={css("flex", "flex-row", "gap-4")}>
              <Link
                isExternal
                href={"https://fractional.art/vaults/nounlet-69-noun-315"}
              >
                Tessera
              </Link>
              <Link
                isExternal
                href={
                  "https://opensea.io/assets/ethereum/0xb2469a7dd9e154c97b99b33e88196f7024f2979e/1267"
                }
              >
                OpenSea
              </Link>
              <Link isExternal href={"https://nounlets.wtf/"}>
                Nounlets
              </Link>
              <Link
                isExternal
                href={
                  "https://medium.com/tessera-nft/wtf-are-nounlets-ec4d6e324910"
                }
              >
                wtf?
              </Link>
            </div>
          </ParentPane>
        </div>
      </PageLayout>
    </>
  );
});

const ParentPane: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <div
      className={css(
        "border-2",
        "p-3",
        "lg:max-w-md",
        "sm:max-w-full",
        "w-full",
        "text-center",
        "font-bold",
        "text-lg",
        "rainbow-border"
      )}
    >
      {children}
    </div>
  );
};

export default Nounlet;
