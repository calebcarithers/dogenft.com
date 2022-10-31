import type { AppProps } from 'next/app';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <ToastContainer position={"bottom-center"} closeOnClick/>
  </>
}

export default MyApp
