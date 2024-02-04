import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import style from "./styles/header.module.sass";

interface HeaderProps {
  isTransparentBg?: boolean;
  showNav?: boolean;
}

export default function Header({
  isTransparentBg,
  showNav = true,
}: HeaderProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <>
      <div
        className={`${style.container} ${
          isTransparentBg ? style["ts-bg"] : ""
        }`}
      >
        <div className={style["logo-frame"]}>
          <Link href="/">
            <Image
              priority={true}
              width={110}
              height={40}
              alt="網站LOGO"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              src="/images/logo.png"
            />
          </Link>
        </div>
        <div
          className={`${style["nav-list-web"]} ${showNav ? "" : style.hidden}`}
        >
          <Link href="/" className={style["nav-item"]}>
            客房旅館
          </Link>
          <Link href="/member/login" className={style["nav-item"]}>
            會員登入
          </Link>
          <Link
            href="/"
            className={`${style["nav-item"]} ${style["btn-style"]}`}
          >
            立即訂房
          </Link>
        </div>
        <button
          type="button"
          className={style["nav-btn-mobile"]}
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          <Image
            src="/images/icons/icon_menu.svg"
            width={24}
            height={24}
            alt="開啟手機選單"
          />
        </button>
      </div>
      <div
        className={`${style["nav-mobile-frame"]} ${
          isOpenMenu ? style.active : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpenMenu(false)}
          className={style["nav-btn-mobile-close"]}
        >
          <Image
            src="/images/icons/icon_close.svg"
            width={48}
            height={48}
            alt="關閉手機選單"
          />
        </button>
        <div className={style["mobile-nav-list"]}>
          <Link href="/" className={style["nav-item"]}>
            客房旅館
          </Link>
          <Link href="/member/login" className={style["nav-item"]}>
            會員登入
          </Link>
          <Link
            href="/"
            className={`${style["nav-item"]} ${style["btn-style"]}`}
          >
            立即訂房
          </Link>
        </div>
      </div>
    </>
  );
}
