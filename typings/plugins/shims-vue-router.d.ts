import type { RouteRecordRaw } from 'vue-router'
declare module 'vue-router' {
  export interface _RouteRecordBase {
    hidden?: boolean
    sort?: number
    children?: RouteRecordRaw[]
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
