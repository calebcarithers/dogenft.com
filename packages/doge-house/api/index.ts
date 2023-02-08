import { isDev, isProd, isStaging } from "@/environment/vars";
import { LeaderboardDonation } from "./../../rainbow/api/index";

// const proxyBaseUrl = "https://api.ownthedoge.com/ph";
// const proxyBaseUrl = "http://localhost:3003/ph";
const proxyBaseUrl = null;
let baseUrl: string;

if (isProd()) {
  baseUrl = "https://api.ownthedoge.com/ph";
} else if (isStaging()) {
  baseUrl = "https://staging.api.ownthedoge.com/ph";
} else if (isDev()) {
  baseUrl = "https://staging.api.ownthedoge.com/ph";
  if (proxyBaseUrl) {
    baseUrl = proxyBaseUrl;
  }
} else {
  throw new Error("Unknown environment");
}

interface Total {
  totalReceived: number;
  dogePrice: number;
  usdNotional: number;
}

export const getLeaderboard = (): Promise<Array<LeaderboardDonation>> => {
  return fetch(baseUrl + "/leaderboard").then((res) => res.json());
};

export const getTotal = (): Promise<Total> => {
  return fetch(baseUrl + "/total").then((res) => res.json());
};

export const getConfirm = (): Promise<{
  dogecoinAddress: string;
  ethereumAddress: string;
}> => {
  return fetch(baseUrl + "/confirm").then((res) => res.json());
};
