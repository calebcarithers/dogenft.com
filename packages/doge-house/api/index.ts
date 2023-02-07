import { isProd, isStaging } from "@/environment/vars";
import { LeaderboardDonation } from "./../../rainbow/api/index";

// const proxyBaseUrl = "http://localhost:3003/ph";
const proxyBaseUrl = null;
let baseUrl: string;

if (isProd()) {
  baseUrl = "https://api.ownthedoge.com/ph";
} else if (isStaging()) {
  baseUrl = "https://staging.api.ownthedoge.com/ph";
} else if (proxyBaseUrl) {
  baseUrl = proxyBaseUrl;
} else {
  baseUrl = "https://staging.api.ownthedoge.com/ph";
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
