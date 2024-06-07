'use client'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findAllPosts, findPostById, findCountPosts  } from "@/app/components/post/service/post-service";
import { getAllPosts, getPostById, getCountPosts } from "@/app/components/post/service/post-slice";
import { DataGrid } from "@mui/x-data-grid";
import PostColumns from "@/app/components/post/module/post-columns"
import { NextPage } from "next";
import MoveButton from "@/app/atoms/button/MoveButton";
import { PG } from "@/app/components/common/enums/PG";

const PostListPage:NextPage = (props:any) => {
  const [pageSize, setPageSize] = useState(5);
    const dispatch = useDispatch()
    const allPosts: [] = useSelector(getPostById)
  
    useEffect(() => {
      dispatch(findPostById(props.params.id))
      dispatch(findCountPosts())
    }, [])


    return(<>
    <td colSpan={3}></td>
  <MoveButton text={"글쓰기"} path={`${PG.POST}/save`}></MoveButton><br />
<h1 className="text-center">List</h1>
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
    <td><button>수정</button></td>
    <td><button>삭제</button></td>
    </>)
}

export default PostListPage