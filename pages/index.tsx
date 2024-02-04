import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

import Header from "@/component/layout/header";
import Footer from "@/component/layout/footer";

export default function Home() {
  useEffect(() => {
    // getData();
  }, []);

  function getData() {
    fetch("https://freyja-jvax.onrender.com/api/v1/home/news", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        // { status: 'true', result: [{...}] }
        console.log(res);
      });
  }

  return (
    <>
      <Header />
      首頁
      <Footer />
    </>
  );
}
