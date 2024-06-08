import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import countReducer from "@/app/components/counter/counter.slice";
import postReducer from "@/app/components/post/service/post-slice";
import userReducer from "@/app/components/user/service/user-slice";
import boardReducer from "@/app/components/board/service/board-slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";


const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const countPersistConfig = {
  key: "count", //키 값(이름)으로 찾음, sequence와 반대되는 방식
  storage,
  whitelist: ["countState"],
};
const postPersistConfig = {
  key: "post",
  storage,
  whitelist: ["postState"],
};
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["userState"],
};
const boardPersistConfig = {
  key: "board",
  storage,
  whitelist: ["boardState"],
};

const persistedCountReducer = persistReducer(countPersistConfig, countReducer);
const persistedPostReducer = persistReducer(postPersistConfig, postReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedBoardReducer = persistReducer(boardPersistConfig, boardReducer);

export const rootReducer = combineReducers({
  count: persistedCountReducer,
  post: persistedPostReducer,
  user: persistedUserReducer,
  board: persistedBoardReducer,

});
