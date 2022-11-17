import { useQuery } from "@tanstack/react-query";
import AsyncLoader from "dsl/components/AsyncLoader/AsyncLoader";
import Button from "dsl/components/Button/Button";
import ColoredText from "dsl/components/ColoredText/ColoredText";
import { Divider } from "dsl/components/Divider/Divider";
import Link from "dsl/components/Link/Link";
import { Tabs } from "dsl/components/Tabs/Tabs";
import { css } from "dsl/helpers/css";
import LocalStorage from "dsl/helpers/local-storage";
import { isValidEthereumAddress } from "dsl/helpers/strings";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { getConfirm, getDonations, getLeaderboard, getSwaps } from "../api";
import { AssetsSheet } from "../components/AssetsSheet";
import DonateSheet from "../components/DonateSheet";
import DonationProgressBar from "../components/DonationProgressBar";
import {
  DonateItem,
  LeaderBoardItem,
  RewardItem,
  SwapItem,
} from "../components/Item";
import Star from "../components/Star";
import { vars } from "../environment/vars";
import { GaActions, gaEvent } from "../services/ga";
import { TabToTitle, TabType, useAppStore } from "../store/app.store";

const Home: NextPage = () => {
  const state = useAppStore((state) => state);
  const config = {
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: false,
  };

  const { isLoading: isDonationsLoading, data: donations } = useQuery(
    ["getDonations"],
    getDonations,
    config
  );

  const { isLoading: isSwapsLoading, data: swaps } = useQuery(
    ["getSwaps"],
    getSwaps,
    config
  );

  const { data: leaderboard } = useQuery(
    ["getLeaderboard"],
    getLeaderboard,
    config
  );

  const { data: confirm } = useQuery(["getConfirm"], getConfirm);

  useEffect(() => {
    if (confirm) {
      if (confirm.dogecoinAddress !== vars.dogecoinAddress) {
        throw new Error("ABORT");
      }

      if (confirm.ethereumAddress !== vars.ethereumAddress) {
        throw new Error("ABORT");
      }
    }
  }, []);

  useEffect(() => console.log("Happy Birthday Kabosu 🎈"), []);

  const dogeTiledImg = "/images/doge-tiled.png";
  const dogeWindmillImg = "/images/new-bg.png";
  const lsBgKey = "doge-bg";

  const [bgImage, setBgImage] = useState(dogeTiledImg);
  useEffect(() => {
    setBgImage(
      LocalStorage.getItem(lsBgKey, LocalStorage.PARSE_STRING, dogeTiledImg)
    );
  }, []);
  const toggleBgImage = useCallback(() => {
    if (bgImage === dogeTiledImg) {
      setBgImage(dogeWindmillImg);
      LocalStorage.setItem(lsBgKey, dogeWindmillImg);
    } else {
      setBgImage(dogeTiledImg);
      LocalStorage.setItem(lsBgKey, dogeTiledImg);
    }
  }, [bgImage, setBgImage]);

  return (
    <>
      <Head>
        <title>Bronze The Doge</title>
        <meta
          name="description"
          content="Help us build a statue of the Doge, Kabosu, in her hometown"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={css(
          "relative",
          "overflow-hidden",
          "p-5",
          "pt-8",
          "font-ComicNeue",
          "bg-auto",
          "bg-center",
          "bg-repeat"
        )}
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className={css("flex", "justify-center")}>
          <div className={css("max-w-4xl", "w-full")}>
            <section>
              <div
                className={css(
                  "flex",
                  "justify-center",
                  "items-center",
                  "gap-6",
                  "mb-14",
                  "text-3xl",
                  "md:text-6xl"
                )}
              >
                <div className={css("hidden", "lg:block")}>
                  <Star>🗿</Star>
                </div>
                <div className={css("text-center")}>
                  <div className={css("text-4xl", "font-bold")}>
                    Happy 17th Birthday Doge!
                  </div>
                </div>
                <div className={css("hidden", "lg:block")}>
                  <Star>🐕</Star>
                </div>
              </div>
              <div className={css("flex", "justify-center")}>
                <div
                  className={css(
                    "max-w-sm",
                    "border-solid",
                    "border-2",
                    "border-black",
                    "w-full"
                  )}
                >
                  <Image
                    layout={"responsive"}
                    src={"/images/doge-hero.jpeg"}
                    width={1024}
                    height={1024}
                    alt={"Kabosu statue"}
                  />
                </div>
              </div>
              <div className={css("flex", "justify-center", "mt-8")}>
                <div className={css("text-center", "text-2xl", "max-w-lg")}>
                  UPDATE: We{"'"}ve reached our initial fundraising goal!
                  Everything raised beyond this point increases the statue{"'"}s
                  Size and WOW. Doge willing, maybe even a sister statue on the
                  MOON!
                </div>
              </div>
            </section>

            <section className={css("text-center", "px-10")}>
              <div className={css("text-xl", "mt-20", "relative")}>
                <DonationProgressBar />
              </div>
              <div className={css("mb-32", "mt-44")}>
                <Button
                  onClick={() => {
                    state.setIsDonateDialogOpen(true);
                    gaEvent({
                      action: GaActions.DonateButtonClick,
                      params: {},
                    });
                  }}
                >
                  <div className={css("text-4xl", "p-1")}>✨ DONATE ✨</div>
                </Button>

                <div className={css("my-10", "text-red-500", "font-bold")}>
                  <TwitterShareButton
                    url={"https://bronzethedoge.xyz"}
                    title={
                      "Happy 17th Birthday Doge!\nLet's help Kabosu (Doge) be remembered forever. Help us raise funds to create a bronze Kabosu statue in Japan."
                    }
                    related={[
                      "bronzethedoge",
                      "Kabosu17Birthday",
                      "Doge",
                      "kabosu",
                    ]}
                    hashtags={["bronzethedoge"]}
                  >
                    <Button as={"div"} rounded>
                      <div
                        className={css("flex", "items-center", "gap-2", "mr-1")}
                      >
                        <TwitterIcon size={32} round />
                        <div>Tweet it</div>
                      </div>
                    </Button>
                  </TwitterShareButton>
                </div>
              </div>
            </section>

            <section
              className={css(
                "text-center",
                "text-xl",
                "mt-14",
                "grid",
                "grid-cols-1",
                "lg:grid-cols-2",
                "gap-8"
              )}
            >
              <div className={css("flex", "flex-col", "gap-5")}>
                <div className={css("font-bold", "text-3xl")}>
                  About this campaign
                </div>
                <div>
                  For Kabosu{"'"}s (The Doge!) 17th Birthday, we are
                  crowdfunding{" "}
                  <ColoredText className={css("font-bold")}>
                    AN EPIC BRONZE STATUE
                  </ColoredText>{" "}
                  in a park in Kabosu{"'"}s hometown in Sakura, Japan.
                </div>
                <div>
                  We are calling upon all Doge fans and communities to come
                  together and make this a reality! To kick things off, Atsuko
                  Sato (Doge{"'"}s Momma), OwnTheDoge, The Dogecoin Foundation,
                  Rainbow, Feisty Doge, PleasrDao, and Doge Pound are working to
                  promote this initiative to Bronze the Doge! We welcome all
                  Doge fans and communities to participate through sharing or
                  contributing. We also have cool rewards and perks that you can
                  check out below! The donations run from Nov. 2nd (Kabosu{"'"}s
                  B-day) to Dec. 6th (Dogecoin{"'"}s B-day).
                </div>
                <div>
                  Review the detailed overview of the project{" "}
                  <Link
                    isExternal
                    href={
                      "https://medium.com/bronzethedoge/happy-birthday-kabosu-lets-bronze-the-doge-3fb431036951"
                    }
                  >
                    here
                  </Link>
                  .
                </div>
                <div>
                  Feel free to follow & contact us via the official twitter
                  account for this campaign:{" "}
                  <Link
                    href={"https://mobile.twitter.com/BronzeTheDoge"}
                    isExternal
                  >
                    @bronzethedoge
                  </Link>
                  .
                </div>
              </div>
              <div>
                <Tabs
                  className={css("mb-2", "text-xl")}
                  items={Object.keys(TabType).map((tab) => ({
                    name: `${TabToTitle[tab as TabType]} (${
                      tab === TabType.Donations
                        ? donations?.length
                        : swaps?.length
                    })`,
                    key: tab,
                  }))}
                  onClick={(type) => state.setCampaignTab(type as TabType)}
                  selected={state.campaignTab}
                />
                <div
                  className={css(
                    "flex",
                    "flex-col",
                    "gap-5",
                    "h-[500px]",
                    "overflow-y-auto",
                    "overflow-x-hidden",
                    "pr-4",
                    "pb-4"
                  )}
                >
                  <AsyncLoader
                    renderNoData={() => {
                      return (
                        <div
                          className={css(
                            "h-full",
                            "flex",
                            "justify-center",
                            "items-center",
                            "border-2",
                            "border-dashed",
                            "border-pixels-yellow-300",
                            "text-pixels-yellow-400",
                            "text-xl",
                            "flex-grow"
                          )}
                        >
                          {state.campaignTab === TabType.Donations
                            ? "No donations yet 😢"
                            : "No swaps yet 🌈"}
                        </div>
                      );
                    }}
                    hasData={
                      state.campaignTab === TabType.Donations
                        ? donations && donations?.length > 0
                        : swaps && swaps?.length > 0
                    }
                    isLoading={
                      state.campaignTab === TabType.Donations
                        ? isDonationsLoading
                        : isSwapsLoading
                    }
                  >
                    {state.campaignTab === TabType.Donations &&
                      donations?.map((donation) => (
                        <DonateItem
                          key={`donation-${donation.txHash}`}
                          item={donation}
                        />
                      ))}
                    {state.campaignTab === TabType.Swaps &&
                      swaps?.map((swap) => (
                        <SwapItem key={`donation-${swap.txHash}`} item={swap} />
                      ))}
                  </AsyncLoader>
                </div>
              </div>
            </section>

            <section
              className={css("flex", "flex-col", "items-center", "mt-14")}
            >
              <TitleDivider>Rewards</TitleDivider>
              <div className={css("flex", "justify-center", "w-full")}>
                <div className={css("flex", "flex-col", "w-full", "gap-20")}>
                  <div
                    className={css(
                      "max-w-2xl",
                      "w-full",
                      "md:hover:translate-x-[15%]",
                      "ease-out",
                      "duration-300"
                    )}
                  >
                    <RewardItem
                      title={
                        "The top 11 donors will get their ENS or wallet address engraved on the Kabosu statue"
                      }
                      description={"Family friendly names only!"}
                    />
                  </div>
                  <div
                    className={css(
                      "max-w-2xl",
                      "self-end",
                      "w-full",
                      "md:hover:-translate-x-[15%]",
                      "ease-out",
                      "duration-300"
                    )}
                  >
                    <RewardItem
                      title={
                        "All donors who gift $11 or more will be added to a global registry that will be immortalized as an NFT on the blockchain!"
                      }
                    />
                  </div>
                  <div
                    className={css(
                      "max-w-2xl",
                      "w-full",
                      "md:hover:translate-x-[15%]",
                      "ease-out",
                      "duration-300"
                    )}
                  >
                    <RewardItem
                      title={
                        "Those that use Rainbow Wallet to swap $DOG between Nov. 2nd and 16th will receive a dank Doge wallet icon on their phone + a chance to win a Doge Pixel from OwnTheDoge."
                      }
                      description={
                        "Rainbow is also donating all $DOG swap fees during this period to the campaign!"
                      }
                    />
                  </div>
                </div>
              </div>
              <div
                className={css("font-bold", "mt-12", "text-2xl", "text-center")}
              >
                Don{"'"}t let this opportunity to be a part of the most
                monumental moment in Doge history pass you by! Let{"'"}s make
                Kabosu{"'"}s 17th birthday one for the history books, and ensure
                the world{"'"}s most famous meme lives forever {":)"}
              </div>
            </section>

            <section className={css("mt-14")}>
              <TitleDivider>Leaderboard</TitleDivider>
              <div>
                <Tabs
                  className={css("mb-2", "text-xl")}
                  items={Object.keys(TabType).map((tab) => ({
                    name: `${
                      tab === TabType.Donations ? "Donors" : "Swappers"
                    } (${
                      tab === TabType.Donations
                        ? donations?.length
                        : swaps?.length
                    })`,
                    key: tab,
                  }))}
                  onClick={(type) => state.setLeaderboardTab(type as TabType)}
                  selected={state.leaderboardTab}
                />
                <div
                  className={css(
                    "flex",
                    "flex-col",
                    "gap-5",
                    "h-[500px]",
                    "overflow-y-auto",
                    "overflow-x-hidden",
                    "pr-4",
                    "pb-4"
                  )}
                >
                  <AsyncLoader
                    renderNoData={() => {
                      return (
                        <div
                          className={css(
                            "h-full",
                            "flex",
                            "justify-center",
                            "items-center",
                            "border-2",
                            "border-dashed",
                            "border-pixels-yellow-300",
                            "text-pixels-yellow-400",
                            "text-xl",
                            "flex-grow"
                          )}
                        >
                          {state.leaderboardTab === TabType.Donations
                            ? "No donations yet 😢"
                            : "No swaps yet 🌈"}
                        </div>
                      );
                    }}
                    hasData={
                      state.leaderboardTab === TabType.Donations
                        ? leaderboard?.donations &&
                          leaderboard?.donations?.length > 0
                        : leaderboard?.swaps && leaderboard?.swaps?.length > 0
                    }
                    isLoading={
                      state.leaderboardTab === TabType.Donations
                        ? isDonationsLoading
                        : isSwapsLoading
                    }
                  >
                    {state.leaderboardTab === TabType.Donations &&
                      leaderboard?.donations?.map((donation, index) => (
                        <Link
                          href={
                            isValidEthereumAddress(donation.address)
                              ? `https://rainbow.me/${donation.address}`
                              : `https://sochain.com/address/DOGE/${donation.address}`
                          }
                          isExternal
                          key={`donation-leaderboard-${donation.address}`}
                        >
                          <LeaderBoardItem
                            type={"donation"}
                            rank={index + 1}
                            item={donation}
                          />
                        </Link>
                      ))}
                    {state.leaderboardTab === TabType.Swaps &&
                      leaderboard?.swaps?.map((swap, index) => (
                        <Link
                          key={`swap-leaderboard-${swap.address}`}
                          href={`https://rainbow.me/${swap.address}`}
                          isExternal
                        >
                          <LeaderBoardItem
                            type={"swap"}
                            rank={index + 1}
                            item={swap}
                          />
                        </Link>
                      ))}
                  </AsyncLoader>
                </div>
              </div>
            </section>
            <footer className={css("my-28")}>
              <Divider />
              <div
                className={css(
                  "grid",
                  "grid-cols-1",
                  "md:grid-cols-2",
                  "my-14",
                  "gap-12"
                )}
              >
                <div className={css("flex", "justify-center")}>
                  <div
                    className={css(
                      "max-w-[250px]",
                      "w-full",
                      "border-2",
                      "border-black"
                    )}
                  >
                    <Image
                      layout={"responsive"}
                      width={1440}
                      height={1440}
                      src={"/images/kabosu-birthday.png"}
                      alt={"birthday doge"}
                      priority
                    />
                  </div>
                </div>
                <div
                  className={css(
                    "flex",
                    "justify-center",
                    "md:justify-end",
                    "order-1",
                    "md:order-2",
                    "items-center"
                  )}
                >
                  <div className={css("inline-block", "relative")}>
                    <Button onClick={toggleBgImage}>
                      <div className={css("p-2", "max-w-xs", "text-xl")}>
                        Help us build {`Kabosu's`} statue in her hometown.
                      </div>
                    </Button>
                    <div
                      className={css(
                        "max-w-[50px]",
                        "absolute",
                        "w-full",
                        "right-0",
                        "-top-[38px]"
                      )}
                    >
                      <Image
                        layout={"responsive"}
                        width={182}
                        height={154}
                        src={"/images/pixel-doge.png"}
                        alt={"pixel doge"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
            </footer>
            <div className={css("flex", "items-center", "justify-center")}>
              <div className={css("flex", "items-center", "gap-4")}>
                <div>
                  <Link isExternal href={"https://twitter.com/kabosumama"}>
                    <div className={css("text-pixels-yellow-400")}>
                      <BsTwitter />
                    </div>
                  </Link>
                </div>
                <div>
                  <Link isExternal href={"https://kabochan.blog.jp/"}>
                    <div className={css("text-pixels-yellow-400")}>
                      <TfiWorld />
                    </div>
                  </Link>
                </div>
                <div>
                  <Link
                    isExternal
                    href={"https://www.instagram.com/kabosumama/"}
                  >
                    <div className={css("text-pixels-yellow-400")}>
                      <BsInstagram />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DonateSheet />
      <AssetsSheet />
    </>
  );
};

const TitleDivider: React.FC<PropsWithChildren<{ children: ReactNode }>> = ({
  children,
}) => {
  return (
    <div className={css("w-full")}>
      <div className={css("text-2xl", "font-bold", "text-center")}>
        {children}
      </div>
      <div className={css("my-4", "w-full")}>
        <Divider />
      </div>
    </div>
  );
};

export default Home;
