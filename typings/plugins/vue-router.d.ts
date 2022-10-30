import vueRouter from 'vue-router'
declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface _RouteRecordBase {
    hidden?: boolean
    sort?: number
    children?: unknown[]
    meta?: RouteMeta
  }
  export interface RouteMeta {
    title?: string
    icon?: string
    roles?: number[]
    alwaysShow?: boolean
  }
  export interface RouteLocationMatched {
    redirect?: string
  }
  export default vueRouter
}
