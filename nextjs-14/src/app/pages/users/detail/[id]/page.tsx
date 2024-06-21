"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "@/app/components/user/service/user-slice";
import {
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
      <div className="mt-28 w-[54vh] h-[67vh] flex rounded-[3.5vh] shadow-2xl overflow-x-auto">
        <div className="w-full p-[8.5vh] justify-center items-center">
          <AccountCircleIcon sx={{ fontSize: 145 }} className="text-blue-400" />
          <p className="text-3xl font-bold text-gray-700 dark:text-white mb-20 mt-7">
            {user?.name || ""}
          </p>
          <div className="mt-6 w-full grid grid-cols-2 mb-10 gap-y-7">
            <div>
              <p className="light:text-gray-700 dark:text-white font-bold">
                Email
              </p>
              <p className="dark:text-white">{user?.email || ""}</p>
            </div>
            <div>
              <p className="light:text-gray-700 dark:text-white font-bold">
                Name
              </p>
              <p className="dark:text-white">{user?.name || ""}</p>
            </div>
            <div>
              <p className="light:text-gray-700 dark:text-white font-bold">
                Phone
              </p>
              <p className="dark:text-white">{user?.phone || ""}</p>
            </div>
            <div>
              <p className="light:text-gray-700 dark:text-white font-bold">
                Age
              </p>
              <p className="dark:text-white">{user?.age || ""}</p>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[73vh] h-[67vh]">
        <div className="w-full p-[8.5vh] justify-center items-center overflow-y-auto">
          <p className="text-xl font-bold light:text-gray-700 mb-20 text-center">
            Update info
          </p>
          <div className="mb-4">
            <label className="block light:text-gray-700 text-sm mb-2">
              Email
            </label>
            <input
              type="text"
              className="h-[6vh] text-gray-700  border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("email")}
            />
          </div>
          <div className="mb-4">
            <label className="block light:text-gray-700 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              className="h-[6vh] text-gray-700  border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("password")}
            />
          </div>

          <div className="mb-4">
            <label className="block light:text-gray-700 text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 bg-gray-200 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-none"
              value={user?.name || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block light:text-gray-700 text-sm mb-2">
              Phone
            </label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("phone")}
            />
          </div>
          <div className="mb-4">
            <label className="block light:text-gray-700  text-sm mb-2">
              Age
            </label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("age")}
            />
          </div>
          <div className="mb-4">
            <label className="block light:text-gray-700  text-sm mb-2">
              Sex
            </label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("sex")}
            />
          </div>
          <div className="flex justify-center mt-10">
            <button type="submit">Save changes</button>
          </div>
          <div
            onClick={deleteHandler}
            className="cursor-pointer mt-6 static text-xs light:text-gray-500 text-center w-full"
          >
            Delete account
          </div>
        </div>
      </form>
    </div>
  );
}
