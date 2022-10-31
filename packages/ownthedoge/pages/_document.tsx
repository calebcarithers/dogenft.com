import {Head, Html, Main, NextScript} from 'next/document'
import React from "react";
import {css} from "../helpers/css";

export default function Document() {
    return (
        <Html>
            <Head title={"The Doge NFT"}/>
            <body className={css("font-ComicNeue")}>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
