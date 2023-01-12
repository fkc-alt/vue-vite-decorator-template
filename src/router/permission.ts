import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { getToken, getRoleIdList, removeStorage } from '@/utils'

/**
 *
 *  @description 权限列表
 *   注：如果路由没有该权限列表中的某一项默认不跳转
 */
const rolesMap = (): number[] => getRoleIdList()

function checkRoutes (to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext): void {
  const roles = to.meta.roles ?? []
  if (!roles?.length) {
    next()
  } else {
    roles.some((o: number) => rolesMap().includes(o)) ? next() : next(form.path)
  }
}

router.beforeEach((to, form, next) => {
  NProgress.start()
  if (!to.matched.length) {
    next({ replace: true, path: '/error' })
    return
  }
  if (getToken()) {
    to.path === '/login' ? next('/') : checkRoutes(to, form, next)
  } else {
    to.path === '/login' ? next() : (removeStorage('token', 'roleIdList') && next('/login'))
  }
  NProgress.done()
})
