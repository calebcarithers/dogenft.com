import axios from 'axios';
import {action, computed, makeObservable, observable, reaction} from "mobx";
import {ethers} from "ethers";
import FractionManagerABI from '../services/abis/fractionManager';
import {isDev, isStaging} from "../environment";

class FractionStore {
    contractAddress = process.env.NEXT_PUBLIC_FRACTION_MANAGER_CONTRACT_ADDRESS;
    dogeMajorAddress = process.env.NEXT_PUBLIC_DOGE_MAJOR_ADDRESS;
    dogeMajorTokenId = (isDev() || isStaging()) ? 1 : 1211
    abi: any = FractionManagerABI;

    @observable
    isClaiming = false

    @observable
    availablePixelIds: number[] = []

    @observable
    usedPixelIds: number[] = []

    @observable
    isPaused = true

    @observable
    contract?: ethers.Contract

    @observable
    signer?: ethers.Signer | null

    @observable
    disposer?: () => void

    @observable
    isGetClaimLoading = false

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
                const tx = await this.contract.claim(this.dogeMajorAddress, this.dogeMajorTokenId, this.availablePixelIds)
                await tx.wait()
                await this.getCanClaim()
            } catch (e) {

            } finally {
                this.isClaiming = false
            }
        }
    }


    @action
    async getCanClaim() {
        console.log('debug:: get can claim', this.contract, this.signer)
        this.availablePixelIds = [];
        const newIds: number[] = []
        const usedIds: number[] = []
        if (this.contract && this.signer) {
            const address = await this.signer.getAddress()
            try {
                if (process.env.NEXT_PUBLIC_PIXEL_HOLDER_API) {
                    this.isGetClaimLoading = true
                    const pixelResponse = await axios.get(process.env.NEXT_PUBLIC_PIXEL_HOLDER_API);
                    const pixelHolders = Object.keys(pixelResponse.data);

                    if (pixelHolders.includes(address)) {
                        const pixelIds = pixelResponse.data[address].tokenIds;
                        console.log('debug:: pixels ids from res', pixelIds)
                        for (let i = 0; i < pixelIds.length; i++) {
                            const pixelId = pixelIds[i];
                            const isClaimed = await this.contract.hasPixelClaimed(this.dogeMajorAddress, this.dogeMajorTokenId, pixelId);
                            if (!isClaimed && !newIds.includes(pixelIds)) {
                                newIds.push(pixelId)
                            } else {
                                usedIds.push(pixelId)
                            }
                        }
                        this.availablePixelIds = newIds
                        this.usedPixelIds = usedIds
                    }
                    this.isGetClaimLoading = false
                } else {
                    throw new Error("Missing env var")
                }
            } catch (e) {
                console.error(e)
            }
        } else {
            console.log("could not get signer and contract")
        }
    }

    destroy() {
        if (this.disposer) {
            this.disposer()
        }
    }

    @computed
    get canClaim() {
        return this.availablePixelIds.length > 0
    }

    @computed
    get hasAlreadyClaimed() {
        return this.usedPixelIds.length > 0
    }
}

export default FractionStore
