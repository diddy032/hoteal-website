import Head from "next/head";
import type { AppProps } from "next/app";
import Context from "@/context";
import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { fetchDataForToken } from "@/api/helper";

import "normalize.css";
import "@/styles/globals.sass";

export default function App({ Component, pageProps }: AppProps) {
  const [authToken, setAuthToken] = useState<string>("");
  const [account, setAccount] = useState<{}>({});
  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const haveToken = getCookie("hotel");
    if (haveToken) {
      let obj = await fetchDataForToken("/api/v1/user/check", haveToken);
      if (!obj?.status) !obj?.status && deleteCookie("hotel");
      if (obj?.status) setAuthToken(haveToken);
    }
  }

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
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;300;400;500;600;700;900&display=swap');
        </style>
      </Head>
      <Context authTokenProps={authToken}>
        <Component {...pageProps} />
      </Context>
    </>
  );
}
