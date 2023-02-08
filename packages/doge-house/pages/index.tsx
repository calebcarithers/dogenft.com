import { Donation, LeaderboardDonation } from "@/../rainbow/api";
import { getLeaderboard, getTotal } from "@/api";
import ExternalLink from "@/components/ExternalLink/ExternalLink";
import { dogeAddress } from "@/environment/vars";
import { useConnect, useIsMyDogeInstalled } from "@/services/myDoge";
import { Comic_Neue } from "@next/font/google";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { ConnectButton } from "@/components/Button/Button";
import AppLayout from "@/components/Layouts/AppLayout";
import MyDogeSend from "@/components/MyDogeSend/MyDogeSend";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { Divider } from "dsl/components/Divider/Divider";
import { css } from "dsl/helpers/css";
import { abbreviate } from "dsl/helpers/strings";
import Head from "next/head";
import { useEffect, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import QRCode from "react-qr-code";

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
});

export default function Home() {
  const isMyDogeInstalled = useIsMyDogeInstalled();
  const { isConnected } = useConnect();

  return (
    <>
      <Head>
        <title>dogecouch.house</title>
        <meta
          name="description"
          content="Win IRL Doge relics by donating Doge to charity."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className={css("flex", "flex-col", "gap-8", "mt-10")}>
          <div>
            <div
              className={css(
                "md:text-3xl",
                "text-xl",
                "text-center",
                "font-normal"
              )}
            >
              <div
                className={css(
                  "flex",
                  "flex-col",
                  "md:flex-row",
                  "items-center",
                  "justify-center",
                  "gap-0",
                  "md:gap-2"
                )}
              >
                <div>Donate Doge to help raise for</div>
                <ExternalLink href={"https://www.savethechildren.org/"}>
                  Save The Children
                </ExternalLink>
              </div>
            </div>
            <TotalRaised />
          </div>
          <div className={css("flex", "justify-between", "items-center")}>
            <DogePaw />
            <div className={css("flex", "items-center", "flex-col", "gap-3")}>
              <div
                className={css(
                  "text-center",
                  "md:text-3xl",
                  "text-xl",
                  "font-bold"
                )}
              >
                🎁 Rewards 🎁
              </div>
              <div className={css("text-center", "md:text-3xl", "text-xl")}>
                <span className={css("font-bold")}>Top 10:</span> 3D print of
                Kabosu{"'"}s Paw + Doge bandana
              </div>
              <div className={css("text-center", "md:text-3xl", "text-xl")}>
                <span className={css("font-bold")}>Top 5:</span> Kabosu paw +
                Doge bandana + pins & envelope from Atsuko
              </div>
            </div>

            <DogePaw />
          </div>
          <div className={css("text-center", "text-3xl")}>
            {isMyDogeInstalled && (
              <div
                className={css("flex", "flex-col", "gap-4", "justify-center")}
              >
                <div
                  className={css("flex", "flex-col", "gap-4", "justify-center")}
                >
                  {!isConnected && (
                    <div>
                      <ConnectButton />
                    </div>
                  )}
                  {isConnected && (
                    <div>
                      <MyDogeSend />
                    </div>
                  )}
                  <div className={css("flex", "justify-center")}>
                    <div
                      className={css(
                        "flex",
                        "items-center",
                        "gap-4",
                        "max-w-sm",
                        "w-full"
                      )}
                    >
                      <Divider
                        className={css("!border-black", "!opacity-20")}
                      />
                      <span>or</span>
                      <Divider
                        className={css("!border-black", "!opacity-20")}
                      />
                    </div>
                  </div>
                  <SendDirectly title={"send Doge directly to"} />
                </div>
              </div>
            )}
            {!isMyDogeInstalled && <SendDirectly />}
          </div>
          <Leaderboard />
        </div>
      </AppLayout>
    </>
  );
}

export const TotalRaised = () => {
  const { data: total } = useQuery(
    ["getTotal"],
    getTotal,

    { refetchInterval: 5000 }
  );
  return (
    <>
      {total && (
        <div className={css("mt-2")}>
          <div
            className={css(
              "text-center",
              "text-6xl",
              "font-bold",
              "text-doge-orange",
              "text-stroke"
            )}
          >
            {Number(total.totalReceived).toFixed(0)} Ɖ raised
          </div>
        </div>
      )}
    </>
  );
};

export const Leaderboard = () => {
  const { isLoading, data, isError } = useQuery(
    ["getLeaderboard"],
    getLeaderboard,
    { refetchInterval: 5000 }
  );
  return (
    <div className={css("flex", "justify-center")}>
      <div className={css("max-w-lg", "w-full")}>
        <div className={css("text-xl")}>Leaderbork</div>
        {data && (
          <div
            className={css(
              "w-full",
              "flex",
              "flex-col",
              "gap-2",
              "max-h-[500px]",
              "overflow-y-auto",
              "overflow-x-hidden",
              "pb-4",
              "pr-2"
            )}
          >
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
  );
};

const DogePaw = () => {
  return (
    <div className={css("max-w-xs", "w-full")}>
      <Image
        src={"/images/paw.gif"}
        width={1080}
        height={1080}
        alt={"Kabosu Paw"}
        priority
      />
    </div>
  );
};

const SendDirectly = ({
  title = "To donate, send Doge to:",
}: {
  title?: string;
}) => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [animationClass, setAnimationClass] = useState("hidden");
  useEffect(() => {
    const timeout = setInterval(() => {
      if (animationClass === "fade-in") {
        setAnimationClass("fade-out");
      } else if (animationClass === "fade-out") {
        setAnimationClass("hidden");
      } else if (animationClass === "hidden") {
      } else {
        setAnimationClass("fade-in");
      }
    }, 4000);
    return () => clearInterval(timeout);
  }, [animationClass]);
  return (
    <div className={css("md:text-3xl", "text-xl")}>
      <div>{title}</div>
      <div className={css("flex", "justify-center", "mt-3", "mb-1")}>
        <div
          className={css(
            "bg-white",
            "p-4",
            "border-[1px]",
            "border-black",
            "rounded-md"
          )}
        >
          <QRCode value={`dogecoin:${dogeAddress}?amount=69`} size={150} />
        </div>
      </div>
      <div
        className={css(
          "break-all",
          "cursor-pointer",
          "hover:text-red-600",
          "text-xl",
          "inline-block"
        )}
        onClick={() =>
          navigator.clipboard.writeText(dogeAddress).then(() => {
            console.log("copied doge address:", dogeAddress);
            setAnimationClass("fade-in");
          })
        }
      >
        {abbreviate(dogeAddress)}
      </div>
      <div className={css("text-base", "h-[12px]")}>
        <span className={css(animationClass, "text-black")}>✨ copied ✨</span>
      </div>
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
        className={css(
          "break-words",
          "flex",
          "items-center",
          "justify-between"
        )}
      >
        <div
          className={css(
            "flex",
            "items-center",
            "gap-4",
            "text-2xl",
            "md:text-3xl"
          )}
        >
          <div className={css()}>{place}</div>
          <ExternalLink
            href={
              item.myDogeName
                ? `https://mydoge.com/${item.myDogeName}`
                : `https://sochain.com/address/DOGE/${item.address}`
            }
          >
            {item.myDogeName ? item.myDogeName : abbreviate(item.address)}
          </ExternalLink>
        </div>
        <div className={css("flex", "items-center", "gap-2")}>
          <div className={css("text-black", "opacity-80")}>
            ~${item.usdNotional?.toFixed(2)}
          </div>
          <div
            className={css("cursor-pointer")}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <HiOutlineChevronUp size={24} />
            ) : (
              <HiOutlineChevronDown size={24} />
            )}
          </div>
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
    <ExternalLink
      iconSize={14}
      href={`https://sochain.com/tx/DOGE/${donation.txHash}`}
      key={`donation-${donation.txHash}`}
      className={css("text-gray-700")}
    >
      <div className={css("grid", "grid-cols-3")}>
        <div>{donation.amount} Ɖ</div>
        <div>${donation.currencyUSDNotional.toFixed(2)}</div>
        <div>{diffFormatted} ago</div>
      </div>
    </ExternalLink>
  );
};
