import Button from "dsl/components/Button/Button";
import Link from "dsl/components/Link/Link";
import { css } from "dsl/helpers/css";
import { getRandomIntInclusive } from "dsl/helpers/numbers";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import wowImage from "../public/images/wow.jpg";
import wow2Image from "../public/images/wow2.jpg";
import wow3Image from "../public/images/wow3.jpg";
import wow4Image from "../public/images/wow4.jpg";
import wow5Image from "../public/images/wow5.jpg";

export default function Home() {
  const [showOkay, setShowOkay] = useState(false);
  const [image, setImage] = useState(wowImage);
  const images = [wowImage, wow2Image, wow3Image, wow4Image, wow5Image];

  useEffect(() => {
    setImage(images[getRandomIntInclusive(0, images.length - 1)]);
  }, []);
  return (
    <>
      <Head>
        <title>Meet The Doge</title>
        <meta
          name="description"
          content="Your chance to meet Kabosu in her hometown."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={css(
          "grow",
          "bg-pixels-yellow-100",
          "p-4",
          "pb-14",
          "justify-center",
          "items-center",
          "flex",
          "text-6xl",
          "md:text-4xl"
        )}
      >
        <div
          className={css("border-[1px]", "border-solid", "border-black", {
            hidden: !showOkay,
          })}
        >
          <Image alt={"lmao you would"} src={image} priority />
        </div>
        {!showOkay && (
          <div className={css("flex", "flex-col", "items-center", "gap-12")}>
            <div className={css("border-[1px]", "border-black", "max-w-xl")}>
              <Image
                alt={"you with doge"}
                src={"/images/doge.png"}
                width={1428}
                height={592}
              />
            </div>
            <div
              className={css(
                "text-xl",
                "max-w-xl",
                "flex",
                "flex-col",
                "gap-4"
              )}
            >
              <div>
                Henlo fellow Doge lovers. Are you a meme enthusiast? Or a
                DogeCoin Whale? Do you value your Pixel from the Doge NFT more
                than your first born? Do you like making new Dogely friends and
                want to hang out in Tokyo for a week?
              </div>
              <div>
                OwnTheDoge is pleased to announce our latest epic adventure. As
                custodians of the original Doge meme, purchased by PleasrDAO in
                2021, we want to take you to the Doge.
              </div>
              <div>
                That{"'"}s right, we{"'"}re putting together an all inclusive
                pilgrimage to meet Kabosu the Doge, as well as her human, Atsuko
                Sato. You{"'"}ll be with the OwnTheDoge crew and other Shiba
                fans, doing only good everyday, in the home of the Doge.
              </div>
              <div>
                Kabosu has been sick lately, and we want to make sure her
                biggest fans have the opportunity to meet her while her tail is
                still wagging.
              </div>
              <div>
                If you{"'"}re interested in joining us, fill in the form below
                to stay connected.
              </div>
            </div>
            <div className={css("font-bold", "text-center", "max-w-4xl")}>
              are you interested in meeting the Doge?
            </div>
            <div
              className={css(
                "flex",
                "gap-8",
                "flex-col",
                "md:flex-row",
                "items-center"
              )}
            >
              <Link
                href={
                  "https://docs.google.com/forms/d/e/1FAIpQLSdMH83L0aAHFyVXtO_Tgoju--z9w3wmMRu-BsTQh1Ke3xxIBg/viewform"
                }
                isExternal
              >
                <Button>
                  <div className={css("p-5")}>YES</div>
                </Button>
              </Link>
              <div>
                <Button onClick={() => setShowOkay(true)}>
                  <div className={css("p-5")}>NO</div>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
