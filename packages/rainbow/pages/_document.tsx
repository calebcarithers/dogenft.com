import {Head, Html, Main, NextScript} from 'next/document'
import React from "react";
import {css} from "dsl/helpers/css";

export default function Document() {
    return (
        <Html>
            <Head title={"Rainbow x The Doge NFT"}/>
            <body className={css("font-ComicNeue", "bg-pixels-yellow-100")}>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
