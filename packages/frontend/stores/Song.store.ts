import axios from 'axios';
import {makeObservable, observable, reaction} from "mobx";
import {ethers} from "ethers";

class SongStore {

    @observable
    currentTime = "00:00:00"

    @observable
    duration = "00:00:00"

    @observable
    isMintLoading = false

    @observable
    hasClaimed = false

    @observable
    availablePixelId = -1

    @observable
    isPaused = true

    @observable
    contract?: ethers.Contract

    @observable
    signer?: ethers.Signer | null

    @observable
    disposer?: () => void

    constructor() {
        makeObservable(this)
    }

    init() {
      this.disposer = reaction(() => [this.contract, this.signer], () => {
        this.getCanMint()
      })
    }

    onTimeUpdate(video: HTMLVideoElement) {
        console.log("debug:: video", video, video.currentTime, video.duration)
        if (!isNaN(video.currentTime) && !isNaN(video.duration)) {
            const date = new Date(0);
            date.setSeconds(video.currentTime);
            this.currentTime = date.toISOString().substr(11, 8)

            date.setSeconds(video.duration)
            this.duration = date.toISOString().substr(11, 8)
        }
    }

    async mint() {
        if (this.contract) {
            this.isMintLoading = true
            try {
                const tx = await this.contract.safeMint(this.availablePixelId)
                await tx.wait()
                // await this.getCanMint()
                this.availablePixelId = -1;
                this.hasClaimed = true;
            } catch (e) {

            } finally {
                this.isMintLoading = false
            }
        }
    }

    async getCanMint() {
        if (this.contract && this.signer && this.signer.getAddress) {
            const address = await this.signer.getAddress()
            try {
                const hasClaimed = await this.contract.hasClaimed(address)
                this.hasClaimed = hasClaimed;
                if (!hasClaimed) {
                    if (process.env.NEXT_PUBLIC_PIXEL_HOLDER_API) {
                        const pixelResponse = await axios.get(process.env.NEXT_PUBLIC_PIXEL_HOLDER_API);
                        const pixelHolders = Object.keys(pixelResponse.data);
                       
                        if (pixelHolders.includes(address)) {
                            const pixelIds = pixelResponse.data[address].tokenIDs;
                            for (let i = 0; i < pixelIds.length; i++) {
                                const pixelId = pixelIds[i];
                                const isClaimed = await this.contract.hasPixelClaimed(pixelId);
                                if (!isClaimed) {
                                    this.availablePixelId = pixelId;
                                    break;
                                }
                            }
                        }
                    }
                }
                console.log("debug:: available pixel id", this.availablePixelId)
            } catch (e) {
                console.error(e)
            }
        }
    }

    destroy() {
        if (this.disposer) {
            this.disposer()
        }
    }
}

export default SongStore
