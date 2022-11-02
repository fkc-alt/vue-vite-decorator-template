declare namespace Service {
  interface LoginReq {
    username: string
    password: string
  }
  interface LoginRes {
    token: string
    roles: number[]
  }
}
