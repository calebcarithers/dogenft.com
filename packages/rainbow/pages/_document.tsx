import {Head, Html, Main, NextScript} from 'next/document'
import React from "react";
import {css} from "dsl/helpers/css";

export default function Document() {
    return (
        <Html>
            <Head title={"Rainbow x The Doge NFT"}>
            </Head>
            <body className={css("font-ComicNeue", "mr-0", "bg-pixels-yellow-100")} style={{marginRight: 0}}>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
