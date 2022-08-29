import { MerkleTree } from "merkletreejs";
import devWhitelist from "./whitelists/devSoulboundWhitelist.json";
import { keccak256 } from "ethers/lib/utils";
import {isDev} from "../environment";

export const getProof = (leaf: string) => {
  const whitelist = isDev() ? devWhitelist : undefined

  if (!whitelist) {
    throw new Error("Cannot compute whitelist")
  }

  const leaves = whitelist.map(address => keccak256(address))
  const tree = new MerkleTree(leaves, keccak256, { sort: true })
  const proof = tree.getHexProof(keccak256(leaf));

  console.log("debug:: proof", proof)

  return proof;
}
