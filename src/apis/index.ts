import Request from "@/utils/request";
export const Login = (data:(Service.LoginReq)) => {
    return Request<Service.LoginRes>({
        method: "post",
        url: "/login",
        data
    })
}