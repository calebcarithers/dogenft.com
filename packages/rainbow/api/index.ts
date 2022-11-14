import { isProd, isStaging } from "../environment/vars";

export enum ClientSide {
  BUY = "BUY",
  SELL = "SELL",
}

type DatetimeString = string;

export enum ChainName {
  DOGECOIN = "DOGECOIN",
  ETHEREUM = "ETHEREUM",
}
export interface RainbowSwap {
  id: number;
  blockNumber: number;
  blockCreatedAt: DatetimeString;
  insertedAt: DatetimeString;
  updatedAt: DatetimeString;
  baseCurrency: string;
  quoteCurrency: string;
  baseAmount: number;
  quoteAmount: number;
  clientSide: ClientSide;
  txHash: string;
  clientAddress: string;
  clientEns: string | null;
  donatedCurrency: string;
  donatedAmount: number;
  donatedUSDNotional: number;
}

export interface Donation {
  id: number;
  blockNumber: number;
  blockCreatedAt: DatetimeString;
  fromAddress: string;
  fromEns: string | null;
  fromUD: string | null;
  toAddress: string;
  blockchain: ChainName;
  currency: string;
  currencyContractAddress: string | null;
  txHash: string;
  amount: number;
  currencyUSDNotional: number;
  explorerUrl: string;
}

export interface BaseLeaderboard {
  address: string;
  ens: string | null;
  usdNotional: number;
  myDogeName?: string | null;
  ud: string | null;
}

export interface LeaderboardSwap extends BaseLeaderboard {
  address: string;
  ens: string | null;
  usdNotional: number;
  swaps: RainbowSwap[];
}

export interface LeaderboardDonation extends BaseLeaderboard {
  donations: Donation[];
}

export interface Leaderboard {
  swaps: LeaderboardSwap[];
  donations: LeaderboardDonation[];
}

export interface NowAsset {
  amount: number;
  symbol: string;
  usdNotional: number;
  usdPrice: number;
}
interface Now {
  dogecoin: NowAsset[];
  ethereum: NowAsset[];
  swaps: NowAsset[];
  usdNotional: number;
}

// const proxyBaseUrl = "http://localhost:3003/statue-campaign";
const proxyBaseUrl = null;
let baseUrl: string;

if (isProd()) {
  baseUrl = "https://api.ownthedoge.com/statue-campaign";
} else if (isStaging()) {
  baseUrl = "https://staging.api.ownthedoge.com/statue-campaign";
} else if (proxyBaseUrl) {
  baseUrl = proxyBaseUrl;
} else {
  baseUrl = "https://staging.api.ownthedoge.com/statue-campaign";
}

export const getDonations = (): Promise<Donation[]> => {
  return fetch(baseUrl + "/donations").then((res) => res.json());
};

export const getSwaps = (): Promise<RainbowSwap[]> => {
  return fetch(baseUrl + "/swaps").then((res) => res.json());
};

export const getLeaderboard = (): Promise<Leaderboard> => {
  return fetch(baseUrl + "/leaderboard").then((res) => res.json());
};

export const getNow = (): Promise<Now> => {
  return fetch(baseUrl + "/now").then((res) => res.json());
};

export const getConfirm = (): Promise<{
  dogecoinAddress: string;
  ethereumAddress: string;
}> => {
  return fetch(baseUrl + "/confirm").then((res) => res.json());
};
