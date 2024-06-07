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
import { SubmitHandler, useForm } from "react-hook-form";
import DropdownMenu from "@/app/components/common/module/dropdown";

declare global {
  interface Window {
    IMP: any;
  }
}

export default function Product({ params }: any) {
  const dispatch = useDispatch();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [price, setPrice] = useState<number>(0);
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();
  const user: IUser = useSelector(getUserById);
  const token = parseCookies().accessToken;
  const [transactions, setTransactions] = useState<any[]>([]);

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

  const requestPay = async (productPrice: number) => {
    setPrice(productPrice);
    const confirmMessage = `결제할 금액은 ${productPrice}원 입니다. 계속 진행하시겠습니까?`;
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
          item_name: "product.item_name",
          amount: price,
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
              item_name: "product.item_name",
              amount: productPrice,
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
              productPrice: number
            ): number => {
              return currentBalance - productPrice;
            };
            const newBalancePrice: number = calculateNewBalance(
              Number(user.balance) ?? 0,
              productPrice
            );

            //서버로 업데이트된 결제 잔액 전송
            const newBalance: IUser = {
              ...user,
              id: user.id,
              balance: newBalancePrice.toString(),
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
                price: productPrice,
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
              price: totalPrice,
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

  const handleProductSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProductId(Number(event.target.value));
  };

  const handleFormSubmit = async () => {
    const products = {
      1: { id: 1, item_name: "전화 상담", price: 200, time: 15 },
      2: { id: 2, item_name: "영상 상담", price: 300, time: 30 },
      3: { id: 3, item_name: "대면 상담", price: 500, time: 30 },
    };

    const selectedProduct = products[selectedProductId!];

    if (!selectedProduct) {
      console.error("상품을 찾을 수 없습니다.");
      return;
    }

    await requestPay(selectedProduct.price);
  };

  return (
    <>
      <div className="flex justify-center h-screen w-full px-5 sm:px-0">
        <form className="mt-28 w-[73vh] h-[67vh] flex bg-white rounded-[3.5vh] shadow-2xl overflow-y-auto">
          <div className="w-full p-[8.5vh] justify-center items-center">
            <p className="text-2xl text-black text-center font-bold">Shop</p>{" "}
            <p className="text-xl font-bold text-gray-700 mt-14">Order info</p>
            <div className="mt-6 w-[20vh] h-[20vh] grid grid-cols-2 gap-x-4 gap-y-2">
              <p className="text-gray-700 font-bold">Balance</p>
              <p>{user?.balance} pt</p>
            </div>
            <p className="text-xl font-bold text-gray-700">Item</p>
            <div className="text-gray-700 text-lg mt-6">
              상담을 진행할 변호사를 선택하세요.
            </div>
            <div className="flex flex-col mt-4">
              <label>
                <input
                  type="radio"
                  name="product"
                  value="1"
                  onChange={handleProductSelect}
                />
                전화 상담 (200원)
              </label>
              <label>
                <input
                  type="radio"
                  name="product"
                  value="2"
                  onChange={handleProductSelect}
                />
                영상 상담 (300원)
              </label>
              <label>
                <input
                  type="radio"
                  name="product"
                  value="3"
                  onChange={handleProductSelect}
                />
                대면 상담 (500원)
              </label>
            </div>
            <div className="flex flex-col">
              <div className="pt-5 flex items-center justify-between">
                <DropdownMenu />
                <span
                  className="ml-4 text-white shadow-md hover:bg-gray-100 h-[6vh] bg-black w-36 rounded-2xl items-center justify-center flex cursor-pointer"
                  onClick={() => requestPay(price)} //TODO 변경
                >
                  선택
                </span>
              </div>
            </div>
            <p className="text-xs text-blue-500 mt-2 mb-6">
              Current Balance: {user?.balance} pt
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
