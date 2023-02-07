import { LeaderboardDonation } from "@/../rainbow/api";
import { getLeaderboard } from "@/api";
import { useAccount, useConnect, useDisconnect } from "@/services/myDoge";
import { useQuery } from "@tanstack/react-query";
import { css } from "dsl/helpers/css";
import Head from "next/head";

export default function Home() {
  const { isLoading, data, isError } = useQuery(
    ["getLeaderboard"],
    getLeaderboard
  );
  const { connect, isConnected } = useConnect();
  const { account, balance } = useAccount();
  const { disconnect } = useDisconnect();
  console.log("debug:: isConnected", isConnected);
  return (
    <>
      <Head>
        <title>Doge Couch</title>
        <meta name="description" content="Le Doge Couch" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={css("text-bold", "p-2")}>
        <div className={css("flex", "justify-center", "text-2xl")}>
          <div>Doge Couch</div>
        </div>
        <div>
          {!isConnected && <button onClick={() => connect()}>connect</button>}
          {isConnected && (
            <button onClick={() => disconnect()}>disconnect</button>
          )}
          <div>{account}</div>
          <div>{balance}</div>
        </div>
        <div>
          {isLoading && <div>loading</div>}
          {data && (
            <div>
              <div>
                {data.map((item, index) => {
                  return (
                    <LeaderboardItem
                      key={item.address}
                      item={item}
                      place={index + 1}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

const LeaderboardItem: React.FC<{
  item: LeaderboardDonation;
  place: number;
}> = ({ item, place }) => {
  return (
    <div className={css("break-words", "flex", "items-center", "gap-2")}>
      <div>{place}</div>
      <div>{item.address}</div>
      {/* {JSON.stringify(item)} */}
    </div>
  );
};
