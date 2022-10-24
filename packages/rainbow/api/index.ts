import { isProd } from "../environment/vars"

export enum ClientSide {
  BUY = "BUY",
  SELL = "SELL"
}

export interface RainbowSwap {
  id: number
  blockNumber: number
  blockCreatedAt: Date
  insertedAt: Date
  updatedAt: Date
  baseCurrency: string
  quoteCurrency: string
  baseAmount: number
  quoteAmount: number
  clientSide: ClientSide
  txHash: string
  clientAddress: string
  clientEns: string | null
  donatedCurrency: string
  donatedAmount: number
  donatedUSDNotional: number
}

export interface Donation {
  currency: string;
  amount: number;
  txHash: string;
  blockexplorerUrl: string;
  clientAddress: string;
}

export interface Leaderboard {
  swaps: RainbowSwap[];
  donations: Donation[]
}

const baseUrl = isProd() ? "https://api.ownthedoge.com/statue-campaign" : "https://staging.api.ownthedoge.com/statue-campaign"

export const getDonations = (): Promise<Donation[]> => {
  return fetch(baseUrl + "/donations").then(res => res.json())
}

export const getSwaps = (): Promise<RainbowSwap[]> => {
  return fetch(baseUrl + "/swaps").then(res => res.json())
}

export const getLeaderboard = (): Promise<Leaderboard> => {
  return fetch(baseUrl + "/leaderboard").then(res => res.json())
}
