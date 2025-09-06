# ECharts 组件使用说明

## 组件介绍

本项目提供了基于Vue3和ECharts的图表组件，包括：

1. **EChart** - 通用ECharts图表组件
2. **PieChart** - 专门的饼图组件

## 使用方法

### 1. 通用EChart组件

```vue
<template>
  <EChart
    :option="chartOption"
    width="100%"
    height="400px"
    theme="dark"
  />
</template>

<script setup>
import EChart from '@/components/EChart/index.vue'

const chartOption = {
  // ECharts配置选项
}
</script>
```

#### Props

- `option` (必需): ECharts配置对象
- `width`: 图表宽度，默认'100%'
- `height`: 图表高度，默认'400px'
- `theme`: 主题名称，默认''

#### 方法

- `getChartInstance()`: 获取ECharts实例
- `updateChart()`: 更新图表

### 2. PieChart饼图组件

```vue
<template>
  <PieChart
    title="数据分布"
    :data="pieData"
    width="100%"
    height="400px"
    :showLegend="true"
    :showLabel="true"
  />
</template>

<script setup>
import PieChart from '@/components/EChart/PieChart.vue'

const pieData = [
  {
    name: '类型A',
    value: 100,
    percentage: '40%',
    color: '#4A90E2'
  },
  {
    name: '类型B',
    value: 80,
    percentage: '30%',
    color: '#7ED321'
  }
]
</script>
```

#### Props

- `title`: 图表标题，默认'异常识别分布'
- `data` (必需): 数据数组，每个对象包含name、value、percentage、color字段
- `width`: 图表宽度，默认'100%'
- `height`: 图表高度，默认'400px'
- `theme`: 主题名称，默认''
- `showLegend`: 是否显示图例，默认true
- `showLabel`: 是否显示标签，默认true

## 特性

- 🎯 响应式设计，自动适配窗口大小
- 🎨 支持自定义主题和颜色
- 📱 移动端友好
- 🔧 TypeScript支持
- ⚡ 性能优化，自动销毁实例

## 示例页面

访问 `/charts` 路由查看完整的图表示例，包括：

- 饼图（异常识别分布）
- 柱状图（月度数据统计）
- 折线图（趋势分析）
- 仪表盘（性能指标）

## 依赖

- Vue 3.2+
- ECharts 5.x
- TypeScript