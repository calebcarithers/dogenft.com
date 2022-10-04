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
        const pixelResponse: {data: any} = {
            data: {"0x69E6B76A8d0C56Ae95167413cC93b16ea9D3967e":{"tokenIds":[1209642,1079875,1027627,1085321,1253629,1165779,1259799,1202741,1149946,1209592,1203163,1249998,1014562],"ens":null},"0xe1E15Fe921c6cBCa9cc2d3dC369Cf47235362fDA":{"tokenIds":[1082516],"ens":null},"0xe456f9A32E5f11035ffBEa0e97D1aAFDA6e60F03":{"tokenIds":[1013287,1125957,1058862,1229624,1166988,1185189,1306635,1006938,1132078],"ens":null},"0x933B2863f079F2E7033cfE0BadcfEa3378455F17":{"tokenIds":[1128135,1079567,1180043,1055910,1009030,1006590,1193116,1284088,1156394,1262555],"ens":null},"0xa77Af3795aA6027A3D499925fF7C45728E924fd9":{"tokenIds":[1025609,1144583,1221350,1121227,1073112,1081741,1256337,1147339,1287415,1177707,1262640,1271936,1144340,1237380,1160956,1113825,1020642,1006621,1069213],"ens":null},"0x844499A9be3aF432eA02816d150A565a0E105116":{"tokenIds":[1261085,1061730],"ens":null},"0xd801d86C10e2185a8FCBccFB7D7baF0A6C5B6BD5":{"tokenIds":[1035098,1194385,1043081,1136342,1223823,1210476,1108744,1211863,1043161,1132679,1164242,1051523,1094956,1010432,1130814,1213312,1157217,1285736,1301542,1120122,1030219,1014065,1197942,1297290,1133403,1092112,1201884,1011187,1005541,1127620,1151660,1004382,1206242,1040243,1002280,1305782,1096768,1091266],"ens":"gainormather.eth"},"0x1611036b9Fd2091741F320d45f4B2Ec7785DE274":{"tokenIds":[1003459],"ens":null},"0xf716B2783c6dD45753b99Fc28636b0E1a0376179":{"tokenIds":[1144487,1225158,1136930,1126306,1057366,1161825,1145327,1223841],"ens":"pleasr.eth"}}
        }
        if (pixelResponse.data[address]) {
            return pixelResponse.data[address].tokenIds
        } else {
            return []
        }
    } else {
        return []
    }
}
