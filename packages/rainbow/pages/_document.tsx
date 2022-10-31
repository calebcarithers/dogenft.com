import { css } from "dsl/helpers/css";
import { Head, Html, Main, NextScript } from 'next/document';


export const toastifyPortalId = "react-toastify-portal"

export default function Document() {
  return (
    <Html>
      <Head title={"Rainbow x The Doge NFT"}/>
      <body className={css("font-ComicNeue", "bg-blend-lighten")} style={{
        backgroundImage: `url(/images/doge-tiled.png)`,
        backgroundColor: 'rgba(255, 248, 228, 0.92)'
        }}>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}
