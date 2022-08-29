import Head from "next/head"
import {BsArrowLeft} from "react-icons/bs";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import { useSigner } from "wagmi";
import {Contract, ethers} from "ethers";
import Button from "../components/Button/Button";
import PageLayout from "../layouts/Page/Page.layout";
import ColoredText from "../components/ColoredText/ColoredText";
import Modal, { DialogSize } from "../components/Modal/Modal";
import {ClipLoader} from "react-spinners";
import tailwindconfig from "../tailwind.config";
import SoulBoundAbi from "../services/abis/soulBound.abi";
import {css} from "../helpers/css";
import DropShadow from "../components/DropShadow/DropShadow";
import {vars} from "../environment/vars";
import {getProof} from "../services/merkletree";
import {getSoulboundWhitelist} from "../environment";
import axios from "axios";
import Link from "../components/Link/Link";

interface IMetadata {
    id: number,
    name: string,
    url: string
}

const METDATAS: IMetadata[] = [
    {
        id: 0,
        name: "Jumpy Doge",
        url: "/videos/doge-0.mp4",
    },
    {
        id: 1,
        name: "Skydancer Doge",
        url: "/videos/doge-1.mp4",
    },
    {
        id: 2,
        name: "Stretchy Doge",
        url: "/videos/doge-2.mp4",
    },
    {
        id: 3,
        name: "Breakdancing Doge",
        url: "/videos/doge-3.mp4",
    },
]

const SoulBound: React.FC = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false);
    const [selectedMetadata, setSelectedMetadata] = useState<IMetadata | any>({});
    const [isClaiming, setIsClaiming] = useState(false);
    const {data: signer} = useSigner();
    const [soulBoundContract, setSoulBoundContract] = useState<Contract | null>();
    const [isClaimed, setIsClaimed] = useState(false);
    const [isInWhiteList, setIsInWhitelist] = useState(false);
    const [claimedId, setClaimedId] = useState<number | null>(null)
    const [justClaimed, setJustClaimed] = useState(false)

    useEffect(() => {
        const init = async() => {
            if (SoulBoundAbi && signer) {
                const contract = new ethers.Contract(vars.NEXT_PUBLIC_SOULBOUND_CONTRACT_ADDRESS, SoulBoundAbi, signer)
                setSoulBoundContract(contract);
                const address = await signer.getAddress();
                const claimed = await contract.hasClaimed(address);
                setIsClaimed(claimed)
            }
        }

        if (!signer) {
            setClaimedId(null)
            setIsInWhitelist(false)
            setIsClaimed(false)
        }

        init();

    }, [signer])
    useEffect(() => {
        const getClaimedId = async () => {
            if (soulBoundContract && signer && isClaimed) {
                const address = await signer?.getAddress()
                // user can only transfer token to their address since it is soulbound
                const filter = soulBoundContract.filters.Transfer(null, address)
                const logs = await soulBoundContract.queryFilter(filter)

                if (logs.length > 1) {
                    throw new Error("There should not be more than one transfer event here")
                }

                if (logs.length == 1 && logs[0].args) {
                    const [,, tokenId] = logs[0].args
                    const uri = await soulBoundContract.tokenURI(tokenId.toNumber())
                    const {data: metadata} = await axios.get(`https://ipfs.io/ipfs/${uri.split("ipfs://")[1]}`)
                    const name = metadata?.name
                    const claimedId = METDATAS.filter(item => item.name === name)[0]?.id
                    if (claimedId !== null) {
                        setClaimedId(claimedId)
                    }
                }
            }
        }
        getClaimedId()
    }, [soulBoundContract, signer, isClaimed])

    useEffect(() => {
        const getIsInWhiteList = async () => {
            const address = await signer?.getAddress()
            if (address) {
                if (getSoulboundWhitelist().includes(address)) {
                    console.log("debug:: hit is in whitelist")
                    setIsInWhitelist(true)
                } else {
                    setIsInWhitelist(false)
                }
            }
        }
        getIsInWhiteList()
    }, [signer])

    const onClickMetadata = (metadata: any) => {
        setSelectedMetadata(metadata);
        setShowModal(true);
    }

    const claim = async() => {
        setIsClaiming(true);
        if (soulBoundContract) {
            try {
                const address = await signer?.getAddress();
                if (!address) return;

                const proof = getProof(address)
                const tx = await soulBoundContract.safeMint(proof, selectedMetadata.id);
                await tx.wait();
                setJustClaimed(true)
                setIsClaimed(true);
            } catch(err) {
                console.log({err})
            }
        } else {
          console.error("debug:: no contract found")
        }
        setIsClaiming(false);
    }

    const getStatusText = useCallback(() => {
        if (signer) {
            if (isClaimed) {
                return <div className={css("text-xl", "font-bold")}>
                    <div>You have already claimed!</div>
                    <div>~ something heart-warming here ~</div>
                </div>
            } else if (isInWhiteList) {
                return <div className={css("text-xl", "font-bold")}>
                    <div>Thanks for holding DOG and/or Pixels</div>
                    <div>You are eligible to mint!</div>
                    <div className={css("text-lg", "text-pixels-yellow-500")}>(Select token below)</div>
                </div>
            }
            return <div className={css("font-bold")}>
                <div>Sorry you are not on the whitelist.</div>
                <div>You can still claim the original music video <Link href={"/radio"}>here</Link> if you <Link isExternal href={'https://pixels.ownthedoge.com'}>Own a Pixel</Link>.</div>
            </div>
        }
        return <div className={css("text-gray-400", "font-bold")}>Connect wallet to mint</div>
    }, [signer, isInWhiteList, isClaimed])

    return <PageLayout>
        <Head>
            <title>The Doge NFT </title>
        </Head>

        <div>
            <div className={css("mb-8")}>
                <Button onClick={() => router.push("/")}>
                    <BsArrowLeft size={15}/>
                </Button>
            </div>
            <div className={css("mt-4", "text-2xl", "max-w-3xl", "m-auto")}>
              <div className={css("flex", "justify-center", "text-4xl", "font-bold", "mt-16")}>
                  <ColoredText>🎂✨ DOG Turns 1 ✨🎂</ColoredText>
              </div>

              <div className={css( "text-xl", "my-12", "text-center")}>
                DOG turns 1! On September 1st 2021 at 7PM UTC, The Doge NFT was fractionalized, creating DOG.
                Something something ~~soulbound~~
              </div>
              <div className={css("mt-1", "text-xl", "mb-8", "text-center")}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </div>

                <div className={css("my-12", "text-lg", "text-center")}>
                    {getStatusText()}
                </div>

              <div className={css("grid", "px-12", "md:px-0", "grid-cols-1", "md:grid-cols-2", "gap-20", "md:gap-10")}>
                {
                  METDATAS.map((metadata: IMetadata, index)=> {
                    return (
                        <div key={`${metadata.name}-${index}`} className={css({
                            "opacity-50": isClaimed && metadata.id !== claimedId
                        })}>
                          <DropShadow onClick={isClaimed ? undefined : () => onClickMetadata(metadata)} key={metadata.id} className={css("bg-black[0.05]")}>
                            <video className={css("w-full")} autoPlay={true} loop muted>
                              <source src={metadata.url} key={metadata.id} />
                            </video>
                          </DropShadow>
                          <div className={css("text-center", "mt-4", "text-xl")}>{metadata.name}</div>
                        </div>
                    )
                  })
                }
              </div>
            </div>
        </div>
        <Modal
            size={DialogSize.sm}
            isOpen={showModal}
            title={isClaimed ? "✨   Claimed   ✨" : `✨  ${selectedMetadata.name}  ✨`}
            onChange={(val) => setShowModal(val)}
        >
            <div className={css("w-full", "m-auto")}>
                <video  className={css("w-full", "border-2", "border-black")} autoPlay={true} loop muted>
                    <source src={selectedMetadata.url} key={selectedMetadata.id} />
                </video>
            </div>
            {justClaimed && <div className={css('text-2xl', "mt-8", "mb-4")}>
              <div className={css("text-center")}>Thanks for claiming!</div>
            </div>}
            {!justClaimed && <div className={css("flex", "justify-center", "my-6")}>
                {signer && !isClaimed && <Button isLoading={isClaiming} onClick={() => claim()}>
                  Claim
                </Button>}
                {!signer && <div className={css("text-xl")}>Connect wallet to mint</div>}
            </div>}
        </Modal>
    </PageLayout>
}


export default SoulBound


