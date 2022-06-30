const ethers = require("ethers")
const {erc20} = require("./abis/erc20")
require("dotenv").config()
const {PrismaClient} = require("@prisma/client")


const prisma = new PrismaClient()

const main = async () => {
  const networks = {
    ethereum: {
      address: "0xBAac2B4491727D78D2b78815144570b9f2Fe8899",
      blockCreation: 13130302
    },
    // polygon: {
    //   address: "0xeEe3371B89FC43Ea970E908536Fcddd975135D8a"
    // },
    // arbitrum: {
    //   address: "0x4425742F1EC8D98779690b5A3A6276Db85Ddc01A"
    // },
    // optimism: {
    //   address: "0x8F69Ee043d52161Fd29137AeDf63f5e70cd504D5"
    // },
    // bsc: {
    //   address: "0xaA88C603d142C371eA0eAC8756123c5805EdeE03"
    // }
  }

  const infuraId = process.env.INFURA_PROJECT_ID
  console.log("connecting with infura project id", infuraId)

  for (const networkName in networks) {
    const network = networks[networkName]
    console.log("connecting to contract::", network.address, "on network::", networkName)
    const provider = new ethers.providers.InfuraProvider("homestead", infuraId)
    const contract = new ethers.Contract(network.address, erc20, provider)
    const supply = await contract.totalSupply()
    console.log("got total supply::", ethers.utils.formatUnits(supply))

    const filter = contract.filters.Transfer(null, null)
    const fromBlock = network.blockCreation
    const toBlock = (await provider.getBlock()).number

    const logs = []
    const step = 10000


    console.log(`beginning to process block range: ${fromBlock} -> ${toBlock}`)


    for (let i = fromBlock; i <= toBlock; i += step + 1) {
      console.log(`processing from: ${i} to ${i + step}`)

      const _logs = await contract.queryFilter(filter, i, i+step)
      logs.push(..._logs)
      for (const log of logs) {
        const {to, from, value} = log.args
        console.log(from, to, ethers.utils.formatEther(value))

        try {
          await prisma.transfer.create({
            data: {
              from,
              to,
              amount: value.toString()
            }
          })
        } catch (e) {
          console.error("error:", e)
        }
      }
    }
  }
}

main()
