import Service from "@/utils/service";

export const GetOrderList = <T, U>(data: T): Promise<Common.Response<U>> => Service.request<T, U>({ method: "post", url: "/orderList", data })

export const GetOrderDetail = <T, U>(params: T): Promise<Common.Response<U>> => Service.request<T, U>({ method: "get", url: "/orderDetail", params })