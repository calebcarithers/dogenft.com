import { css } from "dsl/helpers/css";
import { Head, Html, Main, NextScript } from 'next/document';


export const toastifyPortalId = "react-toastify-portal"

export default function Document() {
  return (
    <Html>
      <Head title={"Rainbow x The Doge NFT"}/>
      <body className={css("font-ComicNeue")} style={{
          backgroundImage: `url(/images/doge-tiled.jpg)`
        }}>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}
