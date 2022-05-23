import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Background} from "../layouts/Home/Home.layout";
import React, {useEffect, useState} from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Background/>
    <Component {...pageProps} />
  </>
}

export default MyApp
