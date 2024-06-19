"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  existsUsername,
  login,
} from "@/app/components/user/service/user-service";
import { IUser } from "@/app/components/user/model/user";
import nookies, { parseCookies, destroyCookie, setCookie } from "nookies";
import {
  getAuth,
  getExistsUsername,
} from "@/app/components/user/service/user-slice";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const formRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState({} as IUser); //하나의 instance로 만듬
  const [isWrongId, setIsWrongId] = useState(false);
  const [isTrueId, setIsTrueId] = useState(false);
  const [beforeSubmit, setBeforeSubmit] = useState(true);
  const [len, setLen] = useState("");
  const [isWrongPw, setIsWrongPw] = useState(false);
  const existsUsernameSelector = useSelector(getExistsUsername);

  //boolean type의 경우 is를 넣어줌
  const handleUsername = (e: any) => {
    const ID_CHECK = /^[a-z][a-z0-9]{4,10}$/g;
    setLen(e.target.value);
    setBeforeSubmit(true);

    if (ID_CHECK.test(len)) {
      setIsWrongId(false);
      setIsTrueId(true);
      setUser({
        ...user,
        username: e.target.value,
      });
      console.log("ID_CHECK 내용 : " + JSON.stringify(user));
    } else {
      setIsWrongId(true);
      setIsTrueId(false);
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
    dispatch(existsUsername(user.username))
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
          console.log("아이디가 존재하지 않습니다");
          setBeforeSubmit(false);
          setIsWrongId(false);
          setIsTrueId(false);
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
    setIsWrongId(false);
    setIsTrueId(false);
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
            <label className="block text-gray-700 text-sm mb-2">
              Username
            </label>
            <input
              onChange={handleUsername}
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              type="username"
              required
            />
          </div>
          {isWrongId && len?.length > 1 && (
            <pre>
              <p className="font-sans text-red-500 text-sm">Invalid username</p>
            </pre>
          )}
          {isTrueId && len?.length > 1 && (
            <pre>
              <p className="font-sans text-blue-500 text-sm">Valid username.</p>
            </pre>
          )}
          {!beforeSubmit && !existsUsernameSelector && (
            <pre>
              <p className="font-sans text-red-500 text-sm">
                Username does not exist.
              </p>
            </pre>
          )}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm mb-2">
              Password
            </label>
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
