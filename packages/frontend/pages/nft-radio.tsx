import {useEffect, useMemo, useRef} from "react";
import {BsDot, BsPlayFill, BsSkipBackwardFill, BsSkipForwardFill} from "react-icons/bs";
import {MdPause} from "react-icons/md";
import PageLayout from "../layouts/Page/Page.layout";
import {css} from "../helpers/css";
import Button from "../components/Button/Button";
import {useNetwork, useSigner} from "wagmi";
import NftRadioStore, {Song} from "../stores/NftRadio.store";
import {observer} from "mobx-react-lite";
import SongStore from "../stores/Song.store";
import {ethers} from "ethers";
import Link, {LinkType} from "../components/Link/Link";

const NftRadio = observer(() => {
    const store = useMemo(() => new NftRadioStore(), [])
    return <PageLayout>
        <div className={css("flex", "justify-center", "mt-16", "flex-col", "items-center", "h-full", "px-4")}>
            <div className={css("border-2", "border-black", "p-3", "bg-pixels-yellow-100")}
                 style={{boxShadow: "10px 10px"}}>
                <RadioSong song={store.selectedSong} store={store}/>
            </div>
        </div>
    </PageLayout>
})

interface FeaturedSongI {
    song: Song,
    store: NftRadioStore
}

const RadioSong: React.FC<FeaturedSongI> = observer(({song, store}) => {
    const songStore = useMemo(() => new SongStore(), [song.name])
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const {activeChain} = useNetwork()
    const {data: signer} = useSigner()
    useEffect(() => {
        if (song.contractAddress && song.abi && signer) {
            songStore.contract = new ethers.Contract(song.contractAddress, song.abi, signer)
            songStore.signer = signer
        }
    }, [signer])

    const onTimeUpdate = () => {
        const video = videoRef.current
        if (video) {
            songStore.onTimeUpdate(video)
        }
    }

    useEffect(() => {
        onTimeUpdate()
    }, [])

    return <div className={css("grid", "grid-cols-1", "md:grid-cols-5")}>
        <div className={css("col-span-1", "md:col-span-2")}>
            <div className={css("relative", "border-black", "border-2", "w-full", "max-w-xs")}>
                {song.videoSrc && <video ref={videoRef} className={css("w-full")} onTimeUpdate={onTimeUpdate}>
                  <source src={song.videoSrc}/>
                </video>}
                {!song.videoSrc && <div style={{height: 316, width: 316}} className={css("bg-pixels-yellow-300")}/>}
            </div>
        </div>
        <div className={css("col-span-1", "md:col-span-3", "md:px-3", "py-3", "md:ml-3")}>
            <div className={css("flex", "flex-col", "h-full")}>
                <div className={css("grow", "flex", "items-center", "w-full", "flex-col", "justify-center")}>
                    <div className={css("flex", "flex-col", "w-full")}>
                        <div className={css("font-bold", "text-xl")}>{song.name}</div>
                        <div
                            className={css("flex", "items-center", "space-x-1", "text-sm", "text-pixels-yellow-500")}>
                            <div>single</div>
                            <div><BsDot/></div>
                            <div>{song.year}</div>
                            <div><BsDot/></div>
                            <div>1 song</div>
                        </div>
                        <div className={css("flex", "items-center", "space-x-1")}>
                            {song.artists.map((artist, index, arr) => {
                                return <>
                                    <Link isExternal type={LinkType.Secondary} href={artist.link}>
                                        {artist.name}
                                    </Link>
                                    {index !== arr.length - 1 && <span className={css("text-pixels-yellow-500")}>,</span>}
                                </>
                            })}
                        </div>
                        <div className={css("w-full", "bg-black", "my-2")} style={{height: "2px"}}/>
                        <div className={css("flex", "space-x-1", "text-sm")}>
                            <div>{songStore.currentTime}</div>
                            <div>/</div>
                            <div>{songStore.duration}</div>
                        </div>
                    </div>
                    <div className={css("flex", "justify-center", "mt-6")}>
                        {(() => {
                            if (song.isActive) {
                                if (songStore.signer) {
                                    if (!songStore.isSupplyAvailable) {
                                        return <div>full supply has been minted already</div>
                                    }

                                    if (!songStore.hasClaimed) {
                                        return <Button
                                            isLoading={songStore.isMintLoading}
                                            disabled={activeChain?.network !== "rinkeby"}
                                            onClick={() => songStore.mint()}>
                                            ✨ Mint ✨
                                        </Button>
                                    } else if (songStore.hasClaimed) {
                                        <div className={css("text-pixels-yellow-400", "font-bold")}>minted</div>
                                    }
                                } else {
                                    return <div className={css("text-pixels-yellow-400", "font-bold")}>
                                        connect wallet to mint
                                    </div>
                                }
                            } else {
                                return <div className={css("text-pixels-yellow-400")}>un-released track</div>
                            }
                        })()}
                    </div>
                </div>
                <div className={css("flex", "items-center", "justify-between", "mt-5", "md:mt-0")}>
                    <div className={css("flex", "items-center", "space-x-5")}>
                        <Button disabled={!store.canGoBack} onClick={() => store.previousSong()}>
                            <BsSkipBackwardFill/>
                        </Button>
                        <Button disabled={!song.isActive} onClick={() => {
                            if (videoRef.current) {
                                const video = videoRef.current
                                if (video.paused) {
                                    video.play();
                                    songStore.isPaused = false
                                } else {
                                    video.pause();
                                    songStore.isPaused = true
                                }
                            }
                        }}>
                            {songStore.isPaused && <BsPlayFill/>}
                            {!songStore.isPaused && <MdPause/>}
                        </Button>
                        <Button disabled={!store.canGoNext} onClick={() => store.nextSong()}>
                            <BsSkipForwardFill/>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    </div>
})

export default NftRadio
