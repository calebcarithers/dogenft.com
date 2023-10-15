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
  Suspense,
  useCallback,
  useEffect,
  useRef,
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
import { PivotControls, useVideoTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { DoubleSide, TextureLoader } from "three";
import { Comic_Neue } from "@next/font/google";
import Countdown from "react-countdown";

const COUNTDOWN_DATE = "2023-11-02T15:00:00";
// const comicNeue = Comic_Neue({
//   weight: ["700"],
//   subsets: ["latin"],
//   variable: "--font-comic-neue",
// });

const Completionist = () => <span>It is time...</span>;

// Renderer callback with condition
const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div id="countdown">
        <ul
          className={css(
            "flex",
            "justify-center",
            "items-center",
            "gap-6",
            "text-xl",
            "md:text-3xl",
            "text-center"
          )}
        >
          <li
            className={css(
              "flex",
              "flex-col",
              "justify-center",
              "items-center"
              // "gap-6"
            )}
          >
            <span className={css("text-3xl", "md:text-6xl")} id="days">
              {days}
            </span>
            <span>days</span>
          </li>
          <li
            className={css(
              "flex",
              "flex-col",
              "justify-center",
              "items-center"
              // "gap-6"
            )}
          >
            <span className={css("text-3xl", "md:text-6xl")} id="hours">
              {hours}
            </span>
            <span>Hours</span>
          </li>
          <li
            className={css(
              "flex",
              "flex-col",
              "justify-center",
              "items-center"
              // "gap-6"
            )}
          >
            <span className={css("text-3xl", "md:text-6xl")} id="minutes">
              {minutes}
            </span>
            <span>Minutes</span>
          </li>
          <li
            className={css(
              "flex",
              "flex-col",
              "justify-center",
              "items-center"
              // "gap-6"
            )}
          >
            <span className={css("text-3xl", "md:text-6xl")} id="seconds">
              {seconds}
            </span>
            <span>Seconds</span>
          </li>
        </ul>
      </div>
    );
  }
};

const Home: NextPage = () => {
  const state = useAppStore((state) => state);
  const config = { cacheTime: 0 };

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

  const { data: confirm } = useQuery(["getConfirm"], getConfirm, config);

  // useEffect(() => {
  //   if (confirm) {
  //     if (confirm.dogecoinAddress !== vars.dogecoinAddress) {
  //       throw new Error("ABORT");
  //     }

  //     if (confirm.ethereumAddress !== vars.ethereumAddress) {
  //       throw new Error("ABORT");
  //     }
  //   }
  // }, []);

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
          "bg-repeat",
          "min-h-[100vh]"
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
                  "mb-8",
                  "text-3xl",
                  "md:text-6xl"
                )}
              >
                <div className={css("hidden", "lg:block")}>
                  <Star>🗿</Star>
                </div>
                <div className={css("text-center")}>
                  <div className={css("text-4xl", "font-bold")}>
                    The statue is coming...
                  </div>
                </div>
                <div className={css("hidden", "lg:block")}>
                  <Star>🐕</Star>
                </div>
              </div>
              <div className={css("flex", "justify-center", "mb-8")}>
                <div className={css("text-center", "text-2xl", "max-w-lg")}>
                  <Countdown date={COUNTDOWN_DATE} renderer={renderer} />
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
            </section>

            <section>
              <div
                className={css(
                  "flex",
                  "flex-col",
                  "justify-center",
                  "items-center",
                  "gap-6",
                  "mt-8",
                  "text-xl",
                  "md:text-3xl",
                  "text-center"
                )}
              >
                <p>
                  Brought to you by: Own The Doge, Dogecoin Foundation, NFD,
                  Doge Pound, Rainbow and frens.
                </p>

                <p>Website is coming back soon...</p>
              </div>
            </section>
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

const Video: React.FC<{ isLowPower: boolean }> = ({ isLowPower }) => {
  const videoTexture = useVideoTexture("./videos/wow.mp4", {
    autoplay: true,
    playsInline: true,
    loop: true,
    muted: true,
    defaultMuted: true,
    preload: "auto",
    crossOrigin: "anonymous",
  });

  const imageTexture = useLoader(TextureLoader, "./images/kabosu.png");
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame(() => {
    if (ref.current !== null) {
      ref.current.rotation.y += 0.02;
    }
  });

  const aspectRatio = 1.777777778;
  const height = 10;
  const imageAspectRatio = 1.333333333333333;
  const width = (isLowPower ? imageAspectRatio : aspectRatio) * height;

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={isLowPower ? imageTexture : videoTexture}
        toneMapped={false}
        side={DoubleSide}
      />
    </mesh>
  );
};
