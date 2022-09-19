import Service from "@/utils/service";

export const GetOrderList = <T extends Service.OrderListReq, U extends Service.OrderListRes>(data: T) => {
    return Service.request<T, U>({ method: "post", url: "/orderList", data })
}

export const GetOrderDetail = <T extends Service.OrderDetailReq, U extends Service.OrderDetailRes>(params: T) => {
    return Service.request<T, U>({ method: "get", url: "/orderDetail", params })
}