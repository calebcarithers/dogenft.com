import { Html, Head, Main, NextScript } from 'next/document'
import { css } from '../helpers/css'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className={css("bg-pixels-yellow-100", "font-ComicNeue", "p-3")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}