import {computed, makeObservable, observable} from "mobx";
import {ethers} from "ethers";
import apolloClient from "../services/apollo";
import {gql} from "@apollo/client";
import {getERC721TokensByOwnerAddress} from "../services/zora";

class ProfileStore {

    private dogContractAddress
    private pixelsContractAddress
    private ffdContractAddress
    private doggosContractAddress

    @observable
    dogBalance?: string

    @observable
    pixels: any[] = []

    @observable
    fastFoodDoges: any[] = []

    @observable
    doggos: any[] = []

    @observable
    provider?: ethers.providers.Provider

    @observable
    isLoading = true

    constructor(private address: string) {
        makeObservable(this)
        // no matter the build env - we'll check mainnet $DOG balances & query mainnet addresses for NFT projects
        this.provider = ethers.getDefaultProvider("mainnet")
        this.dogContractAddress = ethers.utils.getAddress("0xBAac2B4491727D78D2b78815144570b9f2Fe8899")
        this.pixelsContractAddress = ethers.utils.getAddress("0x07887Ee0Bd24E774903963d50cF4Ec6a0a16977D")
        this.ffdContractAddress = ethers.utils.getAddress("0x36a196993805e2E57411250864e2fAaFe33fb945")
        this.doggosContractAddress = ethers.utils.getAddress("0x76E3dea18e33e61DE15a7d17D9Ea23dC6118e10f")
    }

    async init() {
        try {
            await Promise.all([this.getDogBalance(), this.getNfts()])
        } catch (e) {
            console.log("could not get profile data`")
        } finally {
            this.isLoading = false
        }
    }

    async getDogBalance() {
        const testAbi = [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "type": "function"
            }
        ]

        const dogContract = new ethers.Contract(this.dogContractAddress, testAbi, this.provider)
        const balance = await dogContract.balanceOf(this.address)
        this.dogBalance = Number(ethers.utils.formatEther(balance)).toFixed(0)
    }

    async getNfts() {
        const checkSummedTokens = await getERC721TokensByOwnerAddress(
            this.address,
            [this.pixelsContractAddress, this.ffdContractAddress, this.doggosContractAddress]
        )

        this.pixels = checkSummedTokens.filter((token: any) => token.collectionAddress === this.pixelsContractAddress)
        this.fastFoodDoges = checkSummedTokens.filter((token: any) => token.collectionAddress === this.ffdContractAddress)
        this.doggos = checkSummedTokens.filter((token: any) => token.collectionAddress === this.doggosContractAddress)
    }

    @computed
    get hasPixels() {
        return this.pixels.length > 0
    }

    @computed
    get hasFfds() {
        return this.fastFoodDoges.length > 0
    }

    @computed
    get hasDoggos() {
        return this.doggos.length > 0
    }
}

export default ProfileStore
