import PageLayout from "../layouts/Page/Page.layout";
import Button from "../components/Button/Button";
import {css} from "../helpers/css";
import Image from "next/image"
import {useEffect, useState} from "react";

const Turnipdabeatz = () => {
    const [audio, setAudio] = useState(new Audio("/sounds/indogewetrust.mp3"))
    useEffect(() => {
        audio.play()
        audio.volume = 0.5
    }, [])
    return <PageLayout>
        <div className={css("flex", "justify-end")}>
            <Button disabled={true}>Connect Wallet</Button>
        </div>
        <div className={css("flex", "justify-center", "mt-10")}>
            <div className={css("relative", "max-w-xl", "border-black", "border-2", "w-full")}>
                <Image layout={"responsive"} src={"/images/dogemusic.gif"} width={100} height={100}/>
            </div>
        </div>
        {/*<audio>*/}
        {/*    <source src={"/sounds/indogewetrust.mp3"} type={"audio/mpeg"}/>*/}
        {/*</audio>*/}
    </PageLayout>
}

export default Turnipdabeatz
