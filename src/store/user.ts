/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { defineStore } from 'pinia'
import { Router, RouteRecordRaw } from 'vue-router'
import { getRoleIdList } from '@/utils'

export const useUserStore = defineStore('user', {
  state (): Common.StroageType {
    return {
      userInfo: '',
      token: '',
      roleIdList: getRoleIdList(),
      routes: []
    }
  },
  actions: {
    forRoot (userInfo: Common.StroageType) {
      Object.assign(this, userInfo)
    },
    generateRoutes (router: Router) {
      const cloneRouter: Router = JSON.parse(JSON.stringify(router))
      const routes = cloneRouter.options.routes.filter((v) => v.path !== '/login' && !v.hidden)
      this.routes = this.handleTreeRoutes(this.handleMapRoutes(routes))
      this.routesSort(this.routes)
    },
    handleTreeRoutes (routes: RouteRecordRaw[]): RouteRecordRaw[] {
      return routes.filter((v) => {
        if (v.meta?.roles?.length) return v.meta.roles.some((o) => this.roleIdList?.includes(o))
        if (v?.children?.length) {
          v.children = this.handleTreeRoutes(v.children)
          return !!v.children?.length && !v.children.every((o) => o.hidden)
        }
        if (!v.meta?.roles || !v.meta?.roles.length) return true
        return false
      })
    },
    handleMapRoutes (routes: RouteRecordRaw[]): RouteRecordRaw[] {
      return routes.map((v) => {
        if (v?.children?.length === 1 && v?.meta?.alwaysShow) v = v.children[0]
        if (v?.children && v?.children.length > 1) v.children = this.handleMapRoutes(v.children)
        return v
      })
    },
    routesSort (routes: RouteRecordRaw[]): void {
      routes.sort((a, b) => a.sort && b.sort ? a.sort - b.sort : -1)
      routes.forEach(route => !!route.children?.length && this.routesSort(route.children))
    }
  }
})
