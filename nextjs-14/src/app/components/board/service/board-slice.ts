"use client";

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../model/board";
import { findAllBoards, findBoardById } from "./board-service";
import { initialState } from "./board-init";

interface BoardState{
  json: IBoard
  array: Array<IBoard>
}

export const BoardState: BoardState = {
  json: {} as IBoard,
  array: [] as Array<IBoard>
};

const boardThunks = [findAllBoards, findBoardById];

const status = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

const handlePending = (state: any) => {};

const handleRejected = (state: any) => {};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { pending, rejected } = status;

    builder
    .addCase(findAllBoards.fulfilled, (state: any, {payload}: any) =>{state.array=payload})
    .addCase(findBoardById.fulfilled, (state: any, {payload}: any) =>{state.json=payload})
  },
});

export const getAllBoards = (state: any) =>{
  console.log(JSON.stringify(state.board.array));
  return state.board.array;}

export const getSingleBoard = (state: any) => {
  return state.board.json;}

export const {} = boardSlice.actions;

export default boardSlice.reducer;
