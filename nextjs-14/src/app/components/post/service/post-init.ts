import { IPost } from "../model/post";

export const initialState: IPost = {
  title: '',
  content: '',
  writerId: 0,
  boardId: 0,
  regDate: '',
  modDate: '',
  json: {},
  array: []
};
