import Service from "@/utils/service";

export const Login = <T extends Service.LoginReq, U extends Service.LoginRes>(data: T) => {
    return Service.request<T, U>({ method: "post", url: "/login", data });
}