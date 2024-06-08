export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  writerId?: number;
  boardId?: number;
  regDate?: string;
  modDate?: string;
  json?: {};
  array?: IPost[];
}
