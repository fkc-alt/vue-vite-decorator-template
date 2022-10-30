import { RouteLocationNormalized } from 'vue-router'
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

function checkRoutes (to: RouteLocationNormalized, form: RouteLocationNormalized, next: unknown): void {
  const roles: number[] = to.meta.roles ?? []
  if ((roles == null) || ((roles?.length) === 0)) {
    (next as () => void)()
  } else {
    roles.some((o: number) => rolesMap().includes(o)) ? (next as () => void)() : (next as (navigate: unknown) => void)(form.path)
  }
}

router.beforeEach((to: RouteLocationNormalized, form: RouteLocationNormalized, next: unknown) => {
  NProgress.start()
  if (to.matched.length === 0) {
    (next as (navigate: unknown) => void)({ replace: true, path: '/error' })
    return
  }
  if (getToken().length > 0) {
    to.path === '/login' ? (next as (navigate: unknown) => void)('/') : checkRoutes(to, form, next)
  } else {
    to.path === '/login' ? (next as () => void)() : (removeStorage('token', 'roleIdList') && (next as (navigate: unknown) => void)('/login'))
  }
  NProgress.done()
})
