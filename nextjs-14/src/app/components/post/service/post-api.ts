import instance from "@/app/components/common/configs/axios-config";
import { IPost } from "../model/post";

export const findAllPostsAPI = async (page: number) => {
  try {
    const response = await instance().get("posts/list", {
      params: { page, limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findPostByIdAPI = async (id: number) => {
  try {
    const response = await instance().get(`posts/list/${id}`, {
      params: { id },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findCountPostsAPI = async () => {
  try {
    return (await instance().get(`/posts/count`)).data;
  } catch (error) {
    return error;
  }
};

export const savePostAPI = async (post: IPost) => {
  console.log(`parameter in savePost: ${JSON.stringify(post)}`);
  try {
    return (await instance().post(`posts/save`, post)).data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deletePostAPI = async (id: number) => {
  try {
    await instance().delete(`/posts/delete`, {
      params: { id },
    });
  } catch (error) {
    return error;
  }
};

export const modifyPostAPI = async (id: number) => {
  try {
    await instance().put(`/posts/modify`, {
      params: { id },
    });
  } catch (error) {
    return error;
  }
};
