import { LeaderboardDonation } from "@/../rainbow/api";
import { getLeaderboard } from "@/api";
import { ConnectButton } from "@/components/Button/Button";
import { Comic_Neue } from "@next/font/google";
import { useQuery } from "@tanstack/react-query";
import ColoredText from "dsl/components/ColoredText/ColoredText";
import { css } from "dsl/helpers/css";
import Head from "next/head";
const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
});

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
      <main
        style={{ backgroundImage: "url('/images/cloud.png')" }}
        className={css(
          comicNeue.className,
          "grow",
          "text-bold",
          "p-2",
          "font-normal",
          "bg-[#5c96dd00]",
          "bg-no-repeat",
          "bg-bottom",
          "flex",
          "flex-col",
          "items-center"
        )}
      >
        <div
          className={css("max-w-6xl", "w-full", "flex", "flex-col", "gap-10")}
        >
          <div className={css("flex", "justify-between", "items-center")}>
            <div />
            <Title />
            <ConnectButton />
          </div>
          <div>
            <div className={css("text-5xl", "text-center", "font-bold")}>
              $100k raised
            </div>
          </div>
          <div className={css("flex", "justify-center")}>
            <div className={css("max-w-lg", "w-full")}>
              <div className={css("text-xl")}>Leaderboard</div>
              {data && (
                <div className={css("w-full")}>
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
              )}
            </div>
          </div>
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
    <div
      className={css(
        "border-[1px]",
        "border-black",
        "inline-block",
        "p-1",
        "w-full"
      )}
    >
      <div className={css("break-words", "flex", "items-center", "gap-2")}>
        <div className={css("text-4xl", "font-bold")}>{place}</div>
        <div className={css("text-4xl")}>
          {item.myDogeName ? item.myDogeName : item.address}
        </div>
      </div>
      {/* <div className={css("ml-4")}>
        {item.donations.map((donation) => (
          <div
            key={donation.txHash}
            className={css("flex", "items-center", "gap-2")}
          >
            <a
              href={`https://sochain.com/tx/DOGE/${donation.txHash}`}
              target={"_blank"}
              rel="noreferrer"
              className={css("hover:text-red-600")}
            >
              {donation.amount} Ɖ
            </a>
          </div>
        ))}
      </div> */}
    </div>
  );
};

const Title = () => {
  return (
    <div className={css("flex", "items-center", "gap-4")}>
      <span className={css("text-3xl", "md:text-5xl")}>🛋️</span>
      <ColoredText
        className={css("font-bold", "text-stroke", "text-5xl", "md:text-7xl")}
      >
        dogecouch.house
      </ColoredText>
      <span className={css("text-3xl", "md:text-5xl")}>🛋️</span>
    </div>
  );
};
