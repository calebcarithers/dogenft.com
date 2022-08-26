import { MerkleTree } from "merkletreejs";
import Whitelist from "../services/soulboundWhitelist.json";
import { keccak256 } from "ethers/lib/utils";

export const getProof = (leaf: string) => {
    const leaves = Whitelist.map(address => keccak256(address))
    const tree = new MerkleTree(leaves, keccak256, { sort: true })
    const proof = tree.getHexProof(keccak256(leaf));
    return proof;
}
