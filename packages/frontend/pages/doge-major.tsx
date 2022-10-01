import React, {PropsWithChildren, useCallback, useEffect, useMemo} from "react";
import {BsArrowLeft} from "react-icons/bs";
import PageLayout from "../layouts/Page/Page.layout";
import {css} from "../helpers/css";
import Button, {ButtonType} from "../components/Button/Button";
import {useNetwork, useSigner} from "wagmi";
import {observer} from "mobx-react-lite";
import {ethers} from "ethers";
import Link from "../components/Link/Link";
import {useRouter} from "next/router";
import {isDev} from "../environment";
import Head from "next/head";
import {targetChain} from "../services/wagmi";
import FractionStore from "../stores/Fraction.store";
import {jsonify} from "../helpers/strings";
import Image from "next/image"

const DogeMajor = observer(() => {
    const router = useRouter()
    return <>
      <Head>
        <title>The Doge NFT | Doge Major</title>
      </Head>
      <PageLayout className={css("bg-repeat")} style={{backgroundImage: `url(images/constellation.gif)`}}>
        <div className={css("mb-8")}>
          <Button onClick={() => router.back()} type={ButtonType.White}>
            <BsArrowLeft size={15}/>
          </Button>
        </div>
        <div className={css("flex", "justify-center", "mt-16", "flex-col", "items-center", "h-full", "px-4", "gap-y-8")}>
            <div className={css("text-4xl", "text-white", "font-bold")}>Doge Major</div>
            <ParentPane>
                <div className={css("relative")}>
                    <Image src={'/images/constellation.gif'} layout={"responsive"} width={640} height={640}/>
                </div>
                <div className={css("text-white", "font-bold    ", "text-sm", "text-center")}>Doge Major by Anas Abdin</div>
            </ParentPane>

            <FractionManager />

            <ParentPane>
                <div className={css("text-lg")}>
                    We have purchased and fractionalized the beautiful 1/1 Doge Major NFT created by the talented <Link isExternal href={"https://twitter.com/AnasAbdin"}>Anas Abdin</Link>.
                    All pixel holders can claim 1:1 fractions of Doge Major for each pixel held.
                </div>
            </ParentPane>
            <ParentPane>
                <div className={css("text-lg")}>
                    Anas Abdin, is a Data Science Specialist, 1/1 NFT pixel artist and a game developer.
                    He specialized in low resolution and limited palettes.
                    He is super enthusiastic about web3 and its capabilities of protecting his artistic rights.
                    He is minting every artwork he creates immediately after creation.
                </div>
            </ParentPane>
            <ParentPane>
                <div className={css("flex", "flex-row", "gap-2")}>
                    <div>Links:</div>
                    <Link isExternal href={"https://fractional.art/vaults/doge-major"}>Teserra,</Link>
                    <Link isExternal href={"https://foundation.app/@anasabdin/pixle/61"}>Foundation,</Link>
                    <Link isExternal href={"https://opensea.io/assets/ethereum/0xb2469a7dd9e154c97b99b33e88196f7024f2979e/1211"}>OpenSea,</Link>
                    <Link isExternal href={"https://twitter.com/AnasAbdin"}>Anas Abdin</Link>
                </div>
            </ParentPane>
        </div>
      </PageLayout>
    </>
})

const ParentPane: React.FC<PropsWithChildren<any>> = ({children}) => {
    return <div className={css("border-2", "border-blue-700", "p-3", "bg-black", "lg:max-w-md", "sm:max-w-full", "w-full", "text-white", "text-center", "font-bold")}>
        {children}
    </div>
}

const FractionManager: React.FC<{}> = observer(({}) => {
    const fractionStore = useMemo(() => new FractionStore(), [])
    const {activeChain} = useNetwork()
    const {data: signer} = useSigner()
    useEffect(() => {
        fractionStore.signer = signer
        if (fractionStore.contractAddress && fractionStore.abi && signer) {
            fractionStore.contract = new ethers.Contract(fractionStore.contractAddress, fractionStore.abi, signer)
            fractionStore.getCanClaim()
        }
    }, [signer, fractionStore.contractAddress, fractionStore.abi])

    useEffect(() => {
        fractionStore.init()
        return () => {
            fractionStore.destroy()
        }
    }, [])

    const renderIndicator = useCallback(() => {
        if (fractionStore.signer) {
            if (targetChain.id !== activeChain?.id) {
                return `Please connect to: ${targetChain.name}`
            } else if (fractionStore.canClaim) {
              return <Button
                  type={ButtonType.White}
                isLoading={fractionStore.isClaiming}
                disabled={activeChain?.id !== targetChain.id}
                onClick={() => fractionStore.claim()}>
                ✨ Claim ({fractionStore?.availablePixelIds.length}) ✨</Button>
            } else if (fractionStore.hasAlreadyClaimed) {
                return "🌠 Thanks for claiming! 🌠"
            } else {
              return <div>
                <div>No pixels found!</div>
                <div>Mint one <Link isExternal href={isDev() ? "https://dev.pixels.ownthedoge.com" : "https://pixels.ownthedoge.com"}>here</Link>
                </div>
              </div>
            }
        } else {
          return <div>
            Connect wallet to mint
          </div>
        }
    }, [fractionStore, fractionStore.availablePixelIds,  fractionStore.signer])

    return <div className={css("flex", "justify-center", "text-white", "text-center", "font-bold", "text-2xl")}>
          {renderIndicator()}
      </div>
})

export default DogeMajor
