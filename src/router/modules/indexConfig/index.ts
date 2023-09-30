import type { RouteRecordRaw } from 'vue-router'
import { Enums } from '~@/typings/enums/roles'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/indexConfig',
    name: 'indexConfig',
    redirect: '/indexConfig/swiper',
    component: Layout,
    sort: 2,
    meta: { title: 'INDEXCONFIG.TITLE' },
    children: [
      {
        path: '/indexConfig/swiper',
        name: 'Swiper',
        component: () => import('@/views/indexConfig/swiper.vue'),
        sort: 1,
        meta: {
          title: 'INDEXCONFIG.SWIPER.TITLE',
          icon: 'Picture',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      },
      {
        path: '/indexConfig/hotProduct',
        name: 'HotProduct',
        component: () => import('@/views/indexConfig/hotProduct.vue'),
        sort: 3,
        meta: {
          title: 'INDEXCONFIG.HOTPRODUCT.TITLE',
          icon: 'StarFilled',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      },
      {
        path: '/indexConfig/recommend',
        name: 'Recommend',
        component: () => import('@/views/indexConfig/recommend.vue'),
        sort: 1,
        meta: {
          title: 'INDEXCONFIG.RECOMMEND.TITLE',
          icon: 'ShoppingCart',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      }
    ]
  }
]

export default routes
