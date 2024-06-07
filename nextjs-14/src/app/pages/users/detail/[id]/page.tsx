"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "@/app/components/user/service/user-slice";
import {
  findUserById,
  updateUser,
  deleteUser,
} from "@/app/components/user/service/user-service";
import { IUser } from "@/app/components/user/model/user";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { PG } from "@/app/components/common/enums/PG";

export default function UserDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = parseCookies().accessToken;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();
  const user: IUser = useSelector(getUserById);

  useEffect(() => {
    const decoded: any = jwtDecode(token);
    if (token !== "") {
      console.log("user id in Mypage : " + decoded.id);
      fetch(`http://localhost:8080/api/users/detail?id=${user?.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parseCookies().accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("MY-INFO: data: " + JSON.stringify(data));
          reset(data);
        })
        .catch((error) => console.log("error: ", error));
    } else {
      console.log("user id is " + user.id);
    }
  }, [dispatch, reset, user?.id]);

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    try {
      dispatch(updateUser(data) as any); //TODO check this
      alert("Update success.");
    } catch (error) {
      console.error(error);
      alert("Update failed.");
    }
  };

  const deleteHandler = () => {
    if (user.id) {
      if (confirm("Are you sure you want to delete your account?")) {
        dispatch(deleteUser(user.id))
          .then((res: any) =>
            res.payload.status === 200
              ? alert("Delete failed")
              : alert("Delete success")
          )
          .catch((error: any) => alert("Delete failed"))
          .finally(() => router.push(`/`));
      }
    }
  };

  const payHandler = () => {
    router.push(`${PG.PAY}/${user.id}`);
  };

  return (
    <div className="flex justify-center h-screen w-full px-5 sm:px-0 pb-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pl-9 pr-9 mt-28 w-4/5 flex bg-white rounded-[3.5vh] shadow-2xl overflow-y-auto"
      >
        <div className="w-full p-[8.5vh] justify-center items-center">
          <p className="text-2xl text-black text-center mb-10 font-bold">My Page</p>{" "}
          <p className="text-gray-700 text-lg mt-10 mb-14">
            Welcome, {user?.name || ""}
          </p>
          <p className="text-xl font-bold text-gray-700 mt-14">User info</p>
          <div className="mt-6 w-full grid grid-cols-2 mb-10 gap-y-7">
            <div>
              <p className="text-gray-700 font-bold">Username</p>
              <p>{user?.username || ""}</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">Name</p>
              <p>{user?.name || ""}</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">Phone</p>
              <p>{user?.phone || ""}</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">Email</p>
              <p>{user?.email || ""}</p>
            </div>
          </div>
          <div className="flex w-full">
            <span className="font-bold cursor-pointer" onClick={payHandler}>
              My Order →
            </span>
          </div>
          <p className="text-xl font-bold text-gray-700 mt-16">Update info</p>
          <div className="mt-6 mb-4">
            <label className="block text-gray-700 text-sm mb-2">Username</label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 bg-gray-200 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-none"
              value={user && user.username ? user.username : ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              type="password"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("password")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("email")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Name</label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 bg-gray-200 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-none"
              value={user?.name || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Phone</label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("phone")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Job</label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("job")}
            />
          </div>
          <div className="flex justify-between mt-10">
            <button
              type="submit"
              className="static text-white shadow-md hover:bg-gray-100 h-11 bg-black w-36 rounded-3xl"
            >
              Save changes
            </button>
          </div>
          <button
            type="button"
            onClick={deleteHandler}
            className="relative text-xs text-gray-500 text-center w-full"
          >
            Delete account
          </button>
          <svg className="h-20"> </svg>
        </div>
      </form>
    </div>
  );
}
