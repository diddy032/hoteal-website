import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/component/layout/header";
import style from "./styles/login.module.sass";

export default function Login() {
  return (
    <>
      <Header showNav={false} />
      <div className={style.container}>
        <div className={style["image-frame"]}>
          <Image
            priority={true}
            alt="會員圖片"
            src="/images/member/register.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className={style["form-frame"]}>
          <div className={style["image-desc"]}>
            {/* <img src="/images/home/line2.png" alt="裝飾圖" /> */}
          </div>
          <div className={style["content"]}>
            <div className={style["sub-title"]}>享樂酒店，誠摯歡迎</div>
            <h1 className={style.title}>立即開始旅程</h1>
            <form>
              <div className={style["form-row"]}>
                <label htmlFor="">電子信箱</label>
                <input type="email" placeholder="hello@exsample.com" />
              </div>
              <div className={style["form-row"]}>
                <label htmlFor="">密碼</label>
                <input type="password" placeholder="請輸入密碼" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className={style["form-check-wrap"]}>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">記住帳號</label>
                </div>

                <Link href={"/"} className={style["link-style"]}>
                  忘記密碼？
                </Link>
              </div>
              <button type="submit" className={style["main-btn"]}>
                會員登入
              </button>

              <div className={style[""]}>
                <span className={style["text-white"]}>沒有會員嗎？</span>
                <Link href={"/member/singIn/"} className={style["link-style"]}>
                  前往註冊
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
