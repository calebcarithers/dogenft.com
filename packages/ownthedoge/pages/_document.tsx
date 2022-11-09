import { Head, Html, Main, NextScript } from "next/document";
import { css } from "../helpers/css";

export default function Document() {
  return (
    <Html>
      <Head title={"The Doge NFT"} />
      <body className={css("font-ComicNeue", "mr-0")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
