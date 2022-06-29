import Image from "next/image"
import {useEffect, useRef, useState} from "react";
import {BsPlayFill} from "react-icons/bs";
import {MdPause} from "react-icons/md";
import PageLayout from "../layouts/Page/Page.layout";
import {css} from "../helpers/css";
import Button from "../components/Button/Button";
import {useContract, useSigner} from "wagmi";
import inDogeWeTrustAbi from "../services/abis/inDogeWeTrust.abi";
import {vars} from "../environment/vars";

const Bassjackers = () => {
    const [isPaused, setIsPaused] = useState(true)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [currentTime, setCurrentTime] = useState(0)

    const {data: signer} = useSigner()

    const contract = useContract({
        addressOrName: vars.NEXT_PUBLIC_IDWT_CONTRACT_ADDRESS,
        contractInterface: inDogeWeTrustAbi,
        signerOrProvider: signer
    })

    const onTimeUpdate = () => {
        const video = videoRef.current
        if (video) {
            setCurrentTime(Math.floor(video.currentTime))
        }
    }

    return <PageLayout>
        <div className={css("flex", "justify-center", "mt-16", "flex-col", "items-center")}>
            <div className={css("relative", "max-w-xl", "border-black", "border-2", "w-full")}>
                <video ref={videoRef} className={css("w-full")} onTimeUpdate={onTimeUpdate}>
                    <source src="/videos/in-doge-we-trust.mp4"/>
                </video>
            </div>
            <div className={css("mt-4", "text-black", "flex", "flex-col", "items-center", "space-y-4")}>
                <div>
                    <Button onClick={() => {
                        if (videoRef.current) {
                            const video = videoRef.current
                            if (video.paused) {
                                video.play();
                                setIsPaused(false)
                            } else {
                                video.pause();
                                setIsPaused(true)
                            }
                        }
                    }}>
                        {isPaused && <BsPlayFill/>}
                        {!isPaused && <MdPause/>}
                    </Button>
                </div>
                <div>
                    <Button onClick={() => {
                        const address = signer?.getAddress()
                        if (contract && address) {
                            contract.safeMint(address).then((res: any) => {
                                console.log("debug:: res", res)
                            }).catch((e: any) => {
                                console.error("debug:: error", e)
                            })
                        }
                    }
                    }>Mint</Button>
                </div>
                <div>
                    <div>current time: {currentTime}</div>
                </div>
            </div>
        </div>
    </PageLayout>
}


export default Bassjackers
