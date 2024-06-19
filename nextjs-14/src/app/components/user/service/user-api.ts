import  instance  from "@/app/components/common/configs/axios-config";
import { IUser } from "../model/user";

export const findAllUsersAPI = async (page: number) => {
  try {
    const response = await instance().get("/users/list", {
      params: { page, limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const findUserByIdAPI = async (id: number) => {
  try {
    const response = await instance().get(`/users/detail`, { params: { id } });
    console.log("MY-INFO:  users/detail " + JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginAPI = async (user: IUser) => {
  console.log(`Parameter in loginAPI: ${JSON.stringify(user)}`)
  try {
    const response = await instance().post(`/auth/login`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const joinAPI = async (user: IUser) => {
  try {
    const response = await instance().post(`/auth/save`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const existsUsernameAPI = async (username: string) => {
  try{
      const response = await instance().get(`/auth/existsUsername`,{params: {username}})
      console.log('existsUsernameAPI resulted: '+ response.data)
      return response.data
  }catch(error){
      console.log(error)
      return error
  }
}

export const existsEmailAPI = async (email: string) => {
  try{
      const response = await instance().get(`/auth/existsEmail`,{params: {email}})
      console.log('existsEmailAPI resulted: '+ response.data)
      return response.data
  }catch(error){
      console.log(error)
      return error
  }
}

export const logoutAPI = async () => {
  try {
    const response = await instance().get(`/users/logout`);
    console.log("logoutAPI resulted: " + response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserAPI = async (id: number) => {
  try {
    const response = await instance().put(`/users/modify`, { params: { id } });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserBalanceAPI = async (id: number) => {
  try {
    const response = await instance().put(`/users/modifyBalance`, { params: { id } });
    return response.data;
  } catch (error) {
    console.error("Error updating user balance:", error);
    throw error;
  }
};


export const deleteUserAPI = async (id: number) => {
  try {
    const response = await instance().delete(`/users/delete`, { params: { id } });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};