import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

export default function instance() {
  const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
  setInterceptor(instance);
  return instance;
}

export const setInterceptor = (inputInstance: AxiosInstance) => {
  inputInstance.interceptors.request.use(
    //중간에 가로채서 추가 로직 수행하기 위한 모듈
    (config) => {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${parseCookies().accessToken}`;
      return config;
    },
    (error) => {
      console.log("axios interceptor에서 발생한 에러: " + error);
      return Promise.reject(error);
    }
  );
  inputInstance.interceptors.response.use(
    (response) => {
    if (response.status === 404)
      console.log("axios interceptor에서 발생한 에러로 토큰이 없어서 404 페이지로 넘어감");
    return response;
  }
);

  return inputInstance;
};
