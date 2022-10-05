import axios from "axios"
import KobosuJson from "./kobosu.json"

const pixelToIDOffset = 1000000
const imageWidth = 640
const imageHeight = 480

export const pixelToIndexLocal = (pixel: number) => {
    return pixel - pixelToIDOffset
  }

export const pixelToCoordsLocal = (pixel: number) => {
    const index = pixelToIndexLocal(pixel)
    return [index % imageWidth, Math.floor(index / imageWidth)]
}

export const pixelToHexLocal = (pixel: number) => {
    const [x, y] = pixelToCoordsLocal(pixel)
    return KobosuJson[y][x]
}

export const getPixelsForAddress = async (address: string) => {
    if (process.env.NEXT_PUBLIC_PIXEL_HOLDER_API && address) {
        const pixelResponse = await axios.get(process.env.NEXT_PUBLIC_PIXEL_HOLDER_API)
        if (pixelResponse.data[address]) {
            return pixelResponse.data[address].tokenIds
        } else {
            return []
        }
    } else {
        return []
    }
}
