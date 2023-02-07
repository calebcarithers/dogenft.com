import { Donation, LeaderboardDonation } from "@/../rainbow/api";
import { getLeaderboard } from "@/api";
import {
  ConnectButton,
  DisconnectButton,
  Send5DogeButton,
} from "@/components/Button/Button";
import { dogeAddress } from "@/environment/vars";
import { useConnect, useIsMyDogeInstalled } from "@/services/myDoge";
import { Comic_Neue } from "@next/font/google";
import { useQuery } from "@tanstack/react-query";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import ColoredText from "dsl/components/ColoredText/ColoredText";
import { Divider } from "dsl/components/Divider/Divider";
import { css } from "dsl/helpers/css";
import Head from "next/head";
import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

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

  const isMyDogeInstalled = useIsMyDogeInstalled();
  const { isConnected } = useConnect();

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
          "p-4",
          "font-normal",
          "bg-[#5c96dd00]",
          "bg-no-repeat",
          "bg-bottom",
          "flex",
          "flex-col",
          "items-center",
          "bg-cover"
        )}
      >
        <div
          className={css("max-w-6xl", "w-full", "flex", "flex-col", "gap-20")}
        >
          <div className={css("flex", "justify-center", "relative")}>
            <Title />
            {isMyDogeInstalled && isConnected && (
              <div
                className={css(
                  "absolute",
                  "right-0",
                  "top-1/2",
                  "-translate-y-[50%]"
                )}
              >
                <DisconnectButton />
              </div>
            )}
          </div>
          <div>
            <div className={css("text-4xl", "text-center", "font-normal")}>
              <div>Help Save The Children, by donating Dogecoin.</div>
              <div>Top 5 donors receive IRL Kabosu rewards.</div>
            </div>
          </div>
          <div className={css("text-center", "text-4xl")}>
            {isMyDogeInstalled && (
              <div>
                {!isConnected && (
                  <div
                    className={css(
                      "flex",
                      "flex-col",
                      "gap-4",
                      "justify-center"
                    )}
                  >
                    <div>
                      <ConnectButton /> to Donate
                    </div>
                    <div className={css("flex", "justify-center")}>
                      <div
                        className={css(
                          "flex",
                          "items-center",
                          "gap-4",
                          "max-w-lg",
                          "w-full"
                        )}
                      >
                        <Divider
                          className={css("border-white", "opacity-50")}
                        />
                        <span>or</span>
                        <Divider
                          className={css("border-white", "opacity-50")}
                        />
                      </div>
                    </div>
                    <SendDirectly />
                  </div>
                )}
                {isConnected && <Send5DogeButton />}
              </div>
            )}
            {!isMyDogeInstalled && <SendDirectly />}
          </div>
          <div className={css("flex", "justify-center")}>
            <div className={css("max-w-lg", "w-full")}>
              <div className={css("text-xl")}>Leaderboard</div>
              {data && (
                <div className={css("w-full", "flex", "flex-col", "gap-2")}>
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

const SendDirectly = () => {
  return (
    <div>
      <div>send Dogecoin to:</div>
      <div className={css("break-all")}>{dogeAddress}</div>
    </div>
  );
};

const LeaderboardItem: React.FC<{
  item: LeaderboardDonation;
  place: number;
}> = ({ item, place }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={css(
        "border-[1px]",
        "border-black",
        "inline-block",
        "px-3",
        "py-1",
        "w-full",
        "bg-white",
        "rounded-md"
      )}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={css(
          "break-words",
          "flex",
          "items-center",
          "justify-between",
          "cursor-pointer"
        )}
      >
        <div className={css("flex", "items-center", "gap-4")}>
          <div className={css("text-4xl", "font-bold")}>{place}</div>
          <div className={css("text-4xl")}>
            {item.myDogeName ? item.myDogeName : item.address}
          </div>
        </div>
        <div>
          {isOpen ? (
            <HiOutlineChevronUp size={24} />
          ) : (
            <HiOutlineChevronDown size={24} />
          )}
        </div>
      </div>
      {isOpen && (
        <div>
          <div className={css("my-2")}>
            <Divider className={css("border-black", "opacity-50")} />
          </div>
          {item.donations.map((donation) => (
            <Donation
              key={`${item.address}-donation-${donation.txHash}`}
              donation={donation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface DonationProps {
  donation: Donation;
}

const Donation: React.FC<DonationProps> = ({ donation }) => {
  const today = new Date();
  const donationCreatedAt = new Date(donation.blockCreatedAt);
  const diffInSecs = differenceInSeconds(today, donationCreatedAt);
  const diffInMins = differenceInMinutes(today, donationCreatedAt);
  const diffInHours = differenceInHours(today, donationCreatedAt);
  const diffInDays = differenceInDays(today, donationCreatedAt);
  let diffFormatted = `${diffInSecs} seconds`;
  if (diffInSecs >= 60) {
    diffFormatted = `${diffInMins} minutes`;
    if (diffInMins >= 60) {
      diffFormatted = `${diffInHours} hours`;
      if (diffInHours >= 24) {
        diffFormatted = `${diffInDays} days`;
      }
    }
  }
  return (
    <a
      target={"_blank"}
      rel={"noreferrer"}
      href={`https://sochain.com/tx/DOGE/${donation.txHash}`}
      key={`donation-${donation.txHash}`}
      className={css(
        "grid",
        "grid-cols-3",
        "hover:text-red-600",
        "cursor-pointer",
        "text-black",
        "opacity-80"
      )}
    >
      <div>{donation.amount} Ɖ</div>
      <div>${donation.currencyUSDNotional.toFixed(2)}</div>
      <div>{diffFormatted} ago</div>
    </a>
  );
};

const Title = () => {
  return (
    <div className={css("flex", "items-center", "gap-4")}>
      <span className={css("text-3xl", "md:text-5xl")}>🛋️</span>
      <ColoredText
        className={css("font-bold", "text-stroke", "text-4xl", "md:text-7xl")}
      >
        dogecouch.house
      </ColoredText>
      <span className={css("text-3xl", "md:text-5xl")}>🛋️</span>
    </div>
  );
};
