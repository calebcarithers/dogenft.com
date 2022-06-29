import Image from "next/image"
import {useCallback, useEffect, useRef, useState} from "react";
import {BsDot, BsPlayFill, BsSkipBackwardFill, BsSkipForwardFill} from "react-icons/bs";
import {MdPause} from "react-icons/md";
import PageLayout from "../layouts/Page/Page.layout";
import {css} from "../helpers/css";
import Button, {ConnectButton} from "../components/Button/Button";
import {useContract, useSigner} from "wagmi";
import inDogeWeTrustAbi from "../services/abis/inDogeWeTrust.abi";
import {vars} from "../environment/vars";
import {getERC721TokensByOwnerAddress} from "../services/zora";

const Bassjackers = () => {
    const [isPaused, setIsPaused] = useState(true)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [currentTime, setCurrentTime] = useState("00:00:00")
    const [duration, setDuration] = useState("00:00:00")
    const [isMintLoading, setIsMintLoading] = useState(false)
    const [canMint, setCanMint] = useState(true)

    const {data: signer} = useSigner()
    const contract = useContract({
        addressOrName: vars.NEXT_PUBLIC_IDWT_CONTRACT_ADDRESS,
        contractInterface: inDogeWeTrustAbi,
        signerOrProvider: signer
    })

    const getCanMint = useCallback(() => {
        const address = signer?.getAddress()
        if (address && contract) {
            contract.canClaim(address).then((res: any) => setCanMint(res))
        } else {
            setCanMint(true)
        }
    }, [contract, signer])

    useEffect(() => {
        if (contract) {
            getCanMint()
        }
    }, [contract, getCanMint])

    const onTimeUpdate = () => {
        const video = videoRef.current
        if (video) {
            var date = new Date(0);
            date.setSeconds(video.currentTime); // specify value for SECONDS here
            setCurrentTime(date.toISOString().substr(11, 8));

            date.setSeconds(video.duration); // specify value for SECONDS here
            setDuration(date.toISOString().substr(11, 8));
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            const duration = videoRef.current?.duration
            if (duration) {
                var date = new Date(0);
                date.setSeconds(duration); // specify value for SECONDS here
                setDuration(date.toISOString().substr(11, 8));
            }
        }
    }, [])

    // TODO: once deployed to mainnet update this to show the correct token info
    // useEffect(() => {
    //     signer?.getAddress().then(address => {
    //         getERC721TokensByOwnerAddress(address, [vars.NEXT_PUBLIC_IDWT_CONTRACT_ADDRESS]).then(res => {
    //             console.log("debug::: found tokens::", res)
    //         })
    //     })
    // }, [signer])

    return <PageLayout>
        <div className={css("flex", "justify-center", "mt-16", "flex-col", "items-center", "h-full", "px-4")}>
            <div className={css("border-2", "border-black", "p-3", "bg-pixels-yellow-100")}
                 style={{boxShadow: "10px 10px"}}>
                <div className={css("grid", "grid-cols-1", "md:grid-cols-5")}>
                    <div className={css("col-span-1", "md:col-span-2")}>
                        <div className={css("relative", "border-black", "border-2", "w-full", "max-w-xs")}>
                            <video ref={videoRef} className={css("w-full")} onTimeUpdate={onTimeUpdate}>
                                <source src="/videos/in-doge-we-trust.mp4"/>
                            </video>
                        </div>
                    </div>
                    <div className={css("col-span-1", "md:col-span-3", "md:px-3", "py-3", "md:ml-3")}>
                        <div className={css("flex", "flex-col", "h-full")}>
                            <div className={css("grow", "flex", "items-center", "w-full")}>
                                <div className={css("flex", "flex-col", "w-full")}>
                                    <div className={css("font-bold", "text-xl")}>In Doge We Trust</div>
                                    <div
                                        className={css("flex", "items-center", "space-x-1", "text-sm", "text-pixels-yellow-500")}>
                                        <div>single</div>
                                        <div><BsDot/></div>
                                        <div>2021</div>
                                        <div><BsDot/></div>
                                        <div>1 song</div>
                                    </div>
                                    <div>BassJackers, PleasrDAO</div>
                                    <div className={css("w-full", "bg-black", "my-2")} style={{height: "2px"}}/>
                                    <div className={css("flex", "space-x-1", "text-sm")}>
                                        <div>{currentTime}</div>
                                        <div>/</div>
                                        <div>{duration}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={css("flex", "items-center", "justify-between", "mt-5", "md:mt-0")}>
                                <div className={css("flex", "items-center", "space-x-5")}>
                                    {/*<Button disabled>*/}
                                    {/*    <BsSkipBackwardFill/>*/}
                                    {/*</Button>*/}
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
                                    {/*<Button>*/}
                                    {/*    <BsSkipForwardFill/>*/}
                                    {/*</Button>*/}
                                </div>
                                {canMint && signer &&
                                  <Button isLoading={isMintLoading} onClick={() => {
                                      const address = signer?.getAddress()
                                      if (contract && address) {
                                          setIsMintLoading(true)
                                          contract.safeMint().then((res: any) => {
                                              console.log("debug:: res", res)
                                              res.wait().then((txWait: any) => {
                                                  console.log("debug:: txWait", txWait)
                                                  getCanMint()
                                              }).finally(() => {
                                                  setIsMintLoading(false)
                                              })
                                          }).catch((e: any) => {
                                              console.error("debug:: error", e)
                                          }).finally(() => {

                                          })
                                      }
                                  }
                                  }>Mint</Button>}
                                {!canMint &&
                                  <div className={css("text-pixels-yellow-400", "font-bold")}>already minted</div>}
                                {/*{!signer && <ConnectButton/>}*/}
                                {!signer && <div className={css("text-pixels-yellow-400", "font-bold")}>connect wallet to mint</div>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
}


export default Bassjackers
