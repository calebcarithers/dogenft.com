const ethers = require("ethers")
const stuff = require("../artifacts/contracts/InDogeWeTrust.sol/InDogeWeTrust.json")
require('dotenv').config();


const provider = ethers.getDefaultProvider("rinkeby", {infura: process.env.INFURA_PROJECT_ID})
const wallet = new ethers.Wallet(process.env.RINKEBY_PRIV_KEY, provider)
const contract = new ethers.Contract("0xD37BF31003a18F364Ad87940AbbD6Db9027D1D05", stuff.abi, wallet)
// console.log("debug: contract", contract)

console.log("setting baseURI")
contract.setBaseURI("ipfs://bafkreic5jyppkizcemnjwbusu3xtd6ftpfnxdlxjjtgebihokfh34ciyou")
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.error(e)
  })