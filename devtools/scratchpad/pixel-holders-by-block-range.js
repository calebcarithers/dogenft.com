const ethers = require("ethers")
const pixelContracts = require("./contracts/hardhat_contracts.json")
const EthDater = require('ethereum-block-by-date');
const {firstBlock} = require("ethereum-block-by-date");
require("dotenv").config()


const infuraId = process.env.INFURA_PROJECT_ID
console.log("connecting with infura project id", infuraId)

const provider = new ethers.providers.InfuraProvider("homestead", infuraId)
const mainnetContractInfo = pixelContracts["1"]["mainnet"]["contracts"]["PX"]
const PXContract = new ethers.Contract(mainnetContractInfo["address"], mainnetContractInfo["abi"], provider)
const dater = new EthDater(provider);


async function getEthLogs(fromBlock, toBlock, filter) {
  // infura limits the response to 10k items per response. we grab them in chunks here
  // https://docs.infura.io/infura/networks/ethereum/json-rpc-methods/eth_getlogs
  let logs = []
  const step = 50000
  let _toBlock = toBlock ? toBlock : (await provider.getBlock()).number

  console.log(`getting logs from:`, fromBlock, 'to:', toBlock)

  // console.log(`beginning to process block range: ${fromBlock} -> ${_toBlock}`)
  for (let i = fromBlock; i <= _toBlock; i += step + 1) {
    // console.log(`processing from: ${i} to ${i + step}`)
    const _logs = await PXContract.queryFilter(filter, i, i+step)
    if (_logs.length >= 10000) {
      throw new Error("You are missing data -- please increase accuracy")
    }
    logs.push(..._logs)
  }
  return logs
}


async function getAddressToOwnershipMap(fromBlock, toBlock) {
  /*
    Builds address -> [tokenIDs..] object for all of PX contract's history
   */
  let addressToPuppers = {}
  const logs = getEthLogs(fromBlock, toBlock, PXContract.filters.Transfer(null, null))

  for (const tx of logs) {
    const {from, to} = tx.args
    const tokenID = tx.args.tokenId.toNumber()
    addressToPuppers = await addRemoveAddresses(addressToPuppers, from, to, tokenID)
  }

  // remove burned pixels from ownership map for now
  addressToPuppers = removeZeroAddress(addressToPuppers)
  addressToPuppers = sortTokenIDsByAscendingTime(addressToPuppers)
  return addressToPuppers
}

const getNonZeroHolders = (map) => {
  return Object.keys(map)
    // .filter(address => map[address].tokenIDs.length > 0)
}

const main = async() => {
  console.log('running main\n')
  const contractDeployBlockNumber = 14073390

  const startDay = '2022-08-01T00:00:00Z'
  const lastDay = '2022-09-01T23:59:59Z'

  const firstBlock = (await dater.getDate(startDay)).block
  const lastBlock = (await dater.getDate(lastDay)).block
  console.log(`querying mints & burns from ${startDay} -> ${lastDay}`)
  console.log(`blocks ${firstBlock} to ${lastBlock}`)

  const mints = await getEthLogs(firstBlock, lastBlock, PXContract.filters.Transfer(ethers.constants.AddressZero, null))
  console.log('number of mints:', mints.length)

  console.log("")

  const burns = await getEthLogs(firstBlock, lastBlock, PXContract.filters.Transfer(null, ethers.constants.AddressZero))
  console.log('number of burns:', burns.length)
  return
}

main()
  .then(res => console.log(res))
  .catch(e => console.error(e))



