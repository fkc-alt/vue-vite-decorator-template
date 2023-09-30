declare namespace Service {
  namespace IndexConfig {
    interface SwiperConfigAddReq {
      image: string
      path: string
      sort: number
    }
    type QuerySwiperConfigItem = SwiperConfigAddReq & {
      createTime: string
    }
    interface QuerySwiperConfigRes {
      swiperList: QuerySwiperConfigItem[]
    }
    type SwiperConfigAddRes = boolean
  }
}
