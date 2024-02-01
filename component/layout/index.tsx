import React from "react";
import Footer from "./footer";
import Header from "./header";

export default function LayoutIndex(props: any) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
