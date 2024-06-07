'use client'

import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getMessageSave } from "@/app/components/post/service/post-slice";
import { savePost } from "@/app/components/post/service/post-service";
import { ThumbUpAlt, FmdGood, AttachFile } from "@mui/icons-material";
import { MyTypography } from "@/app/components/common/style/cell";
import { IPost } from "@/app/components/post/model/post";
import { useForm } from 'react-hook-form'
import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";
import { PG } from "@/app/components/common/enums/PG";

const SERVER = 'http://localhost:8080'

export default function SavePostPage() {

  const router = useRouter()

  const dispatch = useDispatch()
  const message = useSelector(getMessageSave)
  const [post, setPost] = useState({} as IPost)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [content, setContent] = useState("")
  // const boardSelector = useSelector()
 
  const selectHandler = (e: any) => {
    setContent(e.target.value)
  }
  const handelCancel = () => {
    console.log("Posting Cancled")
  }

  const options = [
    { boardId: 1, title: "reiviews", content: "리뷰 게시판" },
    { boardId: 2, title: "qna", content: "Q&A" },
    { boardId: 3, title: "free", content: "자유 게시판" }
  ]

  const insertTitleHandler = (e: any) => {
    setPost({...post, title: e.target.value})
  }

  const insertCotentHandler = (e: any) => {
    setPost({...post, content: e.target.value})
  }

  // const handleChangeSelect = (e: any) => {
  //   setPost({ ...post, boardId: e.target.value })
  // }

  // const handleChangeTitle = (e: any) => {
  //   setPost({ ...post, title: e.target.value })
  // }

  // const handleChangeContent = (e: any) => {
  //   setPost({ ...post, content: e.target.value })
  // }


  const onSubmit = (data:any) => {
    alert(JSON.stringify(data))
    dispatch(savePost(data))
    .then((res:any)=>{
      alert(`게시글 작성 완료 ${res.payload}`)
      const boardId = data.boardId
      // router.push(`${PG.POST}/detail/${boardId}`)
      router.push(`${PG.POST}/list/${boardId}`)
    })
    .catch((err:any)=>{

    })
  }

  return (<>
      <div className="bg-white border-black dark:bg-black">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <label htmlFor="board" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your board</label>
        <select 
          {...register('boardId', {required: true})}
          id="boardId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {options.map((item, index) => (
            <option key={item.boardId} value={item.boardId} title={item.title} >{item.content}</option>
          ))
          }
        </select>

        <br />

        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          {MyTypography('글쓰기', "1.5rem")}
          <input 
          {...register('writerId', {required: true})}
          type="hidden" value={jwtDecode<any>(parseCookies().accessToken).id} readOnly />
          <input
          {...register('title', {required: true, maxLength: 50})}
          onChange={insertTitleHandler}
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder="Title" type="text" name="title" />
          <textarea
          {...register('content', {required: true, maxLength: 330})}
          onChange={insertCotentHandler}
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" placeholder="Describe everything about this post here" name="content" ></textarea>
          {/* <!-- icons --> */}
          <div className="icons flex text-gray-500 m-2">
            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <ThumbUpAlt component={ThumbUpAlt}></ThumbUpAlt>
            </svg>
            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <FmdGood component={FmdGood}></FmdGood>
            </svg>
            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <AttachFile component={AttachFile}></AttachFile>
            </svg>
            <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
          </div>
          {/* <!-- buttons --> */}
          <div className="buttons flex">
            <div className="btn  overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
              onClick={handelCancel}>Cancel</div>
            {/* <div className="btn  overflow-hidden relative w-30 bg-blue-500 text-white p-3 px-8 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
              onClick={handleSubmit}> Post </div> */}
              <input type="submit" value="SUBMIT" />
          </div>
        </div><br />
      </form>
      </div>
  </>)
}