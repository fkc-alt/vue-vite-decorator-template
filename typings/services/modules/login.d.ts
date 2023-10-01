declare namespace Service {
  interface LoginReq {
    username: string
    password: string
  }
  interface LoginRes {
    token: string
    authorities: number[]
  }

  interface UserInfoReq {
    id: number
    phone: string
  }
  interface UserInfoRes {
    name: string
    registerTime: string
    point: number
  }
}
