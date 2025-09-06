<template>
  <div class="charts-container">
    <div class="page-header">
      <h2>ECharts 图表展示</h2>
      <p>基于 Vue3 + ECharts 的数据可视化示例</p>
    </div>

    <div class="charts-grid">
      <!-- 饼图示例 -->
      <div class="chart-card">
        <PieChart
          title="异常识别分布"
          :data="pieChartData"
          height="400px"
        />
      </div>

      <!-- 柱状图示例 -->
      <div class="chart-card">
        <div class="chart-title">月度数据统计</div>
        <EChart
          :option="barChartOption"
          height="400px"
        />
      </div>

      <!-- 折线图示例 -->
      <div class="chart-card">
        <div class="chart-title">趋势分析</div>
        <EChart
          :option="lineChartOption"
          height="400px"
        />
      </div>

      <!-- 仪表盘示例 -->
      <div class="chart-card">
        <div class="chart-title">性能指标</div>
        <EChart
          :option="gaugeChartOption"
          height="400px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EChart from '@/components/EChart/index.vue'
import PieChart from '@/components/EChart/PieChart.vue'
import type { EChartsOption } from 'echarts'

// 饼图数据
const pieChartData = ref([
  {
    name: '三级告警',
    value: 380,
    percentage: '40%',
    color: '#4A90E2'
  },
  {
    name: '二级告警', 
    value: 300,
    percentage: '30%',
    color: '#5CB3F0'
  },
  {
    name: '一级告警',
    value: 300,
    percentage: '20%',
    color: '#7ED321'
  },
  {
    name: '四级告警',
    value: 300,
    percentage: '10%',
    color: '#F5A623'
  }
])

// 柱状图配置
const barChartOption = ref<EChartsOption>({
  title: {
    text: '月度销售数据',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110],
      itemStyle: {
        color: '#4A90E2'
      }
    }
  ]
})

// 折线图配置
const lineChartOption = ref<EChartsOption>({
  title: {
    text: '用户增长趋势',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['新增用户', '活跃用户'],
    bottom: 10
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
      name: '新增用户',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      smooth: true,
      itemStyle: {
        color: '#7ED321'
      }
    },
    {
      name: '活跃用户',
      type: 'line',
      data: [620, 732, 701, 734, 1090, 1130, 1120],
      smooth: true,
      itemStyle: {
        color: '#F5A623'
      }
    }
  ]
})

// 仪表盘配置
const gaugeChartOption = ref<EChartsOption>({
  title: {
    text: 'CPU使用率',
    left: 'center'
  },
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      name: 'CPU',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}%'
      },
      data: [
        {
          value: 70,
          name: 'CPU使用率'
        }
      ]
    }
  ]
})
</script>

<style scoped>
.charts-container {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-header h2 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 28px;
  font-weight: 600;
}

.page-header p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
}

.chart-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-2px);
}

.chart-title {
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-align: left;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .charts-container {
    padding: 10px;
  }
  
  .chart-card {
    padding: 15px;
  }
}
</style>
</script>