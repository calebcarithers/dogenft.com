import PageLayout from "../layouts/Page/Page.layout";
import Button from "../components/Button/Button";
import {css} from "../helpers/css";
import Image from "next/image"
import {useEffect, useState} from "react";
import {BsPause, BsPlayFill} from "react-icons/bs";
import {MdPause} from "react-icons/md";

const Turnipdabeatz = () => {
    const [audio, setAudio] = useState<null | HTMLAudioElement>(null)
    const [isPaused, setIsPaused] = useState(true)
    useEffect(() => {
        // https://github.com/vercel/next.js/discussions/17963
        setAudio(new Audio("/sounds/indogewetrust.mp3"))
    }, [])

    return <PageLayout>
        <div className={css("flex", "justify-end")}>
            <Button disabled={true}>Connect Wallet</Button>
        </div>
        <div className={css("flex", "justify-center", "mt-10", "flex-col", "items-center")}>
            <div className={css("relative", "max-w-xl", "border-black", "border-2", "w-full")}>
                <Image layout={"responsive"} src={"/images/dogemusic.gif"} width={100} height={100}/>
            </div>
            <div className={css("mt-4", "text-black")}>
                <Button onClick={() => {
                    if (audio?.paused) {
                        audio.play()
                        setIsPaused(false)
                    } else {
                        audio?.pause()
                        setIsPaused(true)
                    }
                    console.log("debug:: audio paused", audio?.paused)
                }}>
                    {isPaused && <BsPlayFill/>}
                    {!isPaused && <MdPause/>}
                </Button>
            </div>
        </div>
    </PageLayout>
}

export default Turnipdabeatz
