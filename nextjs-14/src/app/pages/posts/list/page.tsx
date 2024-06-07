'use client'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from "next";
import { DataGrid } from "@mui/x-data-grid";
import PostColumns from "@/app/components/post/module/post-columns"
import { getAllPosts } from "@/app/components/post/service/post-slice";
import { findAllPosts, findCountPosts } from "@/app/components/post/service/post-service";

const PostListPage: NextPage = () => {
  const [pageSize, setPageSize] = useState(5);
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
    dispatch(findCountPosts())
  }, [])

  return (<>
    <h1 className="text-center">Posts List</h1>
    <div style={{ height: 891, width: "100%" }}>
      {allPosts && <DataGrid
        rows={allPosts}
        columns={PostColumns()}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[5,10,20]}
        checkboxSelection
        disableRowSelectionOnClick
      />}
    </div>
  </>)
}
export default PostListPage