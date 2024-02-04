import Head from "next/head";
import Link from "next/link";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { postData } from "@/api/helper";
import { useEffect, useState, useMemo, useContext, ChangeEvent } from "react";
import { setCookie } from "cookies-next";
import { Context_data } from "@/context";

import Header from "@/component/layout/header";
import style from "./styles/login.module.sass";
import moment from "moment";

interface LoginPostObject {
  email: string;
  password: string;
}

export default function Login() {
  const isDevelop: Boolean = process.env.NODE_ENV === "development";
  const router = useRouter();
  const { setAuthToken, setAccount } = useContext(Context_data);

  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [stopSubmitBtm, setStopSubmitBtm] = useState<boolean>(false);
  const [postObj, setPostObj] = useState<LoginPostObject>({
    email: isDevelop ? "wowzeroz@gmail.com" : "",
    password: isDevelop ? "12345678aa" : "",
  });

  useMemo(() => {
    handleCheckBtnSubmit();
  }, [postObj]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    event.stopPropagation();
    let obj = { ...postObj };
    const name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setPostObj({ ...obj, [name]: value });
  }

  function handleCheckBtnSubmit(): void {
    const check = Object.values(postObj).every((v) => v.length > 0);
    setStopSubmitBtm(check);
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.stopPropagation();
    event.preventDefault();
    setStopSubmitBtm(false);
    console.log("hi");
    try {
      const res = await postData("/api/v1/user/login", postObj);
      // console.log("res:", res);
      if (res.status) {
        setCookie("hotel", res.token, {
          expires: new Date(moment().add(1, "hours").format()),
        });
        setAuthToken(res.token);
        setAccount(res.result);
        alert("登入成功");
        setPostObj({ email: "", password: "" });
        router.push("/");
      }
      setStopSubmitBtm(true);
    } catch (error: any) {
      const text: string = error?.response?.data?.message ?? "";
      alert(text);
      setStopSubmitBtm(true);
    }
  }

  return (
    <>
      <Head>
        <title>旅館網站|登入</title>
      </Head>
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
          <div className={style["image-desc"]}></div>
          <div className={style["content"]}>
            <div className={style["sub-title"]}>享樂酒店，誠摯歡迎</div>
            <h1 className={style.title}>立即開始旅程</h1>
            <form onSubmit={handleSubmit}>
              <div className={style["form-row"]}>
                <label htmlFor="login-email">電子信箱</label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="hello@exsample.com"
                  value={postObj.email}
                  onChange={(event) => handleChange(event)}
                  autoCapitalize={isRemember ? "none" : "off"}
                  required
                />
              </div>
              <div className={style["form-row"]}>
                <label htmlFor="login-password">密碼</label>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="請輸入密碼"
                  value={postObj.password}
                  onChange={(event) => handleChange(event)}
                  autoCapitalize={isRemember ? "none" : "off"}
                  required
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className={style["form-check-wrap"]}>
                  <input
                    type="checkbox"
                    name="remember"
                    id="login-remember"
                    checked={isRemember}
                    onChange={(
                      event: React.FormEvent<HTMLInputElement>
                    ): void => {
                      event.stopPropagation();
                      setIsRemember((state) => !state);
                    }}
                  />

                  <label htmlFor="login-remember">記住帳號</label>
                </div>

                <Link href={"/"} className={style["link-style"]}>
                  忘記密碼？
                </Link>
              </div>
              <button
                type="submit"
                className={`${style["main-btn"]} ${
                  stopSubmitBtm ? style.active : ""
                }`}
                disabled={!stopSubmitBtm}
              >
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
