import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Script from "next/script";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { vars } from "../environment/vars";
import '../styles/globals.css';


const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps) {
  return <>
      <Script
            id={"gatag"}
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${vars.gaId}`}/>

      <Script id={"gatagsomethingelse"} strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${vars.gaId}');
              `}
        </Script>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <Component {...pageProps} />
    </QueryClientProvider>
    <ToastContainer 
    position={"bottom-center"} 
    autoClose={1500} 
    closeButton={<></>}
    />
  </>
}

export default MyApp
