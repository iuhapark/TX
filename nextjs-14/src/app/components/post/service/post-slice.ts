"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../model/post";
import { findAllPosts, findPostById, findCountPosts, savePost, modifyPost, deletePost } from "./post-service";
import { initialState } from "./post-init";

const postThunks = [findAllPosts, findPostById];

const status = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

const handleFulfilled = (state: any, { payload }: any) => {
  console.log("------------------ conclusion ---------------");
  state.array = payload;
  console.log(state.array);
};

const handlePending = (state: any) => {};

const handleRejected = (state: any) => {};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { pending, rejected } = status;

    builder
      .addCase(findAllPosts.fulfilled, (state: any, { payload }: any) => {
        state.array = payload;
      }) //post을 생략한것 왜냐하면 post에 파일에 있으니까
      //switch case랑 유사 (findAllPosts.fulfilled면 handleFulfilled함수를 실행해라)
      .addCase(findPostById.fulfilled, (state: any, { payload }: any) => {
        state.array = payload;
      })
      .addCase(findCountPosts.fulfilled, (state: any, { payload }: any) => {
        state.count = payload;
      })
      .addCase(modifyPost.fulfilled, (state: any, { payload }: any) => {})
      .addCase(deletePost.fulfilled, (state: any, { payload }: any) => {})
      .addCase(savePost.fulfilled, (state: any, { payload }: any) => {});
  },
});

export const getAllPosts = (state: any) => state.post.array;

export const getPostById = (state: any) => state.post.array;

export const getCountPosts = (state: any) => state.post.count;

export const getMessageSave = (state: any) => state.post.message;

export const {} = postSlice.actions;

export default postSlice.reducer;
