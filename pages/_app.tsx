import Head from "next/head";
import LayoutIndex from "@/component/layout";
import type { AppProps } from "next/app";
import "normalize.css";
import "@/styles/globals.sass";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>旅館網站</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="旅館,訂房" />
        <meta name="key" content="旅館,訂房" />
        <meta property="og:title" content="旅館網站" />
        <meta property="og:description" content="旅館,訂房" />
        <meta property="og:image" content="" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutIndex>
        <Component {...pageProps} />
      </LayoutIndex>
    </>
  );
}
