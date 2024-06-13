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
import { useForm } from "react-hook-form";
import DropdownMenu from "@/app/components/common/module/dropdown";
import { IProduct } from "@/app/components/product/model/product";
import { getProductById } from "@/app/components/product/service/product-slice";

declare global {
  interface Window {
    IMP: any;
  }
}

export default function Product() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
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
  const product: IProduct = useSelector(getProductById);
  const token = parseCookies().accessToken;
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/product/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Products data is not an array", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    loadProducts();
  }, [token]);

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
          name: product?.item_name,
          amount: price,
          buyer_name: user.name,
          buyer_email: user.email,
          buyer_tel: user.phone,
        },
        async (rsp: any) => {
          if (rsp.success) {
            console.log(rsp.imp_uid);
            const token = parseCookies().accessToken;
            confirm("결제가 완료되었습니다.");

            // 서버로 결제 데이터 전송
            const paymentData: IPayment = {
              payment_uid: rsp.imp_uid,
              item_name: product.item_name,
              amount: productPrice,
              buyer_name: user.name,
              buyer_email: user.email,
              buyer_tel: user.phone,
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
            confirm("결제가 실패했습니다.");
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

  const handlePointUsage = async () => {
    if (price > 0) {
      if (Number(user.balance) >= price) {
        const newBalance = Number(user.balance) - price;

        try {
          const response = await axios.put(
            `http://localhost:8080/api/users/modifyBalance`,
            {
              ...user,
              balance: newBalance.toString(),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            // 사용자 정보를 업데이트하기 위해 Redux에 dispatch
            dispatch(updateUserBalance(newBalance.toString()));

            alert("결제가 완료되었습니다.");
          } else {
            console.error("Failed to update balance on the server");
            alert("결제가 실패했습니다. 다시 시도해주세요.");
          }
        } catch (error) {
          console.error("Error occurred while updating balance:", error);
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        alert("잔액이 부족합니다. 결제를 진행할 수 없습니다.");
      }
    } else {
      alert("상품을 선택해주세요.");
    }
  };

  const handleProductSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedProductId = Number(event.target.value);
    const selectedProduct = products.find(
      (product) => product.id === selectedProductId
    );
    if (selectedProduct) {
      setSelectedProductId(selectedProductId);
      setPrice(selectedProduct.price);
    }
  };

  const getImageForProduct = (productId: number): string => {
    if (productId === 1) {
      return "/img/call.jpg";
    } else if (productId === 2) {
      return "/img/video-call.jpeg";
    } else if (productId === 3) {
      return "/img/meet-up.jpg";
    } else {
      return "/img/call.jpg";
    }
  };

  return (
    <>
      <div className="flex justify-center h-screen w-full px-5 sm:px-0">
        <div className="mt-28 w-[90vh] h-[67vh] flex">
          <div className="w-full pt-[8.5vh] justify-center items-center">
            <div className="mt-6 mb-8 pl-12 text-2xl dark:text-white">
              상담 항목을 선택하세요.
            </div>
            <div className="flex justify-start pl-12 gap-5">
              {products.length === 0 ? (
                <p className="mt-10">상품이 존재하지 않습니다.</p>
              ) : (
                products.map((product) => (
                  <label
                    key={product.id}
                    className="w-[24vh] h-[48.2vh] shadow-2xl hover:relative inline-flex items-end justify-center text-center p-7 mb-2 me-2 overflow-hidden text-sm font-medium text-black-700 rounded-[3.5vh] hover:text-white hover:shadow-lg hover:bg-gradient-to-br from-whie-100 to-gray-100 cursor-pointer"
                    style={{
                      backgroundImage: `url(${getImageForProduct(product.id)})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <input
                      type="radio"
                      name="product"
                      value={product.id} 
                      onChange={handleProductSelect}
                      className="h-4 w-4 cursor-pointer"
                      // className="absolute opacity-0 h-0 w-0 cursor-pointer"
                    />
                    <br />
                    {product.item_name} <br />
                    {product.duration} <br />
                    {product.price}pt
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="mt-28 w-[47vh] h-[67vh] flex shadow-none">
          <div className="w-full p-[8.5vh] justify-center items-center">
            <div className="mt-6 mb-8 text-2xl dark:text-white">
              변호사를 선택하세요.
            </div>
            <DropdownMenu />
            <div className="flex flex-col mt-10">
              <div className="mt-4 grid grid-cols-2 grid-rows-2">
                <p className="text-[18px] mb-2 dark:text-white">
                  잔액 {user?.balance} 포인트
                </p>
              </div>
              <div className="flex gap-5 justify-end mt-5">
                <button
                  className="mt-40 hover:bg-blue-400 items-center justify-center flex"
                  onClick={() => requestPay(price)}
                >
                  Pay
                </button>
                <button
                  className="mt-40 hover:bg-blue-400 items-center justify-center flex"
                  onClick={handlePointUsage}
                >
                  Use point
                </button>
              </div>
              <svg className="h-20"> </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
