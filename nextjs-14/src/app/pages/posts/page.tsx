'use client'

import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Input, Box } from '@mui/material';
import { useRouter } from "next/navigation";
const SERVER = 'http://localhost:8080'
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { findAllPosts } from "@/app/components/post/service/post-service";
import { getAllPosts } from "@/app/components/post/service/post-slice";

const PostsPage: NextPage = ({data}:any) => {
  const [name, setName] = useState('')
  const router = useRouter()

  const [posts, setPosts] = useState([])

  const dispatch = useDispatch()
  const allPosts: [] = useSelector(getAllPosts)

  if (allPosts !== undefined) {
    console.log('allPosts is defined')

    console.log('length is ' + allPosts.length)

    for (let i = 0; i < allPosts.length; i++) {
      console.log(JSON.stringify(allPosts[i]))
    }
  } else {
    console.log('allPosts is undefined')
  }


  useEffect(() => {
    dispatch(findAllPosts(1))
  }, [])

  const handleClick = () => {
    const url = `${SERVER}/`
    axios.post(url)
      .then(res => {
        router.push("/")
      })
  }

  const handleChange = (e: any) => {
    setName(e.target.value)
  }


  return (<>


  </>)
}

export default PostsPage