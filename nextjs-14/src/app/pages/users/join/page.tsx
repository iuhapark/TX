'use client';

import { IUser } from "@/app/components/user/model/user";
import { findUserById, join } from "@/app/components/user/service/user-service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

export default function Register({ params }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>();

  useEffect(() => {
    if (params.id) {
      dispatch(findUserById(params.id))
        .then((res: any) => {
          const userData = res.payload.values;
          reset(userData);
        })
        .catch((error: any) => console.log("error: ", error));
    }
  }, [dispatch, reset, params.id]);

  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    dispatch(join(data))
      .then((res: any) => {
        if (res.payload.status === 200) {
          alert("Join success");
          router.push('/pages/users/login');  // 회원가입 성공 시 로그인 페이지로 리다이렉션
        } else {
          alert("Join fail");
        }
      })
      .catch((error: any) => {
        setErrorMessage("Join fail");
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center h-screen w-full px-5 sm:px-0 pb-20">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-20 w-[73vh] h-[67vh] flex bg-white rounded-[3.5vh] shadow-2xl overflow-y-auto">
        <div className="w-full p-[8.5vh] justify-center items-center">
        <p className="text-2xl text-gray-600 text-center">Create your account</p>{" "}
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <div className="mt-10 mb-4">
            <label className="block text-gray-700 text-sm mb-2">Username</label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              type="password"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Name</label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Phone</label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Job</label>
            <input
              type="text"
              className="h-[6vh] text-gray-700 border border-gray-300 rounded-2xl py-2 px-4 block w-full focus:outline-2 focus:outline-blue-500"
              {...register("job", { required: "Job is required" })}
            />
            {errors.job && <p className="text-red-500">{errors.job.message}</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="relative m-11 text-white shadow-md hover:bg-gray-100 h-11 bg-black w-36 rounded-3xl"
            >
              Sign up
            </button>
          </div>
          <div className="text-center">
            <Link
              href="/pages/users/login"
              className="text-xs text-gray-500 text-center w-full"
            >
              <span className="text-blue-500">Already have an account?</span>
            </Link>
          </div>
          <svg className="h-20"></svg>
        </div>
      </form>
    </div>
  );
};
