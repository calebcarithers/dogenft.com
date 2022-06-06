import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from "react";
import {Background} from "../layouts/Home/Home.layout";
import { WagmiConfig } from 'wagmi';
import {chains, wagmiClient} from "../services/wagmi";
import {darkTheme, lightTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {ConnectButton} from "../components/Button/Button";
import {css} from "../helpers/css";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Background/>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        borderRadius: 'small',
        // accentColorForeground: 'black'
      })}>
        <div className={css("absolute", "right-0", "py-3", "px-4", "z-20", "top-0")}>
          <ConnectButton/>
        </div>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  </>
}

export default MyApp
