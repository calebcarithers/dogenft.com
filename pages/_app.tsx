import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HomeLayout, {Background} from "../layouts/Home/Home.layout";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Background/>
    <Component {...pageProps} />
  </>
}

export default MyApp
