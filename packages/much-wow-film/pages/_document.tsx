import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Something is coming." key="desc" />
        <meta property="og:site_name" content="Much Wow Film" />
        <meta property="og:title" content="Much Wow Film" />
        <meta property="og:description" content="Something is coming." />
        <meta
          property="og:image"
          content="https://muchwowfilm.com/images/twitter-card.png"
        />
        <meta property="og:url" content="https://muchwowfilm.com" />
        <meta name="twitter:title" content="Meet The Doge" />
        <meta name="twitter:description" content="Something is coming." />
        <meta
          name="twitter:image"
          content="https://muchwowfilm.com/images/twitter-card.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
