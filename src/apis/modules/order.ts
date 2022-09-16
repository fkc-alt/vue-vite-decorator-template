import Service from "@/utils/service";

export const GetOrderList = <T, U>(data: T): Promise<Common.Response<U>> => Service.request<T, U>({ method: "post", url: "/orderList", data })