'use client'

import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getAllBoards } from "@/app/components/board/service/board-slice"
import { findAllBoards } from "@/app/components/board/service/board-service"
import { IBoard } from "@/app/components/board/model/board"
import CardButton from "@/app/atoms/button/CardButton"

export default function BoardCards() {

    const dispatch = useDispatch();
    const allBoards: IBoard[] = useSelector(getAllBoards);
    
    useEffect(() => {
        dispatch(findAllBoards(1))
        console.log(JSON.stringify(allBoards))
    }, [])
 
    return (<>
        {allBoards?.map((board:IBoard) => (
            <CardButton key={board.id} id={board.id||0} title={board.title||""} description={board.description||""} regDate={""} modDate={""}/>
        ))}
    </>);
}      