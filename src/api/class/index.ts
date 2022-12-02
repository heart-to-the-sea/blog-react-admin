import { ResPage, TClass } from "../../app.url";
import { AppUrl } from "../../utils";
import Axios from "../../utils/http";

export const classInfoList = () => {
  return Axios.get<void, ResPage<TClass>>(AppUrl.clazz.list.all);
};
