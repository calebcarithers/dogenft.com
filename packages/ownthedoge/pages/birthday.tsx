import Head from "next/head"
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import {useNetwork, useSigner} from "wagmi";
import {Contract, ethers} from "ethers";
import Button, {BackOrHomeButton} from "../../dsl/components/Button/Button";
import PageLayout from "../layouts/Page/Page.layout";
import ColoredText from "../../dsl/components/ColoredText/ColoredText";
import Modal, {DialogSize} from "dsl/components/Modal/Modal";
import SoulBoundAbi from "../services/abis/soulBound.abi";
import {css} from "../helpers/css";
import DropShadow from "../components/DropShadow/DropShadow";
import {vars} from "../environment/vars";
import {getProof} from "../services/merkletree";
import {getSoulboundWhitelist, isProduction} from "../environment";
import axios from "axios";
import Link from "../../dsl/components/Link/Link";
import {targetChain} from "../services/wagmi";

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
  const {chain} = useNetwork();
  const [soulBoundContract, setSoulBoundContract] = useState<Contract | null>();
  const [isClaimed, setIsClaimed] = useState(false);
  const [isInWhiteList, setIsInWhitelist] = useState(false);
  const [claimedId, setClaimedId] = useState<number | null>(null)
  const [justClaimed, setJustClaimed] = useState(false)

  const isConnectedToCorrectNetwork = useMemo(() => chain?.id === targetChain.id, [chain?.id, targetChain.id])

  useEffect(() => {
    const init = async () => {
      if (SoulBoundAbi && signer && isConnectedToCorrectNetwork) {
        const contract = new ethers.Contract(vars.NEXT_PUBLIC_SOULBOUND_CONTRACT_ADDRESS, SoulBoundAbi, signer)
        setSoulBoundContract(contract);
        const address = await signer?.getAddress();
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

  }, [signer, isConnectedToCorrectNetwork, targetChain.id])
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
          const [, , tokenId] = logs[0].args
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

  const claim = async () => {
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
      } catch (err) {
        console.error({err})
      }
    } else {
      console.error("debug:: no contract found")
    }
    setIsClaiming(false);
  }

  const getStatusText = useCallback(() => {
    if (signer) {
      if (isClaimed) {
        return <div className={css("text-2xl", "font-bold")}>
          <div className={css("mb-2")}>You claimed {METDATAS.filter(item => item.id === claimedId)[0]?.name}!</div>
          <div className={css("my-6")}>View on <Link isExternal
                                                     href={isProduction() ? "https://opensea.io/collection/dogs-first-birthday" : "https://testnets.opensea.io/collection/dogs-first-birthday-final"}>OpenSea</Link>
          </div>
          <div>
            Welcome to the fellowship of the Doge - bound by DOG, governed by memes,
            respected for provenance and protected by us Dogens. bork!
          </div>
        </div>
      } else if (isInWhiteList) {
        return <div className={css("text-2xl", "font-bold")}>
          <div>Thanks for holding DOG and/or Pixels</div>
          <div>You are eligible to mint!</div>
          <div className={css("text-xl", "text-pixels-yellow-500")}>(Select token below)</div>
        </div>
      }
      return <div className={css("font-bold", "text-2xl")}>
        <div>Sorry you are not on the whitelist.</div>
        <div>You can still claim the original music video <Link href={"/radio"}>here</Link> if you <Link isExternal
                                                                                                         href={'https://pixels.ownthedoge.com'}>Own
          a Pixel</Link>.
        </div>
      </div>
    }
    return <div className={css("text-gray-400", "font-bold")}>Connect wallet to mint</div>
  }, [signer, isInWhiteList, isClaimed, claimedId])

  return <PageLayout>
    <Head>
      <title>The Doge NFT | Birthday</title>
    </Head>
    <div>
      <BackOrHomeButton/>
      <div className={css("mt-4", "text-2xl", "max-w-3xl", "m-auto")}>
        <div className={css("flex", "justify-center", "text-4xl", "font-bold", "mt-16")}>
          <ColoredText>🎂✨ DOG Turns 1 ✨🎂</ColoredText>
        </div>

        <div className={css("text-xl", "my-12", "text-center")}>
          DOG turns 1! Memes rule the internet, and 1 year ago we democratized the internet by decentralizing the
          ownership of its most famous meme.
          On August 30th, 2021, PleasrDAO fractionalized The Doge NFT giving birth to DOG, a token representing
          ownership of the OG Doge meme.
        </div>
        <div className={css("mt-1", "text-xl", "mb-8", "text-center")}>
          To commemorate 1 year of wholesomeness, fun, dogely values and philanthropy on the blockchain,
          we have launched our very special birthday edition soulbound (read more <Link isExternal
                                                                                        href="https://vitalik.ca/general/2022/01/26/soulbound.html">here</Link>)
          token series for supporters who held
          DOG on-chain (Ethereum, Arbitrum, BSC, Polygon, or Optimism) and/or <Link isExternal
                                                                                    href="https://pixels.ownthedoge.com">Doge
          Pixels</Link>, before August 30th, 2022.
          This NFT is a clip from our music video titled “In Doge We Trust” which was
          created in collaboration with <Link isExternal
                                              href="https://twitter.com/Bassjackers">Bassjackers</Link>, <Link
          isExternal href="https://twitter.com/pplpleasr1"> pplpleasr</Link>,
          and <Link isExternal href="https://twitter.com/cloudeatr">cloudeatr</Link>. It not only establishes you as a
          respectable
          member of our DOG universe but also gives you the right to call yourself a Dogen!
        </div>

        <div className={css("text-lg", "text-center")}>
          For the whole month of September, all Doge Pixel holders can claim the full music video <Link
          href="/radio">here</Link>.
        </div>


        <div className={css("my-12", "text-lg", "text-center")}>
          {targetChain.id === chain?.id ? getStatusText() :
            <div className={css("font-bold")}>Please connect to: {targetChain.name}</div>}
        </div>

        <div className={css("grid", "px-12", "md:px-0", "grid-cols-1", "md:grid-cols-2", "gap-20", "md:gap-10")}>
          {
            METDATAS.map((metadata: IMetadata, index) => {
              return (
                <div key={`${metadata.name}-${index}`} className={css({
                  "opacity-50": (isClaimed && metadata.id !== claimedId) || (signer && !isInWhiteList)
                })}>
                  <DropShadow
                    onClick={isClaimed || (signer && !isInWhiteList) ? undefined : () => onClickMetadata(metadata)}
                    key={metadata.id} className={css("bg-black[0.05]")}>
                    <video className={css("w-full")} autoPlay={true} loop muted>
                      <source src={metadata.url} key={metadata.id}/>
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
      <div className={css("w-full", "m-auto", "max-w-xl")}>
        <video className={css("w-full", "border-2", "border-black")} autoPlay={true} loop muted>
          <source src={selectedMetadata.url} key={selectedMetadata.id}/>
        </video>
      </div>
      {justClaimed && <div className={css('text-2xl', "mt-8", "mb-4")}>
        <div className={css("text-center")}>Thanks for claiming!</div>
      </div>}
      {!justClaimed && <div className={css("flex", "justify-center", "my-6")}>
        {signer && !isClaimed &&
          <Button disabled={!isConnectedToCorrectNetwork} isLoading={isClaiming} onClick={() => claim()}>
            {isConnectedToCorrectNetwork ? "Claim" : `Please change network to: ${targetChain.name}`}
          </Button>}
        {!signer && <div className={css("text-xl")}>Connect wallet to mint</div>}
      </div>}
    </Modal>
  </PageLayout>
}


export default SoulBound


