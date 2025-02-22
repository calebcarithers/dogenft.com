import {computed, makeObservable, observable} from "mobx";
import {vars} from "../environment/vars";
import {observer} from "mobx-react-lite";
import inDogeWeTrustAbi from "../services/abis/inDogeWeTrust.abi";
import {ReactNode} from "react";

export interface Song {
    name: string;
    isActive: boolean,
    year: string,
    artists: { name: string, link: string }[],
    videoSrc?: string;
    contractAddress?: string;
    abi?: any;
    lyricsLink?: string
}


class NftRadioStore {

    @observable
    selectedSongIndex = 0

    constructor() {
        makeObservable(this)
    }

    get playlist(): Song[] {
        return [
            {
                name: "In Doge We Trust",
                isActive: true,
                year: "2021",
                artists: [
                    {name: "Bassjackers", link: "https://twitter.com/Bassjackers"},
                    {name: "PleasrDAO", link: "https://twitter.com/pleasrdao"},
                    {name: "cloudeatr", link: "https://twitter.com/cloudeatr"},
                    {name: "pplpleasr", link: "https://twitter.com/pplpleasr1"}
                ],
                videoSrc: "/videos/in-doge-we-trust.mp4",
                contractAddress: vars.NEXT_PUBLIC_IDWT_CONTRACT_ADDRESS,
                abi: inDogeWeTrustAbi,
                lyricsLink: "https://www.azlyrics.com/lyrics/bassjackers/indogewetrust.html"
            },
            {
                name: "---",
                isActive: false,
                year: "---",
                artists: [],
            }
        ]
    }

    @computed
    get selectedSong() {
        return this.playlist[this.selectedSongIndex]
    }

    previousSong() {
        this.selectedSongIndex = this.selectedSongIndex - 1
    }

    nextSong() {
        this.selectedSongIndex = this.selectedSongIndex + 1
    }

    @computed
    get canGoNext() {
        return this.selectedSongIndex < this.playlist.length - 1
    }

    @computed
    get canGoBack() {
        return this.selectedSongIndex > 0
    }
}

export default NftRadioStore
