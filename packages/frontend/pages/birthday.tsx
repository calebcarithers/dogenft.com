import Head from "next/head"
import {BsArrowLeft} from "react-icons/bs";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import Button from "../components/Button/Button";
import PageLayout from "../layouts/Page/Page.layout";
import ColoredText from "../components/ColoredText/ColoredText";
import Modal, { DialogSize } from "../components/Modal/Modal";
import {ClipLoader} from "react-spinners";
import tailwindconfig from "../tailwind.config";
import SoulBoundAbi from "../services/abis/soulBound.abi";
import {css} from "../helpers/css";
import { getProof } from "../helpers/merkletree";
import DropShadow from "../components/DropShadow/DropShadow";

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

const soulBoundAddress = process.env.NEXT_PUBLIC_SOULBOULD_CONTRACT;

const SoulBound: React.FC = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false);
    const [selectedMetadata, setSelectedMetadata] = useState<IMetadata | any>({});
    const [isClaiming, setIsClaiming] = useState(false);
    const {data: signer} = useSigner();
    const [soulBoundContract, setSoulBoundContract] = useState<any>();
    const [isClaimed, setIsClaimed] = useState(false);
    
    useEffect(() => {
        const init = async() => {
            if (soulBoundAddress && SoulBoundAbi && signer) {
                const contract = new ethers.Contract(soulBoundAddress, SoulBoundAbi, signer)
                setSoulBoundContract(contract);
                const address = await signer.getAddress();
                const claimed = await contract.hasClaimed(address);
                console.log({claimed})
                setIsClaimed(claimed)
            }
        }

        init();
       
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

                const proof = getProof(address);
                const tx = await soulBoundContract.safeMint(proof, selectedMetadata.id);
                await tx.wait();
                setShowModal(false);
                setIsClaimed(true);
            } catch(err) {
                console.log({err})
            }
        }
        setIsClaiming(false);
    }
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
                  <ColoredText>🎂✨ Happy Birthday ✨🎂</ColoredText>
              </div>
              <div className={css( "text-xl", "my-12")}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum
              </div>
              <div className={css("grid", "px-12", "md:px-0", "grid-cols-1", "md:grid-cols-2", "gap-20", "md:gap-10")}>
                {
                  METDATAS.map((metadata: IMetadata)=> {
                    return (
                      <>
                        <div>
                          <DropShadow onClick={() => onClickMetadata(metadata)} key={metadata.id}>
                            <video className={css("w-full")} autoPlay={true} loop muted>
                              <source src={metadata.url} key={metadata.id} />
                            </video>
                          </DropShadow>
                          <div className={css("text-center", "mt-4", "text-xl")}>{metadata.name}</div>
                        </div>
                      </>
                    )
                  })
                }
              </div>
            </div>
        </div>
        <Modal
            size={DialogSize.sm}
            isOpen={showModal}
            title={isClaimed ? "You already claimed" : `✨  ${selectedMetadata.name}  ✨`}
            onChange={(val) => setShowModal(val)}
        >
            {
                !isClaimed &&
                    <>
                        <div className={css("w-full", "m-auto")}>
                            <video  className={css("w-full", "border-2", "border-black")} autoPlay={true} loop muted>
                                <source src={selectedMetadata.url} key={selectedMetadata.id} />
                            </video>
                        </div>
                        <div className={css("flex", "justify-center", "my-6")}>
                          <Button onClick={() => claim()}>
                            {isClaiming && <div className={css("absolute", "w-full", "left-0", "top-0", "h-full", "flex", "items-center", "justify-center", "bg-pixels-yellow-300", "opacity-75")}>
                              <ClipLoader size={25} speedMultiplier={0.5} color={tailwindconfig.theme.extend.colors.pixels.yellow[500]}/>
                            </div>}
                            Claim
                          </Button>
                        </div>
                    </>
            }
            
        </Modal>
    </PageLayout>
}


export default SoulBound


