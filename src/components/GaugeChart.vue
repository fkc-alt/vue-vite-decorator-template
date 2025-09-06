<template>
  <div ref="chartRef" class="gauge-chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    title: {
      text: '异常级别分布',
      left: 'center',
      top: 20,
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#666'
      }
    },
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '70%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 4,
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.25, '#54C7FF'],  // 二级告警 - 浅蓝色
              [0.5, '#5AC8FA'],   // 三级告警 - 蓝色
              [0.75, '#91D462'],  // 一级告警 - 绿色
              [1, '#FFD93D']      // 四级告警 - 黄色
            ]
          }
        },
        pointer: {
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 16,
          offsetCenter: [0, '5%'],
          itemStyle: {
            color: '#FF6B6B'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 14,
          distance: -60,
          rotate: 'tangential',
          formatter: function (value) {
            if (value === 0.125) {
              return '二级告警\n300次 30分'
            } else if (value === 0.375) {
              return '三级告警\n380次 40分'
            } else if (value === 0.625) {
              return '一级告警\n100次 20分'
            } else if (value === 0.875) {
              return '四级告警\n300次 10分'
            }
            return ''
          }
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 16,
          color: '#666'
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value) {
            return 'no.' + Math.round(value * 4)
          },
          color: 'inherit'
        },
        data: [
          {
            value: 0.5,
            name: '当前级别'
          }
        ]
      }
    ]
  }
  
  chartInstance.setOption(option)
  
  // 添加动画效果
  let currentValue = 0.125
  setInterval(() => {
    currentValue = currentValue >= 0.875 ? 0.125 : currentValue + 0.25
    chartInstance.setOption({
      series: [{
        data: [{
          value: currentValue,
          name: '当前级别'
        }]
      }]
    })
  }, 3000)
}
</script>

<style scoped>
.gauge-chart {
  width: 100%;
  height: 500px;
  min-height: 400px;
}
</style>