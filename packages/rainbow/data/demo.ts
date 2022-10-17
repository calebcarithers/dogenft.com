import {Donar, Swapper} from "../store/app.store";

export const demoDonars: Donar[] = [
  {
    currency: "ETH",
    amount: 10,
    address: "0x77509a9adFB1A85C2113eE80FBb195d771dcdFc2",
    ens: "gainormather.eth",
    txHash: "erggsdf"
  },
  {
    currency: "DOG",
    amount: 10,
    address: "0x77509a9adFB1A85C2113eE80FBb195d771dcdFc2",
    ens: "gainormather.eth",
    txHash: "asdffe"
  },
  {
    currency: "DOG",
    amount: 10,
    address: "0x77509a9adFB1A85C2113eE80FBb195d771dcdFc2",
    ens: "gainormather.eth",
    txHash: "asdf"
  },
  {
    currency: "DOG",
    amount: 10,
    address: "0x77509a9adFB1A85C2113eE80FBb195d771dcdFc2",
    ens: "gainormather.eth",
    txHash: "ffdsd"
  },
]

export const demoSwappers: Swapper[] = [
  {
    baseCurrency: "ETH",
    quoteCurrency: "DOG",
    address: "0x77509a9adFB1A85C2113eE80FBb195d771dcdFc2",
    ens: "gainormather.eth",
    amountSwapped: 4,
    amountDonated: 10,
    txHash: ""
  },
  {
    baseCurrency: "USDT",
    quoteCurrency: "DOG",
    address: "0x77509a9adFB1A85C2113eE80FBb195d771dcdFc2",
    ens: "gainormather.eth",
    amountSwapped: 4,
    amountDonated: 10,
    txHash: ""
  }
]
