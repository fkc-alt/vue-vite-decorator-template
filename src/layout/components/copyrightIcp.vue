<template>
  <div class="icp">
    {{ `© ${year} `
    }}<a
      href="http://beian.miit.gov.cn/"
      target="_blank"
      >{{ record }}</a
    >
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear() // 一般都是最新的一年
const record = '鄂ICP备2023018788号' // 备案号
</script>

<style lang="scss" scoped>
.icp {
  white-space: pre;
  text-align: center;
  color: gray;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.icp > a {
  color: gray;
  text-decoration: none;
}
.icp > a:hover {
  color: var(--el-color-primary);
  text-decoration: none;
}
</style>
