import { observer } from "mobx-react-lite";
import Head from "next/head";
import Image from "next/image";
import React, { PropsWithChildren } from "react";
import {
  BackOrHomeButton,
  ButtonType,
} from "../../dsl/components/Button/Button";
import Link from "../../dsl/components/Link/Link";
import FractionManager from "../components/FractionManager/FractionManager";
import { isDev, isStaging } from "../environment";
import { vars } from "../environment/vars";
import { css } from "../helpers/css";
import PageLayout from "../layouts/Page/Page.layout";
import { TITLE } from "./_app";

const DogeMajor = observer(() => {
  return (
    <>
      <Head>
        <title>{TITLE} | Doge Major</title>
      </Head>
      <PageLayout
        className={css("bg-repeat")}
        style={{ backgroundImage: `url(images/constellation.gif)` }}
      >
        <BackOrHomeButton type={ButtonType.White} />
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
          <div className={css("text-4xl", "text-white", "font-bold")}>
            Doge Major
          </div>
          <ParentPane>
            <div className={css("relative")}>
              <Image
                src={"/images/constellation.gif"}
                layout={"responsive"}
                width={640}
                height={640}
              />
            </div>
            <div
              className={css(
                "text-white",
                "font-bold    ",
                "text-sm",
                "text-center"
              )}
            >
              Doge Major by Anas Abdin
            </div>
          </ParentPane>

          <FractionManager
            contractAddress={vars.NEXT_PUBLIC_DOGE_MAJOR_ADDRESS}
            tokenId={isDev() || isStaging() ? 1 : 1211}
            buttonType={ButtonType.White}
          />

          <ParentPane>
            <div className={css("text-lg")}>
              We have purchased and fractionalized the beautiful 1/1 Doge Major
              NFT created by the talented{" "}
              <Link isExternal href={"https://twitter.com/AnasAbdin"}>
                Anas Abdin
              </Link>
              . All pixel holders can claim 1:1 fractions of Doge Major for each
              pixel held.
            </div>
          </ParentPane>
          <ParentPane>
            <div className={css("text-lg")}>
              Anas Abdin, is a Data Science Specialist, 1/1 NFT pixel artist and
              a game developer. He specialized in low resolution and limited
              palettes. He is super enthusiastic about web3 and its capabilities
              of protecting his artistic rights. He is minting every artwork he
              creates immediately after creation.
            </div>
          </ParentPane>
          <ParentPane>
            <div className={css("flex", "flex-row", "gap-4")}>
              <Link
                isExternal
                href={"https://fractional.art/vaults/doge-major"}
              >
                Tessera
              </Link>
              <Link
                isExternal
                href={"https://foundation.app/@anasabdin/pixle/61"}
              >
                Foundation
              </Link>
              <Link
                isExternal
                href={
                  "https://opensea.io/assets/ethereum/0xb2469a7dd9e154c97b99b33e88196f7024f2979e/1211"
                }
              >
                OpenSea
              </Link>
              <Link isExternal href={"https://twitter.com/AnasAbdin"}>
                Anas Abdin
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
        "border-blue-700",
        "p-3",
        "bg-black",
        "lg:max-w-md",
        "sm:max-w-full",
        "w-full",
        "text-white",
        "text-center",
        "font-bold"
      )}
    >
      {children}
    </div>
  );
};

export default DogeMajor;
