import Head from "next/head"
import {BsArrowLeft} from "react-icons/bs";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import Button from "../../components/Button/Button";
import PageLayout from "../../layouts/Page/Page.layout";
import ColoredText from "../../components/ColoredText/ColoredText";
import Modal, { DialogSize } from "../../components/Modal/Modal";
import {ClipLoader} from "react-spinners";
import tailwindconfig from "../../tailwind.config";
import SoulBoundAbi from "../../services/abis/soulBound.abi";
import {css} from "../../helpers/css";
import { getProof } from "../../helpers/merkletree";

interface IMetadata {
    id: number,
    name: string,
    url: string
}

const METDATAS: IMetadata[] = [
    {
        id: 0,
        name: "Cool Doge",
        url: "/videos/soulbound1.mp4",
    },
    {
        id: 1,
        name: "Skydancer Doge",
        url: "/videos/soulbound2.mp4",
    },
    {
        id: 2,
        name: "Slinky Doge",
        url: "/videos/soulbound3.mp4",
    },
    {
        id: 3,
        name: "Breakdancing Doge",
        url: "/videos/soulbound4.mp4",
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
                <Button onClick={() => router.push("/barktank")}>
                    <BsArrowLeft size={15}/>
                </Button>
            </div>
            <div className={css("mt-4", "text-2xl", "max-w-3xl", "m-auto")}>
                <div className={css("flex", "justify-center", "text-4xl", "font-bold")}>
                    <ColoredText>Test</ColoredText>
                </div>
                <div className="two-column">
                    {
                        METDATAS.map((metadata: IMetadata)=> {
                            return (
                                <div onClick={() => onClickMetadata(metadata)} className="cursor-pointer" key={metadata.id}>
                                    <video  className={css("w-full")} autoPlay={true} loop muted >
                                        <source src={metadata.url} key={metadata.id} />
                                    </video>
                                    <div className="text-center">{metadata.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
              
            </div>
        </div>
        <Modal
            size={DialogSize.lg}
            isOpen={showModal}
            title={isClaimed ? "You already claimed" : `✨  Claim ${selectedMetadata.name}  ✨`}
            onChange={(val) => setShowModal(val)}
        >
            {
                !isClaimed &&
                    <>
                        <div className={css("w-72", "m-auto")}>
                            <video  className={css("w-full")} autoPlay={true} loop muted>
                                <source src={selectedMetadata.url} key={selectedMetadata.id} />
                            </video>
                            <div className="text-center">{selectedMetadata.name}</div>
                        </div>

                        <button onClick={() => claim()}
                                className={css("flex","py-2","px-6", "m-auto","mt-10", "border-2", "border-black", "border-solid", "hover:bg-yellow-400", 
                                )}>
                            {isClaiming && <div className={css("absolute", "w-full", "left-0", "top-0", "h-full", "flex", "items-center", "justify-center", "bg-pixels-yellow-300", "opacity-75")}>
                                <ClipLoader size={25} speedMultiplier={0.5} color={tailwindconfig.theme.extend.colors.pixels.yellow[500]}/>
                            </div>}
                            Claim
                        </button>
                    </>
            }
            
        </Modal>
    </PageLayout>
}

// export const getServerSideProps: GetServerSideProps<BarkTankProjectProps> = async (context) => {
//     const id = context.params?.id
//     const project = await airtable.getProject(id as string)
//     if (!project) {
//         throw new Error("Could not find project")
//     }

//     return {
//         props: {
//             project: JSON.parse(jsonify(project))
//         }
//     }
// }


export default SoulBound


