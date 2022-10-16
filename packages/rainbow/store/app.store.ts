import create from "zustand";
import {demoDonars, demoSwappers} from "../data/demo";

export interface Donar {
  currency: string;
  amount: number;
  address: string;
  ens: string;
  txHash: string;
}

export interface Swapper {
  baseCurrency: string;
  quoteCurrency: string;
  address: string;
  ens: string;
  amountSwapped: number;
  amountDonated: number;
  txHash: string;
}

export interface AppStore {
  donars: Donar[];
  swappers: Swapper[];
  campaignTab: CampaignTab
}

export enum CampaignTab {
  Swap = "Swap",
  Donate = "Donate"
}

export const useAppStore = create<AppStore>((set) => ({
  donars: demoDonars,
  swappers: demoSwappers,
  campaignTab: CampaignTab.Swap
}))