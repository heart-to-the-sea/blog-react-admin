import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const BASE_URL = "http://localhost:9083";
const app = Axios.create({
  baseURL: BASE_URL,
});
/**
 * REQ 请求体定义
 * RES 返回体定义
 */
const appReq = {
  get<REQ, RES>(url: string, config?: AxiosRequestConfig<REQ>) {
    return app.get<RES, AxiosResponse<RES>, REQ>(url, config);
  },
  post<REQ, RES>(url: string, data?: REQ, config?: AxiosRequestConfig<REQ>) {
    return app.post<RES, AxiosResponse<RES>, REQ>(url, data, config);
  },
  delete<REQ, RES>(url: string, config?: AxiosRequestConfig<REQ>) {
    return app.delete<RES, AxiosResponse<RES>, REQ>(url, config);
  },
  put<REQ, RES>(url: string, data?: REQ, config?: AxiosRequestConfig<REQ>) {
    return app.put<RES, AxiosResponse<RES>, REQ>(url, data, config);
  },
};
export default appReq;
