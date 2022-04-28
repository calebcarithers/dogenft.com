import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HomeLayout from "../layouts/home.layout";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
