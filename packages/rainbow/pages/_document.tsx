import { Head, Html, Main, NextScript } from 'next/document';


export const toastifyPortalId = "react-toastify-portal"

export default function Document() {
  return (
    <Html>
      <Head title={"Bronze The Doge"}>
        <meta
          name="description"
          content="Help us raise funds to build Kabosu a statue in Japan."
          key="desc"
        />
        <meta property="og:site_name" content="Bronze The Doge"/>
        <meta property="og:title" content="Bronze The Doge"/>
        <meta property="og:description" content="Help us raise funds to build Kabosu a statue in Japan."/>
        <meta property="og:image" content="https://bronzethedoge.xyz/images/twitter-card.png"/>
        <meta property="og:url" content="https://bronzethedoge.xyz"/>
        <meta name="twitter:title" content="Bronze The Doge"/>
        <meta name="twitter:description" content="Help us raise funds to build Kabosu a statue in Japan."/>
        <meta name="twitter:image" content="https://bronzethedoge.xyz/images/twitter-card.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@bronzethedoge"/>
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}
