import apolloClient from "./apollo";
import {gql} from "@apollo/client";
import {ethers} from "ethers";

export const getERC721TokensByOwnerAddress = async (ownerAddress: string, collectionAddresses: string[]) => {
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
          address: [ownerAddress],
          collectionAddresses: collectionAddresses,
      }
  })
    const nodes = data.tokens.nodes
    return nodes.map((node: any) => ({
        ...node.token,
        collectionAddress: ethers.utils.getAddress(node.token.collectionAddress)
    }))
}

