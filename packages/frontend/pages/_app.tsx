import '../styles/globals.css'
import type {AppProps} from 'next/app'
import React from "react";
import {Background} from "../layouts/Home/Home.layout";
import {WagmiConfig} from 'wagmi';
import {chains, wagmiClient} from "../services/wagmi";
import {darkTheme, lightTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {ConnectButton} from "../components/Button/Button";
import {css} from "../helpers/css";
import tailwindconfig from "../tailwind.config"
import {isProduction} from "../environment";

function MyApp({Component, pageProps}: AppProps) {
    const theme = lightTheme({
        borderRadius: 'none',
        fontStack: 'system',
        accentColor: tailwindconfig.theme.extend.colors.pixels.yellow[400]
    })
    theme.fonts.body = tailwindconfig.theme.extend.fontFamily.ComicNeue.join(", ")
    theme.colors.modalBackground = tailwindconfig.theme.extend.colors.pixels.yellow[100]

    return <>
        <Background/>
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={theme}>
                {!isProduction() && <div className={css("absolute", "right-0", "py-3", "px-4", "z-20", "top-0")}>
                    <ConnectButton/>
                </div>}
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    </>
}

export default MyApp
