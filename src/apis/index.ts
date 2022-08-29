import { AxiosPromise } from 'axios';
import Request from "@/utils/request";
export const Login = (data: (Service.LoginReq)): AxiosPromise<Service.LoginRes> => {
    return Request({
        method: "post",
        url: "/login",
        data
    })
}