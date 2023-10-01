import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { getToken, getRoleIdList, removeStorage } from '@/utils'

function checkRoutes(
  to: RouteLocationNormalized,
  form: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const roles = to.meta.roles ?? []
  if (!roles?.length) {
    next()
  } else {
    roles.some((o: number) => getRoleIdList().includes(o))
      ? next()
      : next(form.path)
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
    to.path === '/login'
      ? next()
      : removeStorage('token', 'roleIdList') && next('/login')
  }
  NProgress.done()
})
