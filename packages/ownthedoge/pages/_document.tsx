import { Head, Html, Main, NextScript } from "next/document";
import { css } from "../helpers/css";
import { TITLE } from "./_app";

export default function Document() {
  return (
    <Html>
      <Head title={TITLE} />
      <body className={css("font-ComicNeue", "mr-0")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
