import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  findAllPostsAPI,
  findPostByIdAPI,
  findCountPostsAPI,
  savePostAPI,
  deletePostAPI,
  modifyPostAPI
} from "./post-api";
import { IPost } from "../model/post";

export const findAllPosts: any = createAsyncThunk(
  "posts/findAllPosts",
  async (page: number) => {
    console.log('findAllPosts page: '+page)
    const data:any = await findAllPostsAPI(page);

    const {message, result}:any = data
    return data
  }
);

export const findPostById: any = createAsyncThunk(
  "posts/findPostById",
  async (id: number) => await findPostByIdAPI(id)
);

export const findCountPosts: any = createAsyncThunk(
  "posts/findPostsCount",
  async () => await findCountPostsAPI()
);

export const savePost: any = createAsyncThunk(
  "posts/savePost",
  async (post: IPost) => {
    try {
      return await savePostAPI(post);
    } catch (error) {
      throw error;
    }
  }
);

export const deletePost: any = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => await deletePostAPI(id)
);


export const modifyPost: any = createAsyncThunk(
  "posts/modifyPost",
  async (id: number) => await modifyPostAPI(id)
);
