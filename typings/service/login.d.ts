namespace Service {
    interface LoginReq {
        username: string;
        password: string;
    }
    interface LoginRes {
       code: number;
       msg?: string;
       token: string;
    }
}