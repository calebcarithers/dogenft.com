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
    isSupplyAvailable = true

    @observable
    isPaused = true

    @observable
    contract?: ethers.Contract

    @observable
    signer?: ethers.Signer

    constructor() {
        makeObservable(this)
        reaction(() => [this.contract, this.signer], () => {
            if (this.contract) {
                this.getCanMint()
            }
        })
    }

    onTimeUpdate(video: HTMLVideoElement) {
        const date = new Date(0);
        date.setSeconds(video.currentTime);
        this.currentTime = date.toISOString().substr(11, 8)

        date.setSeconds(video.duration)
        this.duration = date.toISOString().substr(11, 8)
    }

    async mint() {
        if (this.contract) {
            this.isMintLoading = true
            try {
                const tx = await this.contract.safeMint()
                await tx.wait()
                await this.getCanMint()
            } catch (e) {

            } finally {
                this.isMintLoading = false
            }
        }
    }

    async getCanMint() {
        if (this.contract && this.signer) {
            const address = await this.signer.getAddress()
            try {
                this.hasClaimed = await this.contract.hasClaimed(address)
                this.isSupplyAvailable = await this.contract.isSupplyAvailable()
            } catch (e) {
                console.error(e)
            }
        }
    }
}

export default SongStore
