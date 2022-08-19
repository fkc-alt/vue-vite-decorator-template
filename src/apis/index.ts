import Request from "@/utils/request";
export const Login = (data:(Service.LoginReq)) => {
    return Request({
        method: "post",
        url: "/login",
        data
    })
}