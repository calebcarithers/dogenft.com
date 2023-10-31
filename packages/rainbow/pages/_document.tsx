import { css } from "dsl/helpers/css";
import { Head, Html, Main, NextScript } from "next/document";

export const toastifyPortalId = "react-toastify-portal";

export default function Document() {
  return (
    <Html>
      <Head title={"Bronze The Doge"}>
        <meta
          name="description"
          content="The statue is coming to Japan, 2nd of November 2023."
          key="desc"
        />
        <meta property="og:site_name" content="Bronze The Doge" />
        <meta property="og:title" content="Bronze The Doge" />
        <meta
          property="og:description"
          content="The statue is coming to Japan, 2nd of November 2023."
        />
        <meta
          property="og:image"
          content="https://bronzethedoge.xyz/images/twitter-card.png"
        />
        <meta property="og:url" content="https://bronzethedoge.xyz" />
        <meta name="twitter:title" content="Bronze The Doge" />
        <meta
          name="twitter:description"
          content="The statue is coming to Japan, 2nd of November 2023."
        />
        <meta
          name="twitter:image"
          content="https://bronzethedoge.xyz/images/twitter-card.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bronzethedoge" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
