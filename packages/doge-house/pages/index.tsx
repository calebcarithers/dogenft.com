import { getLeaderboard } from "@/api";
import { Inter } from "@next/font/google";
import { useQuery } from "@tanstack/react-query";
import { css } from "dsl/helpers/css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isLoading, data, isError } = useQuery(
    ["getLeaderboard"],
    getLeaderboard
  );
  return (
    <>
      <Head>
        <title>Doge Couch</title>
        <meta name="description" content="Le Doge Couch" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={css("text-bold")}>
        {isError && <div>could not get data</div>}
        {isLoading && <div>loading</div>}
        {data && <div>{JSON.stringify(data)}</div>}
      </main>
    </>
  );
}
