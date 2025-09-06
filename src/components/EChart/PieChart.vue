<template>
  <div class="pie-chart-container">
    <h3 class="chart-title">{{ title }}</h3>
    <EChart
      :option="chartOption"
      :width="width"
      :height="height"
      :theme="theme"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from './index.vue'
import type { EChartsOption } from 'echarts'

interface DataItem {
  name: string
  value: number
  percentage: string
  color?: string
}

interface Props {
  title?: string
  data: DataItem[]
  width?: string
  height?: string
  theme?: string
  showLegend?: boolean
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '异常识别分布',
  width: '100%',
  height: '400px',
  theme: '',
  showLegend: true,
  showLabel: true
})

// 默认颜色配置
const defaultColors = [
  '#4A90E2',  // 蓝色 - 三级告警
  '#5CB3F0',  // 浅蓝色 - 二级告警  
  '#7ED321',  // 绿色 - 一级告警
  '#F5A623'   // 橙色 - 四级告警
]

// 图表配置
const chartOption = computed<EChartsOption>(() => {
  const seriesData = props.data.map((item, index) => ({
    name: item.name,
    value: item.value,
    itemStyle: {
      color: item.color || defaultColors[index % defaultColors.length]
    },
    label: {
      show: props.showLabel,
      formatter: '{b}\n{c}× {d}%',
      fontSize: 12,
      color: '#333'
    },
    labelLine: {
      show: props.showLabel,
      length: 20,
      length2: 10
    }
  }))

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      show: props.showLegend,
      orient: 'vertical',
      right: '10%',
      top: 'center',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 12,
        color: '#666'
      },
      formatter: (name: string) => {
        const item = props.data.find(d => d.name === name)
        return item ? `${name}\n${item.value}× ${item.percentage}` : name
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped>
.pie-chart-container {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-title {
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-align: left;
}
</style>
</script>