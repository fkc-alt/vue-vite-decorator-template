import type { RouteRecordRaw } from 'vue-router'
import { Enums } from '~@/typings/enums/roles'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/member',
    component: Layout,
    meta: {
      title: 'WORKBENCHMODULE.TITLE',
      icon: 'Odometer',
      alwaysShow: true
    },
    children: [
      {
        path: '/member',
        name: 'Member',
        component: () => import('@/views/moduleConfig/member.vue'),
        sort: 4,
        meta: {
          title: 'MODULECONFIG.MEMBER.TITLE',
          icon: 'User',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      }
    ]
  }
]

export default routes
