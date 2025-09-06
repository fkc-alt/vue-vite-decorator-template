<template>
  <div class="multiple-charts">
    <h2>更多图表示例</h2>
    <div class="charts-grid">
      <div class="chart-item">
        <h3>柱状图</h3>
        <div ref="barChartRef" class="chart"></div>
      </div>
      <div class="chart-item">
        <h3>饼图</h3>
        <div ref="pieChartRef" class="chart"></div>
      </div>
      <div class="chart-item">
        <h3>折线图</h3>
        <div ref="lineChartRef" class="chart"></div>
      </div>
      <div class="chart-item">
        <h3>雷达图</h3>
        <div ref="radarChartRef" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const barChartRef = ref(null)
const pieChartRef = ref(null)
const lineChartRef = ref(null)
const radarChartRef = ref(null)

const charts = []

onMounted(() => {
  initBarChart()
  initPieChart()
  initLineChart()
  initRadarChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  charts.forEach(chart => {
    if (chart) {
      chart.dispose()
    }
  })
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  charts.forEach(chart => {
    if (chart) {
      chart.resize()
    }
  })
}

const initBarChart = () => {
  const chart = echarts.init(barChartRef.value)
  charts.push(chart)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '告警次数',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        }
      }
    ]
  }
  
  chart.setOption(option)
}

const initPieChart = () => {
  const chart = echarts.init(pieChartRef.value)
  charts.push(chart)
  
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '告警级别',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 100, name: '一级告警' },
          { value: 300, name: '二级告警' },
          { value: 380, name: '三级告警' },
          { value: 300, name: '四级告警' }
        ],
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
  
  chart.setOption(option)
}

const initLineChart = () => {
  const chart = echarts.init(lineChartRef.value)
  charts.push(chart)
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '告警趋势',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(128, 255, 165)' },
            { offset: 1, color: 'rgb(1, 191, 236)' }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      }
    ]
  }
  
  chart.setOption(option)
}

const initRadarChart = () => {
  const chart = echarts.init(radarChartRef.value)
  charts.push(chart)
  
  const option = {
    radar: {
      indicator: [
        { name: '响应时间', max: 100 },
        { name: '处理效率', max: 100 },
        { name: '准确率', max: 100 },
        { name: '覆盖率', max: 100 },
        { name: '稳定性', max: 100 }
      ]
    },
    series: [
      {
        name: '性能指标',
        type: 'radar',
        data: [
          {
            value: [80, 90, 85, 90, 78],
            name: '系统性能',
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                { color: 'rgba(255, 145, 124, 0.1)', offset: 0 },
                { color: 'rgba(255, 145, 124, 0.9)', offset: 1 }
              ])
            }
          }
        ]
      }
    ]
  }
  
  chart.setOption(option)
}
</script>

<style scoped>
.multiple-charts {
  margin-top: 40px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.chart-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.chart-item h3 {
  text-align: center;
  color: #666;
  margin-bottom: 15px;
  font-size: 16px;
}

.chart {
  width: 100%;
  height: 300px;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>