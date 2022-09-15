import Service from "@/utils/service";
export const Login = <T, U>(data: T) => Service.request<U>({ method: "post", url: "/login", data });