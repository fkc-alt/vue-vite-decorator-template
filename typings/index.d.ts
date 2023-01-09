declare namespace Common {
  type Glob = Record<string, Array<import('vue-router').RouteRecordRaw>>
  interface StroageType {
    userInfo?: string
    token?: string
    roleIdList?: number[]
    routes?: Array<import('vue-router').RouteRecordRaw>
  }
}
