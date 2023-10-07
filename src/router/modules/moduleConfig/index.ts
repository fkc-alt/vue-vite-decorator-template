import type { RouteRecordRaw } from 'vue-router'
import { Enums } from '~@/typings/enums/roles'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/moduleConfig',
    name: 'moduleConfig',
    redirect: '/moduleConfig/product',
    component: Layout,
    sort: 2,
    meta: { title: 'MODULECONFIG.TITLE', icon: 'Setting' },
    children: [
      {
        path: '/moduleConfig/productDetail',
        name: 'ProductDetail',
        component: () => import('@/views/moduleConfig/productDetail.vue'),
        sort: 1,
        hidden: true,
        meta: {
          title: 'MODULECONFIG.PRODUCTDETAIL.TITLE',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      },
      {
        path: '/moduleConfig/product',
        name: 'Product',
        component: () => import('@/views/moduleConfig/product.vue'),
        sort: 1,
        meta: {
          title: 'MODULECONFIG.PRODUCT.TITLE',
          icon: 'Goods',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      },
      {
        path: '/moduleConfig/productSpecs',
        name: 'ProductSpecs',
        redirect: '/moduleConfig/productSpecs/productShelve',
        component: () => import('@/views/moduleConfig/productSpecs/index.vue'),
        sort: 2,
        meta: {
          title: 'MODULECONFIG.PRODUCTSPECS.TITLE',
          icon: 'Wallet',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        },
        children: [
          {
            path: '/moduleConfig/productSpecs/productShelve',
            name: 'ProductShelve',
            component: () =>
              import('@/views/moduleConfig/productSpecs/productShelve.vue'),
            sort: 3,
            meta: {
              title: 'MODULECONFIG.PRODUCTSPECS.PRODUCTSHELVE.TITLE',
              icon: 'Menu',
              roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
            }
          },
          {
            path: '/moduleConfig/productSpecs/productSpecShelve',
            name: 'ProductSpecShelve',
            component: () =>
              import('@/views/moduleConfig/productSpecs/productSpecShelve.vue'),
            sort: 3,
            meta: {
              title: 'MODULECONFIG.PRODUCTSPECS.PRODUCTSPECSHELVE.TITLE',
              icon: 'Menu',
              roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
            }
          }
        ]
      },
      {
        path: '/moduleConfig/productCategory',
        name: 'ProductCategory',
        component: () => import('@/views/moduleConfig/productCategory.vue'),
        sort: 3,
        meta: {
          title: 'MODULECONFIG.PRODUCTCATEGORY.TITLE',
          icon: 'Menu',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      },
      {
        path: '/moduleConfig/productGroup',
        name: 'ProductGroup',
        component: () => import('@/views/moduleConfig/productGroup.vue'),
        sort: 3,
        meta: {
          title: 'MODULECONFIG.PRODUCTGROUP.TITLE',
          icon: 'DocumentCopy',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      },
      {
        path: '/moduleConfig',
        name: 'Order',
        redirect: '/moduleConfig/order',
        component: () => import('@/views/moduleConfig/order/index.vue'),
        sort: 5,
        meta: {
          title: 'MODULECONFIG.ORDERCONFIG.TITLE',
          icon: 'List',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        },
        children: [
          {
            path: '/moduleConfig/order',
            name: 'Order',
            component: () => import('@/views/moduleConfig/order/order.vue'),
            sort: 1,
            meta: {
              title: 'MODULECONFIG.ORDERCONFIG.ORDER.TITLE',
              icon: 'List',
              roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
            }
          },
          {
            path: '/moduleConfig/order/logger',
            name: 'OrderLogger',
            component: () =>
              import('@/views/moduleConfig/order/orderLogger.vue'),
            sort: 2,
            meta: {
              title: 'MODULECONFIG.ORDERCONFIG.ORDERLOGGER.TITLE',
              icon: 'List',
              roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
            }
          }
        ]
      },
      {
        path: '/moduleConfig/reservation',
        name: 'Reservation',
        component: () => import('@/views/moduleConfig/reservation.vue'),
        sort: 5,
        meta: {
          title: 'MODULECONFIG.RESERVATION.TITLE',
          icon: 'List',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      },
      {
        path: '/moduleConfig/member',
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
