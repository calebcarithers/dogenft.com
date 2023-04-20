import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import Link, { LinkType } from "dsl/components/Link/Link";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";
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
  const TITLE = "Own The Doge";
  const DESCRIPTION =
    "the community that collectively owns The Doge NFT with $DOG";
  const TWITTER_USERNAME = "ownthedoge";
  const SOCIAL_CARD_URL = "https://ownthedoge.com/images/kabosu.png";
  const URL = "https://ownthedoge.com";
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} key="desc" />
        <meta property="og:site_name" content={TITLE} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={SOCIAL_CARD_URL} />
        <meta property="og:url" content={URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={SOCIAL_CARD_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_USERNAME} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
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
        <Marquee speed={55} pauseOnHover gradient={false}>
          <div
            className={css(
              "font-bold",
              "bg-pixels-yellow-100",
              "text-pixels-yellow-400",
              "text-xl",
              "pt-1"
            )}
          >
            <div>
              {" "}
              Own the Doge ... Own a piece of internet history ...{" "}
              <Link
                type={LinkType.Black}
                isExternal
                href={
                  "https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0xBAac2B4491727D78D2b78815144570b9f2Fe8899"
                }
              >
                Buy $DOG
              </Link>{" "}
              for very fun ...{" "}
              <Link
                type={LinkType.Black}
                isExternal
                href={"https://pixels.ownthedoge.com"}
              >
                Mint Doge Pixels
              </Link>{" "}
              for much wow ... Help guide where the Doge goes next in the{" "}
              <Link
                type={LinkType.Black}
                isExternal
                href={"https://dao.ownthedoge.com"}
              >
                Doge DAO
              </Link>{" "}
              ... Get a chance to{" "}
              <Link
                type={LinkType.Black}
                isExternal
                href={"https://meethedoge.com"}
              >
                Meet the Doge
              </Link>{" "}
              ...{" "}
            </div>
          </div>
        </Marquee>
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
