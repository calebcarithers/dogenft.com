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

const Fraction = observer(() => {
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
        <div className={css("flex", "justify-center", "mt-16", "flex-col", "items-center", "h-full", "px-4", "gap-y-12")}>
            <ParentPane>
                <div className={css("text-xl")}>
                    <div>
                        We have purchased the beautiful 1/1 "Doge Major" NFT create by the talented <Link isExternal href={"https://twitter.com/AnasAbdin"}>Anas Abdin</Link>
                    </div>
                </div>
            </ParentPane>
          <ParentPane>
              <FractionManager  />
          </ParentPane>
        </div>
      </PageLayout>
    </>
})

const ParentPane: React.FC<PropsWithChildren<any>> = ({children}) => {
    return <div className={css("border-2", "border-blue-700", "p-3", "bg-black", "max-w-xl", "w-full", "text-white", "text-center", "font-bold")}>
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
            } else if (fractionStore.availablePixelId !== -1) {
              return <Button
                  type={ButtonType.White}
                isLoading={fractionStore.isClaiming}
                disabled={activeChain?.id !== targetChain.id}
                onClick={() => fractionStore.claim()}>
                ✨ Claim ✨
              </Button>
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
    }, [fractionStore, fractionStore.availablePixelId,  fractionStore.signer])

    return <div className={css("flex", "justify-center", "text-white", "text-center", "font-bold", "text-lg")}>
              {renderIndicator()}
      </div>
})

export default Fraction
