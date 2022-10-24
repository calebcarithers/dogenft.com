import create from "zustand";
import { RainbowSwap } from "../api";
import { demoDonars } from "../data/demo";

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
  swappers: RainbowSwap[];
  campaignTab: TabType;
  leaderboardTab: TabType;
  setCampaignTab: (tabType: TabType) => void;
  setLeaderboardTab: (tabType: TabType) => void;
  isDonateDialogOpen: boolean
  setIsDonateDialogOpen: (isOpen: boolean) => void
}

export enum TabType {
  Swap = "Swap",
  Donate = "Donate"
}

export const useAppStore = create<AppStore>((set) => ({
  donars: demoDonars,
  swappers: [],
  campaignTab: TabType.Swap,
  leaderboardTab: TabType.Swap,
  isDonateDialogOpen: false,
  setCampaignTab: (tabType: TabType) => set({
    campaignTab: tabType
  }),
  setLeaderboardTab: (tabType: TabType) => set({
    leaderboardTab: tabType
  }),
  setIsDonateDialogOpen: (isOpen: boolean) => set({
    isDonateDialogOpen: isOpen
  })
}))