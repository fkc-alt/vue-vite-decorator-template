<template>
  <div class="app-container">
    <h1>异常级别分布图</h1>
    <div class="chart-container">
      <GaugeChart />
    </div>
    <div class="controls">
      <button @click="refreshData">刷新数据</button>
      <button @click="toggleMoreCharts">{{ showMore ? '隐藏' : '显示' }}更多图表</button>
    </div>
    <MultipleCharts v-if="showMore" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GaugeChart from './components/GaugeChart.vue'
import MultipleCharts from './components/MultipleCharts.vue'

const showMore = ref(false)

const refreshData = () => {
  // 触发图表刷新
  window.location.reload()
}

const toggleMoreCharts = () => {
  showMore.value = !showMore.value
}
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.chart-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.controls {
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  margin: 0 5px;
}

button:hover {
  background-color: #66b1ff;
}
</style>