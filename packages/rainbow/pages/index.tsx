import { css } from "dsl/helpers/css";
import LocalStorage from "dsl/helpers/local-storage";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Countdown from "react-countdown";
import { AssetsSheet } from "../components/AssetsSheet";
import DonateSheet from "../components/DonateSheet";
import Star from "../components/Star";

const COUNTDOWN_DATE = "2023-11-02T15:00:00";

const Completionist = () => <span>It is time...</span>;

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
    return <Completionist />;
  } else {
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
        <meta name="description" content="Statue loading, coming back soon." />
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
                    onClick={toggleBgImage}
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
                  Doge Pound, Rainbow and the Sakura City Council.
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

export default Home;
