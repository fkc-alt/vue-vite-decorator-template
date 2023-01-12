import type { RouteRecordRaw } from 'vue-router'
import { Enums } from '~@/typings/enums/roles'
import Layout from '@/layout/index.vue'

const route: RouteRecordRaw[] = [
  {
    path: '/order',
    name: 'Order',
    redirect: '/order/completeOrder',
    component: Layout,
    sort: 3,
    meta: { title: 'ORDERMODULE.TITLE', icon: 'GoodsFilled' },
    children: [
      {
        path: '/order/completeOrder',
        name: 'CompleteOrder',
        component: async () => await import('@/views/order/completeOrder.vue'),
        sort: 2,
        meta: {
          title: 'ORDERMODULE.COMPLETEORDER.TITLE',
          icon: 'Suitcase',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      },
      {
        path: '/order/voidOrder',
        name: 'VoidOrder',
        component: async () => await import('@/views/order/voidOrder.vue'),
        sort: 3,
        meta: {
          title: 'ORDERMODULE.VOIDORDER.TITLE',
          icon: 'Tickets',
          roles: [Enums.Roles.OP]
        }
      },
      {
        path: '/order/detail',
        name: 'Detail',
        component: async () => await import('@/views/order/orderDetail.vue'),
        sort: 1,
        meta: {
          title: 'ORDERMODULE.DETAIL.TITLE',
          icon: 'GoodsFilled'
        }
      }
    ]
  }
]

export default route
