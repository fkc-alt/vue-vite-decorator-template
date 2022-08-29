namespace Service {
    interface LoginReq {
        username: string;
        password: string;
    }
    interface LoginRes extends Common.Response {
        token: string;
    }
}