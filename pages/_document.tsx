import { Html, Head, Main, NextScript } from 'next/document'
import {css} from "../helpers/css";

export default function Document() {
  return (
    <Html>
      <Head title={"The Doge NFT"}/>
      <body className={css("font-ComicNeue")}>
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}