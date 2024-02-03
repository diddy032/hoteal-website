import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./styles/footer.module.sass";

export default function Footer() {
  return (
    <div className={style.container}>
      <div className={style["footer-body"]}>
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={196}
              height={72}
              alt="網站LOGO"
              priority
            />
          </Link>
          <div className={style["social-media-frame"]}>
            <a
              href="https://line.me/tw/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/icon_line.svg"
                width={24}
                height={24}
                alt="Link"
                priority
              />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/icon_Ig.svg"
                width={24}
                height={24}
                alt="Instagram"
                priority
              />
            </a>
          </div>
        </div>
        <div className={style["hotel-info-frame"]}>
          <div className={style["hotel-info-column"]}>
            <div className={style["hotel-info-item"]}>
              <div className={style["hotel-info-item-title"]}>TEL</div>
              <div>
                <a href="tel:+886-7-1234567">+886-7-1234567</a>
              </div>
            </div>
            <div className={style["hotel-info-item"]}>
              <div className={style["hotel-info-item-title"]}>FAX</div>
              <div>+886-7-1234567</div>
            </div>
          </div>
          <div className={style["hotel-info-column"]}>
            <div className={style["hotel-info-item"]}>
              <div className={style["hotel-info-item-title"]}>MAIL</div>
              <div>
                <a href="mailto: +elh@hexschool.com">+elh@hexschool.com</a>
              </div>
            </div>
            <div className={style["hotel-info-item"]}>
              <div className={style["hotel-info-item-title"]}>WEB</div>
              <div>
                <a
                  href="www.elhhexschool.com.tw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.elhhexschool.com.tw
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style["footer-bottom"]}>
        <div>806023 台灣高雄市新興區六角路123號</div>
        <div>© 享樂酒店 2023 All Rights Reserved.</div>
      </div>
    </div>
  );
}
