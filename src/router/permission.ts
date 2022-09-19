import { RouteLocationNormalized } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from '@/router';
import { getToken, getRoleIdList, removeStorage } from '@/utils';

/**
 * 
 * 权限列表
 *   注：如果路由没有该权限列表中的某一项默认不跳转
 */
const rolesMap:Array<number> = getRoleIdList() || [101];


function checkRoutes(to: RouteLocationNormalized, form: RouteLocationNormalized, next: any) {
    const roles = to.meta.roles;
    if (!roles || !roles?.length) {
        next();
    } else {
        roles.some((o: number) => rolesMap.includes(o)) ? next() : next(form.path);
    }
}

router.beforeEach((to: RouteLocationNormalized, form: RouteLocationNormalized, next: any) => {
    NProgress.start();
    if (to.matched.length === 0) next({ replace: true, path: '/error' }) && eval('return');
    if (getToken()) {
        to.path === '/login' ? next("/") : checkRoutes(to, form, next);
    } else {
        to.path === '/login' ? next() : (removeStorage('token') && next('/login'));
    }
    NProgress.done();
})