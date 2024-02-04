import Head from "next/head";
import Link from "next/link";
import Image from "next/legacy/image";
import { postData } from "@/api/helper";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo, useContext, ChangeEvent } from "react";
import { setCookie } from "cookies-next";
import { Context_data } from "@/context";
import Header from "@/component/layout/header";
import style from "./styles/singin.module.sass";

import cityJson from "@/data/twCities.json";
import moment from "moment";

interface SingInPostObject {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  phone: string;
  birthday: string;
  zipcode: number;
  detail: string;
}
interface SingInSendPostObject {
  email: string;
  password: string;
  name: string;
  phone: string;
  birthday: string;
  address: { zipcode: number; detail: string };
}

interface Area {
  zip: string;
  name: string;
}

const monthNames = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
export default function SingIn() {
  const isDevelop: Boolean = process.env.NODE_ENV === "development";
  const router = useRouter();
  const { setAuthToken, setAccount } = useContext(Context_data);
  const [stopSubmitBtm, setStopSubmitBtm] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [selectCityList, setSelectCityList] = useState<Area[]>([]);
  const [selectYearList, setSelectYearList] = useState<number[]>([]);
  const [selectDayList, setSelectDayList] = useState<number[]>([]);
  const [selectYear, setSelectYear] = useState<number>(2024);
  const [selectMonth, setSelectMonth] = useState<number>(1);
  const [selectDay, setSelectDay] = useState<number>(1);

  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [postObj, setPostObj] = useState<SingInPostObject>({
    email: isDevelop ? "" : "",
    password: isDevelop ? "" : "",
    passwordCheck: isDevelop ? "" : "",
    name: "",
    phone: "",
    birthday: "",
    zipcode: 0,
    detail: "",
  });

  useEffect(() => {
    populateYearDropdown();
    populateDateDropdown(selectYear, selectMonth);
  }, []);

  useMemo(() => {
    if (postObj.password.trim() === "" || postObj.passwordCheck.trim() === "")
      return setCheckPassword(false);
    postObj.password === postObj.passwordCheck
      ? setCheckPassword(true)
      : setCheckPassword(false);
  }, [postObj.password, postObj.passwordCheck]);

  function populateYearDropdown() {
    const currentYear = new Date().getFullYear();
    let array: number[] = [];
    //Loop and add the Year values to DropDownList.
    for (let i = currentYear; i >= 1900; i--) {
      array.push(i);
    }
    setSelectYearList(array);
  }

  function populateDateDropdown(year: number, month: number) {
    let array: number[] = [];
    //get the last day, so the number of days in that month
    const days = new Date(year, month, 0).getDate();

    //lets create the days of that month
    for (let d = 1; d <= days; d++) {
      array.push(d);
    }
    setSelectDayList(array);
  }
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

  function handleChangeForSelect(event: ChangeEvent<HTMLSelectElement>): void {
    event.stopPropagation();
    let obj = { ...postObj };
    const name = event.target.name;
    let value = event.target.value;

    setPostObj({ ...obj, [name]: value });
  }
  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    const area = cityJson.filter((item) => item.name === value)[0]?.districts;
    setSelectCityList(area);
  }

  function handleClickStep1Btn(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    if (checkPassword) {
      setStep(2);
    } else {
      alert("密碼欄位與確認密碼欄位兩者不一致");
    }
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.stopPropagation();
    event.preventDefault();
    setStopSubmitBtm(false);
    const submitObj: SingInSendPostObject = {
      email: postObj.email,
      password: postObj.password,
      name: postObj.name,
      phone: postObj.phone,
      birthday: `${selectYear}/${selectMonth}/${selectDay}`,
      address: { zipcode: postObj.zipcode, detail: postObj.detail },
    };
    console.log("submitObj", submitObj);
    try {
      const res = await postData("/api/v1/user/signup", submitObj);
      console.log("res:", res);
      if (res.status) {
        setCookie("hotel", res.token, {
          expires: new Date(moment().add(1, "hours").format()),
        });
        setAuthToken(res.token);
        setAccount(res.result);
        alert("註冊成功");
        // setPostObj({ email: "", password: "" });
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
        <title>旅館網站|註冊</title>
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
            {step === 1 && (
              <div className={style["sub-title"]}>享樂酒店，誠摯歡迎</div>
            )}
            <h1 className={style.title}>立即註冊</h1>
            <div className={style["step-frame"]}>
              <div className={`${style["step-item"]} ${style.active}`}>
                <div className={style["step-num"]}>{step > 1 ? "V" : "1"}</div>
                輸入信箱及密碼
              </div>
              <div className={style["step-hr"]}></div>
              <div
                className={`${style["step-item"]} ${
                  step === 2 ? style.active : style.default
                }`}
              >
                <div className={style["step-num"]}>
                  {step === 2 ? "2" : "2"}
                </div>
                填寫基本資料
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className={style["form-row"]}>
                    <label htmlFor="login-email">電子信箱</label>
                    <input
                      id="login-email"
                      type="email"
                      name="email"
                      placeholder="hello@exsample.com"
                      value={postObj.email}
                      onChange={(event) => handleChange(event)}
                      autoCapitalize="off"
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
                      autoCapitalize="off"
                      required
                    />
                  </div>
                  <div className={style["form-row"]}>
                    <label htmlFor="login-passwordCheck">確認密碼</label>
                    <input
                      id="login-passwordCheck"
                      type="password"
                      name="passwordCheck"
                      placeholder="請再輸入一次密碼"
                      value={postObj.passwordCheck}
                      onChange={(event) => handleChange(event)}
                      autoCapitalize="off"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className={`${style["main-btn"]} ${
                      checkPassword ? style.active : ""
                    }`}
                    onClick={(event) => handleClickStep1Btn(event)}
                  >
                    下一步
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <div className={style["form-row"]}>
                    <label htmlFor="login-name">姓名</label>
                    <input
                      id="login-name"
                      type="text"
                      name="name"
                      placeholder="請輸入姓名"
                      value={postObj.name}
                      onChange={(event) => handleChange(event)}
                      autoCapitalize="off"
                      required
                    />
                  </div>
                  <div className={style["form-row"]}>
                    <label htmlFor="login-phone">手機號碼</label>
                    <input
                      id="login-phone"
                      type="tel"
                      name="phone"
                      placeholder="請輸入手機號碼"
                      value={postObj.phone}
                      onChange={(event) => handleChange(event)}
                      autoCapitalize="off"
                      required
                    />
                  </div>
                  <div className={style["form-row"]}>
                    <label htmlFor="login-birthday">生日</label>
                    <div className={style["column-3"]}>
                      <select
                        name="year"
                        id=""
                        defaultValue={`${selectYear}`}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                          event.stopPropagation();
                          setSelectYear(Number(event.target.value));
                          populateDateDropdown(
                            Number(event.target.value),
                            selectMonth
                          );
                        }}
                        required
                      >
                        <option value="" disabled>
                          請選擇
                        </option>
                        {selectYearList.map((year) => (
                          <option key={year} value={year}>
                            {year}年
                          </option>
                        ))}
                      </select>
                      <select
                        name="month"
                        id=""
                        defaultValue={selectMonth}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                          event.stopPropagation();
                          setSelectMonth(Number(event.target.value));
                          populateDateDropdown(
                            selectYear,
                            Number(event.target.value)
                          );
                        }}
                        required
                      >
                        <option value="" disabled>
                          請選擇
                        </option>
                        {monthNames.map((month, key) => (
                          <option key={month} value={key + 1}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        name="day"
                        id=""
                        defaultValue={selectDay}
                        required
                      >
                        <option value="" disabled>
                          請選擇
                        </option>

                        {selectDayList.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={style["form-row"]}>
                    <label htmlFor="login-address">地址</label>
                    <div className={style["column-2"]}>
                      <select
                        name="city"
                        id="city"
                        onChange={(event) => handleSelectCity(event)}
                        required
                      >
                        <option value="">請選擇</option>
                        {cityJson.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <select
                        name="zipcode"
                        id=""
                        onChange={(event) => handleChangeForSelect(event)}
                        required
                      >
                        <option value="">請選擇</option>
                        {selectCityList.map((item) => (
                          <option key={item.name} value={item.zip}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      id="login-address-detail"
                      type="text"
                      name="detail"
                      placeholder="請輸入詳細地址"
                      value={postObj.detail}
                      onChange={(event) => handleChange(event)}
                      autoCapitalize="off"
                      required
                    />
                  </div>
                  <div>
                    <div className={style["form-check-wrap"]}>
                      <input
                        type="checkbox"
                        name="isAgree"
                        id="login-isAgree"
                        checked={isAgree}
                        onChange={(
                          event: React.FormEvent<HTMLInputElement>
                        ): void => {
                          event.stopPropagation();
                          setIsAgree((state) => {
                            if (!state) setStopSubmitBtm(true);
                            if (state) setStopSubmitBtm(false);
                            return !state;
                          });
                        }}
                        required
                      />

                      <label htmlFor="login-isAgree">
                        我已閱讀並同意本網站個資使用規範
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`${style["main-btn"]} ${
                      stopSubmitBtm ? style.active : ""
                    }`}
                    disabled={!stopSubmitBtm}
                  >
                    完成登入
                  </button>
                </>
              )}
              <div className={style[""]}>
                <span className={style["text-white"]}>已經有會員了嗎？</span>
                <Link href={"/member/login/"} className={style["link-style"]}>
                  前往登入
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
