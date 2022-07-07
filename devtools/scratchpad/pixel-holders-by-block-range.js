const ethers = require("ethers")
const pixelContracts = require("./contracts/hardhat_contracts.json")
const EthDater = require('ethereum-block-by-date');
require("dotenv").config()


const infuraId = process.env.INFURA_PROJECT_ID
console.log("connecting with infura project id", infuraId)

const provider = new ethers.providers.InfuraProvider("homestead", infuraId)
const mainnetContractInfo = pixelContracts["1"]["mainnet"]["contracts"]["PX"]
const PXContract = new ethers.Contract(mainnetContractInfo["address"], mainnetContractInfo["abi"], provider)
const dater = new EthDater(provider);

function removeZeroAddress(source) {
  const copy = JSON.parse(JSON.stringify(source))
  delete copy[ethers.constants.AddressZero]
  return copy
}

function sortTokenIDsByAscendingTime(source) {
  /*
    getLogs() returns logs from past -> present. reverse tokenIds in their
    respective arrays so newest are at the front and oldest are at the end
  */
  const copy = JSON.parse(JSON.stringify(source))
  for (const address in source) {
    copy[address].tokenIDs.reverse()
  }
  return copy
}

async function addRemoveAddresses(source, from, to, tokenID) {
  if (typeof source !== "object") {
    throw Error("source must be an object")
  }
  const copy = JSON.parse(JSON.stringify(source))

  // remove from *from* index
  if (from in copy) {
    if (copy[from].tokenIDs.includes(tokenID)) {
      const index = copy[from].tokenIDs.indexOf(tokenID)
      copy[from].tokenIDs.splice(index, 1)
    }
  } else {
    copy[from] = {tokenIDs: []}
  }

  // add to *to* index
  if (to in copy) {
    if (!copy[to].tokenIDs.includes(tokenID)) {
      copy[to].tokenIDs.push(tokenID)
    }
  } else {
    copy[to] = {tokenIDs: [tokenID]}
  }

  const isBurn = (to === ethers.constants.AddressZero)
  const isMint = (from === ethers.constants.AddressZero)

  if (isMint) {
    debugString = "🍵 mint: "
  } else if (isBurn) {
    debugString = "🔥 burn: "
  } else {
    debugString = "🚡 user transfer: "
  }
  // console.log(`${debugString}: ${tokenID}: ${from} -> ${to}`)
  return copy
}

async function getAddressToOwnershipMap(fromBlock, toBlock) {
  /*
    Builds address -> [tokenIDs..] object for all of PX contract's history
   */
  let addressToPuppers = {}
  const filter = PXContract.filters.Transfer(null, null)

  // infura limits the response to 10k items per response. we grab them in chunks here
  // https://docs.infura.io/infura/networks/ethereum/json-rpc-methods/eth_getlogs
  let logs = []
  const step = 50000
  let _toBlock = toBlock ? toBlock : (await provider.getBlock()).number
  console.log(`beginning to process block range: ${fromBlock} -> ${_toBlock}`)
  for (let i = fromBlock; i <= _toBlock; i += step + 1) {
    // console.log(`processing from: ${i} to ${i + step}`)
    const _logs = await PXContract.queryFilter(filter, i, i+step)
    logs.push(..._logs)
  }

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
  const contractDeployBlockNumber = 14073390
  const blockBeforeQ2 = (await dater.getDate('2022-03-31T23:59:59Z')).block
  const addressesBeforeQ2 = getNonZeroHolders(await getAddressToOwnershipMap(contractDeployBlockNumber, blockBeforeQ2))
  console.log("# addresses before Q2", addressesBeforeQ2.length)

  const blockAfterQ2 = (await dater.getDate('2022-06-30T23:59:59Z')).block
  const addressesAfterQ2 = getNonZeroHolders(await getAddressToOwnershipMap(contractDeployBlockNumber, blockAfterQ2))
  console.log("# addresses after Q2", addressesAfterQ2.length)

  const newMinters = []
  addressesAfterQ2.forEach(address => {
    if (!addressesBeforeQ2.includes(address)) {
      newMinters.push(address)
    }
  })
  console.log("new minters", newMinters)
  console.log("# of new minters", newMinters.length)

  return 1
}

// getDate()
main()
  .then(res => console.log(res))
  .catch(e => console.error(e))



