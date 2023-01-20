import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Comic_Neue } from "@next/font/google";
import { css } from "dsl/helpers/css";

const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
});

console.log(comicNeue);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={css(`${comicNeue.className}`, "grow", "flex", "flex-col")}>
      <Component {...pageProps} />
    </main>
  );
}
