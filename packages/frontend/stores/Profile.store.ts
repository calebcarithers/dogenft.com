import {computed, makeObservable, observable} from "mobx";
import {ethers} from "ethers";
import apolloClient from "../services/apollo";
import {gql} from "@apollo/client";
import {jsonify} from "../helpers/strings";

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

    constructor(private address: string) {
        makeObservable(this)
        this.provider = ethers.getDefaultProvider("mainnet")
        this.dogContractAddress = ethers.utils.getAddress("0xBAac2B4491727D78D2b78815144570b9f2Fe8899")
        this.pixelsContractAddress = ethers.utils.getAddress("0x07887Ee0Bd24E774903963d50cF4Ec6a0a16977D")
        this.ffdContractAddress = ethers.utils.getAddress("0x36a196993805e2E57411250864e2fAaFe33fb945")
        this.doggosContractAddress = ethers.utils.getAddress("0x76E3dea18e33e61DE15a7d17D9Ea23dC6118e10f")
    }

    init() {
        this.getDogBalance()
        this.getNfts()
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
        this.dogBalance = ethers.utils.formatEther(balance)
    }

    async getNfts() {
      const {data} = await apolloClient.query({
        query: gql`query GetPixels($address: [String!], $collectionAddresses: [String!]) {
            tokens(
                networks: [{network: ETHEREUM, chain: MAINNET}],
                pagination: {limit: 100},
                sort: {sortKey: MINTED, sortDirection: ASC},
                where: {
                    ownerAddresses: $address,
                    collectionAddresses: $collectionAddresses,
                }) {
                nodes {
                    token {
                        collectionAddress,
                        tokenId,
                        name,
                        image{url},
                        metadata
                    }
                }
            }
        }`,
          variables: {
              address: [this.address],
              collectionAddresses: [this.pixelsContractAddress, this.ffdContractAddress, this.doggosContractAddress]
          }
      })

        const nodes = data.tokens.nodes
        const checkSummedTokens = nodes.map((node: any) => ({
            ...node.token,
            collectionAddress: ethers.utils.getAddress(node.token.collectionAddress)
        }))
        this.pixels = checkSummedTokens.filter((token: any) => token.collectionAddress === this.pixelsContractAddress)
        this.fastFoodDoges = checkSummedTokens.filter((token: any) => token.collectionAddress === this.ffdContractAddress)
        // this.fastFoodDoges = [{...this.fastFoodDoges[0]}, {...this.fastFoodDoges[0]}, {...this.fastFoodDoges[0]}]

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
