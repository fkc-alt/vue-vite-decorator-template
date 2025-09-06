<template>
  <div
    ref="chartRef"
    :style="{ width: width, height: height }"
    class="echart-container"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'

interface Props {
  option: EChartsOption
  width?: string
  height?: string
  theme?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400px',
  theme: ''
})

const chartRef = ref<HTMLDivElement>()
let chartInstance: ECharts | null = null

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  
  // 销毁已存在的实例
  if (chartInstance) {
    chartInstance.dispose()
  }
  
  // 创建新的图表实例
  chartInstance = echarts.init(chartRef.value, props.theme)
  chartInstance.setOption(props.option)
  
  // 监听窗口大小变化，自动调整图表大小
  window.addEventListener('resize', handleResize)
}

// 处理窗口大小变化
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 更新图表配置
const updateChart = () => {
  if (chartInstance && props.option) {
    chartInstance.setOption(props.option, true)
  }
}

// 获取图表实例
const getChartInstance = () => {
  return chartInstance
}

// 监听配置变化
watch(
  () => props.option,
  () => {
    updateChart()
  },
  { deep: true }
)

onMounted(async () => {
  await nextTick()
  initChart()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    window.removeEventListener('resize', handleResize)
    chartInstance.dispose()
    chartInstance = null
  }
})

// 暴露方法给父组件
defineExpose({
  getChartInstance,
  updateChart
})
</script>

<style scoped>
.echart-container {
  min-height: 200px;
}
</style>
</script>