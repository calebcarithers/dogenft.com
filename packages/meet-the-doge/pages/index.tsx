import Button from "dsl/components/Button/Button";
import Link from "dsl/components/Link/Link";
import { css } from "dsl/helpers/css";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>MEET THE DOGE</title>
        <meta
          name="description"
          content="Your chance to meet Kabosu in her hometown."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={css(
          "bg-pixels-yellow-200",
          "grow",
          "p-1.5",
          "justify-center",
          "items-center",
          "flex",
          "font-ComicNeue",
          "text-6xl",
          "md:text-8xl"
        )}
      >
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
              <Button
                onClick={() => {
                  window.open("", "_self", "");
                  window.close();
                }}
              >
                <div className={css("p-5")}>NO</div>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
