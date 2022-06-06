import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from "react";
import {Background} from "../layouts/Home/Home.layout";
import { WagmiConfig } from 'wagmi';
import {chains, wagmiClient} from "../services/wagmi";
import {lightTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {ConnectButton} from "../components/Button/Button";
import {css} from "../helpers/css";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Background/>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={lightTheme({
        borderRadius: 'small',
        // accentColorForeground: 'black'
      })}>
        <div className={css("absolute", "right-0", "p-3", "z-20", "bottom-0", "md:top-0")}>
          <ConnectButton/>
        </div>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  </>
}

export default MyApp
