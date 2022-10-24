import create from "zustand";
import { Donation, RainbowSwap } from "../api";
import { vars } from "../environment/vars";

export enum TabType {
  Swaps = "Swaps",
  Donations = "Donations"
}

export enum DonationModalView {
  Index = "Index",
  Donate = "Donate",
  Warning = "Warning",
  Address = "Address"
}

export enum DonationCurrency {
  Ethereum = "ethereum",
  Dogecoin = "dogecoin"
}

export interface AppStore {
  donations: Donation[];
  swaps: RainbowSwap[];
  campaignTab: TabType;
  leaderboardTab: TabType;
  isDonateDialogOpen: boolean;
  ethereumDonationAddress: string;
  dogeDonationAddress: string;
  donationModalView: DonationModalView;
  donationModalCurrency: DonationCurrency | null;
  resetModalState: () => void;
  setCampaignTab: (tabType: TabType) => void;
  setLeaderboardTab: (tabType: TabType) => void;
  setDonationModalView: (view: DonationModalView) => void
  setIsDonateDialogOpen: (isOpen: boolean) => void;
  setDonationModalCurrency: (currency: DonationCurrency) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  donations: [],
  swaps: [],
  campaignTab: TabType.Swaps,
  leaderboardTab: TabType.Swaps,
  isDonateDialogOpen: false,
  ethereumDonationAddress: vars.ethereumAddress,
  dogeDonationAddress: vars.dogecoinAddress,
  donationModalView: DonationModalView.Index,
  donationModalCurrency: null,
  resetModalState: () => set({
    donationModalView: DonationModalView.Index,
    donationModalCurrency: null
  }),
  setCampaignTab: (campaignTab: TabType) => set({campaignTab}),
  setLeaderboardTab: (leaderboardTab: TabType) => set({leaderboardTab}),
  setIsDonateDialogOpen: (isDonateDialogOpen: boolean) => set({isDonateDialogOpen}),
  setDonationModalView: (donationModalView: DonationModalView) => set({donationModalView}),
  setDonationModalCurrency: (donationModalCurrency) => set({donationModalCurrency})
}))