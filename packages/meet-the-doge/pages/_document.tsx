import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Your chance to meet Kabosu in her hometown."
          key="desc"
        />
        <meta property="og:site_name" content="Meet The Doge" />
        <meta property="og:title" content="Meet The Doge" />
        <meta
          property="og:description"
          content="Your chance to meet Kabosu in her hometown."
        />
        <meta
          property="og:image"
          content="https://meethedoge.com/images/twitter-card.png"
        />
        <meta property="og:url" content="https://meethedoge.com" />
        <meta name="twitter:title" content="Meet The Doge" />
        <meta
          name="twitter:description"
          content="Your chance to meet Kabosu in her hometown."
        />
        <meta
          name="twitter:image"
          content="https://meethedoge.com/images/twitter-card.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content="@bronzethedoge" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
