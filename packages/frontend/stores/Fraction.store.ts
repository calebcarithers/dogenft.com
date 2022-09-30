import axios from 'axios';
import {makeObservable, observable, reaction} from "mobx";
import {ethers} from "ethers";
import FractionManagerABI from '../services/abis/fractionManager';

class FractionStore {
    contractAddress = process.env.NEXT_PUBLIC_FRACTION_MANAGER_CONTRACT_ADDRESS;
    dogeMajorAddress = process.env.NEXT_PUBLIC_DOGE_MAJOR_ADDRESS;
    dogeMajorTokenId = 1211
    abi: any = FractionManagerABI;

    @observable
    isClaiming = false

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
        this.getCanClaim()
      }, {fireImmediately: true})
    }

    async claim() {
        if (this.contract) {
            this.isClaiming = true
            try {
                const tx = await this.contract.claim(this.dogeMajorAddress, this.dogeMajorTokenId, this.availablePixelId)
                await tx.wait()

                await this.getCanClaim()
            } catch (e) {

            } finally {
                this.isClaiming = false
            }
        }
    }


    async getCanClaim() {
        this.availablePixelId = -1;
        if (this.contract && this.signer) {
            const address = await this.signer.getAddress()
            try {
                if (process.env.NEXT_PUBLIC_PIXEL_HOLDER_API) {
                    const pixelResponse = await axios.get(process.env.NEXT_PUBLIC_PIXEL_HOLDER_API);
                    const pixelHolders = Object.keys(pixelResponse.data);

                    if (pixelHolders.includes(address)) {
                        const pixelIds = pixelResponse.data[address].tokenIds;
                        for (let i = 0; i < pixelIds.length; i++) {
                            const pixelId = pixelIds[i];
                            const isClaimed = await this.contract.hasPixelClaimed(this.dogeMajorAddress, pixelId);
                            if (!isClaimed) {
                                this.availablePixelId = pixelId;
                                break;
                            }
                        }
                    }
                } else {
                    throw new Error("Missing env var")
                }
            } catch (e) {
                console.error(e)
            }
        } else {
            console.log("debug:: not correct conditions to get if can claim")
        }
    }

    destroy() {
        if (this.disposer) {
            this.disposer()
        }
    }
}

export default FractionStore
