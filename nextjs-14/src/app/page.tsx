"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import Image from "next/image";
import { Home } from "./components/common/style/header";
import "./styles.css";
import { useState, useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import { Menu } from "./atoms/menu/Menu";
import { MenuToggle } from "./atoms/toggle/MenuToggle";

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations = isOpen
      ? [
          [
            "nav",
            { transform: "translateX(0%)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 }
          ],
          [
            "li",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" }
          ]
        ]
      : [
          [
            "li",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { delay: stagger(0.05, { from: "last" }), at: "<" }
          ],
          ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }]
        ];

    animate([
      [
        "path.top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" }
      ],
      ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" }
      ],
      ...menuAnimations
    ]);
  }, [isOpen]);

  return scope;
}


type Inputs = {
  question: string
  exampleRequired?: string
}

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}


export default function HomePage() {
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('input content : '+JSON.stringify(data))
    fetch('http://localhost:8000/api', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => setMessage(data.answer))
    .catch((error) => console.log("error:", error));
  }
  console.log(watch("question")) //모니터링, 상태 값이 변하면 찍어줌

  const [isOpen, setIsOpen] = useState(false);

  const scope = useMenuAnimation(isOpen);

  return (<>
    <div ref={scope}>
      <Menu />
      <MenuToggle toggle={() => setIsOpen(!isOpen)} />
    </div>
    
    <Home className="h-[5vh] px-5 lg:px-0"></Home>
        <div className="items-center flex justify-center px-5 lg:px-0"></div>
        <div className="items-center flex justify-center dark:text-white text-[30px] font-bold">peàr</div>
          <div className="h-[70vh] items-center flex justify-center px-5 lg:px-0">
            <div className="flex flex-col items-center justify-center w-full text-2xl xl:text-4xl font-extrabold text-900">
              <h1 className=" dark:text-white"> How can I help you today? </h1>
            </div></div>
            <div className="mx-auto max-w-[100vh] flex items-center gap-4">
              <h4>{message? message:""}</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div>
              <input
              type="text"
              {...register("question", { required: true })} 
                className="w-[80vh] px-5 py-3 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                placeholder="Message here"
              />
              <button type="submit"
              className="h-[5.4vh] w-[15vh] ml-4 static text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                Send
              </button>
              </div>
              </form>
              {errors.question && <span>This field is required</span>}
            </div>
            </>
  );
}










    

