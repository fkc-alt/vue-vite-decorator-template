declare namespace Service {
  namespace WechatUser {
    interface WechatUserListReq {
      currentPage: number
      openId?: string
      pageSize: number
      phoneNumber?: string
      unionId?: string
    }
    interface WechatUserListRes extends Services.Common.Pagination {
      total: number
      offset: number
      item: any[]
    }
  }
}
