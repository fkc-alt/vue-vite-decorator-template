namespace Service {
    interface LoginReq {
        username: string;
        password: string;
    }
    interface LoginRes {
        token: string;
        username: string;
        roles: Array<number>
    }
}