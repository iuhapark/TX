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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
    if (token !== "" && user?.id) {
      console.log("user id in Mypage : " + decoded.id);
      fetch(`http://localhost:8080/api/users/detail?id=${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parseCookies().accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          reset(data);
        })
        .catch((error) => console.log("error: ", error));
    } else {
      console.log("user id is " + user?.id);
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
          .finally(() => {
            destroyCookie(null, "accessToken");
            router.push(`/`);
          });
      }
    }
  };

  return (
    <div className="flex justify-center h-screen w-full px-5 sm:px-0 gap-10">
      <div className="mt-28 w-[54vh] h-[67vh] flex bg-white rounded-[3.5vh] shadow-2xl overflow-x-auto">
        <div className="w-full p-[8.5vh] justify-center items-center">
          <AccountCircleIcon sx={{ fontSize: 145 }} className="text-blue-400" />
          <p className="text-3xl font-bold text-gray-700 mb-20 mt-7">
            {user?.name || ""}
          </p>
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
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-28 w-[73vh] h-[67vh] flex bg-white rounded-[3.5vh] shadow-2xl overflow-hidden"
      >
        <div className="w-full p-[8.5vh] justify-center items-center overflow-y-auto">
          <p className="text-xl font-bold text-gray-700 mb-20">Update info</p>
          <div className="mb-4">
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
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="static  text-white shadow-md hover:bg-gray-100 h-11 bg-black w-36 rounded-3xl"
            >
              Save changes
            </button>
          </div>
          <button
            type="button"
            onClick={deleteHandler}
            className="static text-xs text-gray-500 text-center w-full"
          >
            Delete account
          </button>
        </div>
      </form>
    </div>
  );
}
