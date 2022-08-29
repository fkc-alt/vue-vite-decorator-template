import { AxiosPromise } from 'axios';
import Request from "@/utils/request";

export const getOrderList = (data: (Service.OrderListReq)): AxiosPromise<Service.OrderListRes> => {
    return Request({
        method: "post",
        url: "/orderList",
        data
    })
}