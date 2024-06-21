"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  existsEmail,
  login,
} from "@/app/components/user/service/user-service";
import { IUser } from "@/app/components/user/model/user";
import nookies, { parseCookies, destroyCookie, setCookie } from "nookies";
import {
  getAuth,
  getExistsEmail,
} from "@/app/components/user/service/user-slice";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const formRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState({} as IUser); //하나의 instance로 만듬
  const [isTrueEmail, setIsTrueEmail] = useState(false);
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [beforeSubmit, setBeforeSubmit] = useState(true);
  const [len, setLen] = useState("");
  const [isWrongPw, setIsWrongPw] = useState(false);
  const existsEmailSelector = useSelector(getExistsEmail);

  //boolean type의 경우 is를 넣어줌
  const handleEmail = (e: any) => {
    const EMAIL_CHECK = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setLen(e.target.value);
    setBeforeSubmit(true);

    if (EMAIL_CHECK.test(len)) {
      setIsWrongEmail(false);
      setIsTrueEmail(true);
      setUser({
        ...user,
        email: e.target.value,
      });
      console.log("EMAIL_CHECK 내용 : " + JSON.stringify(user));
    } else {
      setIsWrongEmail(true);
      setIsTrueEmail(false);
    }
  };
  const handlePassword = (e: any) => {
    const PW_CHECK =
      /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?]{6,9}$/g;
    setLen(e.target.value);
    setBeforeSubmit(true);

    if (PW_CHECK.test(len)) {
      setIsWrongPw(false);
      setUser({
        ...user,
        password: e.target.value,
      });
    } else {
      setIsWrongPw(true);
    }
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("user ..." + JSON.stringify(user));
    dispatch(existsEmail(user.email))
      .then((res: any) => {
        console.log(res.payload);
        if (res.payload === true) {
          dispatch(login(user))
            .then((resp: any) => {
              console.log("서버에서 넘어온 RES" + JSON.stringify(resp));
              console.log("서버에서 넘어온 메시지 : " + resp.payload.message);
              console.log("서버에서 넘어온 토큰 : " + resp.payload.accessToken);
              setCookie({}, "message", resp.payload.message, {
                httpOnly: false,
                path: "/",
              });
              setCookie({}, "accessToken", resp.payload.accessToken, {
                httpOnly: false,
                path: "/",
              });
              console.log("서버에서 넘어온 메시지 " + parseCookies().message);
              console.log("서버에서 넘어온 토큰 " + parseCookies().accessToken);
              console.log("토큰을 디코딩한 내용: ");
              jwtDecode<any>(parseCookies().accessToken);
              router.push(`/`);
            })
            .catch((err: any) => {
              console.log("Login Failed");
            });
        } else {
          console.log("존재하지 않는 이메일입니다");
          setBeforeSubmit(false);
          setIsWrongEmail(false);
          setIsTrueEmail(false);
        }
      })
      .catch((err: any) => {
        console.log("catch 로직 err 발생 : " + `${err}`);
      })
      .finally(() => {
        console.log("최종적으로 반드시 수행되는 로직");
      });
    // dispatch(login(user))
    setBeforeSubmit(false);
    setIsWrongEmail(false);
    setIsTrueEmail(false);
    if (formRef.current) {
      formRef.current.value = "";
    }
  };

  return (
    <div className="flex justify-center h-screen w-full px-5 sm:px-0">
      <div className="mt-28 w-[73vh] h-[67vh] flex rounded-[3.5vh] shadow-2xl overflow-hidden">
        <div className="w-full p-[8.5vh] justify-center items-center">
          <p className="text-2xl text-black text-center font-bold">Sign in</p>
          <div className="mt-10">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              onChange={handleEmail}
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              type="email"
              required
            />
          </div>
          {isWrongEmail && len?.length > 1 && (
            <pre>
              <p className="font-sans text-red-500 text-sm">Invalid email</p>
            </pre>
          )}
          {isTrueEmail && len?.length > 1 && (
            <pre>
              <p className="font-sans text-blue-500 text-sm">Valid email.</p>
            </pre>
          )}

          <div className="mt-4">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              ref={formRef}
              onChange={handlePassword}
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              type="password"
            />
          </div>
          {isWrongPw && len?.length > 1 && (
            <pre>
              <p className="font-sans text-red-500 text-sm">
                Invalid password. Please try again.
              </p>
            </pre>
          )}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="static m-11 text-white shadow-md hover:bg-gray-100 h-11 bg-black w-36 rounded-3xl"
            >
              Login
            </button>
          </div>
          <div className="w-full text-center items-end">
            <Link
              href="#"
              className="text-xs text-blue-500 hover:text-gray-900 w-full mt-2"
            >
              Forget Password?
            </Link>
            <br />
            <Link
              href="/pages/users/join"
              className="text-xs text-gray-500 text-center w-full"
            >
              <span className="text-blue-500">Create account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
