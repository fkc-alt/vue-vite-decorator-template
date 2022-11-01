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
        component: defineAsyncComponent(async () => await import('@/views/order/completeOrder.vue')),
        meta: {
          title: 'ORDERMODULE.COMPLETEORDER.TITLE',
          icon: 'Suitcase',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      },
      {
        path: '/order/voidOrder',
        name: 'VoidOrder',
        component: defineAsyncComponent(async () => await import('@/views/order/voidOrder.vue')),
        meta: {
          title: 'ORDERMODULE.VOIDORDER.TITLE',
          icon: 'Tickets'
        }
      },
      {
        path: '/order/detail',
        name: 'Detail',
        component: defineAsyncComponent(async () => await import('@/views/order/orderDetail.vue')),
        meta: {
          title: 'ORDERMODULE.DETAIL.TITLE',
          icon: 'GoodsFilled'
        }
      }
    ]
  }
]

export default route
