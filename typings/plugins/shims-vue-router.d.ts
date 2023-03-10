import type { RouteRecordRaw } from 'vue-router'
declare module 'vue-router' {
  interface _RouteRecordBase {
    hidden?: boolean
    sort?: number
    children?: RouteRecordRaw[]
    meta?: RouteMeta
  }
  interface RouteMeta {
    title?: string
    icon?: string
    roles?: number[]
    alwaysShow?: boolean
    keepAlive?: boolean
  }
  interface RouteLocationMatched {
    redirect?: string
  }
}
