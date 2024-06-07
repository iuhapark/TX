'use client'

import { useState, useEffect } from "react"
import { Button } from "@/app/components/common/style/button";
import { useSelector, useDispatch } from 'react-redux'
import { getPostById } from "@/app/components/post/service/post-slice"; 
import { findPostById } from "@/app/components/post/service/post-service"; 
import { IPost } from "@/app/components/post/model/post"; 
import { Content } from "@/app/components/common/style/content";
import { PG } from "@/app/components/common/enums/PG";
import MoveButton from "@/app/atoms/button/MoveButton";

export default function UserDetail({ params }: any) {
    const dispatch = useDispatch()
    const post: IPost = useSelector(getPostById)

    useEffect(() => { dispatch(findPostById(params.id)) }, [])

    return (<>
        <Content style={{fontSize:"18px", fontWeight: "bold"}}>게시판 상세 페이지</Content>
        <Content>
            <label>Title</label><br /><input type="text" name="username" placeholder={(post.title)} style={{width: "20rem"}}></input><br />
            <label>Content</label><br /><input type="text" name="username" placeholder={(post.content)} style={{width: "20rem"}}></input><br />
            <div style={{ display: 'flex', marginTop: '40px' }}>
            <MoveButton text={"수정"} path={`${PG.POST}/save`}></MoveButton><br />
            <MoveButton text={"삭제"} path={`${PG.POST}/save`}></MoveButton><br />
            </div>
        </Content>
        </>
    )
}