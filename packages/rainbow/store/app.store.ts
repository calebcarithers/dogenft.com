import create from "zustand";
import { DonationTransfer, RainbowSwap } from "../api";

export interface AppStore {
  donations: DonationTransfer[];
  swaps: RainbowSwap[];
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
  donations: [],
  swaps: [],
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