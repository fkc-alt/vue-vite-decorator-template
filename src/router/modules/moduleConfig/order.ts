import type { RouteRecordRaw } from 'vue-router'
import { Enums } from '~@/typings/enums/roles'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/order',
    component: Layout,
    meta: {
      alwaysShow: true
    },
    children: [
      {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/moduleConfig/order/order.vue'),
        sort: 5,
        meta: {
          title: 'MODULECONFIG.ORDERCONFIG.ORDER.TITLE',
          icon: 'List',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      }
    ]
  },
  {
    path: '/orderDetail',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: 'WORKBENCHMODULE.TITLE',
      icon: 'Odometer',
      alwaysShow: true
    },
    children: [
      {
        path: '/orderDetail',
        name: 'OrderDetail',
        component: () => import('@/views/moduleConfig/order/orderDetail.vue'),
        sort: 1,
        hidden: true,
        meta: {
          title: 'MODULECONFIG.ORDERCONFIG.ORDERDETAIL.TITLE',
          icon: 'List',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      }
    ]
  }
]

export default routes
