import Service from "@/utils/service";

export const getOrderList = <T, U>(data: T) => Service.request<U>({ method: "post", url: "/orderList", data })