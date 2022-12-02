import { AxiosResponse } from "axios";

export interface TDoc {
  id: number;
  content: string;
  contentHTML: string;
  title: string;
  classId: number;
  className: string;
  abstract: string;
  createDate: number;
  directory: string;
  updateDate: number;
}
export interface TClass {
  id: number;
  name: string;
  pId: number;
  createDate: number;
  updateDate: number;
}
export interface ResBaseI<T> {
  data: T;
  code: number;
  message: string;
}
export interface ResPageI<T> {
  list: T;
  count: number;
  page: number;
  size: number;
}
// 列表返回
export type ResPage<T> = ResBaseI<ResPageI<Array<T>>>;

export interface InfoAllParams {
  classList: string;
  keyword: string;
}
