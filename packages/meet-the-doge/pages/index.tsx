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

export default function Home() {
  const [showOkay, setShowOkay] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const images = [{ src: wowImage }, { src: wow2Image }, { src: wow3Image }];
  const selectedImage = images[imageIndex];

  useEffect(() => {
    setImageIndex(getRandomIntInclusive(0, images.length - 1));
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
          "bg-pixels-yellow-200",
          "p-1.5",
          "justify-center",
          "items-center",
          "flex",
          "text-6xl",
          "md:text-8xl"
        )}
      >
        <div
          className={css("border-[1px]", "border-solid", "border-black", {
            hidden: !showOkay,
          })}
        >
          <Image alt={"lmao you would"} src={selectedImage.src} priority />
        </div>
        {!showOkay && (
          <div className={css("flex", "flex-col", "items-center", "gap-12")}>
            <div className={css("font-bold", "text-center", "max-w-4xl")}>
              DO YOU WANT TO TAKE A VOYAGE TO MEET THE DOGE?
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
