import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const route: RouteRecordRaw[] = [
  {
    path: '/decorator',
    name: 'Decorator',
    redirect: '/decorator/demo',
    component: Layout,
    sort: 3,
    meta: { title: 'DECORATOR.TITLE', icon: 'GoodsFilled', alwaysShow: true },
    children: [
      {
        path: '/decorator/demo',
        name: 'DecoratorDemo',
        component: async () => await import('@/views/decorator/index.vue'),
        sort: 1,
        meta: {
          title: 'DECORATOR.TITLE',
          icon: 'Platform',
          keepAlive: false
        }
      }
    ]
  }
]

export default route
