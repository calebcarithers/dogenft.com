import '../styles/globals.css'
import type {AppProps} from 'next/app'
import React, {useEffect} from "react";
import {Background} from "../layouts/Home/Home.layout";
import {WagmiConfig} from 'wagmi';
import {chains, wagmiClient} from "../services/wagmi";
import {lightTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {ConnectButton} from "../components/Button/Button";
import {css} from "../helpers/css";
import tailwindconfig from "../tailwind.config"
import {isProduction} from "../environment";
import {pageView} from "../services/ga";
import {useRouter} from "next/router";
import Script from "next/script";
import {vars} from "../environment/vars";

function MyApp({Component, pageProps}: AppProps) {
    const theme = lightTheme({
        borderRadius: 'none',
        fontStack: 'system',
        accentColor: tailwindconfig.theme.extend.colors.pixels.yellow[400]
    })
    theme.fonts.body = tailwindconfig.theme.extend.fontFamily.ComicNeue.join(", ")
    theme.colors.modalBackground = tailwindconfig.theme.extend.colors.pixels.yellow[100]

    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            pageView(url)
        }

        router.events.on("routeChangeComplete", handleRouteChange)

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange)
        }
    }, [router.events])

    return <>
        <Script
            id={"gatag"}
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${vars.NEXT_PUBLIC_GA_ID}`}/>

        <Script id={"gatagsomethingelse"} strategy="lazyOnload">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${vars.NEXT_PUBLIC_GA_ID}');
                `}
        </Script>
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
