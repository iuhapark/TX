"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PG } from "@/app/components/common/enums/PG";
import { getUserById } from "@/app/components/user/service/user-slice";
import { IUser } from "@/app/components/user/model/user";
import { findUserById } from "@/app/components/user/service/user-service";
import { parseCookies } from "nookies";
import { IPayment } from "@/app/components/payment/model/payment";
import { getPaymentById } from "@/app/components/payment/service/payment-slice";

// const User = ({ params }: any) => {
//   const dispatch = useDispatch();
//   const user: IUser = useSelector(getUserById);

//   useEffect(() => {
//     dispatch(findUserById(params.id));
//   }, [dispatch, params.id]);
// }

export function Menu() {
  return (
    <nav className="menu">

      <ul>
        <li>
          <a href={`${PG.BOARD}/list`}>변호사</a>
        </li>
        <li>
          <a href={`${PG.BOARD}/list`}>판례</a>
        </li>
        <li>
          <a href={`${PG.BOARD}/list`}>뉴스</a>
        </li>
        <li>
          <a href={`${PG.PAY}/${1}`}>결제</a>
        </li>
        <li>
          <a href={`${PG.ITEM}/${1}`}>상담</a>
        </li>
        <li>
          <a href={`${PG.BOARD}/list`}>게시판</a>
        </li>
      </ul>
    </nav>
  );
}
