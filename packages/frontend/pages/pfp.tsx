import Head from "next/head"
import {BsArrowLeft} from "react-icons/bs"
import React, { useEffect, useMemo, useState} from "react"
import {useRouter} from "next/router"
import {useNetwork, useSigner} from "wagmi"
import Button, {BackOrHomeButton} from "../components/Button/Button"
import PageLayout from "../layouts/Page/Page.layout"
import {css} from "../helpers/css"
import {targetChain} from "../services/wagmi"
import Pixel, {PixelSize} from "../components/Pixel/Pixel"
import { getPixelsForAddress, pixelToCoordsLocal, pixelToHexLocal } from "../services/pixel"

const PFP: React.FC = () => {
    const router = useRouter()
    const {data: signer} = useSigner()
    const {activeChain} = useNetwork()
    const [pixels, setPixels] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const [statusText, setStatusText] = useState("");
    const [selectedPixel, setSelectedPixel] = useState(-1);

    const isConnectedToCorrectNetwork = useMemo(() => activeChain?.id === targetChain.id, [activeChain?.id, targetChain.id])

    useEffect(() => {
        const init = async() => {
            if (signer && isConnectedToCorrectNetwork) {
                setIsConnected(true)
                const address = await signer?.getAddress()
                const myPixels = await getPixelsForAddress(address)
                setPixels(myPixels)
            } else {
                setIsConnected(false)
            }
        }

        init()
    }, [signer, isConnectedToCorrectNetwork, targetChain.id])

    useEffect(() => {
        if (isConnectedToCorrectNetwork && signer) {
            if (pixels.length > 0) {
                if (selectedPixel === -1) {
                    setStatusText("SELECT A PIXEL")
                } else {
                    setStatusText("SELECTED")
                }
            } else {
                setStatusText("YOU HAVE NO PIXELS")
            }
        } else {
            setStatusText("CONNECT WALLET TO CREATE YOUR PFP")
        }
    }, [isConnected, pixels])

    const savePixel = () => {

    }
    return <PageLayout>
        <Head>
            <title>The Doge NFT | Birthday</title>
        </Head>
        <div>
            <BackOrHomeButton/>
                  {/* <canvas id="cnv"></canvas> */}

            <div className={css("mt-4", "text-2xl", "max-w-3xl", "m-auto")}>
                <div className={css("m-auto w-48 h-48 rounded-full border border-black relative")} style={{background: selectedPixel !== -1 ?pixelToHexLocal(selectedPixel) : ""}}>
                    {
                        isConnected ?
                        (
                            selectedPixel === -1 ? "" : <>
                            <div className={css("text-7xl top-3 font-bold absolute w-full")} >
                                <svg viewBox="0 0 500 150" >
                                    <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" className={css("fill-transparent")} />
                                    <text width="500">
                                    <textPath startOffset="11%"  xlinkHref="#curve">
                                        Doge Pixel
                                    </textPath>
                                    </text>

                                </svg>
                            </div>
                            <div className={css("text-3xl mt-3 font-bold absolute w-full bottom-3")}>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
                                    <defs>
                                        <path d="M15,100a85,85 0 1,0 170,0a85,85 0 1,0 -170,0" id="coffeecircle" />
                                    </defs>
                                    <text dx="80" textLength="100" className="coffee">
                                        <textPath xlinkHref="#coffeecircle">
                                            {`(${pixelToCoordsLocal(selectedPixel)[0]}, ${pixelToCoordsLocal(selectedPixel)[1]})`}
                                        </textPath>
                                    </text>
                                    </svg>
                            </div>
                            </>
                        )
                        :  <img src="/images/logo.png" className={css("w-full h-full rounded-full")}/>
                    }

                </div>
                <div className={css("text-xl font-semibold text-center mt-3")}>
                        {statusText === 'SELECTED' ? (
                            <Button onClick={() => savePixel()}>
                                Save
                            </Button>
                        ) : statusText}
                    </div>
                <div className={css("flex flex-wrap gap-6 justify-center p-4 border border-dotted border-gray-300 mt-3")}>
                    {
                        pixels.map((pixel, index) => {
                            return <Pixel
                                key={index}
                                size={PixelSize.sm}
                                color={pixelToHexLocal(pixel)}
                                id={pixel}
                                x={pixelToCoordsLocal(pixel)[0]}
                                y={pixelToCoordsLocal(pixel)[1]}
                                onClick={setSelectedPixel}
                            />
                        })
                    }
                </div>
            </div>
        </div>

    </PageLayout>
}


export default PFP


