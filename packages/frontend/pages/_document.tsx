import {Head, Html, Main, NextScript} from 'next/document'
import React from "react";
import {css} from "../helpers/css";
import {vars} from "../environment/vars";
import {useRouter} from "next/router";

export default function Document() {
    return (
        <Html>
            <Head title={"The Doge NFT"}>
            </Head>
            <body className={css("font-ComicNeue", "mr-0")} style={{marginRight: 0}}>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
