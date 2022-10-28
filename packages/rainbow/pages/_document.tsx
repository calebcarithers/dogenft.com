import { css } from "dsl/helpers/css";
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head title={"Rainbow x The Doge NFT"}/>
      <body className={css("font-ComicNeue", "bg-blend-lighten")} style={{
        backgroundImage: `url(/images/doge-tiled.jpg)`,
        backgroundColor: 'rgba(255, 248, 228, 0.9)'
        }}>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}
