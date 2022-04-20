import { Html, Head, Main, NextScript } from 'next/document'
import {css} from "../helpers/css";

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap" rel="stylesheet"/>
      </Head>
      <body className={css("font-ComicNeue")}>
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}