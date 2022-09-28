import Head from "next/head"
import {BsArrowLeft} from "react-icons/bs"
import React, { useEffect, useMemo, useState} from "react"
import {useRouter} from "next/router"
import {useNetwork, useSigner} from "wagmi"
import Button from "../components/Button/Button"
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

    const isConnectedToCorrectNetwork = useMemo(() => activeChain?.id === targetChain.id, [activeChain?.id, targetChain.id])

    useEffect(() => {
        const init = async() => {
            if (signer && isConnectedToCorrectNetwork) {
                const address = await signer?.getAddress()
                const myPixels = await getPixelsForAddress(address)
                setPixels(myPixels)
            }
        }

        init()
    }, [signer, isConnectedToCorrectNetwork, targetChain.id])
    
    const getStatusText = () => {
        if (isConnectedToCorrectNetwork && signer) {
            if (pixels.length > 0) {
                return "SELECT A PIXEL"
            } else {
                return "YOU HAVE NO PIXELS"
            }
        } else {
            return "CONNECT WALLET TO CREATE YOUR PFP"
        }
    }
    return <PageLayout>
        <Head>
            <title>The Doge NFT | Birthday</title>
        </Head>
        <div>
            <div className={css("mb-8")}>
                <Button onClick={() => router.push("/")}>
                    <BsArrowLeft size={15}/>
                </Button>
            </div>
            <div className={css("mt-4", "text-2xl", "max-w-3xl", "m-auto")}>
                <div className={css("m-auto w-48 h-48 rounded-full border border-black")}>
                    <img src="/images/logo.png" className={css("w-full h-full rounded-full")}/>
                </div>
                <div className={css("text-xl font-semibold text-center mt-3")}>
                        {getStatusText()}
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
                            />
                        })
                    }
                </div>
            </div>
        </div>
         
    </PageLayout>
}


export default PFP


