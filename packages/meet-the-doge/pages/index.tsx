import Button from "dsl/components/Button/Button";
import ColoredText from "dsl/components/ColoredText/ColoredText";
import { Divider } from "dsl/components/Divider/Divider";
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
          <div
            className={css(
              "flex",
              "flex-col",
              "items-center",
              "gap-12",
              "mt-8"
            )}
          >
            <ColoredText className={css("font-bold", "text-6xl")}>
              Meet The Doge
            </ColoredText>
            <div className={css("text-center", "text-2xl", "font-bold")}>
              OwnTheDoge presents a once-in-a-lifetime opportunity to go to
              Japan and meet the actual Doge
            </div>
            <div className={css("border-[1px]", "border-black", "max-w-xl")}>
              <Image
                alt={"you with doge"}
                src={"/images/pilgrims.png"}
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
                Are you a fan of the internet sensation, Doge? Do you want to
                meet the adorable doge in person and click a selfie with her?
                Well, you{"'"}re in luck! OwnTheDoge presents a
                once-in-a-lifetime opportunity to go on a trip to Japan and meet
                the actual Doge.
              </div>
              <Divider />
              <div>
                This five day trip to Japan is not just about meeting the Doge.
                You{"'"}ll get to experience the culture, food, and
                entertainment of Japan while exploring the beautiful and serene
                land. You{"'"}ll be staying at the iconic Godzilla Hotel in
                Shinjuku (Hotel Gracery), and the itinerary includes a bespoke
                tour of Tokyo, a trip to the Hachiko statue, karaoke, sake, and
                other much WOW activities like go-karting through the city
                streets. Plus you{"'"}ll get some never-before-seen OwnTheDoge
                merch AND you{"'"}ll rub shoulders with meme legend and our
                honorary guest, Bad Luck Brian!
              </div>
              <div className={css("border-[1px]", "border-black", "max-w-xl")}>
                <Image
                  alt={"you with doge"}
                  src={"/images/gokarts.jpg"}
                  width={1428}
                  height={592}
                />
              </div>
              <div>
                Of course the main event will be a day in Sakura with Kabosu the
                Doge and her hooman, Atsuko Sato. You can walk the Doge, pet the
                Doge, take photos with the Doge, and see the site where Kabosu
                {"'"}s Bronze Statue will be erected. Never before have Doge
                fans been able to get up close and personal with the world{"'"}s
                favourite Shiba.
              </div>
              <Divider />
              <div>
                The Doge pilgrimage will begin on May 3rd and end on May 8th,
                and all you need to bring is your love for Doge, flight tickets,
                a passport, and $4200. The $4200 ticket to this Pilgrimage is an
                all-inclusive package for everything you{"'"}ll on the ground in
                Japan. In legal terms, it would include hotel, meals,
                translator, in-town transit and entry/ reservations in places
                that will be mentioned in the itinerary. A part of this amount
                will also go towards sponsoring a community member{"'"}s trip to
                meet the doge, the criteria for whose selection shall be soon
                disclosed!
              </div>
            </div>
            <div>
              <div className={css("flex", "items-center", "gap-4", "mb-4")}>
                <Divider />
                <div className={css("text-center", "font-bold")}>SO</div>
                <Divider />
              </div>
              <div className={css("font-bold", "text-center", "max-w-4xl")}>
                are you interested in meeting the Doge?
              </div>
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
