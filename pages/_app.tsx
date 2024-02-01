// import "@/styles/globals.css";
import Head from "next/head";
import LayoutIndex from "@/component/layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>旅館網站</title>
        <meta name="description" content="旅館,訂房" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutIndex>
        <Component {...pageProps} />
      </LayoutIndex>
    </>
  );
}
