import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const chartsRoutes: RouteRecordRaw[] = [
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    meta: { title: '图表展示', icon: 'TrendCharts', alwaysShow: false },
    children: [
      {
        path: '/charts/index',
        name: 'Charts',
        component: async () => await import('@/views/charts/index.vue'),
        sort: 2,
        meta: { 
          title: 'ECharts图表', 
          icon: 'TrendCharts', 
          keepAlive: true 
        }
      }
    ]
  }
]

export default chartsRoutes