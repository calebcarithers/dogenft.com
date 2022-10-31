import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import "dsl/styles/globals.css";
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../styles/globals.css';

const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps) {
  return <>
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
