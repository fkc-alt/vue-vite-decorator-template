import Service from "@/utils/service";

export const Login = <T extends Service.LoginReq, U extends Service.LoginRes>(data: T) => {
    return Service.request<T, U>({ method: "post", url: "/user/login", data });
}

export const GetArticleList = <T = any, U = Service.ArticleListRes>() => {
    return Service.request<T, U>({ method: "get", url: "article/getArticleList" });
}

export const GetTableDataList = <T = any, U = Service.TableDataRes>() => {
    return Service.request<T, U>({ method: "post", url: "tableData" });
}
