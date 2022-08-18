import Request from "@/utils/request";
export const Login = (data:(Service.Login)):Promise<any> => {
    return Request({
        method: "post",
        url: "/login",
        data
    })
}