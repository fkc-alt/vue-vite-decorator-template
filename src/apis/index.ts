import Service from "@/utils/service";

export const Login = <T, U>(data: T): Promise<U> => Service.request<T, U>({ method: "post", url: "/login", data });