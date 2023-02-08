import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  const description = "Win IRL Doge relics by donating Dogecoin to charity.";
  const name = "dogecouch.house";
  const twitterCardUrl = "https://dogecouch.house/images/twitter-card.png";
  const url = "https://dogecouch.house";
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content={description} key="desc" />
        <meta property="og:site_name" content={name} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={twitterCardUrl} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={twitterCardUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
