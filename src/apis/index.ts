import Service from "@/utils/service";

export const Login = <T extends Service.LoginReq, U extends Service.LoginRes>(data: T) => {
    return Service.request<T, U>({ method: "post", url: "/user/login", data });
}

export const GetTableData = <T extends Service.TableDataReq, U extends Service.TableDataRes>(data: T) => {
    return Service.request<T, U>({ method: "post", url: "/tableData", data });
}
