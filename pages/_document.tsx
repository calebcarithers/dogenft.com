import { Html, Head, Main, NextScript } from 'next/document'
import {css} from "../helpers/css";

export default function Document() {
  return (
    <Html>
      <Head title={"The Doge NFT"}/>
      <body className={css("font-ComicNeue", "bg-pixels-yellow-100")}>
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}