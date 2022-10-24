
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

export interface DonationTransfer {
  currency: string;
  amount: number;
  txHash: string;
  blockexplorerUrl: string;
  clientAddress: string;
}

const baseUrl = "http://localhost:3003/statue-campaign"

export const getDonars = () => {
  return fetch(baseUrl + "/donations").then(res => res.json())
}

export const getSwaps = (): Promise<RainbowSwap[]> => {
  return fetch(baseUrl + "/swaps").then(res => res.json())
}
