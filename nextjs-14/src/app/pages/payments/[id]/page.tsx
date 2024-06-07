"use client";

import axios from "axios";
import { savePayment } from "@/app/components/payment/service/payment-service";
import { IUser } from "@/app/components/user/model/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findUserById,
  updateUserBalance,
} from "@/app/components/user/service/user-service";
import { getUserById } from "@/app/components/user/service/user-slice";
import { parseCookies } from "nookies";
import { IPayment } from "@/app/components/payment/model/payment";
import { jwtDecode } from "jwt-decode";
import { PG } from "@/app/components/common/enums/PG";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateUserBalanceAPI } from "@/app/components/user/service/user-api";

declare global {
  interface Window {
    IMP: any;
  }
}

export default function Payment({ params }: any) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();
  const user: IUser = useSelector(getUserById);
  const token = parseCookies().accessToken;
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.accessToken;

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("User id in Payment: " + decoded.id);
        dispatch(findUserById(decoded.id));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("Token is missing");
    }

    if (user.id) {
      fetch(`http://localhost:8080/api/users/detail?id=${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("MY-INFO: data: " + JSON.stringify(data));
        })
        .catch((error) => console.log("error: ", error));
    }
  }, [dispatch, user?.id]);

  const requestPay = async (chargeAmount: number) => {
    setAmount(chargeAmount);
    const confirmMessage = `결제할 금액은 ${chargeAmount}원 입니다. 계속 진행하시겠습니까?`;
    const isConfirmed = window.confirm(confirmMessage);
    window.IMP.init("imp78717406");
    if (!window.IMP) {
      console.error("IMP is not loaded");
      return;
    }

    if (isConfirmed) {
      window.IMP.init("imp78717406");
      if (!window.IMP) {
        console.error("IMP is not loaded");
        return;
      }

      window.IMP.request_pay(
        {
          id: user.id,
          pg: "html5_inicis",
          pay_method: "card",
          orderUid: new Date().getTime().toString(),
          item_name: "충전 포인트",
          amount: amount,
          buyer_name: user.name,
          buyer_email: user.email,
          buyer_tel: user.phone,
          buyer_addr: user.addressId,
        },
        async (rsp: any) => {
          if (rsp.success) {
            console.log(rsp.imp_uid);
            const token = parseCookies().accessToken;
            confirm("결제가 완료되었습니다.");

            // 서버로 결제 데이터 전송
            const paymentData: IPayment = {
              payment_uid: rsp.imp_uid,
              item_name: "충전 포인트",
              amount: chargeAmount,
              buyer_name: user.name,
              buyer_email: user.email,
              buyer_tel: user.phone,
              buyer_addr: user.addressId,
            };

            dispatch(savePayment(paymentData));
            const { data } = await axios.post(
              `http://localhost:8080/api/payment/verifyIamport/${rsp.imp_uid}`,
              rsp,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const calculateNewBalance = (
              currentBalance: number,
              chargeAmount: number
            ): number => {
              return currentBalance + chargeAmount;
            };
            const newBalanceAmount: number = calculateNewBalance(
              Number(user.balance) ?? 0,
              chargeAmount
            );

            //서버로 업데이트된 결제 잔액 전송
            const newBalance: IUser = {
              ...user,
              id: user.id,
              balance: newBalanceAmount.toString(),
            };

            const response = await axios.put(
              `http://localhost:8080/api/users/modifyBalance`,
              newBalance,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setTransactions([
              ...transactions,
              {
                id: rsp.imp_uid,
                amount: chargeAmount,
                date: new Date().toLocaleString(),
              },
            ]);
          } else {
            console.log("Payment failed", rsp.error_msg);
            confirm("결제가 실패하였습니다.");
          }
        }
      );
    } else {
      // 사용자가 확인하지 않은 경우 처리
      console.log("결제가 취소되었습니다.");
    }
  };

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  useEffect(() => {
    const loadScript = (src: any, callback: any) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    };
    loadScript("https://code.jquery.com/jquery-1.12.4.min.js", () => {
      loadScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js", () => {
        const IMP = window.IMP;
        document.addEventListener("DOMContentLoaded", () => {
          const payment_uid = "O" + new Date().getTime();
          const totalPriceElement = document.getElementById("totalPrice");
          const totalPrice = totalPriceElement
            ? totalPriceElement.innerText
            : "";
          fetch(`http://localhost:8080/api/payment/status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payment_uid: payment_uid,
              amount: totalPrice,
            }),
          });
        });
      });
    });
    return () => {
      const scripts = document.querySelectorAll('script[src^="https://"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <>
      <div className="flex justify-center h-screen w-full pb-20">
        <form className="pl-9 pr-9 mt-20 w-2/5 flex bg-white rounded-[3.5vh] shadow-2xl overflow-y-auto">
          <div className="w-full p-[8.5vh] justify-center items-center">
            <p className="text-2xl text-black text-center mb-10 font-bold">My 0rder</p>{" "}
            <p className="text-xl font-bold text-gray-700 mt-14">Order info</p>
            <div className="mt-6 w-[20vh] h-[20vh] grid grid-cols-2 gap-x-4 gap-y-2">
              <p className="text-gray-700 font-bold">Balance</p>
              <p>{user?.balance} pt</p>
            </div>
            {!showProfile && (
              <span
                className="text-white shadow-md hover:bg-gray-100 h-[6vh] bg-black w-36 rounded-2xl items-center justify-center flex cursor-pointer"
                onClick={() => setShowProfile(true)}
              >
                Charge Point
              </span>
            )}
            {showProfile && (
              <div className="flex items-center">
                <div>
                  <div className="text-gray-700 text-lg mt-6">
                    충전할 포인트를 입력하세요.
                  </div>
                  <div className="pt-5 flex">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                      className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
                      placeholder="결제 금액을 입력하세요"
                    />
                  </div>
                  <span
                    className="text-white shadow-md hover:bg-gray-100 h-[6vh] bg-black w-36 rounded-2xl items-center justify-center flex cursor-pointer mt-4"
                    onClick={() => requestPay(amount)}
                  >
                    Confirm
                  </span>
                </div>
              </div>
            )}
            {/* <p className="text-xs text-blue-500 mt-2 mb-6">
              Current Balance: {user?.balance} pt
            </p> */}
          </div>
        </form>
      </div>
    </>
  );
}
