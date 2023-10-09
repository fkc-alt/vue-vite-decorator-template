import type { RouteRecordRaw } from 'vue-router'
import { Enums } from '~@/typings/enums/roles'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/productCategory',
    component: Layout,
    meta: {
      title: 'WORKBENCHMODULE.TITLE',
      icon: 'Odometer',
      alwaysShow: true
    },
    children: [
      {
        path: '/productCategory',
        name: 'ProductCategory',
        component: () => import('@/views/moduleConfig/productCategory.vue'),
        sort: 1,
        meta: {
          title: 'MODULECONFIG.PRODUCTCATEGORY.TITLE',
          icon: 'Menu',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      }
    ]
  },
  {
    path: '/productGroup',
    component: Layout,
    meta: {
      title: 'WORKBENCHMODULE.TITLE',
      icon: 'Odometer',
      alwaysShow: true
    },
    children: [
      {
        path: '/productGroup',
        name: 'ProductGroup',
        component: () => import('@/views/moduleConfig/productGroup.vue'),
        sort: 2,
        meta: {
          title: 'MODULECONFIG.PRODUCTGROUP.TITLE',
          icon: 'DocumentCopy',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    meta: {
      title: 'WORKBENCHMODULE.TITLE',
      icon: 'Odometer',
      alwaysShow: true
    },
    children: [
      {
        path: '/product',
        name: 'Product',
        component: () => import('@/views/moduleConfig/product.vue'),
        sort: 3,
        meta: {
          title: 'MODULECONFIG.PRODUCT.TITLE',
          icon: 'Goods',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      }
    ]
  },
  {
    path: '/productDetail',
    component: Layout,
    meta: {
      title: 'WORKBENCHMODULE.TITLE',
      icon: 'Odometer',
      alwaysShow: true
    },
    children: [
      {
        path: '/productDetail',
        name: 'ProductDetail',
        component: () => import('@/views/moduleConfig/productDetail.vue'),
        sort: 1,
        hidden: true,
        meta: {
          title: 'MODULECONFIG.PRODUCTDETAIL.TITLE',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        }
      }
    ]
  },
  {
    path: '/productSpecs',
    component: Layout,
    meta: {
      title: 'WORKBENCHMODULE.TITLE',
      icon: 'Odometer',
      alwaysShow: true
    },
    children: [
      {
        path: '/productSpecs',
        name: 'ProductSpecs',
        redirect: '/moduleConfig/productSpecs/productShelve',
        component: () => import('@/views/moduleConfig/productSpecs/index.vue'),
        sort: 4,
        meta: {
          title: 'MODULECONFIG.PRODUCTSPECS.TITLE',
          icon: 'Wallet',
          roles: [Enums.Roles.ADMIN, Enums.Roles.OP]
        },
        children: [
          {
            path: '/productSpecs/productShelve',
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
            path: '/productSpecs/productSpecShelve',
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
      }
    ]
  }
]

export default routes
