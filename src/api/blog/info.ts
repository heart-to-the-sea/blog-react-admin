import { InfoAllParams, ResBaseI, ResPage, TDoc } from "../../app.url";
import { AppUrl } from "../../utils";
import Axios from "../../utils/http";

export function infoAll(params?: Partial<InfoAllParams>) {
  return Axios.get<any, ResPage<TDoc>>(AppUrl.blog.info.all, { params: params });
}
export const infoViewById = (id: string) => {
  return Axios.get<string, ResBaseI<TDoc>>(AppUrl.blog.info.viewById + id);
};
export const infoEdit = (data: Partial<TDoc>) => {
  return Axios.post<Partial<TDoc>, ResBaseI<TDoc>>(AppUrl.blog.info.edit, data);
};
export const infoDeleteById = (id: number) => {
  return Axios.delete<number, ResBaseI<null>>(AppUrl.blog.info.deleteById + id);
};
