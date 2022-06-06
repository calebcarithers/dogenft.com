import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, {useEffect, useState} from "react";
import {Background} from "../layouts/Home/Home.layout";
import { WagmiConfig } from 'wagmi';
import {chains, wagmiClient} from "../services/wagmi";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Background/>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  </>
}

export default MyApp
