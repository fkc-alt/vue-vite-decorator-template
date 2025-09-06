<script lang="ts" setup>
import * as echarts from 'echarts'

type LevelItem = {
  name: string
  value: number // 0-100
  color: string
}

const props = defineProps<{ levels: LevelItem[] }>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

function buildOption (levels: LevelItem[]): echarts.EChartsOption {
  // Create one gauge per level with different radius
  const baseRadius = 70
  const ringGap = 12
  const centerY = '80%'

  const series = levels.map((item, index) => {
    const radius = baseRadius - index * ringGap
    return {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      center: ['50%', centerY],
      radius: `${radius}%`,
      progress: {
        show: true,
        width: 14,
        roundCap: true,
        itemStyle: { color: item.color }
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 14,
          color: [[1, 'rgba(0,0,0,0.06)']]
        }
      },
      pointer: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      detail: { show: false },
      title: { show: false },
      data: [{ value: item.value }]
    } as echarts.GaugeSeriesOption
  })

  // Decorative dashed guide arcs
  series.push({
    type: 'gauge',
    startAngle: 180,
    endAngle: 0,
    center: ['50%', centerY],
    radius: `${baseRadius + 6}%`,
    axisLine: {
      lineStyle: {
        width: 1,
        color: [[1, 'rgba(0,0,0,0.15)']]
      }
    },
    splitLine: { show: false },
    axisTick: {
      distance: -5,
      length: 5,
      lineStyle: { color: 'rgba(0,0,0,0.15)' },
      splitNumber: 15
    },
    axisLabel: { show: false },
    pointer: { show: false },
    detail: { show: false }
  } as echarts.GaugeSeriesOption)

  return {
    grid: { containLabel: false },
    tooltip: {
      trigger: 'item',
      formatter: (p: any) => `${p.seriesName || p.name || ''}${p.seriesName ? ': ' : ''}${p.value}%`
    },
    series
  }
}

function render (): void {
  if (!chartRef.value) return
  if (!chart) {
    chart = echarts.init(chartRef.value)
  }
  chart.setOption(buildOption(props.levels), true)
}

onMounted(() => {
  render()
  const resize = () => chart && chart.resize()
  window.addEventListener('resize', resize)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    if (chart) {
      chart.dispose()
      chart = null
    }
  })
})

watch(() => props.levels, () => render(), { deep: true })
</script>

<template>
  <div class="alarm-half-ring">
    <div ref="chartRef" class="chart" />
    <div class="legend">
      <div
        v-for="(l, idx) in props.levels"
        :key="idx"
        class="legend-item"
      >
        <span class="dot" :style="{ background: l.color }" />
        <span class="name">{{ l.name }}</span>
        <span class="value">{{ l.value }}%</span>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.alarm-half-ring {
  position: relative;
  width: 100%;
  height: 260px;
}
.chart {
  width: 100%;
  height: 100%;
}
.legend {
  position: absolute;
  right: 8px;
  top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.legend-item { font-size: 12px; color: #333; display: flex; align-items: center; gap: 6px; }
.legend-item .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.legend-item .name { opacity: 0.8; }
.legend-item .value { color: #ff8c00; }
</style>

