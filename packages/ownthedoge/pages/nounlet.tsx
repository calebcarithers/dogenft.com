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
            <div className={css("font-bold", "text-sm", "text-center")}>
              Nounlet #69
            </div>
          </ParentPane>

          {isProduction() && (
            <div className={css("text-black")}>
              <FractionManager
                contractAddress={vars.NEXT_PUBLIC_NOUNLET_ADDRESS}
                tokenId={1267}
              />
            </div>
          )}
          {!isProduction() && (
            <div>Nounlet claim only available on Mainnet</div>
          )}

          <ParentPane>
            <div className={css("text-lg")}>
              WE DID THE NOUNLET BOI. All pixel holders can claim 1:1 fractions
              of dis nounlet for each pixel held.
            </div>
          </ParentPane>
          <ParentPane>
            <div className={css("text-lg")}>
              Nounlets are sick and you want one
            </div>
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
                  "https://medium.com/tessera-nft/wtf-are-nounlets-ec4d6e324910"
                }
              >
                More Info
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
        "border-meme-green",
        "p-3",
        "lg:max-w-md",
        "sm:max-w-full",
        "w-full",
        "text-center",
        "font-bold"
      )}
    >
      {children}
    </div>
  );
};

export default Nounlet;
