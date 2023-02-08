import { isDev, isProd, isStaging } from "@/environment/vars";
import { LeaderboardDonation } from "./../../rainbow/api/index";

const proxyBaseUrl = "https://api.ownthedoge.com/ph";
// const proxyBaseUrl = null;
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

export const getLeaderboard = (): Promise<Array<LeaderboardDonation>> => {
  return fetch(baseUrl + "/leaderboard").then((res) => res.json());
};

export const getConfirm = (): Promise<{
  dogecoinAddress: string;
  ethereumAddress: string;
}> => {
  return fetch(baseUrl + "/confirm").then((res) => res.json());
};
