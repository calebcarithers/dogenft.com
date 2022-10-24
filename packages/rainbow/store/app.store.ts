import create from "zustand";
import { RainbowSwap } from "../api";

export interface Donar {
  currency: string;
  amount: number;
  address: string;
  ens: string;
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
  Swaps = "Swaps",
  Donations = "Donations"
}

export const useAppStore = create<AppStore>((set) => ({
  donars: [],
  swappers: [],
  campaignTab: TabType.Swaps,
  leaderboardTab: TabType.Swaps,
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