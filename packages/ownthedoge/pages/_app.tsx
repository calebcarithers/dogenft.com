import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { WagmiConfig } from "wagmi";
import { ConnectButton } from "../../dsl/components/Button/Button";
import { vars } from "../environment/vars";
import { css } from "../helpers/css";
import { Background } from "../layouts/Home/Home.layout";
import { pageView } from "../services/ga";
import { chains, wagmiClient } from "../services/wagmi";
import "../styles/globals.css";
const tailwindconfig = require("../tailwind.config");

function MyApp({ Component, pageProps }: AppProps) {
  const theme = lightTheme({
    borderRadius: "none",
    fontStack: "system",
    accentColor: tailwindconfig.theme.extend.colors.pixels.yellow[400],
  });
  theme.fonts.body =
    tailwindconfig.theme.extend.fontFamily.ComicNeue.join(", ");
  theme.colors.modalBackground =
    tailwindconfig.theme.extend.colors.pixels.yellow[100];

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const showConnectButton = router.pathname !== "/";
  return (
    <>
      <style jsx global>
        {`
          body {
            background: ${router.pathname === "/doge-major"
              ? "black"
              : tailwindconfig.theme.extend.colors.pixels.yellow[100]};
          }
        `}
      </style>
      <Script
        id={"gatag"}
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${vars.NEXT_PUBLIC_GA_ID}`}
      />

      <Script id={"gatagsomethingelse"} strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${vars.NEXT_PUBLIC_GA_ID}');
                `}
      </Script>
      <Background />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={theme}>
          {showConnectButton && (
            <div
              className={css(
                "absolute",
                "right-0",
                "py-3",
                "px-4",
                "z-20",
                "top-0"
              )}
            >
              <ConnectButton />
            </div>
          )}
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
