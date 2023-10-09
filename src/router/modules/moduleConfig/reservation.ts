import type { RouteRecordRaw } from 'vue-router'
import { Enums } from '~@/typings/enums/roles'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/reservation',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: 'WORKBENCHMODULE.TITLE',
      icon: 'Odometer',
      alwaysShow: true
    },
    children: [
      {
        path: '/reservation',
        name: 'Reservation',
        component: () => import('@/views/moduleConfig/reservation.vue'),
        sort: 5,
        meta: {
          title: 'MODULECONFIG.RESERVATION.TITLE',
          icon: 'List',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      }
    ]
  },
  {
    path: '/reservationDetail',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: 'WORKBENCHMODULE.TITLE',
      icon: 'Odometer',
      alwaysShow: true
    },
    children: [
      {
        path: '/reservationDetail',
        name: 'ReservationDetail',
        component: () => import('@/views/moduleConfig/reservationDetail.vue'),
        sort: 5,
        hidden: true,
        meta: {
          title: 'MODULECONFIG.RESERVATIONDETAIL.TITLE',
          icon: 'List',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      }
    ]
  }
]

export default routes
