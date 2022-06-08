import { Html, Head, Main, NextScript } from 'next/document'
import React, {useEffect, useState} from "react";
import {css} from "../helpers/css";

export default function Document() {
    return (
    <Html>
      <Head title={"The Doge NFT"}/>
          <body className={css("font-ComicNeue", "bg-pixels-yellow-100", "mr-0")} style={{marginRight: 0}}>
              <Main />
              <NextScript />
          </body>
    </Html>
  )
}