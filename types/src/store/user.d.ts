import { Router, RouteRecordRaw } from 'vue-router'
export declare const useUserStore: import('pinia').StoreDefinition<'user', Common.StroageType, {}, {
  forRoot: (userInfo: Common.StroageType) => void
  generateRoutes: (router: Router) => void
  handleTreeRoutes: (routes: RouteRecordRaw[]) => RouteRecordRaw[]
  handleMapRoutes: (routes: RouteRecordRaw[]) => RouteRecordRaw[]
  routesSort: (routes: RouteRecordRaw[]) => void
}>
